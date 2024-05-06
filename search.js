document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', async function () {
        const searchQuery = searchInput.value.trim().toLowerCase(); // Obtener el valor del input de búsqueda y eliminar espacios en blanco

        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchQuery}`);
            const data = await response.json();

            const filteredResults = data.results.filter(character =>
                character.name.toLowerCase().includes(searchQuery)
            );

            if (filteredResults.length > 0) {
                // Mostrar resultados en la página
                showSearchResults(filteredResults);
            } else {
                // Limpiar contenido si no se encuentran resultados
                clearCharacterContainer();
            }
        } catch (error) {
            console.error('Error al buscar personaje:', error.message);
        }
    });
});

function showSearchResults(results) {
    const charactersContainer = document.getElementById('characters');
    charactersContainer.innerHTML = ''; // Limpiar contenido anterior

    results.forEach(character => {
        // Crear elemento para mostrar el personaje
        const characterCard = document.createElement('div');
        characterCard.classList.add('character-card');

        const characterName = document.createElement('h2');
        characterName.textContent = character.name;

        // Añadir imagen si está disponible
        if (character.image) {
            const characterImage = document.createElement('img');
            characterImage.src = character.image;
            characterImage.alt = character.name;
            characterCard.appendChild(characterImage);
        }

        // Agregar el botón "Add to Favorites"
        const addToFavoritesBtn = createAddToFavoritesButton(character.id);
        characterCard.appendChild(addToFavoritesBtn);

        characterCard.appendChild(characterName);
        charactersContainer.appendChild(characterCard);
    });
}

function clearCharacterContainer() {
    const charactersContainer = document.getElementById('characters');
    charactersContainer.innerHTML = ''; // Limpiar contenido anterior
};

//recarga la pagina para que se reinicie la busqueda
const reloadButton = document.getElementById('reload-button');
if (reloadButton) {
    reloadButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        location.reload(); 
    });
}


// Función para scroll hasta el inicio de la página
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listener para el botón "Back to Top"
document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn !== null) {
        backToTopBtn.addEventListener('click', scrollToTop);
    }
});