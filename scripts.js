// General Modal Logic for Static Elements
function openModal(projectId) {
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal(projectId) {
  const modal = document.getElementById(`modal-${projectId}`);
  if (modal) {
    modal.style.display = "none";
  }
}

// Navigation Highlight Logic
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links li a");
  const currentPage = document.body.getAttribute("data-page");
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
  
    // Prevent scrolling on main page, but allow scrolling inside modal
    document.body.classList.add("modal-open");
  
    // Ensure modal content starts from top when opened
    const modalContent = document.querySelector(".modal-content");
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  }
  
  navLinks.forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const portfolioId = urlParams.get("id"); // Get `id` from URL

  if (portfolioId) {
    // Wait for portfolio data to load
    fetch("portfolio.json")
      .then((response) => response.json())
      .then((data) => {
        portfolioData = data;
        const portfolioIndex = portfolioData.findIndex((item) => item.id === portfolioId);

        if (portfolioIndex >= 0) {
          openModal(portfolioIndex); // Open modal for the corresponding portfolio item
        }
      })
      .catch((error) => console.error("Error loading portfolio data:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("mobile-hamburger");
  const navMenu = document.getElementById("mobile-menu");

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("open");
      document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
    });

    // Close menu when clicking a link
    navMenu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        navMenu.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
});


// Our HTML snippet for the mobile header
const mobileHeaderMarkup = `
  <div class="mobile-header">
    <div class="mobile-header-top">
      <div class="mobile-logo">
        <a href="index.html">ХЕТЪ</a>
      </div>
      <button id="mobile-hamburger" class="hamburger-btn" aria-label="Open menu">
        <!-- You could use an icon or 3 lines here -->
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- This is our slide-down menu or overlay -->
    <div id="mobile-menu" class="mobile-menu">

    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="works.html">Works</a></li>
      <li><a href="about.html">About</a></li>
      <li><a href="services.html">Services</a></li>
    </ul>

      <div class="mobile-contact">
        <a href="Contact.html" class="btn-primary">Contact</a>
      </div>
    </div>
  
  
    </div>
`;

function handleResponsiveHeader() {
  const desktopHeader = document.getElementById("header-desktop");
  const mobileHeader = document.getElementById("header-mobile");

  if (window.innerWidth > 768) {
    // Desktop view
    desktopHeader.style.display = "block";
    mobileHeader.innerHTML = ""; // Clear mobile header
  } else {
    // Mobile view
    desktopHeader.style.display = "none";
    if (!mobileHeader.innerHTML.trim()) {
      mobileHeader.innerHTML = mobileHeaderMarkup;
      console.log("Mobile menu injected."); // Confirm injection
      bindMobileMenuEvents(); // Bind events after injecting menu
    }
  }
}



document.addEventListener("DOMContentLoaded", () => {
  handleResponsiveHeader(); // Initial check
  window.addEventListener("resize", handleResponsiveHeader); // Check on resize
});

function bindMobileMenuEvents() {
  const hamburgerBtn = document.getElementById("mobile-hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  console.log("Binding mobile menu events...");

  if (!mobileMenu) {
    console.error("Mobile menu is not found in the DOM.");
    return;
  }

  // Get the current page from the <body>
  const currentPage = document.body.getAttribute("data-page");
  if (!currentPage) {
    console.error("No 'data-page' attribute found in <body>.");
    return;
  }

  console.log(`Current page: ${currentPage}`);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Function to update the active link
  function updateActiveLink() {
    const currentPage = document.body.getAttribute("data-page"); // Get current page
    if (!currentPage) {
      console.error("No 'data-page' attribute found in <body>.");
      return;
    }
  
    // Highlight desktop links
    const navLinks = document.querySelectorAll(".nav-links li a");
    navLinks.forEach((link) => {
      let href = link.getAttribute("href").split(".html")[0]; // Normalize href
      if (href === "index") href = "home"; // Map "index.html" to "home" for matching
      if (href === currentPage) {
        link.classList.add("active-strikethrough"); // Add strikethrough class
      } else {
        link.classList.remove("active-strikethrough");
      }
    });
  
    // Highlight mobile links
    const mobileLinks = document.querySelectorAll("#mobile-menu a");
    mobileLinks.forEach((link) => {
      let href = link.getAttribute("href").split(".html")[0]; // Normalize href
      if (href === "index") href = "home"; // Map "index.html" to "home" for matching
      if (href === currentPage) {
        link.classList.add("active-strikethrough"); // Add strikethrough class
      } else {
        link.classList.remove("active-strikethrough");
      }
    });
  }
  
  

  // Initial application of the active link logic
  updateActiveLink();

  // Add toggle functionality for the hamburger menu
  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";

      // Reapply the active link logic when the menu is opened
      if (mobileMenu.classList.contains("open")) {
        updateActiveLink();
      }
    });

    // Close the menu when clicking a link
    mobileMenu.addEventListener("click", (event) => {
      if (event.target.tagName === "A") {
        mobileMenu.classList.remove("open");
        hamburgerBtn.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  } else {
    console.error("Hamburger button or mobile menu is not found.");
  }
}

function openMobileMenu() {
  document.getElementById('mobile-menu').classList.add('open');
  // Disable background scroll, optional:
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  // Re-enable background scroll
  document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
  const footerRight = document.querySelector(".footer-right");

  function toggleFooterRight() {
    if (window.innerWidth <= 768) {
      if (footerRight) {
        footerRight.style.display = "none"; // Hide footer-right on mobile
      }
    } else {
      if (footerRight) {
        footerRight.style.display = ""; // Reset the display property on larger screens
      }
    }
  }

  // Initial check
  toggleFooterRight();

  // Add an event listener for window resize
  window.addEventListener("resize", toggleFooterRight);
});
