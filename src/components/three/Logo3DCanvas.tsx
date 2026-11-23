import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * About Us — True 3D NobleNet Logo Sculpture:
 * Renders the official NobleNet Software Technologies logo as a multi-layered
 * 3D extruded glass-and-metallic emblem with sculpted 3D golden 8-point star
 * and beveled 3D crimson heart core in real specular lighting.
 */
export function Logo3DCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 620;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const updateCamera = (w: number, h: number) => {
      const aspect = Math.max(w / Math.max(h, 1), 0.55);
      camera.aspect = aspect;
      const dist = aspect < 1 ? 7.2 / Math.max(aspect, 0.72) : w < 640 ? 8.2 : 7.2;
      camera.position.set(0, 0, Math.min(dist, 10.2));
      camera.updateProjectionMatrix();
    };
    updateCamera(width, height);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Precision Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 6, 7);
    scene.add(keyLight);

    const blueRim = new THREE.PointLight(0x2997ff, 4.5, 16);
    blueRim.position.set(-5, 2, 4);
    scene.add(blueRim);

    const goldWarm = new THREE.PointLight(0xf5c84c, 4.2, 16);
    goldWarm.position.set(4, -3, 4);
    scene.add(goldWarm);

    const pivot = new THREE.Group();
    scene.add(pivot);

    // 1. Sleek Floating Dark-Glass Architectural Plaque Backing (beveled thin slab)
    const slabShape = new THREE.Shape();
    const sw = 4.2;
    const sh = 3.9;
    const sr = 0.42;
    slabShape.moveTo(-sw / 2 + sr, -sh / 2);
    slabShape.lineTo(sw / 2 - sr, -sh / 2);
    slabShape.quadraticCurveTo(sw / 2, -sh / 2, sw / 2, -sh / 2 + sr);
    slabShape.lineTo(sw / 2, sh / 2 - sr);
    slabShape.quadraticCurveTo(sw / 2, sh / 2, sw / 2 - sr, sh / 2);
    slabShape.lineTo(-sw / 2 + sr, sh / 2);
    slabShape.quadraticCurveTo(-sw / 2, sh / 2, -sw / 2, sh / 2 - sr);
    slabShape.lineTo(-sw / 2, -sh / 2 + sr);
    slabShape.quadraticCurveTo(-sw / 2, -sh / 2, -sw / 2 + sr, -sh / 2);

    const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.045,
      bevelSegments: 4,
    });
    slabGeo.center();

    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0x090d16,
      metalness: 0.45,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.88,
    });
    const slab = new THREE.Mesh(slabGeo, slabMat);
    slab.position.z = -0.14;
    pivot.add(slab);

    // Metallic rim frame around slab
    const edgesGeo = new THREE.EdgesGeometry(slabGeo, 24);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const slabEdges = new THREE.LineSegments(edgesGeo, edgesMat);
    slab.add(slabEdges);

    // 2. Stacked Multi-Layer 3D Extruded NobleNet Logo Texture (gives true physical depth to the circuit lettering)
    const loader = new THREE.TextureLoader();
    const logoTex = loader.load('/assets/noblenet-logo-darkbg.png');
    logoTex.colorSpace = THREE.SRGBColorSpace;
    logoTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const logoPlaneGeo = new THREE.PlaneGeometry(3.75, 3.41);

    // Create 6 closely-spaced depth extrusion layers for crisp metallic 3D relief
    const depthLayers = 6;
    for (let i = 0; i < depthLayers; i++) {
      const isFront = i === depthLayers - 1;
      const mat = new THREE.MeshStandardMaterial({
        map: logoTex,
        transparent: true,
        alphaTest: 0.12,
        metalness: isFront ? 0.35 : 0.85,
        roughness: isFront ? 0.25 : 0.35,
        color: isFront ? 0xffffff : 0x94a3b8,
        emissive: isFront ? 0x1e293b : 0x000000,
        emissiveIntensity: isFront ? 0.22 : 0,
        side: THREE.DoubleSide,
      });
      const layer = new THREE.Mesh(logoPlaneGeo, mat);
      layer.position.z = 0.04 + i * 0.022;
      pivot.add(layer);
    }

    // 3. True 3D Sculpted Golden 8-Pointed Star & Crimson Heart Emblem floating subtly proud in Z!
    const starShape = new THREE.Shape();
    const spikes = 8;
    const outerR = 0.72;
    const innerR = 0.34;
    for (let i = 0; i < spikes * 2; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starGeo = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
    starGeo.center();

    const starMat = new THREE.MeshStandardMaterial({
      color: 0xe8b931,
      emissive: 0x6b4b06,
      emissiveIntensity: 0.3,
      metalness: 0.88,
      roughness: 0.18,
    });
    const star3D = new THREE.Mesh(starGeo, starMat);
    star3D.position.set(0, -0.96, 0.28);
    pivot.add(star3D);

    // 3D Sculpted Crimson Heart in front of the 3D Star
    const heartShape = new THREE.Shape();
    heartShape.moveTo(0, -0.24);
    heartShape.bezierCurveTo(0.05, -0.18, 0.3, -0.02, 0.3, 0.14);
    heartShape.bezierCurveTo(0.3, 0.28, 0.15, 0.33, 0.0, 0.2);
    heartShape.bezierCurveTo(-0.15, 0.33, -0.3, 0.28, -0.3, 0.14);
    heartShape.bezierCurveTo(-0.3, -0.02, -0.05, -0.18, 0, -0.24);

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.11,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.03,
      bevelSegments: 4,
    });
    heartGeo.center();

    const heartMat = new THREE.MeshPhysicalMaterial({
      color: 0xb22222,
      emissive: 0x5c0d0d,
      emissiveIntensity: 0.35,
      metalness: 0.25,
      roughness: 0.16,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const heart3D = new THREE.Mesh(heartGeo, heartMat);
    heart3D.position.set(0, -0.95, 0.39);
    pivot.add(heart3D);

    // 4. Subtle Technical Calibration Rails flanking the 3D Logo
    const railMat = new THREE.LineBasicMaterial({
      color: 0x2997ff,
      transparent: true,
      opacity: 0.28,
    });
    const leftBracketPts = [
      new THREE.Vector3(-2.45, 1.5, -0.3),
      new THREE.Vector3(-2.65, 1.5, -0.3),
      new THREE.Vector3(-2.65, -1.5, -0.3),
      new THREE.Vector3(-2.45, -1.5, -0.3),
    ];
    const rightBracketPts = leftBracketPts.map((p) => new THREE.Vector3(-p.x, p.y, p.z));
    pivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(leftBracketPts), railMat));
    pivot.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(rightBracketPts), railMat));

    // Interactive cursor tilt
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = Math.max(-1, Math.min(1, nx)) * 0.38;
      targetY = Math.max(-1, Math.min(1, ny)) * 0.26;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      const h = container.clientHeight || 340;
      updateCamera(w, h);
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      pivot.rotation.y = Math.sin(t * 0.65) * 0.22 + curX;
      pivot.rotation.x = Math.cos(t * 0.5) * 0.06 - curY;
      pivot.position.y = Math.sin(t * 1.1) * 0.1;

      // Subtle living pulse on the 3D sculpted heart & star highlight
      const pulse = 1 + Math.sin(t * 2.4) * 0.045;
      heart3D.scale.setScalar(pulse);
      star3D.rotation.z = Math.sin(t * 0.9) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      logoTex.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[320px] w-full touch-pan-y sm:h-[420px] md:h-[480px] lg:h-[540px]"
      aria-label="3D NobleNet Software Technologies Logo"
    />
  );
}
