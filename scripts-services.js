const heroSection = document.querySelector(".hero-section");

function openModal(projectId) {
  document.getElementById(`modal-${projectId}`).style.display = 'block';
}

function closeModal(projectId) {
  document.getElementById(`modal-${projectId}`).style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links li a");
  const currentPage = document.body.getAttribute("data-page"); // Set this in the HTML body
  
  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
});  

document.addEventListener("DOMContentLoaded", () => {
  // Three.js Setup
  const container = document.getElementById("animation-container");

  if (!container) {
    console.error("Animation container not found.");
    return;
  }

  // Create Scene, Camera, and Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
  container.appendChild(renderer.domElement);

  // Create Grid of Cubes
  const gridSize = 10;
  const cubeSize = 1;
  const gap = 0.5;
  const cubes = [];

  const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });

  for (let x = -gridSize; x <= gridSize; x++) {
    for (let y = -gridSize; y <= gridSize; y++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x * (cubeSize + gap), y * (cubeSize + gap), 0);
      cubes.push(cube);
      scene.add(cube);
    }
  }

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xCCCCCC, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  // Camera Position
  camera.position.z = 25;

  // Animation Function
  function animate() {
    requestAnimationFrame(animate);

    const time = performance.now() * 0.001;
    cubes.forEach((cube, i) => {
      const offset = i / cubes.length;
      cube.rotation.x = time * 0.5 + offset;
      cube.rotation.y = time * 0.5 + offset;
      cube.position.z = Math.sin(time + offset * Math.PI) * 2;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener("resize", () => {
    renderer.setSize(heroSection.clientWidth, heroSection.clientHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});

// Hamburger Menu Logic
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Toggle nav menu visibility on hamburger click
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});