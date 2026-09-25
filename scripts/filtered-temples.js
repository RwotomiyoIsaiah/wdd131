const { temples } = require("../week04/scripts/lazyload");

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

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


// Function to create and display temple cards
function displayTemples(temples) {
	const albumContainer = document.getElementById("temple-album");
	albumContainer.innerHTML = "";
	let row="";
	for(let temple of temples){
		row += `<figure>
					<img src="${temple.imageUrl}" alt="${temple.templeName}" loading= "lazy">
					<figcaption><p class="name">${temple.templeName}</p><p>LOCATION: ${temple.location}</p><p>DEDICATED: ${temple.dedicated}</p><p>AREA: ${temple.area} sq ft</p></figcaption>
				</figure>`;
	}
	albumContainer.innerHTML = row;
}


const oldLink = document.querySelector("#old");
oldLink.addEventListener("click", (event) => {event.preventDefault();
    displayTemples(temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) < 1900));
});

const newLink = document.querySelector("#new");
newLink.addEventListener("click", (event) => {event.preventDefault();
    displayTemples(temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) > 2000));
});


const largeLink = document.querySelector("#large");
largeLink.addEventListener("click", (event) => {event.preventDefault();
    displayTemples(temples.filter(temple => temple.area > 90000));
});

const smallLink = document.querySelector("#small");
smallLink.addEventListener("click", (event) => {event.preventDefault();
    displayTemples(temples.filter(temple => temple.area < 10000));
});

const homeLink = document.querySelector("#all");
homeLink.addEventListener("click", (event) => {event.preventDefault();
    displayTemples(temples);
});
displayTemples(temples)



