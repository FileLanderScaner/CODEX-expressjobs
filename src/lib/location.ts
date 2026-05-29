export type BrowserCoordinates = {
  latitude: number;
  longitude: number;
};

export type LocationParts = {
  city: string;
  neighborhood: string;
};

export function buildLocationText({ city, neighborhood }: LocationParts) {
  const safeCity = city.trim();
  const safeNeighborhood = neighborhood.trim();

  if (safeCity && safeNeighborhood) {
    return `${safeCity}, ${safeNeighborhood}`;
  }

  return safeCity || safeNeighborhood;
}

export function splitLocationText(value: string): LocationParts {
  const [city = "", ...rest] = value.split(",");

  return {
    city: city.trim(),
    neighborhood: rest.join(",").trim(),
  };
}

export function formatDistanceKm(value: number | null | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  if (value < 1) {
    const meters = Math.max(100, Math.round((value * 1000) / 100) * 100);
    return `${meters} m`;
  }

  return `${value.toFixed(value < 10 ? 1 : 0)} km`;
}

export function requestBrowserCoordinates(): Promise<BrowserCoordinates> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return Promise.reject(new Error("Tu navegador no permite detectar ubicacion."));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        reject(new Error("No pudimos usar tu ubicacion. Podes buscar por ciudad o barrio manualmente."));
      },
      {
        enableHighAccuracy: false,
        maximumAge: 600000,
        timeout: 10000,
      },
    );
  });
}
