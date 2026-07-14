/**
 * custom hook leveraging react's usesyncexternalstore to safely determine client-side mounting.
 * elegantly prevents next.js ssr hydration mismatches (without relying on useeffect),
 * ensuring client-only components (like themes or editors) render at the correct time.
 */

"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => { };
const getSnapshot = () => true; // Client par humesha true
const getServerSnapshot = () => false; // Server par humesha false

// Ye hook Next.js hydration mismatch ko solve karega bina useEffect ke
export const useMounted = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};