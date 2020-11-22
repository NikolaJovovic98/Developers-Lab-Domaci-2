const list = document.querySelector("#ul-items")
const addButton = document.querySelector('.addButton')
const addField = document.querySelector('.addField')
const searchField = document.querySelector('#filter')

searchField.addEventListener('keyup',filterSearch)
list.addEventListener('click',deleteLiTest)
addButton.addEventListener('click',appendToUl)


const li = list.getElementsByTagName('li')


Array.from(li).forEach(function(item){


    console.log(item.innerText)

})



function filterSearch(e) {

  const text = e.target.value.toLowerCase()

  const li = list.getElementsByTagName('li')

 Array.from(li).forEach(function(item){

    if(item.firstChild.nextSibling.textContent.toLowerCase().indexOf(text) != -1){

        item.style.display = "block"

    }
      
    else {

        item.style.display = "none"

    }

 })

}

function deleteLiTest(e){

        
    const isButton = e.target.nodeName === 'BUTTON'

    if(isButton){

        if(confirm('Are you sure you want to delete ' + e.target.parentElement.firstChild.nextSibling.value + ' ?')){

             const liElement = e.target.parentElement

            list.removeChild(liElement)


            }

    }
            

   
 
}


function appendToUl(event){

    event.preventDefault()

    const newLiElement = document.createElement('li')
    const text = document.createTextNode(addField.value)

    const deleteButton = document.createElement('button')
    deleteButton.appendChild(document.createTextNode('X'))

    newLiElement.appendChild(text)
    newLiElement.appendChild(deleteButton)
    list.appendChild(newLiElement)

}




