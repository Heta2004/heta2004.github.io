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

function openModal(projectId) {
document.getElementById(`modal-${projectId}`).style.display = 'block';
}

function closeModal(projectId) {
document.getElementById(`modal-${projectId}`).style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
const navLinks = document.querySelectorAll(".nav-links li a");
const currentPage = document.body.getAttribute("data-page");

navLinks.forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});
});  

// If you still have openModal/closeModal, keep them here
function openModal(projectId) {
document.getElementById(`modal-${projectId}`).style.display = 'block';
}
function closeModal(projectId) {
document.getElementById(`modal-${projectId}`).style.display = 'none';
}

document.addEventListener("DOMContentLoaded", () => {
// Highlight Active Nav Link
const navLinks = document.querySelectorAll(".nav-links li a");
const currentPage = document.body.getAttribute("data-page"); 
navLinks.forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});

// ========== SIRIWAVE ANIMATION ==========
const canvas = document.getElementById("siriwave-canvas");
if (!canvas) {
  console.error("SiriWave canvas not found.");
  return;
}

const wave = new SiriWave({
  container: canvas.parentElement, // The parent element of the canvas
  // If you want it to use an existing canvas, see the 'canvas' param below
  style: "ios",          // "ios" or "ios9"
  color: "#ffffff",       // Wave color
  cover: true,            // Make wave fill the container
  speed: 0.003,            // Wave speed
  amplitude: 0.5,           // Wave amplitude
  autostart: true         // Start immediately
});

});
