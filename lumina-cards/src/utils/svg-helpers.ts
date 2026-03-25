/**
 * Convert polar coordinates to cartesian (for SVG arc endpoints).
 */
export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
): { x: number; y: number } {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

/**
 * Generate an SVG arc path `d` attribute.
 * startAngle and endAngle are in degrees (0 = top, clockwise).
 */
export function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, arcSweep, 0, end.x, end.y,
  ].join(' ');
}

/**
 * Map a value within [min, max] to an angle within [startAngle, endAngle].
 */
export function valueToAngle(
  value: number,
  min: number,
  max: number,
  startAngle: number,
  endAngle: number,
): number {
  const clamped = Math.min(Math.max(value, min), max);
  const range = max - min;
  const ratio = range === 0 ? 0 : (clamped - min) / range;
  return startAngle + ratio * (endAngle - startAngle);
}

/**
 * Calculate the stroke-dasharray and stroke-dashoffset for an arc ring.
 * Returns { circumference, offset } for the active arc stroke.
 */
export function computeArcDash(
  radius: number,
  value: number,
  min: number,
  max: number,
  arcSpanDeg: number = 270,
): { circumference: number; dashArray: string; dashOffset: number } {
  const fullCircumference = 2 * Math.PI * radius;
  const arcLength = (arcSpanDeg / 360) * fullCircumference;
  const clamped = Math.min(Math.max(value, min), max);
  const range = max - min;
  const ratio = range === 0 ? 0 : (clamped - min) / range;
  const filledLength = ratio * arcLength;
  const offset = arcLength - filledLength;

  return {
    circumference: fullCircumference,
    dashArray: `${arcLength} ${fullCircumference - arcLength}`,
    dashOffset: offset,
  };
}
