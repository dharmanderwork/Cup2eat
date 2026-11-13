import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FlavorData, CUP_FLAVORS } from '../utils/flavors';
import {
  createBiscuitWaferTexture,
  createBiscuitBumpTexture,
} from './textureGenerator';
import { playCrunchSound, playChimeSound } from '../utils/sound';
import { Sparkles, RotateCcw, Volume2, VolumeX, ArrowDown } from 'lucide-react';

interface HeroBittenCupViewerProps {
  currentFlavor: FlavorData;
  onExplore3DStudio: () => void;
}

export const HeroBittenCupViewer: React.FC<HeroBittenCupViewerProps> = ({
  currentFlavor,
  onExplore3DStudio,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [biteCount, setBiteCount] = useState<number>(1);
  const [isCrunching, setIsCrunching] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cupGroupRef = useRef<THREE.Group | null>(null);
  const outerMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const crumbsGroupRef = useRef<THREE.Group | null>(null);
  const burstParticlesRef = useRef<THREE.Points | null>(null);

  // Trigger interactive crunch bite
  const handleTakeBite = useCallback(() => {
    setIsCrunching(true);
    setBiteCount((b) => (b % 3) + 1);
    playCrunchSound(isMuted, 0.35);

    // Animate burst crumbs
    if (burstParticlesRef.current) {
      burstParticlesRef.current.visible = true;
      const positions = burstParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = 0.36 + (Math.random() - 0.5) * 0.45;
        positions[i + 1] = 1.55 + (Math.random() - 0.5) * 0.45;
        positions[i + 2] = 1.05 + (Math.random() - 0.5) * 0.45;
      }
      burstParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    setTimeout(() => {
      setIsCrunching(false);
    }, 600);
  }, [isMuted]);

  const handleResetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    cameraRef.current.position.set(0.6, 1.4, 4.8);
    controlsRef.current.target.set(0, 0.85, 0);
    controlsRef.current.update();
    playChimeSound(600, isMuted);
  }, [isMuted]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Detect software WebGL to adapt quality
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl');
    const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = (debugInfo && gl?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)) || '';
    const isSoftwareGl = /swiftshader|llvmpipe|software/i.test(rendererStr);

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0.6, 1.4, 4.8);
    cameraRef.current = camera;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.85, 0);
    controls.minDistance = 2.4;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controlsRef.current = controls;

    // 5. Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xfff7ea, 2.5);
    keyLight.position.set(3.5, 4.5, 3.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0f8, 1.2);
    fillLight.position.set(-3.5, 2.5, -2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe6c687, 1.8);
    rimLight.position.set(0, 4.0, -3.8);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd0c4b2, 0.9);
    scene.add(hemiLight);

    // 6. Ground Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(24, 18, 12, 0.45)');
    grad.addColorStop(0.4, 'rgba(24, 18, 12, 0.2)');
    grad.addColorStop(0.8, 'rgba(24, 18, 12, 0.05)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // 7. Assemble the BITTEN CUP Group
    const cupGroup = new THREE.Group();
    cupGroup.scale.set(0.80, 0.80, 0.80);
    cupGroup.position.set(0, -0.15, 0);
    cupGroupRef.current = cupGroup;
    scene.add(cupGroup);

    // Textures
    const waferTexture = createBiscuitWaferTexture(currentFlavor.colorHex, currentFlavor.secondaryColorHex);
    const bumpTexture = createBiscuitBumpTexture();

    // Material: Outer Wafer
    const outerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.colorHex),
      map: waferTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.03,
      roughness: 0.88,
      metalness: 0.04,
    });
    outerMatRef.current = outerMat;

    // Cup dimensions
    const cupHeight = 2.1;
    const topRadius = 1.15;
    const bottomRadius = 0.82;
    const cupCenterY = cupHeight / 2 + 0.08;

    // Construct Outer Cylinder with custom BITE deformation!
    const outerGeo = new THREE.CylinderGeometry(
      topRadius,
      bottomRadius,
      cupHeight,
      64,
      32,
      true
    );

    // Apply scalloped bite deformation to vertices
    const posAttr = outerGeo.attributes.position;
    const biteCenterAngle = 1.25; // Directly facing front-right camera
    const biteAngularWidth = 0.68; // Wide generous bite
    const biteDepth = 0.62; // Deep satisfying bite indentation

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);

      const angle = Math.atan2(vz, vx);
      let angleDiff = angle - biteCenterAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      if (Math.abs(angleDiff) < biteAngularWidth) {
        const normDist = angleDiff / biteAngularWidth;
        const biteCurve = Math.cos(normDist * Math.PI * 0.5); // 0 at edges, 1 at center
        // Double tooth scallops and jagged wafer fracture
        const toothSerration = Math.sin(normDist * Math.PI * 3.5) * 0.055;

        // Apply deformation primarily to upper half of the cup
        const heightRatio = Math.max(0, (vy - -0.15) / (cupHeight * 0.5 - -0.15));
        if (heightRatio > 0) {
          const dropY = (biteDepth * biteCurve + toothSerration) * Math.pow(heightRatio, 1.3);
          posAttr.setY(i, vy - dropY);

          // Add slight inward wafer tooth indentation
          const indent = Math.sin(normDist * Math.PI * 2) * 0.025 * heightRatio;
          posAttr.setX(i, vx * (1 - indent));
          posAttr.setZ(i, vz * (1 - indent));
        }
      }
    }
    outerGeo.computeVertexNormals();

    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.position.y = cupCenterY;
    cupGroup.add(outerMesh);

    // Inner Food-Grade Glaze Lining with matching bite deformation
    const innerGeo = new THREE.CylinderGeometry(
      topRadius - 0.045,
      bottomRadius - 0.045,
      cupHeight - 0.04,
      64,
      32,
      true
    );
    const innerPosAttr = innerGeo.attributes.position;
    for (let i = 0; i < innerPosAttr.count; i++) {
      const vx = innerPosAttr.getX(i);
      const vy = innerPosAttr.getY(i);
      const vz = innerPosAttr.getZ(i);

      const angle = Math.atan2(vz, vx);
      let angleDiff = angle - biteCenterAngle;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      if (Math.abs(angleDiff) < biteAngularWidth) {
        const normDist = angleDiff / biteAngularWidth;
        const biteCurve = Math.cos(normDist * Math.PI * 0.5);
        const toothSerration = Math.sin(normDist * Math.PI * 3.5) * 0.055;

        const heightRatio = Math.max(0, (vy - -0.15) / (cupHeight * 0.5 - -0.15));
        if (heightRatio > 0) {
          const dropY = (biteDepth * biteCurve + toothSerration) * Math.pow(heightRatio, 1.3);
          innerPosAttr.setY(i, vy - dropY);
        }
      }
    }
    innerGeo.computeVertexNormals();

    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xfffaef,
      roughness: 0.35,
      metalness: 0.08,
      side: THREE.BackSide,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.position.y = cupCenterY;
    cupGroup.add(innerMesh);

    // Solid Cup Base
    const baseGeo = new THREE.CylinderGeometry(
      bottomRadius - 0.02,
      bottomRadius,
      0.1,
      48
    );
    const baseMesh = new THREE.Mesh(baseGeo, outerMat);
    baseMesh.position.y = 0.09;
    cupGroup.add(baseMesh);

    // Cup Inner Floor
    const floorGeo = new THREE.CircleGeometry(bottomRadius - 0.05, 48);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xf5efe6,
      roughness: 0.4,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0.16;
    cupGroup.add(floorMesh);

    // 8. Floating Crispy Crumb Particles near the Bite Mark
    const crumbsGroup = new THREE.Group();
    crumbsGroupRef.current = crumbsGroup;
    cupGroup.add(crumbsGroup);

    const crumbGeo = new THREE.DodecahedronGeometry(0.025, 0);
    const crumbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.colorHex),
      roughness: 0.9,
    });

    // Seed 14 realistic crumbs hovering and clinging around the bitten rim
    for (let c = 0; c < 14; c++) {
      const crumb = new THREE.Mesh(crumbGeo, crumbMat);
      const angle = biteCenterAngle + (Math.random() - 0.5) * biteAngularWidth * 1.5;
      const r = topRadius + (Math.random() - 0.5) * 0.12;
      const y = cupCenterY + cupHeight * 0.5 - Math.random() * biteDepth * 1.2;

      crumb.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
      crumb.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const s = 0.6 + Math.random() * 0.8;
      crumb.scale.set(s, s, s);
      crumbsGroup.add(crumb);
    }

    // 9. Dynamic Bite Burst Particles (for click crunch feedback)
    const burstCount = 40;
    const burstGeo = new THREE.BufferGeometry();
    const burstPos = new Float32Array(burstCount * 3);
    for (let i = 0; i < burstCount * 3; i += 3) {
      burstPos[i] = Math.cos(biteCenterAngle) * topRadius + (Math.random() - 0.5) * 0.35;
      burstPos[i + 1] = cupCenterY + cupHeight * 0.5 - biteDepth * 0.5 + (Math.random() - 0.5) * 0.35;
      burstPos[i + 2] = Math.sin(biteCenterAngle) * topRadius + (Math.random() - 0.5) * 0.35;
    }
    burstGeo.setAttribute('position', new THREE.BufferAttribute(burstPos, 3));
    const burstMat = new THREE.PointsMaterial({
      color: new THREE.Color(currentFlavor.secondaryColorHex),
      size: 0.045,
      transparent: true,
      opacity: 0.85,
    });
    const burstPoints = new THREE.Points(burstGeo, burstMat);
    burstPoints.visible = false;
    burstParticlesRef.current = burstPoints;
    cupGroup.add(burstPoints);

    // Initial Cup orientation: Face the bite mark front-center
    cupGroup.rotation.y = -0.2;

    // 10. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const nowTime = performance.now();
      const delta = (nowTime - lastTime) / 1000;
      lastTime = nowTime;

      // Smooth idle hovering and gentle rotation
      if (cupGroupRef.current) {
        cupGroupRef.current.position.y = -0.05 + Math.sin(nowTime * 0.0018) * 0.045;
        cupGroupRef.current.rotation.y += delta * 0.28;
      }

      // Animate crumbs gentle flutter
      if (crumbsGroupRef.current) {
        crumbsGroupRef.current.children.forEach((crumb, idx) => {
          crumb.rotation.x += delta * (0.4 + idx * 0.05);
          crumb.rotation.y += delta * (0.3 + idx * 0.03);
        });
      }

      // Update OrbitControls
      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [currentFlavor]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        onClick={handleTakeBite}
        title="Click on the cup to take a crispy bite! Drag to rotate 360°"
        className="w-full h-full cursor-grab active:cursor-grabbing focus:outline-none"
      />

      {/* Top Floating Badge Strip */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#DFD6CA] shadow-2xs pointer-events-auto">
          <span className="text-xs font-bold text-[#0e382b]">Crispy Wafer Bite</span>
          <span className="text-[#8B7E6B]">·</span>
          <span className="text-[11px] text-[#5C6660]">Eat Your Drink!</span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#DFD6CA] flex items-center justify-center text-[#556057] hover:text-[#0e382b] transition-colors shadow-2xs"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleResetCamera}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#DFD6CA] flex items-center justify-center text-[#556057] hover:text-[#0e382b] transition-colors shadow-2xs"
            title="Reset view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Interactive Callouts */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Crunch Bite Action Button */}
        <button
          onClick={handleTakeBite}
          className="pointer-events-auto w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0e382b] hover:bg-[#154a3a] text-[#E6C687] text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 border border-[#0e382b]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Crunch Another Bite!</span>
          {isCrunching && <span className="animate-ping text-[10px]">🍪</span>}
        </button>

        {/* Explore Full 3D Studio Section Button */}
        <button
          onClick={onExplore3DStudio}
          className="pointer-events-auto inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/90 backdrop-blur-md hover:bg-white text-[#0e382b] text-xs font-bold rounded-xl border border-[#DFD6CA] shadow-2xs transition-all"
        >
          <span>Open Full 3D Studio Lab</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
