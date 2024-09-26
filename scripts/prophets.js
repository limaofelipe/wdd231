const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let fullName = document.createElement("h2");
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    let birthDate = document.createElement("p");
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;

    let birthPlace = document.createElement("p");
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    let deathDate = document.createElement("p");
    deathDate.textContent = `Date of Death: ${prophet.death || "Alive"}`;

    let portrait = document.createElement("img");
    portrait.setAttribute("src", prophet.imageurl);

    
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    
    portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    
    let card = document.createElement("section");
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}

getProphetData();