import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Background3DCanvasProps {
  scrollY: number;
}

export const Background3DCanvas: React.FC<Background3DCanvasProps> = ({ scrollY }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const gridMeshRef = useRef<THREE.LineSegments | null>(null);
  const innerPolyRef = useRef<THREE.Mesh | null>(null);
  const outerPolyRef = useRef<THREE.LineSegments | null>(null);

  const targetScrollProgress = useRef(0);
  const currentScrollProgress = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0a0e14, 0.018);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 22);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0e14, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Main Objects Group
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // A. Outer Wireframe Polyhedron (Titanium Champagne)
    const icosaGeometry = new THREE.IcosahedronGeometry(6.5, 1);
    const wireframeGeometry = new THREE.WireframeGeometry(icosaGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x94a3b8, // Slate Steel Silver
      linewidth: 1,
      transparent: true,
      opacity: 0.35,
    });
    const outerPoly = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    meshGroup.add(outerPoly);
    outerPolyRef.current = outerPoly;

    // B. Inner Faceted Core Mesh (Minimal Amber/Gold Metallic Accent)
    const innerGeo = new THREE.IcosahedronGeometry(4.2, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x222a36,
      emissive: 0x111827,
      specular: 0x38bdf8,
      shininess: 40,
      wireframe: false,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerPoly = new THREE.Mesh(innerGeo, innerMat);
    meshGroup.add(innerPoly);
    innerPolyRef.current = innerPoly;

    // C. 3D Floating Particle Constellation
    const particleCount = 450;
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const baseColor1 = new THREE.Color(0x38bdf8); // Sky blue
    const baseColor2 = new THREE.Color(0x34d399); // Emerald
    const baseColor3 = new THREE.Color(0xe2e8f0); // Platinum

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const mix = Math.random();
      const pColor = mix < 0.4 ? baseColor1 : mix < 0.7 ? baseColor2 : baseColor3;
      particleColors[i * 3] = pColor.r;
      particleColors[i * 3 + 1] = pColor.g;
      particleColors[i * 3 + 2] = pColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);
    particlesMeshRef.current = particlesMesh;

    // D. 3D Perspective Grid Floor
    const gridHelper = new THREE.GridHelper(120, 40, 0x334155, 0x1e293b);
    gridHelper.position.y = -18;
    gridHelper.position.z = -10;
    scene.add(gridHelper);

    // E. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(15, 20, 15);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x34d399, 0.8);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    // Mouse position state for subtle parallax
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll lerp
      currentScrollProgress.current +=
        (targetScrollProgress.current - currentScrollProgress.current) * 0.05;

      const p = currentScrollProgress.current;

      // Rotate Main Group
      if (meshGroupRef.current) {
        meshGroupRef.current.rotation.x = elapsedTime * 0.12 + p * Math.PI * 1.5;
        meshGroupRef.current.rotation.y = elapsedTime * 0.18 + p * Math.PI * 2.0;

        // Position shifts based on scroll section journey
        meshGroupRef.current.position.x = Math.sin(p * Math.PI * 3) * 6 + mouseX * 1.5;
        meshGroupRef.current.position.y = Math.cos(p * Math.PI * 2) * 3 - mouseY * 1.5;
        meshGroupRef.current.position.z = -p * 15 + Math.sin(elapsedTime * 0.5) * 0.5;
      }

      // Rotate Inner and Outer Polys separately
      if (outerPolyRef.current) {
        outerPolyRef.current.rotation.z = elapsedTime * 0.1;
      }
      if (innerPolyRef.current) {
        innerPolyRef.current.rotation.x = -elapsedTime * 0.2;
      }

      // Particle Motion
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y = elapsedTime * 0.03 + p * 1.2;
      }

      // Camera dynamic pan
      if (cameraRef.current) {
        cameraRef.current.position.y = -p * 8 + mouseY * 0.8;
        cameraRef.current.lookAt(0, -p * 6, 0);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  // Update target progress on scrollY change
  useEffect(() => {
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    targetScrollProgress.current = Math.min(Math.max(scrollY / maxScroll, 0), 1);
  }, [scrollY]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
};
