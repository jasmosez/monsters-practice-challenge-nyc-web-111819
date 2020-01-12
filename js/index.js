let baseUrl = 'http://localhost:3000/monsters';
let pageLimit = 50;
let currentPage = 1;

function getUrl() {
  return (baseUrl + '/?_limit=' + pageLimit.toString() + '&_page=' + currentPage.toString())
}

function createForm() {
  let form = document.createElement('form')
  // name, age, description, submit
  inputDetails = [
    {
      type: "text",
      name: "name",
      value: "",
      placeholder: "Name"
    },
    {
      type: "text",
      name: "age",
      value: "",
      placeholder: "Age"
    },
    {
      type: "text",
      name: "description",
      value: "",
      placeholder: "Description"
    },
    {
      type: "submit",
      name: "submit",
      value: "Create New Monster",
    }
  ]

  inputDetails.forEach(function (item) {
    input = document.createElement('input')
    input.type = item.type
    input.name = item.name
    input.value = item.value
    if (!!item.placeholder) {
      input.placeholder = item.placeholder
    }
    form.appendChild(input)
  })

  let createMonster = document.getElementById('create-monster')
  createMonster.appendChild(form)

  form.addEventListener('submit', function(event){
    event.preventDefault()

    // pessimistic rendering
    monster = {
      name: event.target.name.value,
      age: event.target.age.value,
      description: event.target.description.value
    }

    configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(monster)
    }

    fetch(baseUrl, configObj)
    .then(function(response){
      return response.json()
    })
    .then(function(monster){
      renderMonster(monster)
    })

  })
}

function getMonsters() {
  let url = getUrl()
  console.log(url)
  fetch(url)
  .then(function(response){
    return response.json()
  })
  .then(function(monsters) {
    monsters.forEach(function(monster) {
      renderMonster(monster)
    })
  })
}

function renderMonster(monster) {
  monsterCard = document.createElement('div')
  monsterCard.className = 'monster-card'
  monsterCard.dataset.id = monster.id
  monsterCard.style.color = getRandomColor()
  monsterCard.innerHTML = `
    <h2>${monster.id}. ${monster.name}</h2>
    <p>
      ${monster.description} <br>
      Age: ${monster.age}
    </p>
  `
  monsterContainer.appendChild(monsterCard)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function clearPage() {
  monsterContainer.innerHTML = ""
  
}


document.addEventListener('DOMContentLoaded', function () {
  monsterContainer = document.getElementById('monster-container')
  
  createForm()
  getMonsters()
  
  forwardButtons = document.getElementsByClassName('forward')
  for (const element of forwardButtons) {
    element.addEventListener('click', function () {
      currentPage++
      clearPage()
      getMonsters()
    })
  }
  
  backButtons = document.getElementsByClassName('back')
  for (const element of backButtons){
    element.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--
        clearPage()
        getMonsters()
      }
    })
  }



})



