//import all functions from firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

//this is firebase config for FilmHub database
const firebaseConfig = {
    apiKey: "AIzaSyBCB8WcxWUwOVaQ4KAu_CLFzJGl2HgfekQ",
    authDomain: "filmhub-5353d.firebaseapp.com",
    databaseURL: "https://filmhub-5353d-default-rtdb.firebaseio.com",
    projectId: "filmhub-5353d",
    storageBucket: "filmhub-5353d.appspot.com",
    messagingSenderId: "1051923199041",
    appId: "1:1051923199041:web:562960c7d6acdf745142c0"
}

//firebase constants
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const filmsInDB = ref(database, "films")

//all querySelectors
const filmName = document.querySelector('.filmName')
const filmList = document.querySelector('.filmList')

//list of films in dictionary
var filmListVar

//all film elements of list, all li elements
var filmItem

//eventListener that adds new film to database or seraches existing one, by pressing Enter
filmName.addEventListener('keypress', e => {
    if(e.key !== 'Enter') return

    if(filmName.value === ""){
        alert("Input is empty!")
        return
    }
    let duplicate = false
    let filmNameValue = filmName.value
    if(filmListVar){
        filmListVar.forEach((i, iterator) => {
            if(filmNameValue.toLowerCase() === i.filmName.toLowerCase()){
                clearInput()
                window.scrollTo(0, filmItem[iterator].offsetTop)
                alert("Searching is successful!")
                duplicate = true
            }
        })
    }
    if(duplicate) return

    let newFilm =
    {
        filmName: filmNameValue,
        watched: false
    }

    push(filmsInDB, newFilm)
    window.scrollTo(0, filmItem[filmItem.length - 1].offsetTop)
    alert("New film added!")
    clearInput()
})

//function that takes snapshot of all database records
onValue(filmsInDB, function(snapshot) {
    clearFilmList()
    filmListVar = Object.values(snapshot.toJSON())
    let listIds = Object.keys(snapshot.val())
    filmListVar.forEach((obj, i) => {
        appendToFilmList(obj, listIds[i])
    })
    giveLogicToFilmElement()
    document.querySelector('.gui').style.display = 'grid'
})

//function that makes html list that is displayed on the page of all films
function appendToFilmList(newFilm, newFilmId){
    let innerHTMLString = `<li class="filmItem" id="${newFilmId}">
                            ${newFilm.filmName}
                           <input type="checkbox" class="filmItemCheckbox"`
    if(newFilm.watched){
        innerHTMLString += " checked>"
    }
    else{
        innerHTMLString += ">"
    }
    innerHTMLString += `<button id="${newFilmId}">Remove</button>
                        </li>`
    filmList.innerHTML += innerHTMLString             
}

//function that gives logic to checkboxes and remove buttons in all films tiles
function giveLogicToFilmElement(){
    filmItem = document.querySelectorAll('.filmItem')
    let filmItemButton = document.querySelectorAll('.filmItem button')

    filmItem.forEach(i => {
        i.addEventListener('change', e => {
            let updates = {
                watched: e.target.checked
            }
            update(ref(database, `films/${e.currentTarget.id}`), updates)
        })
    })
    filmItemButton.forEach(i => {
        i.addEventListener('click', e => {
            remove(ref(database, `films/${e.currentTarget.id}`))
        })
    })
}

//function that clears input given by user
function clearInput(){
    filmName.value = ""
}

//function that clears whole list of films in html
function clearFilmList(){
    filmList.innerHTML = ""
}