// Targets the specific menu button and the main nav menu element
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav-menu'); 

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});


//for date and last modified
     
const current_year = new Date().getFullYear();
document.getElementById("currentyear").textContent = current_year;
const last_modified = new Date(document.lastModified);
const formatted_date = last_modified.toLocaleDateString();
document.getElementById("lastmodified").textContent = formatted_date;

//for accomodations page

const accommodations = [
  {
    name: "Nile View Suite",
    location: "River Side",
    price: 150,
    capacity: 2,
    imageUrl: "images/nile-view.webp"
  },
  {
    name: "Family Safari Lodge",
    location: "Main Gardens",
    price: 250,
    capacity: 6,
    imageUrl: "images/family-lodge.webp"
  },
  {
    name: "Sunset River Cabin",
    location: "River Side",
    price: 90,
    capacity: 3,
    imageUrl: "images/river-cabin.webp"
  },
  {
    name: "Budget Eco Tent",
    location: "Forest Area",
    price: 45,
    capacity: 2,
    imageUrl: "images/eco-tent.webp"
  },
  {
    name: "Grand Riverside Villa",
    location: "River Side",
    price: 400,
    capacity: 8,
    imageUrl: "images/river-villa.webp"
  }
];

//display
function displayAccommodations(items) {
  const albumContainer = document.getElementById("temple-album");
  albumContainer.innerHTML = "";
  
  let cardsHtml = "";
  items.forEach((item, index) => {
    const loadingMode = index < 2 ? "eager" : "lazy";
    cardsHtml += `
      <figure>
        <img src="${item.imageUrl}" alt="${item.name}" width="400" height="300" loading="${loadingMode}">
        <figcaption>
          <p class="name"><strong>${item.name}</strong></p>
          <p>LOCATION: ${item.location}</p>
          <p>PRICE: $${item.price} / night</p>
          <p>ACCOMMODATES: Up to ${item.capacity} guests</p>
        </figcaption>
      </figure>
    `;
  });
  albumContainer.innerHTML = cardsHtml;
}

// FILTER 
document.querySelector("#all").addEventListener("click", (e) => {
  e.preventDefault();
  displayAccommodations(accommodations);
});
document.querySelector("#old").addEventListener("click", (e) => {
  e.preventDefault();
  const cheapOptions = accommodations.filter(item => item.price < 100);
  displayAccommodations(cheapOptions);
});
document.querySelector("#new").addEventListener("click", (e) => {
  e.preventDefault();
  const riverSideOptions = accommodations.filter(item => item.location === "River Side");
  displayAccommodations(riverSideOptions);
});
document.querySelector("#large").addEventListener("click", (e) => {
  e.preventDefault();
  const largeGroups = accommodations.filter(item => item.capacity >= 4);
  displayAccommodations(largeGroups);
});
document.querySelector("#small").addEventListener("click", (e) => {
  e.preventDefault();
  const smallGroups = accommodations.filter(item => item.capacity <= 2);
  displayAccommodations(smallGroups);
});

// Initial 
displayAccommodations(accommodations);

