import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyBCB8WcxWUwOVaQ4KAu_CLFzJGl2HgfekQ",
    authDomain: "filmhub-5353d.firebaseapp.com",
    databaseURL: "https://filmhub-5353d-default-rtdb.firebaseio.com",
    projectId: "filmhub-5353d",
    storageBucket: "filmhub-5353d.appspot.com",
    messagingSenderId: "1051923199041",
    appId: "1:1051923199041:web:562960c7d6acdf745142c0"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const filmsInDB = ref(database, "films")

const filmName = document.querySelector('.filmName')
const filmList = document.querySelector('.filmList')
const submit = document.querySelector('.submit')

function clearInput(){
    filmName.value = ""
}

submit.addEventListener('click', () => {
    if(filmName.value === "") return

    let filmNameValue = filmName.value
    let newFilm =
    {
        filmName: filmNameValue,
        watched: false
    }

    push(filmsInDB, newFilm)

    clearInput()
})

onValue(filmsInDB, function(snapshot) {
    clearFilmList()
    let list = Object.values(snapshot.toJSON())
    list.forEach(i => {
        appendToFilmList(i)
    });
})

function appendToFilmList(newFilm){
    let innerHTMLString = `<li>
                            ${newFilm.filmName}
                           <input type="checkbox"`
    if(newFilm.watched){
        innerHTMLString += " checked></li>"
    }
    else{
        innerHTMLString += "></li>"
    }
    filmList.innerHTML += innerHTMLString             
}

function clearFilmList(){
    filmList.innerHTML = ""
}