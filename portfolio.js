let currentIndex = 0;
let portfolioData = [];

// Function to open the modal
function openModal(index) {
  currentIndex = index;
  const item = portfolioData[currentIndex];

  // Ensure modal elements exist before updating
  const modalImage = document.querySelector(".modal-image");
  const modalTitle = document.querySelector(".modal-title");
  const modalSubtitle = document.querySelector(".modal-subtitle");
  const modalPiece = document.querySelector(".modal-piece");
  const modalYear = document.querySelector(".modal-year");
  const modalSkills = document.querySelector(".modal-skills");
  const modalLink = document.querySelector(".modal-link");
  const modalDescription = document.querySelector(".modal-description");
  const modal = document.getElementById("modal");

  if (modalImage && modalTitle && modalSubtitle && modalPiece && modalYear && modalSkills && modalLink && modalDescription) {
    modalImage.src = item.details.media[0].src;
    modalTitle.textContent = item.title;
    modalSubtitle.textContent = item.subtitle;
    modalPiece.textContent = item.details.portfolioPiece;
    modalYear.textContent = item.details.year;
    modalSkills.textContent = item.details.skills.join(", ");
    modalLink.href = item.details.link;
    modalDescription.textContent = item.details.description;
  }

  // Display modal with animation
  modal.style.display = "flex";
  modal.classList.remove("modal-fade-in");
  void modal.offsetWidth; // Trigger reflow to restart animation
  modal.classList.add("modal-fade-in");

  // Prevent scrolling
  document.body.classList.add("modal-open");
}

// Function to close the modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.body.classList.remove("modal-open"); // Enable scrolling
}

// Function to navigate the modal
function navigateModal(direction) {
  if (direction === "next") {
    currentIndex = (currentIndex + 1) % portfolioData.length;
  } else if (direction === "prev") {
    currentIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
  }
  openModal(currentIndex);
}

// Initialize portfolio and modal
document.addEventListener("DOMContentLoaded", () => {
  fetch("portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      portfolioData = data;
      const portfolioContainer = document.querySelector(".portfolio-container");
      portfolioContainer.innerHTML = ""; // Clear existing items

      // Render portfolio items
      portfolioData.forEach((item, index) => {
        const portfolioItem = document.createElement("div");
        portfolioItem.classList.add("portfolio-item");
        portfolioItem.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="hover-overlay">
            <h3>${item.title}</h3>
            <p>${item.subtitle}</p>
          </div>
        `;
        portfolioItem.addEventListener("click", () => openModal(index)); // Open modal on click
        portfolioContainer.appendChild(portfolioItem);
      });
    })
    .catch((error) => console.error("Error loading portfolio data:", error));
});

// Ensure modal doesn't display by default
document.getElementById("modal").style.display = "none";

// Close modal when clicking outside content
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal")) {
    closeModal();
  }
});



  // THREE.js Animation Logic
  const container = document.getElementById('animation-container');
  if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Use alpha for transparency
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
  
    const geometry = new THREE.SphereGeometry(15, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  
    const ambientLight = new THREE.AmbientLight(0x5b1515, 0.7);
    scene.add(ambientLight);
  
    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(0, 0, 21);
    scene.add(pointLight);
  
    camera.position.z = 30;
  
    const pulseFactor = 0.5;
    const moveFactor = 0.1;
    const rotationSpeed = 0.0005;
  
    function animate() {
      requestAnimationFrame(animate);
  
      const time = performance.now() * 0.0005;
      const position = geometry.attributes.position;
  
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        const z = position.getZ(i);
        const offset = Math.sin(time + x * 2 + y * 2 + z * 2) * pulseFactor;
        position.setXYZ(
          i,
          x + offset * moveFactor,
          y + offset * moveFactor,
          z + offset * moveFactor
        );
      }
  
      position.needsUpdate = true;
      sphere.rotation.y += rotationSpeed;
      renderer.render(scene, camera);
    }
  
    animate();
  
    // Adjust renderer size and camera aspect ratio on window resize
    window.addEventListener('resize', () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  }
  


  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const portfolioId = urlParams.get("id");
  
    if (portfolioId) {
      // Wait for portfolio data to load
      fetch("portfolio.json")
        .then((response) => response.json())
        .then((data) => {
          portfolioData = data;
          const portfolioIndex = portfolioData.findIndex(
            (item) => item.title.toLowerCase().replace(/ /g, "-") === portfolioId
          );
  
          if (portfolioIndex >= 0) {
            openModal(portfolioIndex); // Open the modal for the specific portfolio item
          }
        })
        .catch((error) => console.error("Error loading portfolio data:", error));
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close-button");
  
    let lastScrollTop = 0;
  
    modal.addEventListener("scroll", () => {
      let scrollTop = modal.scrollTop;
  
      if (scrollTop > lastScrollTop) {
        // Scrolling Down - Hide Close Button
        closeButton.classList.add("hidden");
      } else {
        // Scrolling Up - Show Close Button
        closeButton.classList.remove("hidden");
      }
  
      lastScrollTop = scrollTop;
    });
  });
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const modalBody = document.querySelector(".modal-body");
    const modalHeader = document.querySelector(".modal-header");
  
    modalBody.addEventListener("scroll", () => {
      if (modalBody.scrollTop > 50) { 
        modalHeader.classList.add("sticky"); // Stick to the top
      } else {
        modalHeader.classList.remove("sticky"); // Stay in flow
      }
    });
  });

  // Lock
document.documentElement.classList.add("modal-open");
document.body.classList.add("modal-open");

// Unlock
document.documentElement.classList.remove("modal-open");
document.body.classList.remove("modal-open");
