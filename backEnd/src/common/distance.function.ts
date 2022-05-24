const toRadians = (n) => (Math.PI / 180) * n;

/**
 * Calculates sphereical distance between two coordinates on earth
 * @param point1 [lat, lng]
 * @param point2 [lat, lng]
 * @returns Distance in KM
 */
export const sphereDistance = (point1, point2) => {
  const EARTH_RADIUS_KM = 6371;

  const lat1 = toRadians(point1[0]);
  const lat2 = toRadians(point2[0]);

  const diffLat = toRadians(point2[0] - point1[0]);
  const diffLng = toRadians(point2[1] - point1[1]);

  const sinLngSqr = Math.pow(Math.sin(diffLng / 2), 2);
  const sinLatDiffSqr = Math.pow(Math.sin((lat1 + lat2) / 2), 2);
  const sinLatSqr = Math.pow(Math.sin(diffLat / 2), 2);

  const J = Math.asin(Math.sqrt(sinLatSqr + (1 - sinLatSqr - sinLatDiffSqr) * sinLngSqr));

  const Q = 2 * J;

  return Math.round(Number(EARTH_RADIUS_KM * Q));
};
