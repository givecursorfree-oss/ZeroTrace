/** Safe dynamic import for Framer vendor modules — avoids webpack chunk crash surfacing as `.call` errors. */
export async function loadFramerVendor<T>(
  loader: () => Promise<{ default: T }>,
): Promise<T | null> {
  try {
    const mod = await loader();
    return mod?.default ?? null;
  } catch {
    return null;
  }
}
