const charactersContainer = document.getElementById('characters');
let loadMoreBtn = document.getElementById('loadMoreBtn');
let nextPageUrl = '';

async function loadCharacters() {
    try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const data = await response.json();
        nextPageUrl = data.info.next;
        let characters = data.results;
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        characters.forEach(character => {
            createCharacterCard(character, favorites);
        });

        window.addEventListener('scroll', async () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                const nextPageUrl = data.info.next;
                if (nextPageUrl) {
                    const nextPageResponse = await fetch(nextPageUrl);
                    const nextPageData = await nextPageResponse.json();
                    characters = nextPageData.results;
                    characters.forEach(character => {
                        createCharacterCard(character, favorites);
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar personajes:', error.message);
    }
}

async function showFavoriteCharacters() {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteCharactersContainer = document.getElementById('favorite-characters');

        favorites.forEach(async characterId => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
            const character = await response.json();
            createCharacterCard(character, favorites, favoriteCharactersContainer);
        });
    } catch (error) {
        console.error('Error al mostrar personajes favoritos:', error.message);
    }
}

function createCharacterCard(character, favorites, container) {
    // Verificar si el contenedor está presente y no es null solo en la página de favoritos
    if (window.location.pathname.includes('favorites.html') && (!container || container === null)) {
        
        return;
    }

    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    const characterImg = document.createElement('img');
    characterImg.src = character.image;
    characterImg.alt = character.name;

    const characterName = document.createElement('h2');
    characterName.textContent = character.name;

    const characterDetails = document.createElement('div');
    characterDetails.classList.add('character-details');
    const species = document.createElement('p');
    species.textContent = `Species: ${character.species}`;
    const origin = document.createElement('p');
    origin.textContent = `Origin: ${character.origin.name}`;
    const dimension = document.createElement('p');
    dimension.textContent = `Dimension: ${character.origin.dimension}`;

    const addToFavoritesBtn = createAddToFavoritesButton(character.id);

    if (favorites.includes(character.id)) {
        const icon = addToFavoritesBtn.querySelector('i');
        icon.classList.remove('far');
        icon.classList.add('fas');
    }

    characterCard.appendChild(characterImg);
    characterCard.appendChild(characterName);
    characterDetails.appendChild(species);
    characterDetails.appendChild(origin);
    characterDetails.appendChild(dimension);
    characterCard.appendChild(characterDetails);
    characterCard.appendChild(addToFavoritesBtn);

    // Agregar el personaje al contenedor solo si el contenedor no es null
    if (container) {
        container.appendChild(characterCard);
    } else {
        charactersContainer.appendChild(characterCard);
    }

    return characterCard;
}

function createAddToFavoritesButton(characterId) {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add('far', 'fa-heart');
    button.appendChild(icon);
    button.addEventListener('click', function () {
        if (icon.classList.contains('far')) {
            addToFavorites(characterId);
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            removeFromFavorites(characterId);
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
    return button;
}

document.addEventListener('DOMContentLoaded', function () {
    let clickedViewFavorites = false;

    const viewFavoritesBtn = document.getElementById('view-favorites-btn');
    
    // Validar si viewFavoritesBtn existe antes de agregar el event listener
    if (viewFavoritesBtn) {
        viewFavoritesBtn.addEventListener('click', function (event) {
            event.preventDefault();
            clickedViewFavorites = true;

            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (favorites.length > 0) {
                window.location.href = 'favorites.html';
            } else {
                if (clickedViewFavorites) {
                    Swal.fire({
                        icon: 'error',
                        title: 'No hay personajes favoritos',
                        text: '¡Agrega algunos personajes a tus favoritos!'
                    });
                }
            }
        });
    }
    if (loadMoreBtn !== null) {
        loadMoreBtn.addEventListener('click', async () => {
            if (nextPageUrl) {
                await loadCharacters(nextPageUrl); // Cargar la próxima página de personajes
            } else {
                loadMoreBtn.style.display = 'none'; // Ocultar el botón cuando no haya más páginas
            }
        });
    }

    loadCharacters();
    clickedViewFavorites = true;
});

async function addToFavorites(characterId) {
    try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(characterId)) {
            return;
        }

        favorites.push(characterId);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        Swal.fire({
            icon: 'success',
            title: 'Se agrego el personaje a favoritos',
        });
    } catch (error) {
        console.error('Error al agregar a favoritos:', error.message);
    }
}

async function removeFromFavorites(characterId) {
    try {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (!favorites.includes(characterId)) {
            return;
        }

        favorites = favorites.filter(id => id !== characterId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
        console.error('Error al eliminar de favoritos:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Verificar si estamos en la página de favoritos
    if (window.location.pathname.includes('favorites.html')) {
        const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
        // Verificar si el botón de limpiar favoritos existe
        if (clearFavoritesBtn) {
            clearFavoritesBtn.addEventListener('click', function () {
                Swal.fire({
                    title: "¿Estás seguro que deseas borrar los favoritos?",
                    text: "No podrás revertir esto!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-success',
                    confirmButtonText: "¡Sí, bórralos!",
                    cancelButtonClass: 'btn btn-danger',
                    cancelButtonText: "Cancelar",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem('favorites');

                        Swal.fire({
                            title: "Completado",
                            text: "¡Se han borrado los favoritos correctamente!",
                            icon: "success"
                        }).then(() => {
                            window.location.href = 'index.html';
                        });
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        Swal.fire({
                            title: "Cancelado",
                            text: "¡Tus favoritos están a salvo!",
                            icon: "error"
                        });
                    }
                });
            });
        }
    }
});
window.addEventListener('load', showFavoriteCharacters);