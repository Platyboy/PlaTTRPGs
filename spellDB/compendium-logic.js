fetch("spells.json")
    .then(response => response.json())
    .then(spells => {

        const container = document.getElementById("spells");

        const levelFilter = document.getElementById("levelFilter");
        const classFilter = document.getElementById("classFilter");
        const schoolFilter = document.getElementById("schoolFilter");


        function displaySpells() {

            // Get the current filter selections
            const selectedLevel = levelFilter.value;
            const selectedClass = classFilter.value;
            const selectedSchool = schoolFilter.value;


            // Filter the spells
            const filteredSpells = spells.filter(spell => {

                const levelMatches =
                    selectedLevel === "all" ||
                    spell.level === Number(selectedLevel);

                const classMatches =
                    selectedClass === "all" ||
                    spell.classes.includes(selectedClass);

                const schoolMatches =
                    selectedSchool === "all" ||
                    spell.school === selectedSchool;

                return levelMatches && classMatches && schoolMatches;
            });


            // Remove the old spell cards
            container.innerHTML = "";


            // Create cards for the filtered spells
            filteredSpells.forEach(spell => {

                const card = document.createElement("a");

                card.className = "spell-card";
                card.href = `spell-info.html?id=${spell.id}`;

                const levelText =
                    spell.level === 0
                        ? "Cantrip"
                        : `Level ${spell.level}`;

                card.innerHTML = `
                    <h2>${spell.name}</h2>

                    <p>
                        ${levelText} ${spell.school}
                    </p>

                    <p>
                        ${spell.classes.join(", ")}
                    </p>
                `;

                container.appendChild(card);

            });
        }


        // Run the filter whenever a dropdown changes
        levelFilter.addEventListener("change", displaySpells);
        classFilter.addEventListener("change", displaySpells);
        schoolFilter.addEventListener("change", displaySpells);


        // Display all spells when the page first loads
        displaySpells();

    })
    .catch(error => {
        console.error("Could not load spells:", error);
    });
