let spinner = document.getElementById("spinner");
let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = link;
    resultTitle.textContent = title;
    resultTitle.target = "_blank";
    resultContainer.appendChild(resultTitle);

    let breakElement = document.createElement("br");
    resultContainer.appendChild(breakElement);

    let resultUrl = document.createElement("a");
    resultUrl.classList.add("result-url");
    resultUrl.href = link;
    resultUrl.target = "_blank";
    resultUrl.textContent = link;
    resultContainer.appendChild(resultUrl);

    let breakTag = document.createElement("br");
    resultContainer.appendChild(breakElement);

    let linkDescription = document.createElement("p");
    linkDescription.classList.add("link-description");
    linkDescription.textContent = description;
    resultContainer.appendChild(linkDescription);

    searchResults.appendChild(resultContainer);
}

function displayResults(searchResults) {
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function wikiSearch(event) {
    if (event.key === "Enter") {
        let searchInputValue = searchInput.value;
        searchResults.textContent = "";
        let options = {
            method: "GET"
        };
        spinner.classList.remove("d-none");
        fetch("https://apis.ccbp.in/wiki-search?search=" + searchInputValue, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.add("d-none");
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInput.addEventListener("keydown", wikiSearch);