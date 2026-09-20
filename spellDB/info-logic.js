const urlParams = new URLSearchParams(window.location.search);
const spellId = urlParams.get("id");

const spellName = document.getElementById("spell-name");
const spellLevelSchool = document.getElementById("spell-level-school");
const spellTags = document.getElementById("spell-tags");
const castingTime = document.getElementById("casting-time");
const range = document.getElementById("range");
const components = document.getElementById("components");
const duration = document.getElementById("duration");
const classes = document.getElementById("classes");
const description = document.getElementById("description");
const spellDetail = document.getElementById("spell-detail");

if (!spellId) { showError("No spell was specified."); } else { loadSpell(); }

function loadSpell() {
    fetch("data/spells.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not load spell data.");
            }
            return response.json();
        })
        .then(spells => {
            const spell = spells.find( spell => spell.id === spellId );
            if (!spell) {
                showError("Spell not found.");
                return;
            }
            displaySpell(spell);
        })
        .catch(error => {
            console.error(error);
            showError( "There was a problem loading this spell.");
        });
}

function displaySpell(spell) {
    document.title = `${spell.name} — Spell Compendium`;
    spellName.textContent = spell.name;
    spellLevelSchool.textContent = `${getSpellLevel(spell.level)} ${spell.school}`;
    spellTags.innerHTML = "";
    if (spell.tags && spell.tags.length > 0) {
        spell.tags.forEach(tag => {
            const tagElement = document.createElement("span");
            tagElement.classList.add("spell-tag");
            tagElement.textContent = tag;
            spellTags.appendChild(tagElement);
        });
    }
    castingTime.textContent = spell.castingTime;
    range.textContent = spell.range;
    components.textContent = spell.components.join(", ");
    duration.textContent = spell.duration;
    classes.textContent = spell.classes.join(", ");
    description.textContent = spell.description;

    if ( spell.higherLevels && spell.higherLevels.trim() !== "" ) {
        higherLevels.textContent = spell.higherLevels;
        higherLevelsSection.style.display = "block";
    } else {
        higherLevelsSection.style.display = "none";
    }
}

function getSpellLevel(level) {
    if (level === 0) {
        return "Cantrip";
    }
    const suffixes = { 1: "st", 2: "nd", 3: "rd" };
    const suffix = suffixes[level] || "th";
    return `${level}${suffix}-level`;
}

function showError(message) {
    spellDetail.innerHTML = `
        <div class="spell-error">
            <h1>Spell Not Found</h1>
            <p> ${message} </p>
            <a href="index.html"> ← Return to Spell Compendium </a>
        </div>
    `;
}