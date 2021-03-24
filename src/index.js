const url = "http://localhost:3000/spiceblends/"
const body = document.body
const formUpdate = body.querySelector('#update-form')
const ingredientUpdate = body.querySelector('#ingredient-form')

/*** FUNCTIONS ***/

const renderOneSpice = (spiceObj) => {
    const detailImg = body.querySelector('#spice-blend-detail > img')    
    detailImg.src = spiceObj.image
    detailImg.alt = spiceObj.title

    const detailH2 = body.querySelector('#spice-blend-detail > h2')
    detailH2.textContent = spiceObj.title

    const detailList = body.querySelector('#spice-blend-detail > div > ul')

    const iList = document.createElement('li')
    iList.dataset.id = spiceObj.id
    iList.textContent = spiceObj.ingredients.id

    detailList.append(iList)

    formUpdate.dataset.id = spiceObj.id
    const newTitle = formUpdate.querySelector('#spiceblend-title')
    const addIngredient = formUpdate.querySelector('#ingredient-name')
    title.value = spiceObj.newTitle
    ingredient.value = spiceObj.addIngredient
}

const renderFirstSpice = (spiceObj) => {
    fetch (`${url}`)
    .then(resp => resp.json())
    .then(spiceObjs => {
        spiceObjs.forEach(spiceObj => renderOneSpice(spiceObj))
    })
}

const updateSpice = (event) => {
    const id = event.target.dataset.id
    event.preventDefault()

    const newTitle = event.target[0].value

    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            title: newTitle,
        })
    })
}

const addIngredient = (event) => {
    const id = event.target.dataset.id
    event.preventDefault()

    const newIngredient = event.target[1].value

    fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            ingredient: newIngredient
        })
    })

}

body.addEventListener('submit', event => {
    if (event.target.matches('#update-form')){
        updateSpice(event)
    }
    else if (event.target.matches('#ingredient-form')){
        addIngredient(event)
    }
})

renderFirstSpice();
