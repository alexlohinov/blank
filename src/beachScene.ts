// An original coastal landscape, painted as a grid of small, separated squares.
const noise = (x: number, y: number) => {
  let value = Math.imul(x + 17, 374761393) + Math.imul(y + 31, 668265263);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
};

export function createBeachScene(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  if (!context) return null;
  const backdrop = document.createElement('canvas');
  const background = backdrop.getContext('2d')!;
  let width = 0;
  let height = 0;
  let step = 5;
  let dark = false;
  let palette = { sea: '', deep: '', foam: '', sand: '', grass: '', sun: '', cloud: '' };
  const shore = (x: number) => height * (0.69 + 0.1 * x + 0.028 * Math.sin(x * 9));
  const dune = (x: number) => height * (0.97 - 0.19 * Math.exp(-(((x - 0.08) / 0.17) ** 2)) - 0.12 * Math.exp(-(((x - 0.95) / 0.16) ** 2)));
  const dot = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, opacity: number) => {
    ctx.fillStyle = color;
    ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
    ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(step * 0.65), Math.ceil(step * 0.65));
  };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    palette = dark
      ? { sea: '#708d91', deep: '#54777e', foam: '#b2c8c5', sand: '#aaa18a', grass: '#859783', sun: '#c9c7ad', cloud: '#889b9f' }
      : { sea: '#7e9c9e', deep: '#60878c', foam: '#c7d5cb', sand: '#c3b99b', grass: '#788775', sun: '#d0bb83', cloud: '#b3c1c2' };
    step = width < 600 ? 4 : 5;
    for (const target of [canvas, backdrop]) {
      target.width = Math.round(width * ratio);
      target.height = Math.round(height * ratio);
      target.getContext('2d')!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    background.clearRect(0, 0, width, height);

    const sunX = width * 0.73;
    const sunY = height * 0.22;
    const sunRadius = height * 0.072;
    for (let y = 0, row = 0; y < height; y += step, row++) {
      for (let x = 0, column = 0; x < width; x += step, column++) {
        const n = noise(column, row);
        const u = x / width;
        const distance = Math.hypot(x - sunX, y - sunY) / sunRadius;
        if (distance < 1.25 && n > Math.max(0, distance - 0.78) * 2) {
          dot(background, x, y, palette.sun, (0.28 + n * 0.28) * Math.min(1, (1.25 - distance) * 3));
        }
        // Soft clouds dissolve into the page background rather than a sky box.
        const cloud = Math.exp(-(((u - 0.25) / 0.16) ** 2) - ((y / height - 0.21) / 0.04) ** 2)
          + Math.exp(-(((u - 0.43) / 0.09) ** 2) - ((y / height - 0.16) / 0.025) ** 2);
        if (n < cloud * 0.7) dot(background, x, y, palette.cloud, cloud * (0.1 + n * 0.18));
        if (y > shore(u) - 12 && n > 0.12) {
          dot(background, x, y, palette.sand, (0.24 + n * 0.36) * Math.min(1, (y - shore(u) + 12) / 24));
        }
      }
    }
    background.globalAlpha = 1;
  }

  function draw(time: number) {
    if (!context || !width || !height) return;
    context.clearRect(0, 0, width, height);
    context.globalAlpha = 1;
    context.drawImage(backdrop, 0, 0, width, height);
    const horizon = height * 0.4;
    for (let x = 0, column = 0; x < width; x += step, column++) {
      const u = x / width;
      const tide = shore(u) + Math.sin(time * 0.58 + u * 6) * 5 + Math.sin(time * 0.32) * 3;
      const bend = Math.sin(u * 13 + time * 0.15) * 2.5;
      for (let y = Math.floor(horizon / step) * step, row = Math.floor(horizon / step); y < tide + 8; y += step, row++) {
        const n = noise(column, row);
        if (n < 0.09) continue;
        const depth = (y - horizon) / (tide - horizon);
        const fade = Math.min(1, Math.max(0, depth * 5));
        const crest = Math.sin((y - horizon) * 0.12 + bend - time * 0.85);
        const foam = y > tide - 7;
        const ripple = crest > 0.91 && n > 0.35;
        const reflection = Math.max(0, 1 - Math.abs(u - 0.73 + Math.sin(y * 0.08) * 0.014) / (0.018 + depth * 0.045));
        const glint = reflection > 0 && Math.sin(y * 0.52 + time * 0.7) > 0.2 && n > 0.55;
        if (y > tide && n < 0.48) continue;
        dot(context, x, y, foam || ripple ? palette.foam : glint ? palette.sun : n > 0.7 ? palette.deep : palette.sea,
          fade * (foam ? 0.65 : ripple ? 0.42 : 0.2 + n * 0.45));
      }
      // Foreground dunes give the water a gently curving, irregular silhouette.
      for (let y = Math.floor(dune(u) / step) * step; y < height; y += step) {
        const row = Math.round(y / step);
        const n = noise(column + 180, row);
        if (n > 0.16) dot(context, x, y, n > 0.8 ? palette.grass : palette.sand, 0.3 + n * 0.36);
      }
    }

    // Sparse beach grass at the edges. Tips sway by less than one grid cell.
    for (const position of [0.025, 0.07, 0.11, 0.17, 0.88, 0.94, 0.975]) {
      const baseX = Math.round(width * position / step) * step;
      const baseY = Math.round((dune(position) + height * 0.075) / step) * step;
      for (let blade = -2; blade <= 2; blade++) {
        const length = 5 + Math.floor(noise(Math.round(position * 1000), blade + 2) * 5);
        for (let segment = 0; segment < length; segment++) {
          const wind = Math.sin(time * 0.6 + position * 8) * (segment / length) ** 2;
          const x = baseX + (blade * segment * 0.24 + wind) * step;
          const y = baseY - segment * step;
          dot(context, Math.round(x / step) * step, y, palette.grass, 0.55 - segment * 0.028);
        }
      }
    }

    // Two distant gulls, drawn in the same grid as the landscape.
    for (let bird = 0; bird < 2; bird++) {
      const birdX = (width * (0.43 + bird * 0.09) + Math.sin(time * 0.12 + bird) * 12);
      const birdY = height * (0.27 + bird * 0.05) + Math.sin(time * 0.45 + bird) * 2;
      for (let wing = -2; wing <= 2; wing++) {
        dot(context, Math.round(birdX / step) * step + wing * step, Math.round(birdY / step) * step - Math.abs(wing) * step * 0.5, palette.deep, dark ? 0.45 : 0.4);
      }
    }
    context.globalAlpha = 1;
  }

  return { resize, draw };
}
