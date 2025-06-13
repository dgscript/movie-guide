const contentContainer = document.querySelector(".contentContainer");
const userInput = document.getElementById("userInput");
const loading = document.getElementById("loading");
const searchContainer = document.querySelector(".searchContainer");

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    search();
  }
});

async function search() {
  document.querySelector(".mainTitle").style.display = "none";
  contentContainer.style.display = "block";
  contentContainer.style.opacity = "0";
  searchContainer.style.opacity = "0";
  loading.style.display = "block";

  try {
    const response = await fetch(
      `/.netlify/functions/fetch-data?title=${encodeURIComponent(
        userInput.value
      )}`
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      console.log("Ocorreu um erro!");
      return;
    }
    if ((data.Response = "False")) {
      contentContainer.innerHTML = `
                <div class="errorContainer">
                    <img src="error.png" alt="Error">
                    <p class="errorDescription">The term that you searched for was not found!</p>
                </div>
            `;
    }
    const style = document.createElement("style");
    style.textContent = `
            @media (max-width: 925px) {
                main {
                    height: auto;
                }
             }
        `;
    document.head.appendChild(style);
    contentContainer.innerHTML = `
            <div class="poster">
                <img src="${data.Poster}" alt="Poster">

                <div class="contentDescription">
                    <p class="title">${data.Title}</p>
                    <span class="overall">
                        <p><span class="yellowText">Genre</span>: ${data.Genre}</p>
                        <p><span class="yellowText">Year</span>: ${data.Year}</p>
                        <p><span class="yellowText">Actors</span>: ${data.Actors}</p>
                    </span>
                    <p class="contentPlot">${data.Plot}</p>
                    <span class="overall">
                        <div class="rating">
                        <p><span class="yellowText">Rating:</span> ${data.Ratings[0].Value}</p><span class="yellowText"><i class="fa-solidfa-star"></i></span>
                        </div>
                        <p><span class="yellowText">Awards:</span> ${data.Awards}
                        </p>
                    </span>
                </div>
            </div>
        `;
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    contentContainer.style.opacity = "1";
    searchContainer.style.opacity = "1";
    loading.style.display = "none";
  }, 1000);
}

setInterval(function () {
  const searchSugestions = [
    "Wednesday",
    "Stranger Things",
    "Sex Education",
    "The Godfather",
    "Titanic",
    "Back to the Future",
    "Halloween",
    "Friday the 13th",
    "Breaking Bad",
  ];
  let randomIndex = Math.floor(Math.random() * searchSugestions.length);
  userInput.placeholder = searchSugestions[randomIndex];
}, 4000);
