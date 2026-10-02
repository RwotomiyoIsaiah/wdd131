// ===================================================
// GLOBAL JAVASCRIPT: Navigation & Footer Metadata
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Interaction: Hamburger Navigation Toggle
  const navBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("primary-nav");

  if (navBtn && navMenu) {
    navBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isExpanded = navMenu.classList.contains("open");
      navBtn.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. DOM Modification & Dynamic Dates in Footer
  const yearSpan = document.getElementById("current-year");
  const lastModSpan = document.getElementById("last-modified");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModSpan) {
    lastModSpan.textContent = document.lastModified;
  }

  // 3. Homepage Feature Content Renderer (if on index page)
  const featuredContainer = document.getElementById("featured-container");
  if (featuredContainer) {
    renderFeaturedExperiences(featuredContainer);
    renderReviews();
  }
});

// Object array for home page experiences
const experiences = [
  {
    title: "White-Water Rafting",
    category: "Adventure",
    image: "images/rafting.jpg",
    description: "Conquer the famous rapids of the Nile with certified professional guides."
  },
  {
    title: "Sunset Dinner Cruise",
    category: "Relaxation",
    image: "images/hero-river.jpg",
    description: "Enjoy gourmet Ugandan cuisine while sailing during golden hour."
  },
  {
    title: "Luxury Eco-Cottages",
    category: "Stay",
    image: "images/cottage-deluxe.jpg",
    description: "Private riverfront balcony with panoramic Nile views and solar amenities."
  }
];

// Function using Array methods & Template Literals
function renderFeaturedExperiences(container) {
  const htmlCards = experiences.map(exp => `
    <article class="card">
      <img src="${exp.image}" alt="${exp.title}" class="card-img" loading="lazy" width="400" height="220">
      <div class="card-body">
        <span class="badge">${exp.category}</span>
        <h3 class="card-title">${exp.title}</h3>
        <p class="card-desc">${exp.description}</p>
      </div>
    </article>
  `).join("");

  container.innerHTML = htmlCards;
}

// Render dynamic guest reviews using LocalStorage
function renderReviews() {
  const reviewsContainer = document.getElementById("reviews-container");
  if (!reviewsContainer) return;

  // Retrieve stored inquiries or fallback array
  const defaultReviews = [
    { name: "Sarah M.", text: "Unforgettable sunset cruise on the Nile. The cottage view was breathtaking!" },
    { name: "David K.", text: "World-class rafting service and top-notch eco-luxury hospitality." }
  ];

  const storedInquiries = JSON.parse(localStorage.getItem("resort_inquiries")) || [];
  
  // Combine custom submissions with defaults using conditional branching
  let displayList = defaultReviews;
  if (storedInquiries.length > 0) {
    const latestUserReview = {
      name: `${storedInquiries[storedInquiries.length - 1].fullName} (Recent Inquiry)`,
      text: `Interested in: ${storedInquiries[storedInquiries.length - 1].stayType}`
    };
    displayList = [latestUserReview, ...defaultReviews];
  }

  reviewsContainer.innerHTML = displayList.map(item => `
    <blockquote class="card p-20">
      <p>"${item.text}"</p>
      <cite style="margin-top:10px; font-weight:bold; color:var(--accent-color); display:block;">- ${item.name}</cite>
    </blockquote>
  `).join("");
}