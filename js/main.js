let loader = document.querySelector('.loader')

// получаем данные с сервера
async function loadDataFromServer(URI) {
    const response = await fetch(URI);
    if (response.ok) loader.classList.add('loader-hidden')
    return await response.json();
}

const PICTURES_QUANTITY = 8

// limit= 'change quantity'
let catData = await loadDataFromServer(`https://api.thecatapi.com/v1/images/search?limit=${PICTURES_QUANTITY}&breed_ids=beng&api_key=live_Wic0zLetdOdhC5BgvA40JHq7SwCG8eicCtM30HpXsn3fnrzH16lgnJjNR87zaBLp`)

console.log('catData=>', catData)

let picturesQuantitySpan = document.querySelector('.gallery-quantity');
picturesQuantitySpan.textContent = PICTURES_QUANTITY

function createCard(link) {
    let wrapper = document.createElement('li');
    wrapper.classList.add('gallery-item');

    // data-type="image" если при нажатии на картинку выдает Invalid sourse
    wrapper.innerHTML = `
    <a href="${link}" data-fslightbox="gallery" data-type="image" class="gallery-link">
        <img src="${link}" alt="gallery-img" class="gallery-img">
    </a>
    `
    refreshFsLightbox(); // иначе галлерея не работает
    return wrapper
}

let cardContainer = document.querySelector('.gallery-list')

for (const item of catData) {
    cardContainer.appendChild(createCard(item.url))
}