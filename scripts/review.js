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