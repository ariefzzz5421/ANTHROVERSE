# ANTHROVERSE

**Explore Humanity Across Time.** A responsive digital museum built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, Motion, MapLibre GL JS, Recharts, and Zod.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. No API key or paid service is needed for core exhibits. The atlas uses public OpenFreeMap tiles through MapLibre; its site dossiers remain readable if map tiles are unavailable.

## Verify

```powershell
npm test
npm run typecheck
npm run lint
npm run build
```

## Collections

- `/timeline` — segmented deep-time timeline with chronological arrows, search, filters, zoom, pan, evidence photographs, event details, and citations.
- `/evolution` — interactive fossil evidence diagram, twelve hominin dossiers, and side-by-side species comparison. Diagram arrows indicate chronological order, **not direct ancestry**; Neanderthals appear as a parallel branch.
- `/cultures` — sixteen introductory cultural anthropology topics.
- `/behavior` — four evidence-aware concept modules.
- `/migration` — lazy-loaded geographic atlas with schematic uncertainty bands and accessible site descriptions.
- `/compare`, `/library`, `/learn`, `/simulations` — comparisons, researcher index, saved learning progress, and four illustrative toy models.
- `/search`, `/sources` — unified catalog search and research methods.

Source records and reusable catalog data live in `src/lib/content.ts`; content types live in `src/lib/types.ts`. Deep-time and calendar-year utilities live in `src/lib/time.ts`. Content records are validated against the source schema and checked for broken source references when loaded.

The generated entrance artwork is `public/museum-panorama.webp`. It is atmospheric artwork, not an anatomical reconstruction. The homepage's layered 3D object is also an illustrative sculpture; its spacing is not a time scale. Visitors can start it on demand, so its 3D code stays out of the initial page load. It stops rendering when idle, and a static exhibit is available without WebGL. MapLibre's self-hosted worker and its license are in `public/`.

### Museum photographs

Photograph credits and license links are displayed beside each image in the app and stored once in `src/lib/exhibit-images.ts`.

| Exhibit | Photograph and source | License | Adaptation |
| --- | --- | --- | --- |
| Sangiran II original *Homo erectus* calvarium | [Gerbil / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Calvaria_Sangiran_II_(C).jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Resized and converted to WebP |
| Lucy *Australopithecus afarensis* museum cast | [Daderot / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Australopithecus_afarensis_(Lucy)_cast_-_Naturmuseum_Senckenberg_-_DSC02089.JPG) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | Resized and converted to WebP |
| *Tiktaalik roseae* museum display; original/cast status not specified | [Ghedoghedo / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tiktaalik_roseae.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Resized and converted to WebP |
| *Aegyptopithecus* museum skull and jaw display; original/cast status not specified | [Guérin Nicolas / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aegyptopithecus_skull_(University_of_Zurich)-1.JPG) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Resized and converted to WebP |
| Toumaï *Sahelanthropus* cranium cast | [Didier Descouens / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Sahelanthropus_tchadensis_-_TM_266-01-060-1.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Resized and converted to WebP |
| Neanderthal 1 skullcap cast | [Gunnar Creutz / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Homo_neanderthalensis_(cast_of_Neanderthal_1_skullcap)_at_G%C3%B6teborgs_Naturhistoriska_Museum_8790.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Resized and converted to WebP |
| Recent *Homo sapiens* skull, not an earliest fossil | [Tiia Monto / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Homo_sapiens_skull.jpg) | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) | Resized and converted to WebP |

These are photographs of objects or specimens, not full-body reconstructions. Cast status is named where verified; unknown status is left unknown. Scientific claims are supported by linked research records separately from photo licenses.

## Research and product limits

The seed catalog is an editorial starting point. Dates and species boundaries are approximate; uncertain ancestry and migration routes are explicitly labeled. Some entries have no verified specimen imagery. Researcher biographies and several culture case studies need deeper primary-source expansion. The Indonesian toggle translates the museum interface; exhibit research text currently remains in English and the app states this visibly.

Simulations are deterministic educational toy models, not empirical forecasts. Local bookmarks and learning progress stay on the current device. No user account or database is required.

For production SEO, set `NEXT_PUBLIC_SITE_URL` to the canonical origin. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used when that variable is absent.
