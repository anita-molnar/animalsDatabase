


const animalForm = document.getElementById("animalForm");
const accordionContainer = document.getElementById("accordionContainer");
const animalNameInput = document.getElementById("animalName");
const animalTraitsInput = document.getElementById("animalTraits");

const animals = {
  animalsDatabase: {
    "tiger": ["brave", "strong", "determinated", "proud"],
        "cat": ["agile", "free", "intelligent", "flexible"],
        "fox": ["witty", "wild", "resourceful", "independent"],
        "owl": ["mysterious", "wise", "intuitive", "silent"],
        "snake": ["patient", "transformative", "fearless", "mysterious"],
        "horse": ["loyal", "speed", "nobility", "emphaty" ],
  },

  addAnimal(name, traits) {
    this.animalsDatabase[name] = traits;
    renderAccordion();
  },

  deleteAnimal(name) {
    if (this.animalsDatabase[name]) {
      delete this.animalsDatabase[name];
      renderAccordion();
    }
  },

  getAnimalList() {
    return this.animalsDatabase;
  },

  getRandomAnimal() {
    const animalNames = Object.keys(this.animalsDatabase);
    const randomIndex = Math.floor(Math.random() * animalNames.length);
    const randomAnimalName = animalNames[randomIndex];
    const randomAnimalTraits = this.animalsDatabase[randomAnimalName];
    return { name: randomAnimalName, traits: randomAnimalTraits };
  },
};

// Render the accordion
function renderAccordion() {
  accordionContainer.innerHTML = "";
  const animalsData = animals.getAnimalList();

  for (let name in animalsData) {
    // Create accordion item
    const item = document.createElement("div");
    item.classList.add("accordion-item");

    // Create accordion header
    const header = document.createElement("div");
    header.classList.add("accordion-header");
    header.textContent = name;

    // Toggle content visibility on click
    header.addEventListener("click", () => {
      const content = item.querySelector(".accordion-content");
      content.style.display = content.style.display === "block" ? "none" : "block";
    });

    // Create accordion content
    const content = document.createElement("div");
    content.classList.add("accordion-content");
    content.textContent = `Traits: ${animalsData[name].join(", ")}`;

    // Add delete button to content
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => animals.deleteAnimal(name));

    content.appendChild(deleteButton);

    // Append header and content to the accordion item
    item.appendChild(header);
    item.appendChild(content);

    // Append item to the accordion container
    accordionContainer.appendChild(item);
  }
}

// Handle form submission
animalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = animalNameInput.value.trim();
  const traits = animalTraitsInput.value.split(",").map((trait) => trait.trim());

  if (name && traits.length > 0) {
    animals.addAnimal(name, traits);
    animalNameInput.value = "";
    animalTraitsInput.value = "";
  }


});

  // Handle "Animal of the Day" button click
const animalOfTheDayButton = document.getElementById("animalOfTheDayButton");
const animalOfTheDayDisplay = document.getElementById("animalOfTheDayDisplay");

animalOfTheDayButton.addEventListener("click", () => {
  const { name, traits } = animals.getRandomAnimal();
  animalOfTheDayDisplay.innerHTML = `
    <h3>Animal of the Day: ${name}</h3>
    <p><strong>Traits:</strong> ${traits.join(", ")}</p>
  `;
});

// Initial render
renderAccordion();
