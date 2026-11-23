import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TraceSegment {
  points: THREE.Vector3[];
  progress: number;
  speed: number;
  mesh: THREE.Mesh;
}

/**
 * Full-bleed Hero 3D Scene:
 * Engineered 3D Silicon Microprocessor & Printed Circuit Board (PCB) Architecture
 * with live animated electrical signal pulses racing along orthogonal copper/cyan traces.
 */
export function HeroTechCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.055);

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 120);
    camera.position.set(0, 6.4, 9.6);
    camera.lookAt(0, -0.4, 0);

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

    // Studio Lighting (Apple/NVIDIA dark silicon showcase feel)
    const ambient = new THREE.AmbientLight(0x94a3b8, 0.65);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.2);
    keyLight.position.set(6, 12, 8);
    scene.add(keyLight);

    const blueLight = new THREE.PointLight(0x2997ff, 7, 24);
    blueLight.position.set(-4, 4, 4);
    scene.add(blueLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 5.5, 22);
    cyanRim.position.set(5, 3, -4);
    scene.add(cyanRim);

    const goldSubtle = new THREE.PointLight(0xe5b43b, 2.2, 16);
    goldSubtle.position.set(0, 1.5, 0);
    scene.add(goldSubtle);

    const boardGroup = new THREE.Group();
    boardGroup.position.set(0, -1.1, -0.6);
    scene.add(boardGroup);

    // 1. Dark Silicon PCB Wafer Base Grid
    const gridHelper = new THREE.GridHelper(32, 48, 0x1e293b, 0x0f172a);
    gridHelper.position.y = -0.02;
    boardGroup.add(gridHelper);

    // 2. Central 3D Silicon Microprocessor (CPU Package + Pins + Silicon Die)
    const cpuGroup = new THREE.Group();
    boardGroup.add(cpuGroup);

    const substrate = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.16, 3.2),
      new THREE.MeshStandardMaterial({
        color: 0x0b1320,
        metalness: 0.55,
        roughness: 0.4,
      })
    );
    substrate.position.y = 0.08;
    cpuGroup.add(substrate);

    // Brushed metallic Integrated Heat Spreader (IHS)
    const ihs = new THREE.Mesh(
      new THREE.BoxGeometry(2.35, 0.22, 2.35),
      new THREE.MeshStandardMaterial({
        color: 0x18212f,
        metalness: 0.92,
        roughness: 0.22,
      })
    );
    ihs.position.y = 0.27;
    cpuGroup.add(ihs);

    // Inner glowing neural silicon die window
    const dieFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.05, 1.25),
      new THREE.MeshStandardMaterial({
        color: 0x0a192f,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.8,
        metalness: 0.9,
        roughness: 0.1,
      })
    );
    dieFrame.position.y = 0.39;
    cpuGroup.add(dieFrame);

    // Precision CPU Die Grid Lines
    const dieGrid = new THREE.GridHelper(1.18, 6, 0x38bdf8, 0x1e40af);
    dieGrid.position.y = 0.422;
    cpuGroup.add(dieGrid);

    // Gold Perimeter Contact Pins around all 4 sides of the CPU
    const pinGeo = new THREE.BoxGeometry(0.06, 0.08, 0.22);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      metalness: 0.92,
      roughness: 0.2,
    });
    for (let i = -5; i <= 5; i++) {
      const offset = i * 0.24;
      // North & South pins
      const pN = new THREE.Mesh(pinGeo, pinMat);
      pN.position.set(offset, 0.06, -1.68);
      cpuGroup.add(pN);
      const pS = new THREE.Mesh(pinGeo, pinMat);
      pS.position.set(offset, 0.06, 1.68);
      cpuGroup.add(pS);
      // East & West pins
      const pE = new THREE.Mesh(pinGeo, pinMat);
      pE.rotation.y = Math.PI / 2;
      pE.position.set(1.68, 0.06, offset);
      cpuGroup.add(pE);
      const pW = new THREE.Mesh(pinGeo, pinMat);
      pW.rotation.y = Math.PI / 2;
      pW.position.set(-1.68, 0.06, offset);
      cpuGroup.add(pW);
    }

    // 3. Orthogonal 90-Degree PCB Bus Traces + Solder Vias + Animated Data Packets
    const traceMat = new THREE.LineBasicMaterial({
      color: 0x1e3a5f,
      transparent: true,
      opacity: 0.85,
    });
    const viaGeo = new THREE.RingGeometry(0.055, 0.095, 16);
    const viaMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    const pulseGeo = new THREE.BoxGeometry(0.11, 0.045, 0.24);
    const pulseMatBlue = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const pulseMatWhite = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const pulseMatGold = new THREE.MeshBasicMaterial({ color: 0xe5b43b });

    const traces: TraceSegment[] = [];

    const directions = [
      { dx: 1, dz: 0 },
      { dx: -1, dz: 0 },
      { dx: 0, dz: 1 },
      { dx: 0, dz: -1 },
    ];

    directions.forEach((dir, dIdx) => {
      for (let lane = -4; lane <= 4; lane++) {
        if (lane === 0 && dIdx % 2 === 1) continue;
        const spread = lane * 0.34;
        const startX = dir.dx !== 0 ? dir.dx * 1.78 : spread;
        const startZ = dir.dz !== 0 ? dir.dz * 1.78 : spread;

        const midDist = 2.6 + Math.abs(lane) * 0.55;
        const bend = lane * 0.72;
        const endDist = 10.5 + (Math.abs(lane) % 3) * 2.2;

        const p0 = new THREE.Vector3(startX, 0.03, startZ);
        const p1 = new THREE.Vector3(
          dir.dx !== 0 ? dir.dx * midDist : spread,
          0.03,
          dir.dz !== 0 ? dir.dz * midDist : spread
        );
        const p2 = new THREE.Vector3(
          dir.dx !== 0 ? dir.dx * (midDist + 1.4) : spread + bend,
          0.03,
          dir.dz !== 0 ? dir.dz * (midDist + 1.4) : spread + bend
        );
        const p3 = new THREE.Vector3(
          dir.dx !== 0 ? dir.dx * endDist : spread + bend,
          0.03,
          dir.dz !== 0 ? dir.dz * endDist : spread + bend
        );

        const pts = [p0, p1, p2, p3];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(lineGeo, traceMat);
        boardGroup.add(line);

        // Solder Via ring at end junction
        const via = new THREE.Mesh(viaGeo, viaMat);
        via.rotation.x = -Math.PI / 2;
        via.position.set(p2.x, 0.035, p2.z);
        boardGroup.add(via);

        // Animated signal packet riding the PCB trace
        const mat =
          (lane + dIdx) % 5 === 0
            ? pulseMatGold
            : (lane + dIdx) % 3 === 0
              ? pulseMatWhite
              : pulseMatBlue;
        const packet = new THREE.Mesh(pulseGeo, mat);
        boardGroup.add(packet);

        traces.push({
          points: pts,
          progress: Math.random(),
          speed: 0.14 + (Math.abs(lane) % 4) * 0.045,
          mesh: packet,
        });
      }
    });

    // 4. Secondary Micro-Capacitor / Memory Chips along the PCB periphery
    const chipGeo = new THREE.BoxGeometry(0.75, 0.14, 0.45);
    const chipMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.7,
      roughness: 0.3,
    });
    const chipCoords: [number, number][] = [
      [-4.6, -3.8],
      [4.6, -3.8],
      [-5.2, 3.6],
      [5.2, 3.6],
      [-7.4, -1.8],
      [7.4, 1.8],
    ];
    chipCoords.forEach(([cx, cz]) => {
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(cx, 0.07, cz);
      boardGroup.add(chip);
    });

    // Pointer parallax
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * 1.4;
      targetY = ny * 0.8;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    const tmpPos = new THREE.Vector3();
    const nextPos = new THREE.Vector3();
    let rafId = 0;

    const samplePolyline = (pts: THREE.Vector3[], t: number, out: THREE.Vector3) => {
      const segs = pts.length - 1;
      const scaled = Math.min(Math.max(t, 0), 0.9999) * segs;
      const idx = Math.floor(scaled);
      const frac = scaled - idx;
      out.lerpVectors(pts[idx], pts[idx + 1], frac);
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      curX += (targetX - curX) * 0.04;
      curY += (targetY - curY) * 0.04;

      camera.position.x = curX;
      camera.position.y = 6.2 - curY * 0.6;
      camera.lookAt(0, -0.7, -0.4);

      boardGroup.rotation.y = Math.sin(elapsed * 0.14) * 0.12;
      dieFrame.material.emissiveIntensity = 0.65 + Math.sin(elapsed * 2.5) * 0.25;

      // Move data packets smoothly along PCB traces
      for (const tr of traces) {
        tr.progress = (tr.progress + delta * tr.speed) % 1;
        samplePolyline(tr.points, tr.progress, tmpPos);
        samplePolyline(tr.points, Math.min(tr.progress + 0.01, 0.9999), nextPos);
        tr.mesh.position.copy(tmpPos);
        tr.mesh.position.y = 0.06;
        tr.mesh.lookAt(nextPos.x, 0.06, nextPos.z);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
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
      className="h-full w-full"
      aria-label="3D Silicon Processor and Circuit Bus Architecture"
    />
  );
}
