// ===================================================
// ACCOMMODATIONS PAGE: Dynamic Rendering & Filtering
// ===================================================

const cottages = [
  {
    id: "c1",
    name: "Honeymoon Haven Cottage",
    capacity: 2,
    tier: "luxury",
    price: 180,
    image: "images/cottage-honeymoon.jpg",
    description: "Secluded riverfront chalet featuring a private plunge pool and king bed."
  },
  {
    id: "c2",
    name: "Deluxe Nile View Cottage",
    capacity: 2,
    tier: "standard",
    price: 220,
    image: "images/cottage-deluxe.jpg",
    description: "Spacious elevated balcony right above the river with full solar-powered amenities."
  },
  {
    id: "c3",
    name: "Grand Riverfront Family Villa",
    capacity: 6,
    tier: "luxury",
    price: 350,
    image: "images/cottage-family.jpg",
    description: "Two-bedroom master villa with living deck, perfect for families and small groups."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("cottage-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!grid) return;

  // Initial Render
  displayCottages(cottages, grid);

  // Event Listeners for Filters
  filterBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");

      const filterValue = e.target.getAttribute("data-filter");
      filterData(filterValue, grid);
    });
  });
});

// Function with Conditional Branching & Filtering
function filterData(filterCriteria, container) {
  let filteredResults = [];

  if (filterCriteria === "all") {
    filteredResults = cottages;
  } else if (filterCriteria === "couples") {
    filteredResults = cottages.filter(c => c.capacity <= 2);
  } else if (filterCriteria === "family") {
    filteredResults = cottages.filter(c => c.capacity > 2);
  } else if (filterCriteria === "luxury") {
    filteredResults = cottages.filter(c => c.tier === "luxury");
  }

  displayCottages(filteredResults, container);
}

// Render Function using Template Literals
function displayCottages(items, container) {
  if (items.length === 0) {
    container.innerHTML = `<p>No cottages match your selected criteria.</p>`;
    return;
  }

  container.innerHTML = items.map(unit => `
    <article class="card">
      <img src="${unit.image}" alt="${unit.name}" class="card-img" loading="lazy" width="400" height="220">
      <div class="card-body">
        <span class="badge">${unit.tier.toUpperCase()} • Max ${unit.capacity} Guests</span>
        <h2 class="card-title">${unit.name}</h2>
        <p class="card-price">$${unit.price} / night</p>
        <p class="card-desc">${unit.description}</p>
        <a href="contact.html" class="btn btn-primary">Book Cottage</a>
      </div>
    </article>
  `).join("");
}