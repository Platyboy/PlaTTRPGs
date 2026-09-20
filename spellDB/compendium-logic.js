fetch("items.json")
    .then(response => response.json())
    .then(items => {

        const container = document.getElementById("items");

        items.forEach(item => {

            const card = document.createElement("a");

            card.className = "item";
            card.href = `item.html?id=${item.id}`;

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>${item.category}</p>
            `;

            container.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Could not load items:", error);
    });
