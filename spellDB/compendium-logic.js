fetch("spells.json")
    .then(response => response.json())
    .then(spells => {

        const container = document.getElementById("spells");

        spells.forEach(spell => {

            const card = document.createElement("a");

            card.className = "spell";
            card.href = `spell.html?id=${spell.id}`;

            card.innerHTML = `
                <img src="${spell.image}" alt="${spell.name}">
                <h2>${spell.name}</h2>
                <p>${spell.category}</p>
            `;

            container.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Could not load spells:", error);
    });
