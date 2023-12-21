import { TinyColor } from "@ctrl/tinycolor";

function darken(color: string, amt: number = 0.2): string {
  return new TinyColor(color).darken(amt * 100).toString();
}

function lighten(color: string, amt: number = 0.2): string {
  return new TinyColor(color).lighten(amt * 100).toString();
}

function saturate(color: string, amt: number = 0.2): string {
  return new TinyColor(color).lighten(amt * 100).toString();
}

function desaturate(color: string, amt: number = 0.2): string {
  return new TinyColor(color).lighten(amt * 100).toString();
}

function grayscale(color: string): string {
  return new TinyColor(color).greyscale().toString();
}

function whiten(color: string, amt: number = 0.2): string {
  return new TinyColor(color).tint(amt * 100).toString();
}

function blacken(color: string, amt: number = 0.2): string {
  return new TinyColor(color).shade(amt * 100).toString();
}

function invert(color: string): string {
  return new TinyColor(color).spin(180).toString();
}

function isDark(color: string): boolean {
  return new TinyColor(color).isDark();
}

function alpha(color: string, amt: number = 0.2): string {
  return new TinyColor(color).setAlpha(amt).toRgbString();
}

export { darken, lighten, saturate, desaturate, grayscale, whiten, blacken, invert, isDark, alpha };
