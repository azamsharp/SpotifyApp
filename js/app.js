
let addDataButton = document.getElementById("addDataButton")
let moviesList = document.getElementById("moviesList")
let movieNameTextField = document.getElementById("movieNameTextField")
let movieYearTextField = document.getElementById("movieYearTextField")
let addMovieButton = document.getElementById("addMovieButton")

let addActorsToMovieButton = document.getElementById("addActorsToMovieButton")

addActorsToMovieButton.addEventListener('click', function() {
    addActorsToMovie('cyUoZGyDMchlZ6KDlCdg')
})

addMovieButton.addEventListener('click',() => {
    let name = movieNameTextField.value 
    let year = movieYearTextField.value 

    saveDataToFirebase(name, year) 
})

addDataButton.addEventListener('click', function () {
    saveDataToFirebase()
})

function saveDataToFirebase(name, year) {
    // write something to firestore database 
    db.collection("movies").add({
        name: name,
        year: year
    }).then(function (docRef) {
        getAllMovies() 
    }).catch(function (error) {
        console.log(error)
    })
}

function addActorsToMovie(movieId) {

    let actorsArray = ['Actor1 Batman', 'Actor2 Batman', 'Actors3 Batman']

    db.collection("movies").doc(movieId)
        .update({
            actors: actorsArray 
        })
}

function deleteMovie(documentId) {
    // delete the movie based on the documentId 
    db.collection("movies").doc(documentId).delete()
    .then(function() {
       // fetch all movies again 
       getAllMovies() 
    }).catch(function(error) {

    })
}

function getAllMovies() {

    // reset the movieList 
    moviesList.innerHTML = ""

    db.collection("movies").get().then(snapshot => {
        snapshot.forEach((doc) => {
            let data = doc.data() 
            console.log(data)
            
            let actorsItem = data.actors.map((actor) => {
                return `<div>${actor}</div>`
            })

            let movieItem = `<li>
            <label>${data.name} - ${data.year}</label>
            <button onclick="deleteMovie('${doc.id}')">Delete</button>
            </li>
            ${actorsItem.join('')}
            `

            moviesList.insertAdjacentHTML('beforeend',movieItem)
        })
    })

}

getAllMovies() 

/*
Walmart 
   - Eggs 
   - Bread 

Fiesta
 - Fish 
 - Meat
 */ 

