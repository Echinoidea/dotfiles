export function rgbToHex(r, g, b) {
  // Ensure the RGB values are within the 0-255 range
  r = Math.max(0, Math.min(255, Math.round(r)));
  g = Math.max(0, Math.min(255, Math.round(g)));
  b = Math.max(0, Math.min(255, Math.round(b)));

  // Convert to hexadecimal and ensure two digits for each component
  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex; // Pad with zero if needed
  };

  // Combine and return the hex string
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
