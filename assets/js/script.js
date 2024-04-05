const dogImage = document.querySelector('.imagem>img')
const breedInfo = document.querySelector('.info')
const btnLoad = document.querySelector('#btnUpdate');


const fetchDog = async (api_key) => {
    const data = await fetch(`https://api.thedogapi.com/v1/images/search?has_breeds=1&api_key=${api_key}`).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }).catch(e => console.log(e));

    return data;
}

async function renderDog() {
    breedInfo.innerHTML = '<p>Loading...</p>'

    const data = await fetchDog('live_RK2C3W1MkBRJuwCBdnav4Os19uZWR2kBVhRtoCKdqp0WGdSXdEhW9Ous1O4jGiN8'
    );
    try {
        dogImage.src = data[0].url;
        dogImage.onload = () => breedInfo.innerHTML = `<p><strong class="centro">${data['0']['breeds']['0']['name']}</strong></br>Tamanho: ${data['0']['breeds']['0']['height']['metric']} cm</br>Peso: ${data['0']['breeds']['0']['weight']['metric']} kg</br>Temperamento: ${data['0']['breeds']['0']['temperament']}</p>`
        btnLoad.classList.remove('rotate')
    } catch (error) {
        breedInfo.innerHTML = `<p>Erro ao carregar as informações. Erro: ${error}`
    }

}
btnLoad.addEventListener('click', renderDog)
renderDog()