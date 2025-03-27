document.addEventListener("DOMContentLoaded", function () {
    loadNews();
});

function loadNews() {
    fetch("news.xml")
        .then(response => response.text())
        .then(xmlText => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(xmlText, "application/xml");
            let newsList = xml.getElementsByTagName("news");
            let newsContainer = document.getElementById("news-container");

            for (let news of newsList) {
                let title = news.getElementsByTagName("title")[0].textContent;
                let category = news.getElementsByTagName("category")[0].textContent;
                let author = news.getElementsByTagName("author")[0].textContent;
                let date = news.getElementsByTagName("date")[0].textContent;
                let content = news.getElementsByTagName("content")[0].textContent;
                let image = news.getElementsByTagName("image")[0].textContent;

                let newsItem = document.createElement("div");
                newsItem.classList.add("news-item");
                newsItem.innerHTML = `
                    <img src="${image}" alt="News Image">
                    <h2>${title}</h2>
                    <p><strong>${category}</strong> | By ${author} | ${date}</p>
                    <p>${content}</p>
                `;
                newsContainer.appendChild(newsItem);
            }
        })
        .catch(error => console.error("Error loading XML:", error));
}

function toggleMenu() {
    var menu = document.getElementById("mobileMenu");
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}
