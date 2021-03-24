// const url = "http://localhost:3000/spiceblends/"
// const body = document.body
// const formUpdate = body.querySelector('#update-form')
// const ingredientUpdate = body.querySelector('#ingredient-form')

// /*** FUNCTIONS ***/

// const renderOneSpice = (spiceObj) => {
//     const detailImg = body.querySelector('#spice-blend-detail > img')    
//     detailImg.src = spiceObj.image
//     detailImg.alt = spiceObj.title

//     const detailH2 = body.querySelector('#spice-blend-detail > h2')
//     detailH2.textContent = spiceObj.title

//     const detailList = body.querySelector('#spice-blend-detail > div > ul')
//     spiceObj.ingredients.forEach((spice) => {
//         console.log(spice);

//         const li = document.createElement("li");
//         li.textContent = spice.name
//         detailList.append(li)
//     })

//     fetch ("http://localhost:3000/spiceblends/1")
//         .then(resp => resp.json())
//         .then(data.ingredients.forEach(ingredient => {
//             renderOneSpice(spiceObj)
//         }))
//     const li = document.createElement('li')
//     li.innerText = ingredient.name

//     detailList.append(li)

//     // formUpdate.dataset.id = spiceObj.id
//     // const newTitle = formUpdate.querySelector('#spiceblend-title')
//     // const addIngredient = formUpdate.querySelector('#ingredient-name')
//     // title.value = spiceObj.newTitle
//     // ingredient.value = spiceObj.addIngredient
// }

// const renderFirstSpice = (spiceObj) => {
//     fetch (`${url}`)
//     .then(resp => resp.json())
//     .then(spiceObjs => {
//         spiceObjs.forEach(spiceObj => renderOneSpice(spiceObj))
//     })
// }

// const updateSpice = (event) => {
//     const id = event.target.dataset.id
//     event.preventDefault()

//     const newTitle = event.target[0].value

//     fetch(`${url}/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             title: newTitle,
//         })
//     })
// }

// const addIngredient = (event) => {
//     const id = event.target.dataset.id
//     event.preventDefault()

//     const newIngredient = event.target[1].value

//     fetch(`${url}/${id}`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             ingredient: newIngredient
//         })
//     })

// }

// /*** EVENT LISTENERS ***/

// body.addEventListener('submit', event => {
//     if (event.target.matches('#update-form')){
//         updateSpice(event)
//     }
//     else if (event.target.matches('#ingredient-form')){
//         addIngredient(event)
//     }
// })

// renderFirstSpice();

const url = 'http://localhost:3000/spiceblends'

//deliverable 1

fetch(`${url}/1`)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data) //what data do you get back when console.log
        //first find the title 
        const detailH2 = document.querySelector('h2.title')
        detailH2.textContent = data.title
        //find the image and update the source attribute and alt attribute
        const detailImg = document.querySelector('img.detail-image')
        detailImg.src = data.image
        detailImg.alt = data.title

        //theres a div with ingredients container theres an h4 and a ul where the ingredients go
        //since its a list get the ingredients array and then iterate over the array and forEach ingredient create an li and update the lis text content to ingredient name and append it to the ul
        //the data object is an object with an ingredients array which is all the ingredients that belong to the spice blnd

        const ingredientsUl = document.querySelector('ul.ingredients-list') //(x)

        data.ingredients.forEach(ingredientObject => {
            //gives access to the array full of containers that need to be accessed
            //iterate over one ingredient object at a time
            //for each create an li and set the text content to the ingredient name 

            const li = document.createElement('li')
            li.textContent = ingredientObject.name
            // console.log(li) //so far only in the browsers memory
            //query select the ul so the lis can be appended to it (x)
            ingredientsUl.append(li) 
        }) 
        console.log(data.ingredients)
    })

 //deliverable 2

    const updateForm = document.querySelector('form#update-form')
    //find form that needs to be updated, global variable
    updateForm.addEventListener('submit', event => {
        //create event listener for submit
        //pass in call back function 
        event.preventDefault() //prevent refresh on the form.
        // console.log('form submitted') //check if event listener works

        //get user input
        const titleInput = event.target.title.value //this gives the input field and .value gives what the user puts in
        //has a name and id attribute that give a title and spice blend title that can be called on event.target
        //if you dont see a name attribute in a form you can add it to the html
        // console.log(event.target.title) //input field element
        //title input needs to persist so a patch request needs to be made so the new title can be saved in the db
        fetch(`${url}/1`, {
            method: "PATCH",
            headers: {
                "Type-Content": "application/json"
            },
            body: JSON.stringify({ title: titleInput })//pass in the property of an object we're tryihng to update
        })
        .then(resp => resp.json())//goes into the response object and pulls out thd data for us to work with
        // .then(data => {
        //     console.log(data)//get data back from the server and can console.log to double check and  see whats available to manipulate then can rename the parameter for data to something more meaningful
        // })
        .then(updatedSpiceBlendObj =>{
            const detailH2 = document.querySelector('h2.title')
            detailH2.textContent = updatedSpiceBlendObj.title
        })
        //then manipulate the dom, on the user side they should see the new title displayed so to change the text content first find the element thats holding the text, inspect it's the h2, so find the h2 and update the text content to show the new title that the user input
    })

//deliverable 3 
//search for form on the dom using queryselector
const newIngredientForm = document.querySelector('form#ingredient-form')
//global variable

newIngredientForm.addEventListener('submit', event => {
    //submit event
    event.preventDefault()
    // console.log('submitted!') //test if form is submitted by adding an ingredient
    //next get user input
    const newIngredientInput = event.target['ingredient-name'].value
    // console.log(newIngredientInput)
    //need to add this ingredient to the ingredient section, theyre all in the ul inside of an li so a new ingredient should have an li, create one
    const li = document.createElement('li')
    li.textContent = newIngredientInput 

    const ingredientsUl = document.querySelector('ul.ingredients-list') //(x)
    ingredientsUl.append(li)

    event.target.reset()
})