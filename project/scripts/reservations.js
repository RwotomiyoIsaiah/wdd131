//for date and last modified
     
const current_year = new Date().getFullYear();
document.getElementById("currentyear").textContent = current_year;
const last_modified = new Date(document.lastModified);
const formatted_date = last_modified.toLocaleDateString();
document.getElementById("lastmodified").textContent = formatted_date;
const rangevalue = document.getElementById("rangevalue");
const range = document.getElementById("r");


const cottages = [
  {
    id: "Honeymoon Cottage",
    name: "Honeymoon Cottage",
    capacity: 2,
    tier: "luxury",
    price: 180,
    image: "images/cottage-honeymoon.jpg",
    description: "Secluded riverfront chalet featuring a private plunge pool and king bed."
  },
  {
    id: "Nile View Cottage for Two",
    name: "Nile View Cottage for Two",
    capacity: 2,
    tier: "standard",
    price: 220,
    image: "images/cottage-deluxe.jpg",
    description: "Spacious elevated balcony right above the river with full solar-powered amenities."
  },
  {
    id: "Riverfront Family Villa",
    name: "Riverfront Family Villa",
    capacity: 6,
    tier: "luxury",
    price: 350,
    image: "images/cottage-family.jpg",
    description: "Two-bedroom master villa with living deck, perfect for families and small groups."
  }
];

function displayProducts(products) {
	const Container = document.getElementById("cottages");
    products.forEach((product) => {
        let row = `
        <option value="${product.id}">${product.name} - $${product.price}/night</option>`;
        Container.innerHTML += row;
    });  
}
displayProducts(cottages);

// collecting data and displaying successfull message
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const feedbackContainer = document.getElementById("form-feedback");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

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
      comments: formData.get("comments") || "None",
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

  // Smooth scroll to confirmation message
  container.scrollIntoView({ behavior: 'smooth' });
}

