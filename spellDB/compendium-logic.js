fetch("spells.json")
    .then(response => response.json())
    .then(spells => {

        const container = document.getElementById("spells");

        spells.forEach(spell => {

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

    })
    .catch(error => {
        console.error("Could not load spells:", error);
    });
