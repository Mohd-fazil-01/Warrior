import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeSkull() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00ff88, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 10);
    pointLight.position.set(-3, 2, 2);
    scene.add(pointLight);

    // Create 3D Holographic Cyber Skull Group
    const skullGroup = new THREE.Group();

    // Materials - Glowing neon-green emissive wireframe
    const skullMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ff88,
      emissive: 0x00ff88,
      emissiveIntensity: 0.8,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9
    });

    const eyeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      wireframe: true
    });

    const scanRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    // 1. Cranium (Head Dome)
    const cranGeo = new THREE.SphereGeometry(1.3, 14, 12);
    const cranMesh = new THREE.Mesh(cranGeo, skullMaterial);
    cranMesh.scale.set(1, 1.15, 0.95);
    skullGroup.add(cranMesh);

    // 2. Eye Sockets
    const eyeSocketGeo = new THREE.SphereGeometry(0.3, 8, 8);
    
    const leftEye = new THREE.Mesh(eyeSocketGeo, eyeMaterial);
    leftEye.position.set(0.45, 0.15, 0.95);
    skullGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeSocketGeo, eyeMaterial);
    rightEye.position.set(-0.45, 0.15, 0.95);
    skullGroup.add(rightEye);

    // 3. Nose Cavity
    const noseGeo = new THREE.ConeGeometry(0.18, 0.35, 4);
    const noseMesh = new THREE.Mesh(noseGeo, skullMaterial);
    noseMesh.rotation.x = Math.PI;
    noseMesh.position.set(0, -0.22, 1.12);
    skullGroup.add(noseMesh);

    // 4. Jaw & Teeth structure
    const jawGeo = new THREE.BoxGeometry(1.1, 0.5, 0.8);
    const jawMesh = new THREE.Mesh(jawGeo, skullMaterial);
    jawMesh.position.set(0, -0.9, 0.45);
    skullGroup.add(jawMesh);

    const teethGeo = new THREE.CylinderGeometry(0.45, 0.45, 0.25, 12, 1, true);
    const teethMesh = new THREE.Mesh(teethGeo, skullMaterial);
    teethMesh.position.set(0, -0.62, 0.6);
    teethMesh.rotation.x = Math.PI / 12;
    skullGroup.add(teethMesh);

    // 5. Holographic Scanning Laser Rings
    const ringGeo = new THREE.TorusGeometry(2.0, 0.05, 8, 36);
    const scanRing = new THREE.Mesh(ringGeo, scanRingMaterial);
    scanRing.rotation.x = Math.PI / 2;
    scene.add(scanRing);

    const innerRingGeo = new THREE.TorusGeometry(2.3, 0.02, 6, 24);
    const innerScanRing = new THREE.Mesh(innerRingGeo, scanRingMaterial);
    innerScanRing.rotation.x = Math.PI / 2;
    scene.add(innerScanRing);

    // 6. Orbiting Cyber Binary Particle cloud
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Cylinder distribution around the skull
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 1.5;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.06,
      transparent: true,
      opacity: 0.7
    });

    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // Add skull to scene
    scene.add(skullGroup);

    // Target States for Scroll Interpolation
    const scrollState = {
      currentScroll: 0,
      targetScroll: 0,
      positionX: 1.8,
      positionY: 0,
      rotationY: -Math.PI / 5,
      rotationX: Math.PI / 12
    };

    // Scroll Handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      scrollState.targetScroll = scrollHeight > 0 ? scrollPos / scrollHeight : 0;
    };

    window.addEventListener('scroll', handleScroll);

    // Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w < 768) {
        scrollState.positionX = 0;
        skullGroup.scale.set(0.9, 0.9, 0.9);
      } else {
        skullGroup.scale.set(1.2, 1.2, 1.2);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Animation Loop
    const clock = new THREE.Clock();
    let reqId = 0;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // 1. Lerp scroll progress
      scrollState.currentScroll += (scrollState.targetScroll - scrollState.currentScroll) * 0.08;
      const p = scrollState.currentScroll;

      // 2. Animate coordinates and colors based on scroll progress
      if (window.innerWidth >= 768) {
        if (p < 0.5) {
          // Hero to Section 2 (Moves Right to Left, rotates)
          const factor = p / 0.5; // 0 to 1
          skullGroup.position.x = THREE.MathUtils.lerp(1.8, -1.8, factor);
          skullGroup.position.y = THREE.MathUtils.lerp(0, 0.2, factor);
          skullGroup.rotation.y = THREE.MathUtils.lerp(-Math.PI / 5, Math.PI / 4, factor);
          skullGroup.rotation.x = THREE.MathUtils.lerp(Math.PI / 12, -Math.PI / 12, factor);

          // Color: Neon Green (0x00ff88)
          skullMaterial.color.setHex(0x00ff88);
          skullMaterial.emissive.setHex(0x00ff88);
          particleMat.color.setHex(0x00ff88);
          scanRingMaterial.color.setHex(0x00f0ff);
        } else {
          // Section 2 to Section 3 (Moves Left to Center, faces forward, critical state!)
          const factor = (p - 0.5) / 0.5; // 0 to 1
          skullGroup.position.x = THREE.MathUtils.lerp(-1.8, 0, factor);
          skullGroup.position.y = THREE.MathUtils.lerp(0.2, -0.4, factor);
          skullGroup.rotation.y = THREE.MathUtils.lerp(Math.PI / 4, Math.PI * 2, factor);
          skullGroup.rotation.x = THREE.MathUtils.lerp(-Math.PI / 12, Math.PI / 10, factor);

          // Transition color from Neon Green to Hacking Warning Crimson Red (0xff0055)!
          const rColor = new THREE.Color(0x00ff88).lerp(new THREE.Color(0xff0055), factor);
          skullMaterial.color.copy(rColor);
          skullMaterial.emissive.copy(rColor);
          particleMat.color.copy(rColor);

          const rRingColor = new THREE.Color(0x00f0ff).lerp(new THREE.Color(0xffaa00), factor);
          scanRingMaterial.color.copy(rRingColor);
        }
      } else {
        // Mobile scroll rotations
        skullGroup.position.x = 0;
        skullGroup.position.y = -0.2;
        skullGroup.rotation.y = -Math.PI / 5 + p * Math.PI * 2.2;
        
        // Mobile color shift
        const rColor = new THREE.Color(0x00ff88).lerp(new THREE.Color(0xff0055), p);
        skullMaterial.color.copy(rColor);
        skullMaterial.emissive.copy(rColor);
      }

      // Add high-tech idle breathing animation
      skullGroup.position.y += Math.sin(elapsedTime * 2) * 0.035;

      // Pulse red eyepieces
      const eyeIntensity = Math.abs(Math.sin(elapsedTime * 4.5)) * 0.4 + 0.6;
      eyeMaterial.color.setRGB(eyeIntensity * 1.0, 0, eyeIntensity * 0.3);

      // Animate laser scanning rings
      scanRing.position.y = Math.sin(elapsedTime * 1.5) * 2;
      scanRing.rotation.z += 0.01;

      innerScanRing.position.y = Math.cos(elapsedTime * 2) * 1.8;
      innerScanRing.rotation.z -= 0.015;

      // Spin binary particle clouds
      particleCloud.rotation.y += 0.003;
      particleCloud.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanups
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
      cranGeo.dispose();
      eyeSocketGeo.dispose();
      noseGeo.dispose();
      jawGeo.dispose();
      teethGeo.dispose();
      ringGeo.dispose();
      innerRingGeo.dispose();
      particleGeo.dispose();
      skullMaterial.dispose();
      eyeMaterial.dispose();
      scanRingMaterial.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-transparent transition-opacity duration-300"
    />
  );
}
export default ThreeSkull;
