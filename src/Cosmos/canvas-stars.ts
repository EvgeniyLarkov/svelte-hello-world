const starPalette = {
  "star-white": "253, 255, 240",
  "star-yellow": "248, 243, 98",
  "star-blue": "10, 104, 255",
  "star-red": "250, 186, 186",
};

const starColorScheme = {
  "white-white": (op1: number, op2: number) => ({
    inner: `rgb(${starPalette["star-white"]}, ${op1})`,
    outer: `rgb(${starPalette["star-white"]}, ${op2})`,
  }),
  "blue-blue": (op1: number, op2: number) => ({
    inner: `rgb(${starPalette["star-blue"]}, ${op1})`,
    outer: `rgb(${starPalette["star-blue"]}, ${op2})`,
  }),
  "white-blue": (op1: number, op2: number) => ({
    inner: `rgb(${starPalette["star-white"]}, ${op1})`,
    outer: `rgb(${starPalette["star-blue"]}, ${op2})`,
  }),
  "yellow-blue": (op1: number, op2: number) => ({
    inner: `rgb(${starPalette["star-yellow"]}, ${op1})`,
    outer: `rgb(${starPalette["star-blue"]}, ${op2})`,
  }),
  "yellow-red": (op1: number, op2: number) => ({
    inner: `rgb(${starPalette["star-yellow"]}, ${op1})`,
    outer: `rgb(${starPalette["star-red"]}, ${op2})`,
  }),
};

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  brightiness: number,
  color: keyof typeof starColorScheme
): void {
  const starColors = starColorScheme[color](brightiness, brightiness - 0.5);

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
  gradient.addColorStop(0, starColors.inner);
  gradient.addColorStop(1, "rgb(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

export default drawStar;
