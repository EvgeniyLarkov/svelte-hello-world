<script lang="ts">
  import { onMount } from "svelte";
import drawAtmosphere from "./canvas-atmosphere";
  import drawCosmos from "./canvas-background";
  import { stars } from "./canvas-options";
  import drawStar from "./canvas-stars";

  let background: HTMLCanvasElement;
  let forefront: HTMLCanvasElement;
  let secondfront: HTMLCanvasElement;
  let thirdfront: HTMLCanvasElement;
  let atmosphere: HTMLCanvasElement;

  export let width: number;
  export let minHeight: number;

  const atmosphereHeight = 200;
  const height = minHeight + atmosphereHeight;

  const handleParallax = (): void => {
    const position = window.pageYOffset;
    const bgPosition = background.getBoundingClientRect().top;
    if (bgPosition <= 0) {
      forefront.style.top = `-${position * 0.6}px`;
      secondfront.style.top = `-${position * 0.4}px`;
      thirdfront.style.top = `-${position * 0.2}px`;
    }
  };

  function getRndmNum(from: number, to: number) {
    const rand = from + Math.random() * (to + 1 - from);
    return Math.floor(rand);
  }

  onMount(() => {
    const ctxBackground = background.getContext("2d");
    const ctxForefront = forefront.getContext("2d");
    const ctxSecondfront = secondfront.getContext("2d");
    const ctxThirdfront = thirdfront.getContext("2d");
    const ctxAtmosphere = atmosphere.getContext("2d");

    let frame = requestAnimationFrame(loop);

    drawCosmos(ctxBackground, width, height, width / 2, height / 2);
    drawAtmosphere(ctxAtmosphere, width, atmosphereHeight);

    document.addEventListener("scroll", handleParallax);

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

          const x = getRndmNum(0, width);
          const y = getRndmNum(0, height);
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
      document.removeEventListener("scroll", handleParallax);
      cancelAnimationFrame(frame);
    };
  });
</script>

<div class="cosmos" style={`width: ${width}px, height: ${height}px`}>
  <canvas bind:this={background} {width} {height} class="cosmos-background" />
  <canvas bind:this={forefront} {width} {height} class="cosmos-forefront" />
  <canvas bind:this={secondfront} {width} {height} class="cosmos-secondfront" />
  <canvas bind:this={thirdfront} {width} {height} class="cosmos-thirdfront" />
  <canvas bind:this={atmosphere} {width} height={atmosphereHeight} class="cosmos-atmosphere" />
</div>

<style>
  .cosmos {
    position: relative;
    overflow: hidden;
  }

  .cosmos-forefront,
  .cosmos-secondfront,
  .cosmos-thirdfront,
  .cosmos-atmosphere {
    position: absolute;
  }

  .cosmos-atmosphere {
    bottom: 0;
  }
</style>
