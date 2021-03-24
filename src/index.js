const url = "http://localhost:3000/spiceblends/"
const body = document.body

/*** FUNCTIONS ***/

const renderOneSpice = (spiceObject) => {
    const detailImg = body.querySelector('#spice-blend-detail > img')    
    detailImg.src = spiceObject.image
    detailImg.alt = spiceObject.title

    const detailH2 = body.querySelector('#spice-blend-detail > h2')
    detailH2.textContent = spiceObject.title

    const detailList = body.querySelector('#spice-blend-detail > div > ul')

    const iList = document.createElement('li')
    iList.dataset.id = spiceObject.id
    iList.innerText = spiceObject.ingredients.id

    detailList.append(iList)
}

const renderFirstSpice = (spiceObject) => {
    fetch (`${url}`)
    .then(resp => resp.json())
    .then(spiceObjs => {
        spiceObjs.forEach(spiceObject => renderOneSpice(spiceObject))
    })
}
    

// const imgSpice = (spiceObj) => {
//     const img = document.createElement('img')

// }

renderFirstSpice()
