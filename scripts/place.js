
const current_year = new Date().getFullYear();
document.getElementById("currentyear").textContent = current_year;
const last_modified = new Date(document.lastModified);
const formatted_date = last_modified.toLocaleDateString();
document.getElementById("lastmodified").textContent = formatted_date;


const temp = 10;
const windSpeed = 5; 

const calculateWindChill = (t, s) => 
  (13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16)).toFixed(1);

const windChillElement = document.querySelector("#windchill");

if (temp <= 10 && windSpeed > 4.8) {
  windChillElement.textContent = `${calculateWindChill(temp, windSpeed)} °C`;
} else {
  windChillElement.textContent = "N/A";}