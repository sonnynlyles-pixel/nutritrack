// Detects the user's US state from browser geolocation, so regional
// restaurant suggestions can be filtered to what's actually near them.

export interface DetectedLocation {
  state: string; // 2-letter USPS code, e.g. "IA"
  label: string; // human-readable, e.g. "Iowa"
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60 * 60 * 1000, // cache OK for an hour — state doesn't change fast
    });
  });
}

// BigDataCloud's client-reverse-geocode endpoint is built for direct browser
// use (CORS-enabled, no API key needed) — same free-tier pattern as the
// USDA/Open Food Facts calls elsewhere in this app.
export async function detectStateFromBrowser(): Promise<DetectedLocation | null> {
  const pos = await getCurrentPosition();
  const { latitude, longitude } = pos.coords;

  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Reverse geocode failed: ${res.status}`);
  const data = await res.json();

  if (data.countryCode !== 'US') return null; // brand availability data is US-only

  const code: string | undefined = data.principalSubdivisionCode; // e.g. "US-IA"
  const state = code?.split('-')[1];
  const label: string | undefined = data.principalSubdivision;
  if (!state || !label) return null;

  return { state, label };
}
