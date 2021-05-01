import { getStarColorScheme } from "./canvas-options";

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  brightiness: number,
  color: string
): void {
  const starColors = getStarColorScheme(color)(brightiness, brightiness - 0.5);

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
