fetch("https://ajax.test-danit.com/api/swapi/films")
  .then((response) => response.json())
  .then((data) => {
    data.forEach(async (element) => {
      let charactersList = await Promise.all(element.characters.map(characterURL => {
        return fetch(characterURL)
          .then(response => response.json())
          .then(characterData => characterData.name);
      }));

      let film = `
       <p>name: ${element.name}</p>
       <p>part: ${element.episodeId}</p>
       <p>description: ${element.openingCrawl}</p>
       <p>characters: ${charactersList.join(", \n")}</p>
      `;

      document.querySelector("#root").insertAdjacentHTML("beforeend", film);
    });
  })
  .catch((error) => console.error("Error:", error));