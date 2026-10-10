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
function displayAccommodations(items, filterName = "All") {
  const albumContainer = document.getElementById("temple-album");
  if (!albumContainer) return;

  albumContainer.innerHTML = "";
  localStorage.setItem("lastAccommodationFilter", filterName);
  let cardsHtml = "";

  items.forEach((item, index) => {
   
    let loadingMode = "lazy";
    if (index < 2) {
      loadingMode = "eager";
    }

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
const filterAll = document.querySelector("#all");
if (filterAll) {
		filterAll.addEventListener("click", (e) => {
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
			});}

// Initial 
displayAccommodations(accommodations);

//show cottages in select on reservations page
const cottageSelect = document.getElementById("cottages");
if (cottageSelect) {
  let optionsHtml = `
    <option value="" selected disabled>Select a Cottage for your stay</option>
    <option value="Day Visitor">Day Visitor / Activity Only</option>`;
  
 accommodations.forEach(item => {
    optionsHtml += `<option value="${item.name}">${item.name} - $${item.price} / night</option>`;
  });
  
  cottageSelect.innerHTML = optionsHtml;
}

// Retrieve from localStorage on page load 
const savedFilter = localStorage.getItem("lastAccommodationFilter");
if (savedFilter) {
  console.log(`Restored last filter view from localStorage: ${savedFilter}`);
}
// Form submission and confirmation feedback handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const feedbackContainer = document.getElementById("form-feedback");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect Form Data into an Object
    const formData = new FormData(form);
    const addons = [];
    document.querySelectorAll('input[name="addons"]:checked').forEach(b => addons.push(b.value));

    const bookingInquiry = {
      fullName: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone") || "N/A",
      cottage: formData.get("cottages"),
      checkIn: formData.get("checkIn"),
      addons: addons,
      comments: formData.get("review") || "None",
      nights: formData.get("nights") || "0"
    };

    saveInquiryToLocalStorage(bookingInquiry);
    displayFeedback(bookingInquiry, feedbackContainer);

    form.reset();
  });
});

function saveInquiryToLocalStorage(inquiryObject) {
  const existingInquiries = JSON.parse(localStorage.getItem("resort_inquiries")) || [];
  existingInquiries.push(inquiryObject);
  localStorage.setItem("resort_inquiries", JSON.stringify(existingInquiries));
}

function displayFeedback(data, container) {
  if (!container) return;
  const addonsText = data.addons.length > 0 ? data.addons.join(", ") : "None";

  container.classList.remove("hidden");
  container.innerHTML = `
    <h1>Thank You, ${data.fullName}!</h1>
    <h3>You Have Successfully Booked <strong>${data.cottage}</strong>.</h3>
    <ul>
      <li><strong>Check-in Date:</strong> ${data.checkIn}</li>
      <li><strong>Number of Nights:</strong> ${data.nights}</li>
      <li><strong>Activities:</strong> ${addonsText}</li>
    </ul>
    <p style="margin-top:10px;"><small>A confirmation email has been sent to ${data.email}.</small></p>
  `;

  container.scrollIntoView({ behavior: 'smooth' });
}