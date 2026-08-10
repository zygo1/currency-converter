const light = {
  colors: {
    bg: "#F7F7F5",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F0EC",
    border: "#E3E2DD",
    borderStrong: "#C9C7C0",
    text: "#1A1A19",
    textMuted: "#6B6A65",
    textFaint: "#9A9993",
    accent: "#1D9E75",
    danger: "#D8523A",
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48],
  radii: { sm: 8, md: 12, pill: 999 },
  font: {
    size: { xs: 12, sm: 13, base: 14, lg: 16, xl: 24, xxl: 32 },
    weight: { normal: 400, medium: 500 },
  },
};

const dark = {
  ...light,
  colors: {
    ...light.colors,
    bg: "#1C1C1C",
    surface: "#2A2A2A",
    surfaceAlt: "#141414",
    border: "#3A3A3A",
    borderStrong: "#4D4D4D",
    text: "#EDEDED",
    textMuted: "#A0A0A0",
    textFaint: "#787878",
  },
};

export const theme = { light, dark };
export type AppTheme = typeof light;
