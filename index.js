console.log('My files are connected')

const baseURL = "https://chicken-coop.p.rapidapi.com/games/";
let url;


const searchGame = document.getElementById("searchGame");
const searchForm = document.getElementById("formVideoGame");

const resultsSection = document.getElementById("resultsSection");

searchForm.addEventListener("submit", fetchResultsGame);

function fetchResultsGame(e) {
    e.preventDefault();
    let url = baseURL + searchGame.value;

    console.log("URL:", url);

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
            "x-rapidapi-key": "b1050076ccmsh5eec00092700bf0p1db4e7jsn25f219d104a0"
        }
    })
    .then(function(result) {
        return result.json();
    })
    .then(function(json) {
        displayResultsGame(json);
    });

    function displayResultsGame(json) {
        console.log("Display Results", json);
        while(resultsSection.firstChild) {
            resultsSection.removeChild(resultsSection.firstChild);
        }
        let gamer = json

        if(searchGame.length === 0) {
            console.log("No results");
        } else {
            let formContainer = document.createElement("form");
            formContainer.setAttribute("class", "formContainer");
            let headerTag = document.createElement("h2");
            headerTag.setAttribute("id", "headerTag");
            let gameCover = document.createElement("img");
            gameCover.setAttribute("id", "gameCover");
            let gameClearFix = document.createElement("div");
            let gamePara = document.createElement("para");
            gamePara.setAttribute("class", "gameStats");

            headerTag.textContent = gamer.title;
            console.log("Title:", gamer);

            if(gamer.image.length > 0) {
                gameCover.src = gamer.image;
                gameCover.alt = "Game Cover";
            }

            gamePara.textContent = "Game Info: ";

            for(let i = 0; i < 1; i++) {
                let gameSpan = document.createElement("span")
                gameSpan.setAttribute("class", "gameDetails"); 
                gameSpan.textContent += gamer.results.title;
                gamePara.appendChild(gameSpan);
            }
            gameClearFix.setAttribute("class", "gameClearFix");

            formContainer.appendChild(headerTag);
            formContainer.appendChild(gameClearFix);
            formContainer.appendChild(gameCover);
            formContainer.appendChild(gamePara);
            resultsSection.appendChild(formContainer);
        }
    }
}