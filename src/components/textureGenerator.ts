import * as THREE from 'three';

/**
 * Procedurally generates a waffle/biscuit texture using HTML5 Canvas.
 * Returns a CanvasTexture with SRGBColorSpace and maximum anisotropy.
 */
export function createBiscuitWaferTexture(baseColorHex: string, grainColorHex: string): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // 1. Base baked biscuit gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, size);
  bgGrad.addColorStop(0, baseColorHex);
  bgGrad.addColorStop(0.7, grainColorHex);
  bgGrad.addColorStop(1, baseColorHex);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. Baked crumb grain noise
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 32;
    data[i] = Math.min(255, Math.max(0, data[i] + grain));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grain));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grain));
  }
  ctx.putImageData(imageData, 0, 0);

  // 3. Waffle diamond grid (crisp embossed wafer pattern)
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = grainColorHex;
  const step = 26;

  ctx.save();
  ctx.globalAlpha = 0.38;

  // Diagonal 1 (45 deg)
  for (let x = -size; x < size * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + size, size);
    ctx.stroke();
  }

  // Diagonal 2 (-45 deg)
  for (let x = -size; x < size * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, size);
    ctx.lineTo(x + size, 0);
    ctx.stroke();
  }

  // Subtle waffle indent shadow dots
  ctx.fillStyle = grainColorHex;
  ctx.globalAlpha = 0.28;
  for (let y = step / 2; y < size; y += step) {
    for (let x = step / 2; x < size; x += step) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Creates normal/bump map for wafer roughness.
 */
export function createBiscuitBumpTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Embossed lines
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 3;
  const step = 26;

  for (let x = -size; x < size * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + size, size);
    ctx.stroke();
  }
  for (let x = -size; x < size * 2; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, size);
    ctx.lineTo(x + size, 0);
    ctx.stroke();
  }

  // Baked speckles
  for (let i = 0; i < 500; i++) {
    const px = Math.random() * size;
    const py = Math.random() * size;
    ctx.fillStyle = Math.random() > 0.5 ? '#e8e8e8' : '#303030';
    ctx.fillRect(px, py, 2.5, 2.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 3);
  return texture;
}

export type DrinkTextureType = 'latte' | 'chai' | 'espresso' | 'affogato' | 'empty';

/**
 * Procedurally draws beautiful coffee, chai, latte art or affogato foam disk.
 */
export function createLatteArtTexture(type: DrinkTextureType): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const center = size / 2;

  if (type === 'empty') {
    ctx.fillStyle = '#C29A64';
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  if (type === 'latte') {
    // Rich espresso crema ring with white microfoam heart in center
    const grad = ctx.createRadialGradient(center, center, 20, center, center, center);
    grad.addColorStop(0, '#EAD6B8');
    grad.addColorStop(0.5, '#C49158');
    grad.addColorStop(0.85, '#7B4A21');
    grad.addColorStop(1, '#4A280F');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Delicate heart latte art
    ctx.save();
    ctx.translate(center, center - 10);
    ctx.fillStyle = '#FFF9F0';
    ctx.shadowColor = 'rgba(74, 40, 15, 0.4)';
    ctx.shadowBlur = 10;

    // Heart shape
    ctx.beginPath();
    ctx.moveTo(0, 50);
    ctx.bezierCurveTo(-60, 0, -80, -60, -30, -90);
    ctx.bezierCurveTo(0, -90, 0, -50, 0, -40);
    ctx.bezierCurveTo(0, -50, 0, -90, 30, -90);
    ctx.bezierCurveTo(80, -60, 60, 0, 0, 50);
    ctx.fill();

    // Central feather draw line
    ctx.beginPath();
    ctx.moveTo(0, -110);
    ctx.lineTo(0, 75);
    ctx.strokeStyle = '#965D28';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  } else if (type === 'chai') {
    // Warm Indian Kadak Chai with creamy spiced cardamom froth
    const grad = ctx.createRadialGradient(center, center, 10, center, center, center);
    grad.addColorStop(0, '#D8A46E');
    grad.addColorStop(0.7, '#A56A38');
    grad.addColorStop(1, '#6E3E18');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Chai froth bubbles & cardamom sprinkles
    ctx.fillStyle = '#F4E4D3';
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (center - 25);
      const bx = center + Math.cos(angle) * radius;
      const by = center + Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.arc(bx, by, Math.random() * 3.5 + 1, 0, Math.PI * 2);
      ctx.fill();
    }
    // Crushed cardamom green & black spice speckles
    ctx.fillStyle = '#3E2510';
    for (let i = 0; i < 50; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (center - 35);
      ctx.fillRect(center + Math.cos(angle) * radius, center + Math.sin(angle) * radius, 2.5, 2.5);
    }
  } else if (type === 'affogato') {
    // Espresso base with melting vanilla ice cream swirl and cocoa dust
    const grad = ctx.createRadialGradient(center, center, 10, center, center, center);
    grad.addColorStop(0, '#FFF5EA');
    grad.addColorStop(0.4, '#F5DEB3');
    grad.addColorStop(0.75, '#63381B');
    grad.addColorStop(1, '#3A1E0C');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Cocoa powder dusting
    ctx.fillStyle = '#381B09';
    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (center - 30);
      ctx.fillRect(center + Math.cos(angle) * radius, center + Math.sin(angle) * radius, 1.8, 1.8);
    }
  } else {
    // Espresso shot with thick golden crema
    const grad = ctx.createRadialGradient(center, center, 10, center, center, center);
    grad.addColorStop(0, '#B87B38');
    grad.addColorStop(0.5, '#844D1C');
    grad.addColorStop(0.9, '#48240B');
    grad.addColorStop(1, '#2B1405');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
