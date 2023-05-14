import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

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
const submit = document.querySelector('.submit')

submit.addEventListener('click', () => {
    let filmNameValue = filmName.value
    let newFilm =
    {
        filmName: filmNameValue,
        watched: false
    }

    push(filmsInDB, newFilm)

    console.log(`${filmNameValue} added to database`)
})