"use client";
import { useSyncExternalStore } from "react";
const changeEvent = "anthro-storage-change";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}
export function useStoredValue(key: string, fallback: string) {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key) ?? fallback,
    () => fallback,
  );
}
export function setStoredValue(key: string, value: string) {
  localStorage.setItem(key, value);
  window.dispatchEvent(new Event(changeEvent));
}
