import { getCosmosColor } from "./canvas-options";

function drawCosmos(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  xCenter: number,
  yCenter: number
): void {
  const gradient = ctx.createRadialGradient(
    xCenter,
    yCenter,
    0,
    xCenter,
    yCenter,
    h - 150
  );
  gradient.addColorStop(0, getCosmosColor("deep-light"));
  gradient.addColorStop(0.7, getCosmosColor("deep-dark"));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
}

export default drawCosmos;
