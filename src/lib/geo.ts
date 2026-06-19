const LAND_GEOJSON_URL =
  'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/50m/physical/ne_50m_land.json';

export interface LatLng {
  lat: number;
  lng: number;
}

export function latLngToPosition(lat: number, lng: number) {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  return {
    x: Math.cos(latRad) * Math.sin(lngRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.cos(lngRad),
  };
}

export function projectEquirectangular(lng: number, lat: number, width: number, height: number) {
  return [(lng + 180) / 360 * width, ((90 - lat) / 180) * height] as const;
}

interface GeoRing {
  type: string;
  coordinates: number[][][] | number[][][][];
}

interface GeoFeature {
  geometry?: GeoRing;
}

interface GeoCollection {
  features: GeoFeature[];
}

export function drawLandBitmap(
  ctx: CanvasRenderingContext2D,
  landFeatures: GeoCollection,
  width: number,
  height: number,
): void {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';

  const drawRing = (ring: number[][]) => {
    ring.forEach(([lng, lat], i) => {
      const [x, y] = projectEquirectangular(lng, lat, width, height);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
  };

  landFeatures.features.forEach((feature) => {
    const geom = feature.geometry;
    if (!geom) return;
    ctx.beginPath();
    if (geom.type === 'Polygon') {
      geom.coordinates.forEach((ring) => drawRing(ring as number[][]));
    } else if (geom.type === 'MultiPolygon') {
      (geom.coordinates as number[][][][]).forEach((poly) => {
        poly.forEach((ring) => drawRing(ring));
      });
    }
    ctx.fill('evenodd');
  });
}

export function collectLandDots(
  pixels: Uint8ClampedArray,
  bitmapWidth: number,
  bitmapHeight: number,
  step = 0.12,
): LatLng[] {
  const dots: LatLng[] = [];

  const isOnLand = (lng: number, lat: number) => {
    const x = Math.round(((lng + 180) / 360) * bitmapWidth) % bitmapWidth;
    const y = Math.max(0, Math.min(bitmapHeight - 1, Math.round(((90 - lat) / 180) * bitmapHeight)));
    return pixels[(y * bitmapWidth + x) * 4] > 128;
  };

  for (let lat = -90; lat <= 90; lat += step) {
    const cosLat = Math.cos((Math.abs(lat) * Math.PI) / 180);
    const lngStep = cosLat > 0.01 ? step / Math.max(0.3, cosLat) : 360;
    for (let lng = -180; lng < 180; lng += lngStep) {
      if (isOnLand(lng, lat)) dots.push({ lat, lng });
    }
  }

  return dots;
}

export async function fetchLandGeoJson(): Promise<GeoCollection> {
  const response = await fetch(LAND_GEOJSON_URL);
  if (!response.ok) throw new Error('Failed to load land data');
  return response.json() as Promise<GeoCollection>;
}
