const input = document.querySelector("#favchap");
const button = document.querySelector("button");
const list = document.querySelector("#list");

button.addEventListener("click", function() {
    if(input.value === "") {
        alert("Please enter a book and chapter");
        input.focus();
    } else {
        const li = document.createElement("li");
        li.textContent = input.value;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<aria-label="close" id="close-button"> ❌ ';
        deleteBtn.addEventListener("click", function() {
        list.removeChild(li);
        input.focus();
        });

        li.appendChild(deleteBtn);
        list.appendChild(li);
        input.value = "";   
    }
    input.focus();
});



