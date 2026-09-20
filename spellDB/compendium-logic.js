let spells = [];

const levelFilter = document.getElementById("level-filter");
const schoolFilter = document.getElementById("school-filter");
const classFilter = document.getElementById("class-filter");
const concentrationFilter = document.getElementById("concentration-filter");
const ritualFilter = document.getElementById("ritual-filter");

const spellList = document.getElementById("spell-list");
const resultCount = document.getElementById("result-count");
const searchInput = document.getElementById("search-input");

fetch("spells.json")
    .then(response => response.json())
    .then(data => {
        spells = data;
        displaySpells(spells);
    })
    .catch(error => {
        console.error("Could not load spells:", error);
        spellList.innerHTML = '<p>There was a problem loading the spells.</p>';
    });

function displaySpells(spellsToDisplay) {
    spellList.innerHTML = "";
    resultCount.textContent = '${spellsToDisplay.length} spells';
    if (spellsToDisplay.length === 0) {
        spellList.innerHTML = '<p>No spells found.</p>';
        return;
    }
    spellsToDisplay.forEach(spell => {
        const spellCard = document.createElement("article");
        spellCard.classList.add("spell-card");
        const tags = spell.tags
            .map(tag => '<span class="spell-tag">${tag}</span>')
            .join("");

        spellCard.innerHTML = '
            <h3>${spell.name}</h3>
            <p class="spell-level-school">
                ${getSpellLevel(spell.level)}
                ${spell.school}
            </p>
            <div class="spell-tags">${tags}</div>
            <p class="spell-classes">${spell.classes.join(", ")}</p>
        ';

        spellCard.addEventListener("click", () => {
            window.location.href = 'spell.html?id=${spell.id}';
        });
        spellList.appendChild(card);
    });
}

// search and filter events
function filterSpells() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedLevel = levelFilter.value;
    const selectedSchool = schoolFilter.value;
    const selectedClass = classFilter.value;

    const filteredSpells = spells.filter(spell => {
        const matchesSearch = spell.name .toLowerCase() .includes(searchText);
        const matchesLevel = selectedLevel === "all" || spell.level.toString() === selectedLevel;
        const matchesSchool = selectedSchool === "all" || spell.school === selectedSchool;
        const matchesClass = selectedClass === "all" || spell.classes.includes(selectedClass);
        const matchesConcentration = !concentrationFilter.checked || spell.concentration === true;
        const matchesRitual = !ritualFilter.checked || spell.ritual === true;

        return (
            matchesSearch &&
            matchesLevel &&
            matchesSchool &&
            matchesClass &&
            matchesConcentration &&
            matchesRitual
        );
    });
    displaySpells(filteredSpells);
}

function getSpellLevel(level) {
    if (level === 0) {
        return "Cantrip";
    }
    const suffixes = { 1: "st", 2: "nd", 3: "rd" };
    const suffix = suffixes[level] || "th";
    return `${level}${suffix}-level`;
}

searchInput.addEventListener( "input", filterSpells );
levelFilter.addEventListener( "change", filterSpells );
schoolFilter.addEventListener( "change", filterSpells );
classFilter.addEventListener( "change", filterSpells );
concentrationFilter.addEventListener( "change", filterSpells );
ritualFilter.addEventListener( "change", filterSpells );