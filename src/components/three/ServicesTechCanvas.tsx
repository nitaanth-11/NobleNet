import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ServicesTechCanvasProps {
  activeIndex: number;
}

/**
 * Services — 4 Genuine 3D Technical Engineering Models (NO abstract geometric shapes):
 * 0: Multi-Tier Software Architecture Stack (UI Window -> Microservice APIs -> Database Discs)
 * 1: Deep Neural Network Graph (4-Layer Synaptic Tensor Matrix + live forward-pass pulses)
 * 2: Enterprise Server Rack Cluster (Data-center blade servers + blinking LEDs + fiber uplinks)
 * 3: Cyber Defense Firewall Gateway (Scanning barrier inspecting live cyan/crimson packet streams)
 */
export function ServicesTechCanvas({ activeIndex }: ServicesTechCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(activeIndex);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 680;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 8.2);
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

    const ambient = new THREE.AmbientLight(0xdbeafe, 0.75);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 2.2);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const blueLight = new THREE.PointLight(0x2997ff, 5, 18);
    blueLight.position.set(-5, 3, 4);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 4, 18);
    cyanLight.position.set(5, -2, 3);
    scene.add(cyanLight);

    // Subtle technical base floor grid
    const floorGrid = new THREE.GridHelper(12, 24, 0x1e293b, 0x0b1120);
    floorGrid.position.y = -2.35;
    scene.add(floorGrid);

    const models: THREE.Group[] = [];

    // =========================================================================
    // MODEL 0: 3D MULTI-TIER APPLICATION STACK (Frontend -> API -> Database)
    // =========================================================================
    const m0 = new THREE.Group();
    const glassLayerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.3,
      roughness: 0.2,
      transparent: true,
      opacity: 0.78,
      clearcoat: 0.9,
    });
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const cyanGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const whiteGlowMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const blueGlowMat = new THREE.MeshBasicMaterial({ color: 0x2997ff });

    // Tier 1 (Top): Browser / Application UI Frame
    const uiTier = new THREE.Group();
    uiTier.position.y = 1.55;
    const uiPlate = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.1, 2.3), glassLayerMat);
    uiTier.add(uiPlate);
    uiTier.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(uiPlate.geometry),
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
      )
    );
    // Window code/UI bars on top of UI plate
    const headerBar = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.05, 0.24), blueGlowMat);
    headerBar.position.set(0, 0.08, -0.82);
    uiTier.add(headerBar);
    const codeLines = [2.1, 1.4, 2.6, 1.8];
    codeLines.forEach((len, idx) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(len, 0.04, 0.14),
        idx % 2 === 0 ? cyanGlowMat : whiteGlowMat
      );
      bar.position.set(-1.6 + len / 2, 0.08, -0.32 + idx * 0.34);
      uiTier.add(bar);
    });
    m0.add(uiTier);

    // Tier 2 (Middle): Microservice API Gateway Nodes
    const apiTier = new THREE.Group();
    apiTier.position.y = 0.05;
    const apiPlate = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.08, 2.3), glassLayerMat);
    apiTier.add(apiPlate);
    apiTier.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(apiPlate.geometry),
        new THREE.LineBasicMaterial({ color: 0x2997ff, transparent: true, opacity: 0.55 })
      )
    );
    [-1.15, 0, 1.15].forEach((x) => {
      const svc = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.34, 0.75), metalMat);
      svc.position.set(x, 0.2, 0);
      apiTier.add(svc);
      const led = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.08), cyanGlowMat);
      led.position.set(x, 0.26, 0.38);
      apiTier.add(led);
    });
    m0.add(apiTier);

    // Tier 3 (Bottom): Distributed Cylindrical Database Platter Stack
    const dbTier = new THREE.Group();
    dbTier.position.y = -1.5;
    [-1.1, 0, 1.1].forEach((x) => {
      for (let d = 0; d < 3; d++) {
        const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.18, 28), metalMat);
        platter.position.set(x, d * 0.24, 0);
        dbTier.add(platter);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.425, 0.015, 8, 32), cyanGlowMat);
        rim.rotation.x = Math.PI / 2;
        rim.position.set(x, d * 0.24, 0);
        dbTier.add(rim);
      }
    });
    m0.add(dbTier);

    // Vertical API Conduit Rails + Live Data Packets travelling between tiers
    const stackPackets: { mesh: THREE.Mesh; x: number; dir: number; phase: number }[] = [];
    const conduitMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    [-1.1, 0, 1.1].forEach((x, idx) => {
      const railPts = [new THREE.Vector3(x, -1.1, 0), new THREE.Vector3(x, 1.5, 0)];
      m0.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(railPts), conduitMat));
      const pkt = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.22, 0.11), idx === 1 ? whiteGlowMat : cyanGlowMat);
      m0.add(pkt);
      stackPackets.push({ mesh: pkt, x, dir: idx % 2 === 0 ? 1 : -1, phase: idx * 0.33 });
    });
    models.push(m0);

    // =========================================================================
    // MODEL 1: 3D DEEP NEURAL NETWORK GRAPH (4 Layers + Live Inference Pulses)
    // =========================================================================
    const m1 = new THREE.Group();
    const layerConfig = [4, 6, 6, 3];
    const layerXs = [-2.55, -0.85, 0.85, 2.55];
    const neuronPositions: THREE.Vector3[][] = [];
    const neuronMeshes: THREE.Mesh[] = [];
    const neuronGeo = new THREE.SphereGeometry(0.14, 18, 18);

    layerConfig.forEach((count, lIdx) => {
      const cols: THREE.Vector3[] = [];
      for (let i = 0; i < count; i++) {
        const y = (i - (count - 1) / 2) * 0.68;
        const z = ((i % 2 === 0 ? 1 : -1) * (lIdx === 1 || lIdx === 2 ? 0.52 : 0.22));
        const pos = new THREE.Vector3(layerXs[lIdx], y, z);
        cols.push(pos);

        const nMat = new THREE.MeshStandardMaterial({
          color: lIdx === 3 ? 0xe5b43b : 0x2997ff,
          emissive: lIdx === 3 ? 0xb45309 : 0x0284c7,
          emissiveIntensity: 0.75,
          metalness: 0.6,
          roughness: 0.2,
        });
        const node = new THREE.Mesh(neuronGeo, nMat);
        node.position.copy(pos);
        m1.add(node);
        neuronMeshes.push(node);
      }
      neuronPositions.push(cols);
    });

    // Synaptic Connections + Live Inference Sparks
    const synLineCoords: number[] = [];
    const synapses: { from: THREE.Vector3; to: THREE.Vector3 }[] = [];
    for (let l = 0; l < neuronPositions.length - 1; l++) {
      for (const a of neuronPositions[l]) {
        for (const b of neuronPositions[l + 1]) {
          synLineCoords.push(a.x, a.y, a.z, b.x, b.y, b.z);
          synapses.push({ from: a, to: b });
        }
      }
    }
    const synGeo = new THREE.BufferGeometry();
    synGeo.setAttribute('position', new THREE.Float32BufferAttribute(synLineCoords, 3));
    m1.add(
      new THREE.LineSegments(
        synGeo,
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.22 })
      )
    );

    const nnPulses: { mesh: THREE.Mesh; synIdx: number; t: number; speed: number }[] = [];
    const sparkGeo = new THREE.SphereGeometry(0.065, 10, 10);
    for (let i = 0; i < 24; i++) {
      const spark = new THREE.Mesh(sparkGeo, i % 4 === 0 ? whiteGlowMat : cyanGlowMat);
      m1.add(spark);
      nnPulses.push({
        mesh: spark,
        synIdx: Math.floor(Math.random() * synapses.length),
        t: Math.random(),
        speed: 0.55 + Math.random() * 0.6,
      });
    }
    models.push(m1);

    // =========================================================================
    // MODEL 2: 3D ENTERPRISE SERVER RACK CLUSTER & FIBER UPLINK HUB
    // =========================================================================
    const m2 = new THREE.Group();
    const rackLeds: { mesh: THREE.Mesh; phase: number }[] = [];
    const rackChassisMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.82,
      roughness: 0.28,
    });
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.7,
      roughness: 0.3,
    });
    const ledGreen = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ledCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ledAmber = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    const rackXPositions = [-2.1, -0.7, 0.7, 2.1];
    const fiberCurves: THREE.QuadraticBezierCurve3[] = [];

    rackXPositions.forEach((rx, rIdx) => {
      const rack = new THREE.Group();
      rack.position.set(rx, -0.45, Math.abs(rx) * 0.16);
      rack.rotation.y = -rx * 0.1;

      const body = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.75, 1.05), rackChassisMat);
      rack.add(body);
      rack.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(body.geometry),
          new THREE.LineBasicMaterial({ color: 0x334155 })
        )
      );

      // 8 stacked 1U/2U Blade Server Bays with blinking LEDs
      for (let slot = 0; slot < 8; slot++) {
        const sy = -1.08 + slot * 0.31;
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.2, 0.08), bladeMat);
        blade.position.set(0, sy, 0.52);
        rack.add(blade);

        const ledMat = (slot + rIdx) % 5 === 0 ? ledAmber : slot % 2 === 0 ? ledGreen : ledCyan;
        const led = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.045, 0.04), ledMat.clone());
        led.position.set(0.3, sy, 0.57);
        rack.add(led);
        rackLeds.push({ mesh: led, phase: slot * 0.9 + rIdx * 1.4 });
      }
      m2.add(rack);

      // Fiber-optic uplink curve from rack top to central Cloud Switch Hub
      const start = new THREE.Vector3(rx, 0.95, Math.abs(rx) * 0.16);
      const ctrl = new THREE.Vector3(rx * 0.55, 2.1, 0);
      const end = new THREE.Vector3(0, 1.85, -0.2);
      const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
      fiberCurves.push(curve);
      const tubeGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      m2.add(
        new THREE.Line(
          tubeGeo,
          new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
        )
      );
    });

    // Overhead Cloud Routing Switch Core
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.28, 32), metalMat);
    hub.position.set(0, 1.85, -0.2);
    m2.add(hub);
    const hubRing = new THREE.Mesh(new THREE.TorusGeometry(0.86, 0.025, 10, 48), cyanGlowMat);
    hubRing.rotation.x = Math.PI / 2;
    hubRing.position.set(0, 1.85, -0.2);
    m2.add(hubRing);

    // Fiber optical packets traveling up to the hub
    const fiberPackets = fiberCurves.map((curve, idx) => {
      const pkt = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 10), whiteGlowMat);
      m2.add(pkt);
      return { mesh: pkt, curve, t: idx * 0.25 };
    });
    models.push(m2);

    // =========================================================================
    // MODEL 3: 3D CYBER DEFENSE FIREWALL & PACKET INSPECTION GATEWAY
    // =========================================================================
    const m3 = new THREE.Group();

    // Vertical Segmented Firewall Barrier Wall
    const wallGroup = new THREE.Group();
    const barrierMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c4a6e,
      emissive: 0x0369a1,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.38,
      metalness: 0.2,
      roughness: 0.1,
    });
    const wallPanel = new THREE.Mesh(new THREE.BoxGeometry(0.14, 3.2, 3.4), barrierMat);
    wallGroup.add(wallPanel);
    wallGroup.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(wallPanel.geometry),
        new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
      )
    );
    // Firewall horizontal laser inspection bar
    const scanBar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 3.45), cyanGlowMat);
    wallGroup.add(scanBar);
    m3.add(wallGroup);

    // Protected Enterprise Vault Core behind the Firewall (Right Side)
    const vault = new THREE.Group();
    vault.position.set(2.15, 0, 0);
    const vaultCore = new THREE.Mesh(new THREE.BoxGeometry(1.35, 2.0, 1.35), metalMat);
    vault.add(vaultCore);
    vault.add(
      new THREE.LineSegments(
        new THREE.EdgesGeometry(vaultCore.geometry),
        new THREE.LineBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.8 })
      )
    );
    const vaultStrip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.6, 0.14), ledGreen);
    vaultStrip.position.set(-0.69, 0, 0);
    vault.add(vaultStrip);
    m3.add(vault);

    // Live Incoming Network Packets: Clean (cyan -> passes through) vs Threat (crimson -> blocked & deflected!)
    const threatMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const fwPackets: {
      mesh: THREE.Mesh;
      isThreat: boolean;
      x: number;
      y: number;
      z: number;
      vy: number;
      vx: number;
      deflected: boolean;
    }[] = [];

    for (let i = 0; i < 18; i++) {
      const isThreat = i % 3 === 0;
      const pkt = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.09, 0.09),
        isThreat ? threatMat : cyanGlowMat
      );
      const y = (Math.random() - 0.5) * 2.4;
      const z = (Math.random() - 0.5) * 2.4;
      const x = -3.4 + Math.random() * 3.0;
      pkt.position.set(x, y, z);
      m3.add(pkt);
      fwPackets.push({
        mesh: pkt,
        isThreat,
        x,
        y,
        z,
        vx: 1.8 + Math.random() * 0.9,
        vy: 0,
        deflected: false,
      });
    }
    models.push(m3);

    models.forEach((g, i) => {
      g.scale.setScalar(i === activeRef.current ? 1 : 0.001);
      scene.add(g);
    });
    const scales = models.map((_, i) => (i === activeRef.current ? 1 : 0));

    // Smooth pointer tilt
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        targetX = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.45;
        targetY = (-(((e.clientY - rect.top) / rect.height) * 2 - 1)) * 0.25;
      }
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 680;
      const h = container.clientHeight || 540;
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
      const targetIdx = activeRef.current;

      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;

      models.forEach((group, idx) => {
        const goal = idx === targetIdx ? 1 : 0;
        scales[idx] += (goal - scales[idx]) * 0.1;
        group.scale.setScalar(Math.max(0.0001, scales[idx]));
        group.visible = scales[idx] > 0.01;
        group.rotation.y = Math.sin(t * 0.35) * 0.32 + curX;
        group.rotation.x = curY * 0.45;
      });

      // Animate Model 0: Stack data packets
      if (m0.visible) {
        stackPackets.forEach((p) => {
          const cycle = (t * 0.65 + p.phase) % 1;
          const y = p.dir > 0 ? -1.1 + cycle * 2.55 : 1.45 - cycle * 2.55;
          p.mesh.position.set(p.x, y, 0);
        });
      }

      // Animate Model 1: Neural inference sparks
      if (m1.visible) {
        nnPulses.forEach((p) => {
          p.t += delta * p.speed;
          if (p.t >= 1) {
            p.t = 0;
            p.synIdx = Math.floor(Math.random() * synapses.length);
          }
          const syn = synapses[p.synIdx];
          p.mesh.position.lerpVectors(syn.from, syn.to, p.t);
        });
      }

      // Animate Model 2: Server rack LEDs & Fiber uplink pulses
      if (m2.visible) {
        rackLeds.forEach((l) => {
          const blink = Math.sin(t * 5.2 + l.phase) > -0.25 ? 1 : 0.25;
          l.mesh.scale.setScalar(blink);
        });
        fiberPackets.forEach((fp) => {
          fp.t = (fp.t + delta * 0.65) % 1;
          fp.curve.getPoint(fp.t, fp.mesh.position);
        });
        hubRing.rotation.z = t * 1.1;
      }

      // Animate Model 3: Firewall laser scan & packet inspection/deflection
      if (m3.visible) {
        scanBar.position.y = Math.sin(t * 2.2) * 1.45;
        fwPackets.forEach((p) => {
          if (!p.deflected) {
            p.x += delta * p.vx;
            if (p.isThreat && p.x >= -0.18) {
              p.deflected = true;
              p.vx = -1.6;
              p.vy = (p.y >= 0 ? 1 : -1) * (1.2 + Math.random() * 0.9);
            } else if (!p.isThreat && p.x > 1.75) {
              p.x = -3.4;
              p.y = (Math.random() - 0.5) * 2.4;
              p.z = (Math.random() - 0.5) * 2.4;
            }
          } else {
            p.x += delta * p.vx;
            p.y += delta * p.vy;
            if (p.x < -3.4 || Math.abs(p.y) > 2.6) {
              p.deflected = false;
              p.x = -3.4;
              p.y = (Math.random() - 0.5) * 2.4;
              p.z = (Math.random() - 0.5) * 2.4;
              p.vx = 1.8 + Math.random() * 0.9;
              p.vy = 0;
            }
          }
          p.mesh.position.set(p.x, p.y, p.z);
        });
      }

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
      aria-label="Interactive 3D Technical Service Architecture"
    />
  );
}
