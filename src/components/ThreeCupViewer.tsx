import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CUP_FLAVORS, FlavorData } from '../utils/flavors';
import {
  createBiscuitWaferTexture,
  createBiscuitBumpTexture,
  createLatteArtTexture,
} from './textureGenerator';
import { playCrunchSound, playChimeSound } from '../utils/sound';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  Coffee,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ThreeCupViewerProps {
  currentFlavor: FlavorData;
  onFlavorChange: (flavor: FlavorData) => void;
  className?: string;
}

export type DrinkType = 'latte' | 'chai' | 'espresso' | 'affogato' | 'empty';
export type ViewAngle = 'front' | 'top' | 'crossSection' | 'bottom';

// Module-level reusable math helpers to prevent GC spikes in animation loop
const _vec3 = new THREE.Vector3();
const _targetCameraPos = new THREE.Vector3();
const _targetControlsTarget = new THREE.Vector3();

export const ThreeCupViewer: React.FC<ThreeCupViewerProps> = ({
  currentFlavor,
  onFlavorChange,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [drinkType, setDrinkType] = useState<DrinkType>('latte');
  const [viewAngle, setViewAngle] = useState<ViewAngle>('front');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isCrossSection, setIsCrossSection] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isCrunching, setIsCrunching] = useState<boolean>(false);
  const [crunchCount, setCrunchCount] = useState<number>(0);

  // References to mutable 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cupGroupRef = useRef<THREE.Group | null>(null);
  const outerMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const rimMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const innerMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const beverageMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const chocolateCoatingGroupRef = useRef<THREE.Group | null>(null);
  const crossSectionLayersRef = useRef<THREE.Group | null>(null);
  const crumbsGroupRef = useRef<THREE.Points | null>(null);
  const steamGroupRef = useRef<THREE.Points | null>(null);

  // Trigger crumb particles and audio
  const handleCrunchBite = useCallback(() => {
    setIsCrunching(true);
    setCrunchCount((c) => c + 1);
    playCrunchSound(isMuted);

    // Animate crumb particles
    if (crumbsGroupRef.current) {
      crumbsGroupRef.current.visible = true;
      const positions = crumbsGroupRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 0.8 + 0.6; // Concentrated on right bite side
        positions[i + 1] = Math.random() * 0.8 + 0.8;
        positions[i + 2] = (Math.random() - 0.5) * 0.8;
      }
      crumbsGroupRef.current.geometry.attributes.position.needsUpdate = true;
    }

    setTimeout(() => {
      setIsCrunching(false);
    }, 700);
  }, [isMuted]);

  // Set camera angle preset
  const setCameraPreset = useCallback(
    (preset: ViewAngle) => {
      setViewAngle(preset);
      playChimeSound(640, isMuted);
      if (!cameraRef.current || !controlsRef.current) return;

      if (preset === 'front') {
        setIsCrossSection(false);
        _targetCameraPos.set(0, 1.25, 5.2);
        _targetControlsTarget.set(0, 0.95, 0);
      } else if (preset === 'top') {
        setIsCrossSection(false);
        _targetCameraPos.set(0, 4.6, 0.4);
        _targetControlsTarget.set(0, 1.0, 0);
      } else if (preset === 'crossSection') {
        setIsCrossSection(true);
        _targetCameraPos.set(2.4, 1.6, 3.8);
        _targetControlsTarget.set(0, 0.95, 0);
      } else if (preset === 'bottom') {
        setIsCrossSection(false);
        _targetCameraPos.set(0, -1.8, 3.8);
        _targetControlsTarget.set(0, 0.4, 0);
      }
    },
    [isMuted]
  );

  // Initialize Three.js Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

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

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene & Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 1.25, 5.2);
    cameraRef.current = camera;
    _targetCameraPos.copy(camera.position);

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
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.set(0, 0.95, 0);
    controls.minDistance = 2.4;
    controls.maxDistance = 7.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controlsRef.current = controls;
    _targetControlsTarget.copy(controls.target);

    // 4. Lighting Rig
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.4);
    keyLight.position.set(3.5, 4.5, 3.5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 12;
      keyLight.shadow.camera.left = -2.5;
      keyLight.shadow.camera.right = 2.5;
      keyLight.shadow.camera.top = 2.5;
      keyLight.shadow.camera.bottom = -2.5;
    }
    scene.add(keyLight);

    // Cool fill light
    const fillLight = new THREE.DirectionalLight(0xe8f0f8, 1.1);
    fillLight.position.set(-3.5, 2.5, -2.5);
    scene.add(fillLight);

    // Subtle rim backlight
    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.5);
    rimLight.position.set(0, 4.0, -3.8);
    scene.add(rimLight);

    // Hemisphere light for ground warmth
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd0c4b2, 0.9);
    scene.add(hemiLight);

    // 5. Contact Shadow Plane grounded at bottom
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(28, 22, 16, 0.42)');
    grad.addColorStop(0.4, 'rgba(28, 22, 16, 0.22)');
    grad.addColorStop(0.8, 'rgba(28, 22, 16, 0.05)');
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

    // 6. Assemble Composite 3D Cup Model
    const cupGroup = new THREE.Group();
    cupGroup.scale.set(0.88, 0.88, 0.88);
    cupGroup.position.set(0, -0.05, 0);
    cupGroupRef.current = cupGroup;
    scene.add(cupGroup);

    // Procedural textures for active flavor
    const waferTexture = createBiscuitWaferTexture(currentFlavor.colorHex, currentFlavor.secondaryColorHex);
    const bumpTexture = createBiscuitBumpTexture();

    // Material 1: Outer Biscuit Wafer
    const outerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.colorHex),
      map: waferTexture,
      bumpMap: bumpTexture,
      bumpScale: 0.025,
      roughness: 0.88,
      metalness: 0.04,
    });
    outerMatRef.current = outerMat;

    // Cup dimensions (tapered conical shape)
    const cupHeight = 2.1;
    const topRadius = 1.15;
    const bottomRadius = 0.82;
    const cupCenterY = cupHeight / 2 + 0.08;

    // Outer cup shell
    const outerGeo = new THREE.CylinderGeometry(
      topRadius,
      bottomRadius,
      cupHeight,
      48,
      16,
      true
    );
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    outerMesh.position.y = cupCenterY;
    outerMesh.castShadow = !isSoftwareGl;
    outerMesh.receiveShadow = !isSoftwareGl;
    cupGroup.add(outerMesh);

    // Material 2: Inner Heat-Resistant Food Grade Glaze
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.colorHex).lerp(new THREE.Color('#FFF8F0'), 0.25),
      roughness: 0.22,
      metalness: 0.08,
      side: THREE.BackSide,
    });
    innerMatRef.current = innerMat;

    const innerGeo = new THREE.CylinderGeometry(
      topRadius - 0.07,
      bottomRadius - 0.07,
      cupHeight - 0.04,
      48,
      16,
      true
    );
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    innerMesh.position.y = cupCenterY;
    cupGroup.add(innerMesh);

    // Material 3: Rounded Rim Top Bevel
    const rimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.rimColorHex),
      roughness: 0.45,
      metalness: 0.08,
    });
    rimMatRef.current = rimMat;

    const rimGeo = new THREE.TorusGeometry(topRadius - 0.035, 0.07, 16, 48);
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = cupHeight + 0.08;
    cupGroup.add(rimMesh);

    // Bottom Base Wafer Disk
    const bottomGeo = new THREE.CylinderGeometry(bottomRadius, bottomRadius, 0.12, 48);
    const bottomMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(currentFlavor.colorHex).multiplyScalar(0.92),
      roughness: 0.9,
    });
    const bottomMesh = new THREE.Mesh(bottomGeo, bottomMat);
    bottomMesh.position.y = 0.06;
    bottomMesh.receiveShadow = !isSoftwareGl;
    cupGroup.add(bottomMesh);

    // Stamped Emblem on Cup Exterior ("CUP2EAT")
    const stampCanvas = document.createElement('canvas');
    stampCanvas.width = 512;
    stampCanvas.height = 256;
    const stampCtx = stampCanvas.getContext('2d')!;
    stampCtx.fillStyle = 'rgba(0,0,0,0)';
    stampCtx.fillRect(0, 0, 512, 256);
    // Debossed gold/caramel text
    stampCtx.font = 'bold 54px Outfit, sans-serif';
    stampCtx.textAlign = 'center';
    stampCtx.fillStyle = 'rgba(40, 22, 10, 0.55)';
    stampCtx.fillText('CUP 2 EAT', 256, 110);
    stampCtx.font = '500 24px Plus Jakarta Sans, sans-serif';
    stampCtx.fillStyle = 'rgba(40, 22, 10, 0.45)';
    stampCtx.fillText('100% EDIBLE · 40M HOLD', 256, 160);

    const stampTex = new THREE.CanvasTexture(stampCanvas);
    stampTex.colorSpace = THREE.SRGBColorSpace;
    const stampGeo = new THREE.PlaneGeometry(1.4, 0.7);
    const stampMat = new THREE.MeshBasicMaterial({
      map: stampTex,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const stampMesh = new THREE.Mesh(stampGeo, stampMat);
    stampMesh.position.set(0, cupCenterY - 0.1, topRadius * 0.93);
    cupGroup.add(stampMesh);

    // Material 4: Beverage Liquid Surface (Latte / Chai / Espresso)
    const latteArtTex = createLatteArtTexture(drinkType);
    const beverageMat = new THREE.MeshStandardMaterial({
      map: latteArtTex,
      roughness: 0.18,
      metalness: 0.05,
    });
    beverageMatRef.current = beverageMat;

    const beverageGeo = new THREE.CylinderGeometry(
      topRadius - 0.09,
      topRadius - 0.09,
      0.03,
      48
    );
    const beverageMesh = new THREE.Mesh(beverageGeo, beverageMat);
    beverageMesh.position.y = cupHeight - 0.18;
    cupGroup.add(beverageMesh);

    // Material 5: Gourmet Chocolate Coated Rim & Inner Layer
    const chocoGroup = new THREE.Group();
    chocolateCoatingGroupRef.current = chocoGroup;
    cupGroup.add(chocoGroup);

    const chocoDipMat = new THREE.MeshStandardMaterial({
      color: 0x241209,
      roughness: 0.15,
      metalness: 0.12,
    });
    const chocoRimGeo = new THREE.TorusGeometry(topRadius - 0.02, 0.095, 16, 48);
    const chocoRimMesh = new THREE.Mesh(chocoRimGeo, chocoDipMat);
    chocoRimMesh.rotation.x = Math.PI / 2;
    chocoRimMesh.position.y = cupHeight + 0.08;
    chocoGroup.add(chocoRimMesh);

    // Chocolate drip band
    const chocoBandGeo = new THREE.CylinderGeometry(
      topRadius + 0.015,
      topRadius - 0.06,
      0.35,
      48,
      1,
      true
    );
    const chocoBandMesh = new THREE.Mesh(chocoBandGeo, chocoDipMat);
    chocoBandMesh.position.y = cupHeight - 0.08;
    chocoGroup.add(chocoBandMesh);

    chocoGroup.visible = currentFlavor.id === 'chocolate_coated';

    // 7. Cross-Section Exploded Inspection Layers (Hidden by default, toggled via state)
    const crossSectionGroup = new THREE.Group();
    crossSectionLayersRef.current = crossSectionGroup;
    crossSectionGroup.position.set(0.7, cupCenterY, 0);
    crossSectionGroup.visible = false;
    scene.add(crossSectionGroup);

    // Layer 1: Natural Cereal Core
    const layer1Geo = new THREE.BoxGeometry(0.75, 0.15, 0.75);
    const layer1Mat = new THREE.MeshStandardMaterial({
      color: 0xd4a86a,
      roughness: 0.85,
    });
    const layer1Mesh = new THREE.Mesh(layer1Geo, layer1Mat);
    layer1Mesh.position.y = 0.5;
    crossSectionGroup.add(layer1Mesh);

    // Layer 2: Thermal Barrier (40+ mins heat resistance)
    const layer2Geo = new THREE.BoxGeometry(0.75, 0.08, 0.75);
    const layer2Mat = new THREE.MeshStandardMaterial({
      color: 0xede0cb,
      roughness: 0.35,
      metalness: 0.1,
    });
    const layer2Mesh = new THREE.Mesh(layer2Geo, layer2Mat);
    layer2Mesh.position.y = 0.25;
    crossSectionGroup.add(layer2Mesh);

    // Layer 3: Organic Glaze
    const layer3Geo = new THREE.BoxGeometry(0.75, 0.06, 0.75);
    const layer3Mat = new THREE.MeshStandardMaterial({
      color: 0xfffcf7,
      roughness: 0.15,
    });
    const layer3Mesh = new THREE.Mesh(layer3Geo, layer3Mat);
    layer3Mesh.position.y = 0.05;
    crossSectionGroup.add(layer3Mesh);

    // 8. Biscuit Crumb Particles for Bite Effect
    const crumbCount = 60;
    const crumbGeo = new THREE.BufferGeometry();
    const crumbPos = new Float32Array(crumbCount * 3);
    for (let i = 0; i < crumbCount * 3; i += 3) {
      crumbPos[i] = (Math.random() - 0.5) * 1.5;
      crumbPos[i + 1] = Math.random() * 1.5 + 0.5;
      crumbPos[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    crumbGeo.setAttribute('position', new THREE.BufferAttribute(crumbPos, 3));
    const crumbMat = new THREE.PointsMaterial({
      color: 0xc89656,
      size: 0.065,
      transparent: true,
      opacity: 0.85,
    });
    const crumbs = new THREE.Points(crumbGeo, crumbMat);
    crumbs.visible = false;
    crumbsGroupRef.current = crumbs;
    scene.add(crumbs);

    // 9. Delicate Rising Steam Particles
    const steamCount = 30;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount * 3; i += 3) {
      steamPos[i] = (Math.random() - 0.5) * 0.9;
      steamPos[i + 1] = Math.random() * 1.2 + cupHeight;
      steamPos[i + 2] = (Math.random() - 0.5) * 0.9;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.12,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    steamGroupRef.current = steam;
    scene.add(steam);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop with frame pacing and smooth exponential damping
    let frameId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Smooth camera interpolation towards target
      if (cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(_targetCameraPos, 0.08);
        controlsRef.current.target.lerp(_targetControlsTarget, 0.08);
      }

      // Smooth auto rotation if enabled
      if (cupGroupRef.current && isAutoRotating) {
        cupGroupRef.current.rotation.y += delta * 0.45;
      }

      // Gentle organic floating bobbing effect
      if (cupGroupRef.current) {
        cupGroupRef.current.position.y = -0.05 + Math.sin(now * 0.0018) * 0.035;
      }

      // Animate delicate steam
      if (steamGroupRef.current) {
        const sPositions = steamGroupRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < sPositions.length; i += 3) {
          sPositions[i] += delta * 0.35;
          if (sPositions[i] > cupHeight + 1.6) {
            sPositions[i] = cupHeight - 0.1;
          }
        }
        steamGroupRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate crumbs falling if active
      if (crumbsGroupRef.current && crumbsGroupRef.current.visible) {
        const cPositions = crumbsGroupRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 1; i < cPositions.length; i += 3) {
          cPositions[i] -= delta * 1.8;
          if (cPositions[i] < 0.05) {
            cPositions[i] = 0.05;
          }
        }
        crumbsGroupRef.current.geometry.attributes.position.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        // Pace software WebGL frame
        const gl = renderer.getContext() as WebGL2RenderingContext;
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 8);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(tick, 70);
          }
        };
        frameId = window.setTimeout(poll, 8);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update flavor materials when currentFlavor changes
  useEffect(() => {
    if (!outerMatRef.current || !rimMatRef.current || !innerMatRef.current) return;

    const baseColor = new THREE.Color(currentFlavor.colorHex);
    outerMatRef.current.color.copy(baseColor);
    rimMatRef.current.color.set(currentFlavor.rimColorHex);
    innerMatRef.current.color.copy(baseColor).lerp(new THREE.Color('#FFF8F0'), 0.25);

    // Update texture
    const newTex = createBiscuitWaferTexture(currentFlavor.colorHex, currentFlavor.secondaryColorHex);
    outerMatRef.current.map?.dispose();
    outerMatRef.current.map = newTex;
    outerMatRef.current.needsUpdate = true;

    // Toggle chocolate coating group
    if (chocolateCoatingGroupRef.current) {
      chocolateCoatingGroupRef.current.visible = currentFlavor.id === 'chocolate_coated';
    }
  }, [currentFlavor]);

  // Update beverage texture when drinkType changes
  useEffect(() => {
    if (!beverageMatRef.current) return;
    const newTex = createLatteArtTexture(drinkType);
    beverageMatRef.current.map?.dispose();
    beverageMatRef.current.map = newTex;
    beverageMatRef.current.visible = drinkType !== 'empty';
    beverageMatRef.current.needsUpdate = true;
  }, [drinkType]);

  // Toggle cross-section group visibility
  useEffect(() => {
    if (crossSectionLayersRef.current) {
      crossSectionLayersRef.current.visible = isCrossSection;
    }
  }, [isCrossSection]);

  return (
    <div className={`relative w-full h-full min-h-[500px] select-none ${className}`}>
      {/* 3D Canvas Mounting Container */}
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate the cup 360°. Scroll to zoom."
      />

      {/* Top Floating Badge & Specs (Non-occluding, clean anti-slop typography) */}
      <div className="absolute top-5 left-5 z-10 pointer-events-none flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0e382b] uppercase bg-[#FAF8F5]/90 px-3 py-1.5 rounded-md border border-[#0e382b]/15 shadow-xs">
          <span>Interactive 3D Tasting Studio</span>
          <span className="text-[#8B7E6B]">·</span>
          <span>FSSAI Certified</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#1E2522]">
          {currentFlavor.name}
        </h2>
        <p className="text-xs text-[#5C645E] max-w-xs font-medium">
          {currentFlavor.tagline}
        </p>
      </div>

      {/* Top-Right Quick Controls (Sound & Reset) */}
      <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            const next = !isMuted;
            setIsMuted(next);
            if (!next) playChimeSound(600, false);
          }}
          className="p-2 rounded-lg bg-white/90 hover:bg-white text-[#2C3831] border border-[#E3DBD0] shadow-xs transition-colors"
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          aria-label={isMuted ? 'Unmute crunch and interaction sounds' : 'Mute sounds'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-[#8C958F]" /> : <Volume2 className="w-4 h-4 text-[#0e382b]" />}
        </button>
        <button
          onClick={() => {
            if (cameraRef.current && controlsRef.current) {
              setCameraPreset('front');
              if (cupGroupRef.current) cupGroupRef.current.rotation.y = 0;
            }
          }}
          className="p-2 rounded-lg bg-white/90 hover:bg-white text-[#2C3831] border border-[#E3DBD0] shadow-xs transition-colors"
          title="Reset View"
          aria-label="Reset 3D camera to default front view"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Center 3D Viewport is 100% Unobstructed */}

      {/* Ergonomic Collapsible Bottom Control Dock */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-4xl transition-all duration-300 ${
          isCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
        }`}
      >
        {/* Toggle Collapse/Expand Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-[#0e382b] bg-white border border-b-0 border-[#DFD6CA] rounded-t-lg shadow-sm hover:bg-[#FAF8F5] transition-colors"
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Show 3D Studio Dock</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Minimize Dock</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Container: 2 Clean Rows, Zero Overlap */}
        <div className="bg-white/95 backdrop-blur-md rounded-xl border border-[#DFD6CA] shadow-xl p-3 sm:p-4 text-[#222522] space-y-3">
          {/* Row 1: Flavours Picker */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7468] shrink-0">
              Select Flavour:
            </span>
            <div className="grid grid-cols-4 gap-1.5 flex-1 max-w-xl">
              {CUP_FLAVORS.map((flavor) => {
                const isSelected = flavor.id === currentFlavor.id;
                return (
                  <button
                    key={flavor.id}
                    onClick={() => {
                      onFlavorChange(flavor);
                      playChimeSound(560, isMuted);
                    }}
                    className={`relative flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'border-[#0e382b] bg-[#0e382b]/8 ring-1 ring-[#0e382b] text-[#0e382b] font-bold'
                        : 'border-[#EAE3D8] hover:border-[#C8BEAE] bg-[#FCFAF7] text-[#4E483D]'
                    }`}
                    title={flavor.name}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                      style={{ backgroundColor: flavor.colorHex }}
                    />
                    <span className="text-xs truncate">
                      {flavor.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Drink Fill & Interactive Inspection Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#EDE5DA]">
            {/* Drink Fill Segments */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A7468] hidden sm:inline">
                Drink:
              </span>
              <div className="flex items-center gap-1 bg-[#F5EFE6] p-0.5 rounded-lg overflow-x-auto max-w-full">
                {(['latte', 'chai', 'espresso', 'affogato', 'empty'] as DrinkType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setDrinkType(type);
                      playChimeSound(680, isMuted);
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold capitalize rounded transition-colors whitespace-nowrap ${
                      drinkType === type
                        ? 'bg-white text-[#0e382b] shadow-xs'
                        : 'text-[#686255] hover:text-[#252824]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Inspection Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  isAutoRotating
                    ? 'border-[#0e382b]/30 bg-[#0e382b]/10 text-[#0e382b]'
                    : 'border-[#EAE3D8] text-[#555E57] hover:bg-[#FAF8F5]'
                }`}
                title="Toggle smooth auto spin"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isAutoRotating ? 'Spinning' : 'Paused'}</span>
              </button>

              <button
                onClick={() => setCameraPreset(isCrossSection ? 'front' : 'crossSection')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  isCrossSection
                    ? 'border-[#0e382b] bg-[#0e382b] text-white'
                    : 'border-[#EAE3D8] text-[#555E57] hover:bg-[#FAF8F5]'
                }`}
                title="Inspect 3-layer cross section & thermal barrier"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>X-Ray Layers</span>
              </button>

              <button
                onClick={handleCrunchBite}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0e382b] hover:bg-[#154a3a] active:scale-95 shadow-xs transition-all"
                title="Test the crispy wafer crunch bite!"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
                <span>Crunch Bite!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
