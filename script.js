
// create a form with an input field that takes a number
const form = document.querySelector("#breedForm");
const breedsContainer = document.querySelector("#breedsContainer");

// fetch data from the catfact.ninja API
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    breedsContainer.innerHTML = ''; // clear the previous results
    try {
        const formData = new FormData(form);
        const numberOfBreeds = formData.get("numberOfBreeds");
        // check if the number of breeds is a positive number and alert the user if it is not
        if (numberOfBreeds < 1) {
            alert("Please enter a number of breeds that is 1 or more.");
            return;
        }
        const response = await fetch(`https://catfact.ninja/breeds?limit=${numberOfBreeds}`);
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        data.data.forEach((breed) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <h2>${breed.breed || 'No breed provided'}</h2>
                <p><strong>Country:</strong> ${breed.country || "No country provided"}</p>
                <p><strong>Origin:</strong> ${breed.origin || "No origin provided"}</p>
                <p><strong>Coat:</strong> ${breed.coat || "No coat information"}</p>
                <p><strong>Pattern:</strong> ${breed.pattern || "No pattern information"}</p>
            `;
            breedsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
});
