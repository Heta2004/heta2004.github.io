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
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", function (event) {
    // Optional: Show an alert before the form submission
    alert("Thank you for your message! I will get back to you shortly.");
  });
});
