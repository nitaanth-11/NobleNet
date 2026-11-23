import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type SentinelMode = 'guard' | 'radar' | 'mesh';

interface SentinelCoreCanvasProps {
  mode: SentinelMode;
}

/**
 * Sentinel AI Dedicated 3D Technical Operations Scene:
 * 3D Enterprise Network Topology Map, Server Node Towers,
 * Sweeping Tactical Lidar Radar, and Live Intercepted Threat Arcs.
 */
export function SentinelCoreCanvas({ mode }: SentinelCoreCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<SentinelMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 720;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 120);
    camera.position.set(0, 4.6, 7.6);
    camera.lookAt(0, 0, 0);

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

    const ambient = new THREE.AmbientLight(0x94a3b8, 0.75);
    scene.add(ambient);

    const blueKey = new THREE.PointLight(0x2997ff, 6.5, 24);
    blueKey.position.set(4, 6, 4);
    scene.add(blueKey);

    const crimsonThreat = new THREE.PointLight(0xef4444, 4.2, 20);
    crimsonThreat.position.set(-5, 3, -3);
    scene.add(crimsonThreat);

    const root = new THREE.Group();
    root.position.y = -0.5;
    scene.add(root);

    // 1. Concentric Technical Radar Reticle Rings + Radial Axes
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    [1.2, 2.2, 3.2, 4.2].forEach((radius) => {
      const ring = new THREE.Mesh(new THREE.RingGeometry(radius - 0.015, radius + 0.015, 96), reticleMat);
      ring.rotation.x = -Math.PI / 2;
      root.add(ring);
    });

    // Crosshair telemetry lines
    const axisPts = [
      new THREE.Vector3(-4.4, 0.01, 0),
      new THREE.Vector3(4.4, 0.01, 0),
      new THREE.Vector3(0, 0.01, -4.4),
      new THREE.Vector3(0, 0.01, 4.4),
    ];
    const axisGeo = new THREE.BufferGeometry().setFromPoints(axisPts);
    root.add(
      new THREE.LineSegments(
        axisGeo,
        new THREE.LineBasicMaterial({ color: 0x1e3a5f, transparent: true, opacity: 0.7 })
      )
    );

    // 2. Rotating Volumetric Lidar Sweep Beam
    const sweepGeo = new THREE.RingGeometry(0.55, 4.2, 48, 1, 0, Math.PI * 0.25);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0x2997ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const sweepMesh = new THREE.Mesh(sweepGeo, sweepMat);
    sweepMesh.rotation.x = -Math.PI / 2;
    sweepMesh.position.y = 0.03;
    root.add(sweepMesh);

    // 3. Central Sentinel Command Server Core
    const coreTower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.48, 0.56, 1.5, 24),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x0c4a6e,
        emissiveIntensity: 0.65,
        metalness: 0.85,
        roughness: 0.2,
      })
    );
    coreTower.position.y = 0.75;
    root.add(coreTower);

    // Protective Transparent Perimeter Dome (scales with mode)
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(2.65, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      domeMat
    );
    root.add(dome);

    // 4. Infrastructure Server Nodes distributed across the Topology Map
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.8,
      roughness: 0.25,
    });
    const capCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const capRed = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    const nodeCoords: [number, number, number, boolean][] = [
      [1.9, 0.65, 0.9, false],
      [-2.1, 0.85, 0.8, false],
      [1.4, 0.55, -1.7, false],
      [-1.5, 0.7, -1.6, false],
      [3.3, 0.45, -0.5, true],
      [-3.4, 0.5, 1.3, true],
      [0.4, 0.5, 3.2, false],
      [-0.7, 0.45, -3.3, true],
    ];

    const threatArcs: { curve: THREE.QuadraticBezierCurve3; packet: THREE.Mesh; t: number; speed: number; isThreat: boolean }[] = [];

    nodeCoords.forEach(([nx, nh, nz, isThreat], idx) => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.28, nh, 0.28), nodeMat);
      tower.position.set(nx, nh / 2, nz);
      root.add(tower);

      const beacon = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.06, 0.28), isThreat ? capRed : capCyan);
      beacon.position.set(nx, nh + 0.04, nz);
      root.add(beacon);

      // Curved telemetry/attack arc from node to Sentinel Core (threat arcs stop at shield!)
      const start = new THREE.Vector3(nx, nh, nz);
      const end = isThreat
        ? start.clone().normalize().multiplyScalar(2.45).setY(0.85)
        : new THREE.Vector3(0, 1.25, 0);
      const mid = start.clone().add(end).multiplyScalar(0.5);
      mid.y += 1.25;

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const arcLine = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)),
        new THREE.LineBasicMaterial({
          color: isThreat ? 0xef4444 : 0x38bdf8,
          transparent: true,
          opacity: isThreat ? 0.5 : 0.35,
        })
      );
      root.add(arcLine);

      const pkt = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 10), isThreat ? capRed : capCyan);
      root.add(pkt);
      threatArcs.push({ curve, packet: pkt, t: (idx * 0.17) % 1, speed: isThreat ? 0.55 : 0.38, isThreat });
    });

    // Pointer interaction
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = Math.max(-1, Math.min(1, nx)) * 0.4;
      targetY = Math.max(-1, Math.min(1, ny)) * 0.25;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();
      const activeMode = modeRef.current;

      curX += (targetX - curX) * 0.05;
      curY += (targetY - curY) * 0.05;

      root.rotation.y = t * 0.14 + curX;
      root.rotation.x = curY * 0.35;

      const targetSweepSpeed = activeMode === 'radar' ? 3.2 : 1.3;
      const targetDomeOpacity = activeMode === 'mesh' ? 0.42 : activeMode === 'guard' ? 0.2 : 0.08;
      const targetDomeScale = activeMode === 'mesh' ? 1.24 : 1.0;

      sweepMesh.rotation.z -= delta * targetSweepSpeed;
      domeMat.opacity += (targetDomeOpacity - domeMat.opacity) * 0.06;
      dome.scale.lerp(new THREE.Vector3(targetDomeScale, targetDomeScale, targetDomeScale), 0.06);

      threatArcs.forEach((a) => {
        a.t = (a.t + delta * a.speed) % 1;
        a.curve.getPoint(a.t, a.packet.position);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
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
      className="h-full w-full min-h-[420px] sm:min-h-[520px] lg:min-h-[580px]"
      aria-label="Sentinel AI 3D Network Topology and Threat Operations Radar"
    />
  );
}
