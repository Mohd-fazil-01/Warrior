import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PlanetCanvasProps {
  currentPage: string;
}

export function PlanetCanvas({ currentPage }: PlanetCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Mutable scroll tracking to avoid React re-renders and WebGL context recreation
    const scrollTracker = {
      y: window.scrollY,
      progress: 0,
    };

    const handleScroll = () => {
      scrollTracker.y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTracker.progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. Scene, Camera & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Custom GLSL Shaders for the Planet Core
    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -normalize(mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColorCore;
      uniform vec3 uColorGrid;
      uniform vec3 uColorGlow;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vViewPosition;

      // Classic 3D Noise for continental cyber grids
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.1, 0.1, 0.1));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f*f*(3.0-2.0*f);
        return mix(mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), f.x),
                       mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                       mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
      }

      void main() {
        // Fresnel edge highlighted glow
        float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewPosition)), 2.0);

        // Procedural cyber-continents
        float n = noise(vPosition * 2.2 + vec3(uTime * 0.02, uTime * 0.03, uTime * 0.01));
        float continent = smoothstep(0.43, 0.55, n);

        // Cyber Grid Lines overlaying the continents
        vec2 gridUv = fract(vUv * 24.0);
        float gridLine = smoothstep(0.05, 0.0, abs(gridUv.x - 0.5)) + smoothstep(0.05, 0.0, abs(gridUv.y - 0.5));
        gridLine = clamp(gridLine, 0.0, 1.0);

        // Pulse energy scanline bands
        float pulse = smoothstep(0.04, 0.0, abs(fract(vUv.x * 2.0 - uTime * 0.08) - 0.5));
        float latPulse = smoothstep(0.06, 0.0, abs(fract(vUv.y * 3.0 - uTime * 0.12) - 0.5));
        float activePulse = max(pulse, latPulse) * continent;

        // Base color calculations
        vec3 finalColor = uColorCore;

        // Apply cyber continents with grid lines
        vec3 gridColor = mix(uColorCore, uColorGrid, gridLine * 0.85);
        finalColor = mix(finalColor, gridColor, continent);

        // Add glow scanlines and Fresnel atmosphere rim glow
        finalColor += uColorGlow * activePulse * 1.6;
        finalColor += uColorGrid * fresnel * 0.6;

        gl_FragColor = vec4(finalColor, 0.95);
      }
    `;

    // Planet Core Sphere Geometry and ShaderMaterial
    const planetGeometry = new THREE.SphereGeometry(1.6, 64, 64);
    const planetMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorCore: { value: new THREE.Color('#060b26') },
        uColorGrid: { value: new THREE.Color('#00dddd') },
        uColorGlow: { value: new THREE.Color('#79ff5b') },
      },
    });

    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

    // 3. Atmosphere Fresnel Outer Glow Sphere
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -normalize(mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const atmosphereFragmentShader = `
      uniform vec3 uColorGlow;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewPosition)), 4.0);
        vec3 finalGlow = uColorGlow * fresnel * 2.2;
        gl_FragColor = vec4(finalGlow, fresnel * 0.8);
      }
    `;

    const atmosphereGeometry = new THREE.SphereGeometry(1.68, 64, 64);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uColorGlow: { value: new THREE.Color('#79ff5b') },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

    // 4. Tactical Holographic Orbital Rings
    const ringGeometry = new THREE.RingGeometry(2.2, 2.5, 64, 8);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00dddd,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 2.3;
    ringMesh.rotation.y = Math.PI / 8;

    // Secondary pink accent orbit ring
    const ringGeometry2 = new THREE.RingGeometry(2.35, 2.38, 64, 1);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xff0099,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    });
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ringMesh2.rotation.x = Math.PI / 2.1;
    ringMesh2.rotation.y = -Math.PI / 6;

    // 5. Small Data Orbiting Satellites
    const satelliteGroup = new THREE.Group();

    const sat1Geometry = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const sat1Material = new THREE.MeshBasicMaterial({ color: 0x79ff5b, wireframe: true });
    const sat1 = new THREE.Mesh(sat1Geometry, sat1Material);
    satelliteGroup.add(sat1);

    const sat2Geometry = new THREE.OctahedronGeometry(0.1, 0);
    const sat2Material = new THREE.MeshBasicMaterial({ color: 0x00dddd });
    const sat2 = new THREE.Mesh(sat2Geometry, sat2Material);
    satelliteGroup.add(sat2);

    // Grouping all assets
    const planetGroup = new THREE.Group();
    planetGroup.add(planetMesh);
    planetGroup.add(atmosphereMesh);
    planetGroup.add(ringMesh);
    planetGroup.add(ringMesh2);
    planetGroup.add(satelliteGroup);
    scene.add(planetGroup);

    // Initial position trigger to avoid jumpy starts
    planetGroup.scale.set(0.1, 0.1, 0.1);

    // Target positions based on the active page and viewport width
    const getTargets = (page: string, isMobile: boolean, scrollP: number) => {
      if (isMobile) {
        switch (page) {
          case 'home':
            // Centered lower position on mobile
            return { x: 0, y: -1.2, z: -1, scale: 0.95 };
          case 'about':
            return { x: 0, y: -1.0, z: -1, scale: 0.9 };
          case 'services':
            return { x: 0, y: -1.3, z: -1.5, scale: 0.75 };
          case 'service-details':
            return { x: 0, y: -1.1, z: -1.5, scale: 0.75 };
          case 'contact':
            return { x: 0, y: -1.1, z: -1.2, scale: 0.85 };
          default:
            return { x: 0, y: -1.2, z: -1, scale: 0.95 };
        }
      } else {
        // Desktop positions
        switch (page) {
          case 'home': {
            // Highly immersive home scroll coordinates (Hero -> Capabilities -> HUD)
            if (scrollP < 0.4) {
              // Section 1: Hero - Right side
              return { x: 2.2, y: 0.2, z: 0, scale: 1.35 };
            } else if (scrollP < 0.75) {
              // Section 2: Capabilities - Left side
              const factor = (scrollP - 0.4) / 0.35; // 0 to 1
              return {
                x: THREE.MathUtils.lerp(2.2, -2.3, factor),
                y: THREE.MathUtils.lerp(0.2, 0.0, factor),
                z: 0,
                scale: THREE.MathUtils.lerp(1.35, 1.3, factor),
              };
            } else {
              // Section 3: Tactical HUD - Center, slightly lower
              const factor = (scrollP - 0.75) / 0.25; // 0 to 1
              return {
                x: THREE.MathUtils.lerp(-2.3, 0.0, factor),
                y: THREE.MathUtils.lerp(0.0, -1.2, factor),
                z: 0,
                scale: THREE.MathUtils.lerp(1.3, 1.5, factor),
              };
            }
          }
          case 'about':
            return { x: -2.3, y: 0, z: 0, scale: 1.3 };
          case 'services':
            return { x: 2.5, y: -0.2, z: -0.5, scale: 1.15 };
          case 'service-details':
            return { x: -2.3, y: 0, z: -0.5, scale: 1.1 };
          case 'contact':
            return { x: 2.3, y: -0.2, z: 0, scale: 1.35 };
          default:
            return { x: 2.2, y: 0.2, z: 0, scale: 1.35 };
        }
      }
    };

    // Responsive Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render / Animation loop
    const clock = new THREE.Clock();
    let animFrameId: number;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const isMobile = window.innerWidth < 1024;

      // Slowly rotate elements on axis
      planetMesh.rotation.y = elapsedTime * 0.08;
      planetMesh.rotation.x = elapsedTime * 0.02;

      ringMesh.rotation.z = -elapsedTime * 0.05;
      ringMesh2.rotation.z = elapsedTime * 0.07;

      // Animate Satellites
      sat1.position.x = Math.cos(elapsedTime * 0.6) * 2.6;
      sat1.position.z = Math.sin(elapsedTime * 0.6) * 2.6;
      sat1.position.y = Math.sin(elapsedTime * 0.3) * 0.8;
      sat1.rotation.y = elapsedTime * 2;

      sat2.position.x = Math.cos(-elapsedTime * 0.8 + 2.0) * 2.9;
      sat2.position.z = Math.sin(-elapsedTime * 0.8 + 2.0) * 2.9;
      sat2.position.y = Math.cos(elapsedTime * 0.4) * 0.6;
      sat2.rotation.x = elapsedTime * 1.5;

      // Update shader uniform
      planetMaterial.uniforms.uTime.value = elapsedTime;

      // Get current scroll-linked target coordinates
      const targets = getTargets(currentPage, isMobile, scrollTracker.progress);

      // Scroll reactive subtle swaying offsets
      const scrollFloatX = Math.sin(scrollTracker.y * 0.002) * (isMobile ? 0.15 : 0.3);
      let finalTargetX = targets.x + scrollFloatX;
      let finalTargetY = targets.y;

      // If we are not on the home page, add a tiny standard parallax offset to scroll
      if (currentPage !== 'home') {
        const scrollOffsetFactor = isMobile ? 0.0005 : 0.001;
        finalTargetY = targets.y - (scrollTracker.y * scrollOffsetFactor);
      }

      // Linear Interpolation (Lerp) for smooth positioning transitions
      planetGroup.position.x += (finalTargetX - planetGroup.position.x) * 0.06;
      planetGroup.position.y += (finalTargetY - planetGroup.position.y) * 0.06;
      planetGroup.position.z += (targets.z - planetGroup.position.z) * 0.06;

      const targetScale = targets.scale;
      planetGroup.scale.x += (targetScale - planetGroup.scale.x) * 0.06;
      planetGroup.scale.y += (targetScale - planetGroup.scale.y) * 0.06;
      planetGroup.scale.z += (targetScale - planetGroup.scale.z) * 0.06;

      // Render scene
      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(tick);
    };

    // Launch loop
    tick();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      planetGeometry.dispose();
      planetMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      sat1Geometry.dispose();
      sat1Material.dispose();
      sat2Geometry.dispose();
      sat2Material.dispose();
      renderer.dispose();
    };
  }, [currentPage]); // Only re-recreates scene when currentPage changes (which is rare), completely immune to scroll lag!

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    />
  );
}
