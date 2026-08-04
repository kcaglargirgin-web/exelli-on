import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PlanetCanvasProps {
  activeSection: string;
}

// Section color themes & spatial target parameters
const SECTION_THEMES: Record<
  string,
  {
    ringColor: number;
    coreColor: number;
    particleColor: number;
    bgGlowColor: number;
    planetScale: number;
    planetY: number;
    planetX: number;
    tiltX: number;
    tiltY: number;
  }
> = {
  intro: {
    ringColor: 0xd8b6a9, // Soft Rose Champagne
    coreColor: 0x332d2b,
    particleColor: 0xd8b6a9,
    bgGlowColor: 0xe3d0c7,
    planetScale: 1.0,
    planetY: 0,
    planetX: 0,
    tiltX: 0.4,
    tiltY: 0.2,
  },
  about: {
    ringColor: 0x2dd4bf, // Luminous Emerald Cyan
    coreColor: 0x112926,
    particleColor: 0x5eead4,
    bgGlowColor: 0xccfbf1,
    planetScale: 1.15,
    planetY: -0.3,
    planetX: 1.2,
    tiltX: 0.6,
    tiltY: -0.4,
  },
  'what-we-do': {
    ringColor: 0x818cf8, // Cosmic Indigo
    coreColor: 0x1e1b4b,
    particleColor: 0xa5b4fc,
    bgGlowColor: 0xe0e7ff,
    planetScale: 1.05,
    planetY: 0.4,
    planetX: -1.0,
    tiltX: -0.3,
    tiltY: 0.5,
  },
  solutions: {
    ringColor: 0xf59e0b, // Radiant Solar Amber
    coreColor: 0x451a03,
    particleColor: 0xfde047,
    bgGlowColor: 0xfef3c7,
    planetScale: 1.25,
    planetY: -0.2,
    planetX: 0,
    tiltX: 0.8,
    tiltY: 0.1,
  },
  contact: {
    ringColor: 0xf43f5e, // Celestial Rose Crimson
    coreColor: 0x4c0519,
    particleColor: 0xfca5a5,
    bgGlowColor: 0xffe4e6,
    planetScale: 1.1,
    planetY: 0.1,
    planetX: 0,
    tiltX: 0.3,
    tiltY: 0.3,
  },
};

export const PlanetCanvas: React.FC<PlanetCanvasProps> = ({ activeSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep track of current target parameters for lerp
  const targetThemeRef = useRef(SECTION_THEMES.intro);

  useEffect(() => {
    if (SECTION_THEMES[activeSection]) {
      targetThemeRef.current = SECTION_THEMES[activeSection];
    }
  }, [activeSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let reqId: number;
    let timerId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    // Defer WebGL setup slightly so the DOM paints INSTANTLY on initial load (especially on mobile)
    const initWebGL = () => {
      const isMobile = window.innerWidth < 768;

      // --- 1. Scene & Camera Setup ---
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: isMobile ? 'default' : 'high-performance',
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      // Cap pixel ratio to 1 on mobile for maximum GPU performance & zero opening lag
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      // --- 2. Planet Main Hierarchy Group ---
      const planetGroup = new THREE.Group();
      scene.add(planetGroup);

      // --- 3. Inner Core Sphere ---
      const coreGeo = new THREE.IcosahedronGeometry(1.6, isMobile ? 3 : 4);
      const coreMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        emissive: 0xd8b6a9,
        emissiveIntensity: 0.2,
        shininess: 90,
        flatShading: true,
        transparent: true,
        opacity: 0.85,
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      planetGroup.add(coreMesh);

      // Wireframe Outer Mesh
      const wireGeo = new THREE.IcosahedronGeometry(1.68, isMobile ? 1 : 2);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xd8b6a9,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const wireMesh = new THREE.Mesh(wireGeo, wireMat);
      planetGroup.add(wireMesh);

      // Latitude / Longitude Ring Lines
      const latGroup = new THREE.Group();
      const ringSegs = isMobile ? 32 : 64;
      for (let i = -3; i <= 3; i++) {
        const radius = Math.cos((i * Math.PI) / 8) * 1.62;
        const height = Math.sin((i * Math.PI) / 8) * 1.62;
        const ringGeo = new THREE.RingGeometry(radius - 0.01, radius + 0.01, ringSegs);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd8b6a9,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.15,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = height;
        latGroup.add(ringMesh);
      }
      planetGroup.add(latGroup);

      // --- 4. Main Orbit Rings ---
      const orbitRingMaterials: THREE.MeshBasicMaterial[] = [];
      const orbitSegs = isMobile ? 48 : 96;

      const createRing = (
        innerR: number,
        outerR: number,
        rotX: number,
        rotY: number,
        opacity = 0.6
      ) => {
        const ringGeo = new THREE.RingGeometry(innerR, outerR, orbitSegs);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xd8b6a9,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: opacity,
        });
        orbitRingMaterials.push(ringMat);

        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = rotX;
        ringMesh.rotation.y = rotY;

        const group = new THREE.Group();
        group.add(ringMesh);
        return { group, ringMesh, ringMat, radius: (innerR + outerR) / 2 };
      };

      const orbit1 = createRing(2.4, 2.45, Math.PI / 2.3, Math.PI / 8, 0.7);
      const orbit2 = createRing(3.1, 3.13, Math.PI / 3, -Math.PI / 6, 0.5);
      const orbit3 = createRing(3.8, 3.82, Math.PI / 1.8, Math.PI / 4, 0.35);

      planetGroup.add(orbit1.group);
      planetGroup.add(orbit2.group);
      planetGroup.add(orbit3.group);

      // --- 5. Synaptic Pulses along the Orbits & Orbiting Satellites ---
      const satGeo = new THREE.SphereGeometry(0.08, isMobile ? 8 : 16, isMobile ? 8 : 16);
      const satMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sat1 = new THREE.Mesh(satGeo, satMat1);
      sat1.position.set(2.42, 0, 0);

      const satMat2 = new THREE.MeshBasicMaterial({ color: 0xd8b6a9 });
      const sat2 = new THREE.Mesh(satGeo, satMat2);
      sat2.position.set(-3.12, 0, 0);

      orbit1.group.add(sat1);
      orbit2.group.add(sat2);

      // Synapse Action Potential Pulses
      interface OrbitPulse {
        mesh: THREE.Mesh;
        mat: THREE.MeshStandardMaterial;
        radius: number;
        speed: number;
        initialAngle: number;
        scaleOffset: number;
      }

      const orbitPulses: OrbitPulse[] = [];
      const pulseGeo = new THREE.SphereGeometry(0.05, 12, 12);

      const addPulsesToRing = (
        ringMesh: THREE.Mesh,
        radius: number,
        count: number,
        speedDirection: number
      ) => {
        for (let i = 0; i < count; i++) {
          const mat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xd8b6a9,
            emissiveIntensity: 3.2,
            roughness: 0.1,
          });
          const pulseMesh = new THREE.Mesh(pulseGeo, mat);
          ringMesh.add(pulseMesh);
          orbitPulses.push({
            mesh: pulseMesh,
            mat: mat,
            radius: radius,
            speed: (0.6 + Math.random() * 0.6) * speedDirection,
            initialAngle: (i / count) * Math.PI * 2 + Math.random() * 0.4,
            scaleOffset: Math.random() * 10,
          });
        }
      };

      addPulsesToRing(orbit1.ringMesh, 2.425, isMobile ? 3 : 5, 1);
      addPulsesToRing(orbit2.ringMesh, 3.115, isMobile ? 3 : 5, -1);
      addPulsesToRing(orbit3.ringMesh, 3.81, isMobile ? 2 : 4, 1);

      // --- 6. Ambient Circular Particle Dust Swarm ---
      const createCircleParticleTexture = (): THREE.CanvasTexture => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.7)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(32, 32, 32, 0, Math.PI * 2);
          ctx.fill();
        }
        return new THREE.CanvasTexture(canvas);
      };

      const particleCount = isMobile ? 120 : 350;
      const particlePositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const radius = 2.2 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
      );

      const particleMat = new THREE.PointsMaterial({
        color: 0xd8b6a9,
        size: isMobile ? 0.12 : 0.09,
        map: createCircleParticleTexture(),
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      planetGroup.add(particleSystem);

      // --- 7. Lighting Setup ---
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
      dirLight1.position.set(5, 5, 4);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xd8b6a9, 1.2);
      dirLight2.position.set(-5, -3, -2);
      scene.add(dirLight2);

      // Current animated state variables for smooth lerping
      const currentRingColor = new THREE.Color(SECTION_THEMES.intro.ringColor);
      const currentParticleColor = new THREE.Color(SECTION_THEMES.intro.particleColor);

      // Mouse Parallax
      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
      };
      window.addEventListener('mousemove', handleMouseMove);

      // --- 8. Window Resize Handler ---
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        if (renderer) {
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      // --- 9. Animation Loop ---
      let clock = new THREE.Clock();

      const animate = () => {
        reqId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Target state from active section
        const target = targetThemeRef.current;
        const targetRingCol = new THREE.Color(target.ringColor);
        const targetParticleCol = new THREE.Color(target.particleColor);

        // Smooth color lerp
        currentRingColor.lerp(targetRingCol, 0.04);
        currentParticleColor.lerp(targetParticleCol, 0.04);

        // Apply updated colors to meshes & materials
        orbitRingMaterials.forEach((mat) => {
          mat.color.copy(currentRingColor);
        });
        wireMat.color.copy(currentRingColor);
        particleMat.color.copy(currentParticleColor);
        coreMat.emissive.copy(currentRingColor);
        dirLight2.color.copy(currentRingColor);

        // Lerp position & scale
        planetGroup.scale.x = THREE.MathUtils.lerp(
          planetGroup.scale.x,
          target.planetScale,
          0.04
        );
        planetGroup.scale.y = THREE.MathUtils.lerp(
          planetGroup.scale.y,
          target.planetScale,
          0.04
        );
        planetGroup.scale.z = THREE.MathUtils.lerp(
          planetGroup.scale.z,
          target.planetScale,
          0.04
        );

        planetGroup.position.x = THREE.MathUtils.lerp(
          planetGroup.position.x,
          target.planetX + mouseX * 0.5,
          0.04
        );
        planetGroup.position.y = THREE.MathUtils.lerp(
          planetGroup.position.y,
          target.planetY - mouseY * 0.5,
          0.04
        );

        // Rotations & Orbits
        coreMesh.rotation.y = elapsedTime * 0.12;
        wireMesh.rotation.y = -elapsedTime * 0.08;
        latGroup.rotation.y = elapsedTime * 0.05;

        orbit1.group.rotation.z = elapsedTime * 0.15;
        orbit2.group.rotation.z = -elapsedTime * 0.1;
        orbit3.group.rotation.z = elapsedTime * 0.08;

        particleSystem.rotation.y = elapsedTime * 0.03;

        // Animate traveling synaptic pulses on the orbits
        orbitPulses.forEach((p) => {
          const currentAngle = p.initialAngle + elapsedTime * p.speed;
          p.mesh.position.x = p.radius * Math.cos(currentAngle);
          p.mesh.position.y = p.radius * Math.sin(currentAngle);
          p.mesh.position.z = 0;

          // Sync emissive color with current section ring theme
          p.mat.emissive.copy(currentRingColor);

          // Subtle rhythmic pulse breathing
          const pulseScale = 1.0 + Math.sin(elapsedTime * 5.0 + p.scaleOffset) * 0.4;
          p.mesh.scale.set(pulseScale, pulseScale, pulseScale);
        });

        // Group Tilt
        planetGroup.rotation.x = THREE.MathUtils.lerp(
          planetGroup.rotation.x,
          target.tiltX + mouseY * 0.2,
          0.04
        );
        planetGroup.rotation.y = THREE.MathUtils.lerp(
          planetGroup.rotation.y,
          target.tiltY + mouseX * 0.2,
          0.04
        );

        if (renderer) {
          renderer.render(scene, camera);
        }
      };

      animate();

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    };

    // Trigger initialization after DOM paint
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      timerId = window.requestIdleCallback(initWebGL, { timeout: 100 });
    } else {
      // @ts-ignore
      timerId = setTimeout(initWebGL, 30);
    }

    // Cleanup
    return () => {
      if ('cancelIdleCallback' in window) {
        // @ts-ignore
        window.cancelIdleCallback(timerId);
      } else {
        clearTimeout(timerId);
      }
      if (reqId) {
        cancelAnimationFrame(reqId);
      }
      if (renderer) {
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000"
      style={{ opacity: 0.9 }}
    />
  );
};
