"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  fossilSites,
  migrationRoutes,
  formatYears,
  getSources,
} from "@/lib/content";
import type { Map as MapType } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
const thresholds = [2_000_000, 500_000, 100_000, 50_000, 10_000, 0];
export function MigrationMap() {
  const params = useSearchParams();
  const holder = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapType | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [time, setTime] = useState(5);
  const [species, setSpecies] = useState("all");
  const [site, setSite] = useState(params.get("site") || "");
  const visibleSites = useMemo(
    () =>
      fossilSites.filter(
        (s) =>
          (species === "all" || s.speciesIds.includes(species)) &&
          (s.yearsAgo ? s.yearsAgo >= thresholds[time] : time === 5),
      ),
    [species, time],
  );
  const visibleRoutes = useMemo(
    () =>
      migrationRoutes.filter(
        (r) =>
          (species === "all" || r.speciesIds.includes(species)) &&
          r.timeRange[0] >= thresholds[time],
      ),
    [species, time],
  );
  useEffect(() => {
    let active = true;
    let map: MapType;
    async function init() {
      if (!holder.current) return;
      try {
        const maplibre = await import("maplibre-gl");
        if (!active) return;
        maplibre.setWorkerUrl("/maplibre-gl-worker.mjs");
        map = new maplibre.Map({
          container: holder.current!,
          style: "https://tiles.openfreemap.org/styles/dark",
          center: [75, 8],
          zoom: window.innerWidth < 650 ? 0.55 : 1.45,
        });
        mapRef.current = map;
        map.addControl(new maplibre.NavigationControl(), "top-right");
        map.on("load", () => {
          if (active) setReady(true);
        });
        map.on("error", () => {
          if (active && !map.loaded()) setError(true);
        });
      } catch {
        if (active) setError(true);
      }
    }
    init();
    return () => {
      active = false;
      map?.remove();
      mapRef.current = null;
    };
  }, []);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    const sitesGeo = {
      type: "FeatureCollection" as const,
      features: visibleSites.map((s) => ({
        type: "Feature" as const,
        geometry: { type: "Point" as const, coordinates: s.coordinates },
        properties: { id: s.id, title: s.title },
      })),
    };
    const routesGeo = {
      type: "FeatureCollection" as const,
      features: visibleRoutes.map((r) => ({
        type: "Feature" as const,
        geometry: {
          type: "MultiLineString" as const,
          coordinates:
            r.id === "americas"
              ? [
                  [r.from, [179, 58]],
                  [[-179, 58], r.to],
                ]
              : [[r.from, r.to]],
        },
        properties: { id: r.id },
      })),
    };
    if (!map.getSource("sites")) {
      map.addSource("sites", { type: "geojson", data: sitesGeo });
      map.addLayer({
        id: "site-halo",
        type: "circle",
        source: "sites",
        paint: {
          "circle-radius": 12,
          "circle-color": "#c39252",
          "circle-opacity": 0.25,
        },
      });
      map.addLayer({
        id: "site-dots",
        type: "circle",
        source: "sites",
        paint: {
          "circle-radius": 6,
          "circle-color": "#c39252",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#101820",
        },
      });
      map.on("click", "site-dots", (e) => {
        const id = e.features?.[0]?.properties?.id;
        if (id) setSite(id);
      });
      map.getCanvas().style.cursor = "pointer";
    } else {
      (map.getSource("sites") as import("maplibre-gl").GeoJSONSource).setData(
        sitesGeo,
      );
    }
    if (!map.getSource("routes")) {
      map.addSource("routes", { type: "geojson", data: routesGeo });
      map.addLayer({
        id: "route-band",
        type: "line",
        source: "routes",
        paint: {
          "line-color": "#c39252",
          "line-width": 18,
          "line-opacity": 0.13,
        },
      });
      map.addLayer({
        id: "route-center",
        type: "line",
        source: "routes",
        paint: {
          "line-color": "#8b5934",
          "line-width": 2,
          "line-dasharray": [2, 3],
        },
      });
    } else {
      (map.getSource("routes") as import("maplibre-gl").GeoJSONSource).setData(
        routesGeo,
      );
    }
  }, [ready, visibleSites, visibleRoutes]);
  useEffect(() => {
    const selected = visibleSites.find((s) => s.id === site);
    if (selected && mapRef.current?.loaded())
      mapRef.current.flyTo({ center: selected.coordinates, zoom: 4 });
  }, [site, ready, visibleSites]);
  const selected = visibleSites.find((s) => s.id === site);
  return (
    <>
      <div className="atlas-controls">
        <label>
          Explore by time:{" "}
          <strong>
            {thresholds[time] === 0
              ? "All periods"
              : `Through ${formatYears(thresholds[time])}`}
          </strong>
          <input
            type="range"
            min="0"
            max="5"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          />
        </label>
        <select
          className="select"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          aria-label="Filter atlas by species"
        >
          <option value="all">All lineages</option>
          <option value="homo-erectus">Homo erectus</option>
          <option value="homo-sapiens">Homo sapiens</option>
          <option value="homo-floresiensis">Homo floresiensis</option>
          <option value="homo-luzonensis">Homo luzonensis</option>
        </select>
      </div>
      <div className="map-wrap">
        <div
          className="map-canvas"
          ref={holder}
          role="img"
          aria-label="Interactive map of fossil sites and schematic migration corridors"
        />
        {!ready && !error && (
          <div className="map-overlay">Loading geographic exhibit…</div>
        )}
        {error && (
          <div className="map-overlay">
            The map tiles are unavailable. The site descriptions below remain
            accessible.
          </div>
        )}
      </div>
      <p className="small-note">
        Wide translucent bands show uncertainty; dashed lines are schematic
        links between regions, never verified individual travel paths. Site
        markers show approximate localities, not excavation coordinates.
        MapLibre map tiles © OpenFreeMap / OpenMapTiles and OpenStreetMap
        contributors.
      </p>
      <div className="atlas-grid">
        <div>
          <h2 className="serif">Fossil and archaeological sites</h2>
          <div className="site-list">
            {visibleSites.map((s) => (
              <button
                className={site === s.id ? "active" : ""}
                onClick={() => setSite(s.id)}
                key={s.id}
              >
                <strong>{s.title}</strong>
                <span>{s.summary}</span>
              </button>
            ))}
          </div>
          {visibleSites.length === 0 && (
            <div className="empty">
              No curated sites match this time and lineage filter.
            </div>
          )}
        </div>
        <div>
          <h2 className="serif">Broad movements</h2>
          <div className="site-list">
            {visibleRoutes.map((r) => (
              <div className="route-item" key={r.id}>
                <strong>{r.title}</strong>
                <p>{r.summary}</p>
                <small>{r.uncertainty}</small>
              </div>
            ))}
          </div>
          {visibleRoutes.length === 0 && (
            <div className="empty">No schematic routes match this filter.</div>
          )}
        </div>
      </div>
      {selected && (
        <div className="panel site-detail">
          <span className="eyebrow">Site dossier · {selected.region}</span>
          <h2>{selected.title}</h2>
          <p>{selected.summary}</p>
          <p className="small-note">
            {selected.yearsAgo
              ? `Time-filter reference: ${formatYears(selected.yearsAgo)} (older end of a broad range).`
              : "Date not listed in this catalog."}
          </p>
          <ul className="source-list">
            {getSources(selected.sourceIds).map((s) => (
              <li key={s.id}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
