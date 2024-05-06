# Mini News Dashboard Creation

### Introduction
This project aims to create a mini news dashboard that allows users to browse news articles based on different categories such as IPL, Finance, and Politics. Users can also search for specific news topics using the search bar.

### Setup and Launch Instructions

1. **Clone the Repository**: Begin by cloning the repository to your local machine using the following command:
   ```
   git clone <repository_url>
   ```

2. **Navigate to Directory**: Enter into the project directory:
   ```
   cd <project_directory>
   ```

3. **Open in Browser**: Open the `index.html` file in your preferred web browser to launch the news dashboard.

### Application Structure

The project consists of the following files:

1. **index.html**: This file contains the HTML structure of the news dashboard. It includes navigation elements, search functionality, and placeholders for displaying news articles.

2. **style.css**: This file contains the cascading style sheet for styling the HTML elements. It defines the layout, colors, and visual aspects of the dashboard.

3. **script.js**: This JavaScript file handles the dynamic behavior of the dashboard. It fetches news data from the News API, populates the news cards, and implements event listeners for navigation and search functionality.

### Functionality

#### HTML Structure (`index.html`):
- The HTML structure includes a navigation bar with links to different news categories and a search bar.
- News articles are displayed as cards within a container.

#### CSS Styling (`style.css`):
- CSS styles define the layout, colors, fonts, and responsiveness of the dashboard.
- Styles are applied to the navigation bar, search bar, news cards, and other elements for a visually appealing interface.

#### JavaScript Behavior (`script.js`):
- The JavaScript file handles the following functionalities:
  - Fetching news data from the News API based on category or search query.
  - Populating the news cards with relevant information such as title, image, description, and source.
  - Handling navigation between different news categories.
  - Implementing search functionality to retrieve news articles based on user input.

### Comments

The code is well-commented to explain the functionality and structure of each part of the application. Comments are provided inline with the code to enhance readability and understanding for future development and maintenance.

```javascript
// Global variables
const API_KEY = "37cbe8bbba7e4b56b06d38c9fa7cff41";
const url = "https://newsapi.org/v2/everything?q=";

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
        if (!article.urlToImage) return; // Skip articles without images
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article); // Fill data in card template
        cardsContainer.appendChild(cardClone); // Append card to container
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

// Event listener for navigation item click
function onNavItemClick(id) {
    fetchNews(id); // Fetch news based on category
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Event listener for search button click
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query); // Fetch news based on search query
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
```

### Screenshots

1. Dashboard

   ![image](https://github.com/gk-anonymous/Mini-News-Dashboard-Creation/assets/100946485/18356165-d3f5-4f6f-95f9-39516757c061)



2. API Fetched News

   ![news_API fetched](https://github.com/gk-anonymous/Mini-News-Dashboard-Creation/assets/100946485/2f412d22-8d38-4de8-8948-7c10afdd592d)


### Conclusion

The mini news dashboard provides users with a convenient way to stay updated with news articles from various categories. With its intuitive interface and dynamic functionality, users can easily browse, search, and read news articles of interest.
