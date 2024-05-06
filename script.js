// Global variables
const API_KEY = "37cbe8bbba7e4b56b06d38c9fa7cff41";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}


// Function to fetch news articles
async function fetchNews(query) {
    // Fetch data from News API
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles); // Bind fetched data to UI
}

// Function to bind news data to UI
function bindData(articles) {
    // Get container to display news cards
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ""; // Clear previous content

    // Iterate through articles and create cards
    articles.forEach((article) => {
        if (!article.urlToImage) return;  // Skip articles without images
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);  // Fill data in card template
        cardsContainer.appendChild(cardClone);  // Append card to container
    });
}


// Function to fill news data into card template
function fillDataInCard(cardClone, article) {
    // Get elements to fill with data
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    // Fill data into elements
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // Format and display source and date
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // Open article in new tab on card click
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
// Event listener for navigation item click
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// Event listener for search button click
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);  // Fetch news based on search query
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
