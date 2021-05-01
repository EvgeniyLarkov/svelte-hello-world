import { getCosmosColor } from "./canvas-options";

function drawAtmosphere(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const X = width / 2;
    const Y = height * 30;
    const innerR = Y;
    const outerR = Y - height / 1.5;
    
    const gradient = ctx.createRadialGradient(X, Y, innerR, X, Y, outerR);
    gradient.addColorStop(0.1, 'rgb(0, 0, 0, 0)');
    gradient.addColorStop(0.9, getCosmosColor('atmosphere-light', 0.6));
    gradient.addColorStop(1, 'white');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

export default drawAtmosphere;