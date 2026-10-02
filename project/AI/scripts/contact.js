// ===================================================
// CONTACT PAGE: Form Processing & LocalStorage State
// ===================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const feedbackContainer = document.getElementById("form-feedback");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    // Collect Form Data into an Object
    const formData = new FormData(form);
    const addons = [];
    document.querySelectorAll('input[name="addons"]:checked').forEach(cb => addons.push(cb.value));

    const bookingInquiry = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone") || "N/A",
      stayType: formData.get("stayType"),
      checkIn: formData.get("checkIn"),
      guests: formData.get("guests"),
      addons: addons,
      comments: formData.get("comments") || "None",
      timestamp: new Date().toISOString()
    };

    // Save Object to LocalStorage
    saveInquiryToLocalStorage(bookingInquiry);

    // Display Confirmation UI using Template Literals
    displayFeedback(bookingInquiry, feedbackContainer);

    // Reset Form
    form.reset();
  });
});

// Function using Array Storage in LocalStorage
function saveInquiryToLocalStorage(inquiryObject) {
  const existingInquiries = JSON.parse(localStorage.getItem("resort_inquiries")) || [];
  existingInquiries.push(inquiryObject);
  localStorage.setItem("resort_inquiries", JSON.stringify(existingInquiries));
}

// Function using DOM Modification and Template Literals
function displayFeedback(data, container) {
  const addonsText = data.addons.length > 0 ? data.addons.join(", ") : "None selected";

  container.classList.remove("hidden");
  container.innerHTML = `
    <h3>Thank You, ${data.fullName}!</h3>
    <p>Your booking inquiry for <strong>${data.stayType}</strong> has been received.</p>
    <ul>
      <li><strong>Check-in Date:</strong> ${data.checkIn}</li>
      <li><strong>Guests:</strong> ${data.guests}</li>
      <li><strong>Add-ons:</strong> ${addonsText}</li>
    </ul>
    <p style="margin-top:10px;"><small>A confirmation email has been dispatched to ${data.email}.</small></p>
  `;

  // Smooth scroll to confirmation message
  container.scrollIntoView({ behavior: 'smooth' });
}