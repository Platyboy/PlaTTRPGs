fetch("spells.json")
    .then(response => response.json())
    .then(spells => {

        const container = document.getElementById("spells");

        const levelFilter = document.getElementById("levelFilter");
        const classFilter = document.getElementById("classFilter");
        const schoolFilter = document.getElementById("schoolFilter");


        function displaySpells() {

            const selectedLevel = levelFilter.value;
            const selectedClass = classFilter.value;
            const selectedSchool = schoolFilter.value;

            const filteredSpells = spells.filter(spell => {

                // Level filter
                const levelMatches =
                    selectedLevel === "all" ||
                    spell.level === parseInt(selectedLevel);


                // Class filter
                const classMatches =
                    selectedClass === "all" ||
                    spell.classes.includes(selectedClass);


                // School filter
                const schoolMatches =
                    selectedSchool === "all" ||
                    spell.school === selectedSchool;


                // The spell must pass ALL filters
                return levelMatches && classMatches && schoolMatches;
            });


            // Clear the current spell cards
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
