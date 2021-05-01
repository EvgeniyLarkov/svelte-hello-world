function drawCosmos(ctx: CanvasRenderingContext2D, vw: number, vh: number): void {
    const cosmosPalette = {
        "deep-dark": "#181923",
        "deep-light": "#5f575d",
    };

    const gradient = ctx.createRadialGradient(vw/2, vh/2, 0, vw/2, vh/2, vh-100);
    gradient.addColorStop(0, cosmosPalette["deep-light"]);
    gradient.addColorStop(0.7, cosmosPalette["deep-dark"]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, vw, vh);
}

export default drawCosmos;
