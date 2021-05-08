type PaletteInterface = { [x: string]: string };

export const cosmosPalette: PaletteInterface = {
  "deep-dark": "24,25,35",
  "deep-light": "95,87,93",
  "atmosphere-light": "61, 179, 252",
};

export const starPalette: PaletteInterface = {
  white: "253, 255, 240",
  yellow: "248, 243, 98",
  blue: "10, 104, 255",
  red: "250, 186, 186",
};

export const getColor = (palette: PaletteInterface) => (
  color: string,
  opacity = 1,
) => {
  const paletteColor = palette[color];

  if (!paletteColor) {
    throw new Error(`Color ${color} does not exist in color scheme`);
  }

  return `rgb(${paletteColor}, ${opacity})`;
};

export const getColorScheme = (palette: PaletteInterface) => (
  scheme: string
) => (op1 = 1, op2 = 1) => {
  const [main, secondary] = scheme.split("-");

  return {
    inner: getColor(palette)(main, op1),
    outer: getColor(palette)(secondary, op2),
  };
};

export const getStarColorScheme = getColorScheme(starPalette);
export const getCosmosColor = getColor(cosmosPalette);

export const stars = [
  {
    name: "small",
    total: 5000,
    maxSize: 2,
    brightChance: 0.5,
    schemes: [
      { value: "white-white", chance: 1 },
      { value: "white-blue", chance: 0.1 },
    ],
  },
  {
    name: "medium",
    total: 100,
    maxSize: 5,
    brightChance: 0.7,
    schemes: [
      { value: "white-blue", chance: 1 },
      { value: "yellow-red", chance: 0.5 },
    ],
  },
  {
    name: "large",
    total: 10,
    maxSize: 8,
    brightChance: 0.9,
    schemes: [
      { value: "white-blue", chance: 1 },
      { value: "yellow-blue", chance: 0.2 },
    ],
  },
];
