document.addEventListener("DOMContentLoaded", function () {
    // Example of a function to load XML
    function loadMoviesFromXML() {
        // Assuming your XML file is available on the server at 'movies.xml'
        fetch('movies.xml')
            .then(response => response.text())
            .then(xmlText => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

                // Get popularMovies section from XML
                const popularMovies = xmlDoc.getElementsByTagName('movie');

                const movieCards = document.querySelectorAll('.movie-card');

                // Loop through each movie card and populate it with data
                for (let i = 0; i < movieCards.length; i++) {
                    const movie = popularMovies[i];
                    const title = movie.getElementsByTagName('title')[0].textContent;
                    const year = movie.getElementsByTagName('year')[0].textContent;
                    const genre = movie.getElementsByTagName('genre')[0].textContent;
                    const director = movie.getElementsByTagName('director')[0].textContent;
                    const summary = movie.getElementsByTagName('summary')[0].textContent;
                    const poster = movie.getElementsByTagName('poster')[0].textContent;

                    const card = movieCards[i];

                    // Update movie card content
                    card.querySelector('img').src = poster;
                    card.querySelector('h3').textContent = title;
                    const details = card.querySelector('.movie-details');
                    details.innerHTML = `
                        <p><strong>Year:</strong> ${year}</p>
                        <p><strong>Director:</strong> ${director}</p>
                        <p><strong>Genre:</strong> ${genre}</p>
                        <p><strong>Summary:</strong> ${summary}</p>
                    `;
                }
            })
            .catch(error => console.error('Error loading XML:', error));
    }

    // Load movies after page content is loaded
    loadMoviesFromXML();
});
