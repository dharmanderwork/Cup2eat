import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FlavorData } from '../utils/flavors';
import { createBiscuitWaferTexture, createBiscuitBumpTexture, createLatteArtTexture } from './textureGenerator';

interface MiniCupViewerProps {
  flavor: FlavorData;
  className?: string;
  autoRotateSpeed?: number;
}

export const MiniCupViewer: React.FC<MiniCupViewerProps> = ({
  flavor,
  className = '',
  autoRotateSpeed = 0.6,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 200;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 20);
    camera.position.set(0, 1.1, 4.4);
    camera.lookAt(0, 0.8, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.appendChild(renderer.domElement);

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.2);
    keyLight.position.set(2.5, 3.5, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0f8, 1.0);
    fillLight.position.set(-2.5, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.3);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd0c4b2, 0.8);
    scene.add(hemiLight);

    // Cup Group
    const cupGroup = new THREE.Group();
    cupGroup.scale.set(0.78, 0.78, 0.78);
    cupGroup.position.set(0, -0.05, 0);
    scene.add(cupGroup);

    // Procedural Wafer Material for this flavour
    const waferTexture = createBiscuitWaferTexture(flavor.colorHex, flavor.secondaryColorHex);
    const bumpTexture = createBiscuitBumpTexture();

    const outerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(flavor.colorHex),
      map: waferTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.02,
      roughness: 0.85,
      metalness: 0.05,
    });

    const cupHeight = 2.0;
    const topRadius = 1.15;
    const bottomRadius = 0.82;

    const outerGeo = new THREE.CylinderGeometry(
      topRadius,
      bottomRadius,
      cupHeight,
      36,
      8,
      true
    );
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.position.y = cupHeight / 2 + 0.08;
    cupGroup.add(outerMesh);

    // Inner lining
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(flavor.colorHex).lerp(new THREE.Color('#FFF8F0'), 0.25),
      roughness: 0.25,
      side: THREE.BackSide,
    });
    const innerGeo = new THREE.CylinderGeometry(
      topRadius - 0.06,
      bottomRadius - 0.06,
      cupHeight - 0.04,
      36,
      8,
      true
    );
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.position.y = cupHeight / 2 + 0.08;
    cupGroup.add(innerMesh);

    // Rim Bevel
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(flavor.rimColorHex),
      roughness: 0.45,
    });
    const rimGeo = new THREE.TorusGeometry(topRadius - 0.03, 0.06, 12, 36);
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = cupHeight + 0.08;
    cupGroup.add(rimMesh);

    // Base
    const bottomGeo = new THREE.CylinderGeometry(bottomRadius, bottomRadius, 0.1, 36);
    const bottomMesh = new THREE.Mesh(bottomGeo, outerMat);
    bottomMesh.position.y = 0.05;
    cupGroup.add(bottomMesh);

    // Beverage Top (custom per flavour)
    const drinkTexture = createLatteArtTexture(
      flavor.id === 'elaichi' ? 'chai' : flavor.id === 'chocolate' ? 'espresso' : 'latte'
    );
    const beverageMat = new THREE.MeshStandardMaterial({
      map: drinkTexture,
      roughness: 0.2,
    });
    const beverageGeo = new THREE.CylinderGeometry(topRadius - 0.08, topRadius - 0.08, 0.02, 36);
    const beverageMesh = new THREE.Mesh(beverageGeo, beverageMat);
    beverageMesh.position.y = cupHeight - 0.16;
    cupGroup.add(beverageMesh);

    // Chocolate Coated Rim if applicable
    if (flavor.id === 'chocolate_coated') {
      const chocoDipMat = new THREE.MeshStandardMaterial({
        color: 0x221108,
        roughness: 0.15,
        metalness: 0.12,
      });
      const chocoRimGeo = new THREE.TorusGeometry(topRadius - 0.02, 0.085, 12, 36);
      const chocoRim = new THREE.Mesh(chocoRimGeo, chocoDipMat);
      chocoRim.rotation.x = Math.PI / 2;
      chocoRim.position.y = cupHeight + 0.08;
      cupGroup.add(chocoRim);

      const chocoBandGeo = new THREE.CylinderGeometry(
        topRadius + 0.012,
        topRadius - 0.05,
        0.32,
        36,
        1,
        true
      );
      const chocoBand = new THREE.Mesh(chocoBandGeo, chocoDipMat);
      chocoBand.position.y = cupHeight - 0.07;
      cupGroup.add(chocoBand);
    }

    // Contact shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 5, 64, 64, 55);
    grad.addColorStop(0, 'rgba(28, 22, 16, 0.35)');
    grad.addColorStop(0.5, 'rgba(28, 22, 16, 0.15)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 3.2),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Pointer Interaction (manual spin)
    let isDragging = false;
    let prevX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      cupGroup.rotation.y += dx * 0.015;
      prevX = e.clientX;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const onMouseEnter = () => {
      isHoveredRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      isDragging = false;
    };
    dom.addEventListener('mouseenter', onMouseEnter);
    dom.addEventListener('mouseleave', onMouseLeave);

    // Animation Loop
    let frameId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isDragging) {
        const speed = isHoveredRef.current ? autoRotateSpeed * 2.2 : autoRotateSpeed;
        cupGroup.rotation.y += delta * speed;
      }

      // Gentle floating bob
      cupGroup.position.y = -0.05 + Math.sin(now * 0.002) * 0.035;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        frameId = window.setTimeout(tick, 70);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('mouseenter', onMouseEnter);
      dom.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [flavor, autoRotateSpeed]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-full min-h-[180px] cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Drag to spin this cup 360°"
    />
  );
};
