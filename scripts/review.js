// Local storage save and display and only runs on review.html
if (window.location.pathname.includes("review.html")) {
    const num = document.getElementById("num");
    let number = JSON.parse(localStorage.getItem("number")) || 0;
    function save() {
        number++;
        localStorage.setItem("number", JSON.stringify(number));
    }
    save(); 
    num.textContent = number;
}

//for date and last modified
     
const current_year = new Date().getFullYear();
document.getElementById("currentyear").textContent = current_year;
const last_modified = new Date(document.lastModified);
const formatted_date = last_modified.toLocaleDateString();
document.getElementById("lastmodified").textContent = formatted_date;