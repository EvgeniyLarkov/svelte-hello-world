<script lang="ts">
  import { onMount } from "svelte";
  import drawCosmos from "./canvas-background";
  import drawStar from "./canvas-stars";
  const stars = [
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

  let background: HTMLCanvasElement;
  let forefront: HTMLCanvasElement;
  let secondfront: HTMLCanvasElement;
  let thirdfront: HTMLCanvasElement;

  const vw = {
    width: window.innerWidth,
    height: window.window.innerHeight,
  };

  const handleParallax = ():void => {
    const position = window.pageYOffset;
    forefront.style.top = `-${position*0.6}px`;
    secondfront.style.top = `-${position*0.4}px`;
    thirdfront.style.top = `-${position*0.2}px`;
  }

  function getRndmNum(from: number, to: number) {
    const rand = from + Math.random() * (to + 1 - from);
    return Math.floor(rand);
  }

  onMount(() => {
    const ctxBackground = background.getContext("2d");
    const ctxForefront = forefront.getContext("2d");
    const ctxSecondfront = secondfront.getContext("2d");
    const ctxThirdfront = thirdfront.getContext("2d");

    let frame = requestAnimationFrame(loop);

    drawCosmos(ctxBackground, vw.width, vw.height);

    document.addEventListener('scroll', handleParallax);

    function loop() {
      stars.forEach((cfg) => {
        for (let i = 0; i < cfg.total; i++) {
          const brightiness = Math.random() > cfg.brightChance ? 0.3 : 0.95;

          const starColorChance = Math.random();
          let starSchemeColor;
          cfg.schemes.forEach((scheme) => {
            if (starColorChance < scheme.chance) {
              starSchemeColor = scheme.value;
            }
          });

          const x = getRndmNum(0, vw.width);
          const y = getRndmNum(0, vw.height);
          const size =
            cfg.maxSize === 1
              ? cfg.maxSize
              : getRndmNum(cfg.maxSize / 2, cfg.maxSize);

          const starPlaceChance = Math.random();
          if (starPlaceChance < 0.3) {
            drawStar(ctxForefront, x, y, size, brightiness, starSchemeColor);
          } else if (starPlaceChance < 0.6) {
            drawStar(ctxSecondfront, x, y, size, brightiness, starSchemeColor);
          } else {
            drawStar(ctxThirdfront, x, y, size, brightiness, starSchemeColor);
          }
        }
      });
    }

    return () => {
      document.removeEventListener('scroll', handleParallax);
      cancelAnimationFrame(frame);
    };
  });
</script>

<canvas bind:this={background} width={vw.width} height={vw.height} />
<canvas bind:this={forefront} width={vw.width} height={vw.height} />
<canvas bind:this={secondfront} width={vw.width} height={vw.height} />
<canvas bind:this={thirdfront} width={vw.width} height={vw.height} />

<style>
  canvas {
    position: absolute;
  }
</style>
