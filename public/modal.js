const modalOverlay = document.querySelector('.modal-overlay')

const cards = document.querySelectorAll('.cards .card')

const recipes = 
[
    {
        id: 'burger',
        title: 'Triplo bacon burguer',
        author: 'por Guilherme Batalha'
    },

    {
        id: 'pizza',
        title: 'Pizza 4 estações',
        author: 'por Fabiana Melo'
    },

    {
        id: 'espaguete',
        title: 'Espaguete ao alho',
        author: 'por Júlia Kinoto'
    },

    {
        id: 'lasanha',
        title: "Lasanha mac n' cheese",
        author: 'por Juliano Vieira'
    },

    {
        id: 'doce',
        title: 'Docinhos pão-do-céu',
        author: 'por Ricardo Golvea'
    },

    {
        id: 'asinhas',
        title: 'Asinhas de frando ao barbecue',
        author: 'por Vania Steroski'
    }
]

for (const card of cards) {
    card.addEventListener('click', function(){
        modalOverlay.classList.add('active')

        const address = card.getAttribute('id')

        modalOverlay.querySelector('img').src = `./assets/${address}.png`

        const h2 = document.querySelector('.modal-content h2')
        //const p = card.querySelector('.modal-content .card .author')

        h2.innerHTML = ''

        for (const recipe of recipes) {

            if(recipe.id === address){
                const title = document.createTextNode(recipe.title)
                h2.appendChild(title)
                
                const p = document.createElement('p')
                const author = document.createTextNode(recipe.author)

                p.appendChild(author)
                document.querySelector('.modal-content .author').appendChild(p)
            }
        }
    })
}

const closeBtn = document.querySelector('.modal-overlay .close')

closeBtn.addEventListener('click', function(){
    modalOverlay.classList.remove('active')

    modalOverlay.querySelector('img').src = ''

    const p = document.querySelector('.author p')

    document.querySelector('.author').removeChild(p);
})