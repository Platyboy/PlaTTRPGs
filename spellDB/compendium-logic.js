fetch("spells.json")
    .then(response => response.json())
    .then(spells => {

        const container = document.getElementById("spells");

        const levelFilter = document.getElementById("levelFilter");
        const classFilter = document.getElementById("classFilter");
        const schoolFilter = document.getElementById("schoolFilter");


        function updateSpellList() {

            // Get the current values of the filters
            const level = levelFilter.value;
            const className = classFilter.value;
            const school = schoolFilter.value;


            // Find spells that match the filters
            const filteredSpells = spells.filter(spell => {

                const matchesLevel =
                    level === "all" ||
                    spell.level === Number(level);

                const matchesClass =
                    className === "all" ||
                    spell.classes.includes(className);

                const matchesSchool =
                    school === "all" ||
                    spell.school === school;

                return matchesLevel && matchesClass && matchesSchool;
            });


            // IMPORTANT:
            // Remove the old list
            container.innerHTML = "";


            // Build the new list
            filteredSpells.forEach(spell => {

                const card = document.createElement("a");

                card.className = "spell-card";
                card.href = `spell-info.html?id=${spell.id}`;

                const levelText =
                    spell.level === 0
                        ? "Cantrip"
                        : `Level ${spell.level}`;

                card.innerHTML = `
                    <p>${spell.name}</p>
                    <p>${levelText} ${spell.school}</p>
                    <p>${spell.classes.join(", ")}</p>
                    <p>${spell.castingTime}</p>
                    <p>${spell.range}</p>
                    <p>${spell.components}</p>
                    <p>${spell.duration}</p>
                `;

                container.appendChild(card);
            });
        }


        // --------------------------------
        // WATCH FOR FILTER CHANGES
        // --------------------------------

        levelFilter.addEventListener("change", updateSpellList);

        classFilter.addEventListener("change", updateSpellList);

        schoolFilter.addEventListener("change", updateSpellList);


        // Display the initial list
        updateSpellList();

    })
    .catch(error => {
        console.error("Could not load spells:", error);
    });
