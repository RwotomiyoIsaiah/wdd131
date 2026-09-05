     
        const current_year = new Date().getFullYear();
        document.getElementById("currentyear").textContent = current_year;

        const last_modified = new Date(document.lastModified);
        const formatted_date = last_modified.toLocaleDateString();
        document.getElementById("lastmodified").textContent = formatted_date;