
//const express = require("express"); // this is for "type": "common" 
import express from "express"; // this is for "type": "module" 
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); // all keys it will put in process.env

console.log(process.env);
const app = express();

const PORT = 9000;

//middleware
app.use(express.json())
  //express.json() is a inbuilt middleware
  // which transforms the body data passed in json
  // it converts every request in the app

/*
const movies =[
    
  {
    "id": "101",
    "name": "No Country for Old Men",
    "poster": "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    "rating": 8.1,
    "summary": "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    "trailer": "https://www.youtube.com/embed/38A__WT3-o0",
    "language": "english"
  },


  {
    "id": "104",
    "name": "Interstellar",
    "poster": "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    "rating": 8.6,
    "summary": "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    "trailer": "https://www.youtube.com/embed/zSWdZVtXT7E",
    "language": "english"
  },
  {
    "id": "105",
    "name": "Iron man 2",
    "poster": "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    "rating": 7,
    "summary": "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    "trailer": "https://www.youtube.com/embed/wKtcmiifycU",
    "language": "english"
  },

  {
    "id": "102",
    "name": "Jai Bhim",
    "poster": "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    "summary": "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    "rating": 8.8,
    "trailer": "https://www.youtube.com/embed/nnXpbTFrqXA",
    "language": "tamil"
  },
  {
    "id": "103",
    "name": "The Avengers",
    "rating": 8,
    "summary": "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    "poster": "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    "trailer": "https://www.youtube.com/embed/eOrNdBpGMv8",
    "language": "english"
  },
 
  {
    "id": "105",
    "name": "Baahubali",
    "poster": "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    "rating": 8,
    "summary": "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    "trailer": "https://www.youtube.com/embed/sOEg_YZQsTI",
    "language": "tamil"
  },
  {
    "id": "106",
    "name": "Ratatouille",
    "poster": "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    "summary": "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    "trailer": "https://www.youtube.com/embed/NgsQ8mVkN8w",
    "rating": 8,
    "language": "english"
    
  }
];
*/
// One & only line change to make it 

const MONGO_URL = process.env.MONGO_URL;
//const MONGO_URL = "mongodb://localhost";
//const MONGO_URL = "mongodb+srv://Ajith:welcome123@cluster0.rtsnr.mongodb.net";
//mongodb+srv://Ajith:<password>@cluster0.rtsnr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect(); //promise
  console.log("Mongodb Connected");
  return client;
}
const client = await createConnection()

app.get("/", (request, response)=>{
     response.send("Hello All");
 });

/*
 app.get("/movies", (request, response)=>{
   response.send(movies)
}); 
*/
app.get("/movies/:id", async(request, response)=>{
  console.log(request.params);
  const { id } = request.params;
  // db.movies.findOnw({id: "102"})
  const movie = await getMovieById(id);
  //const movie = movies.find((mv)=> mv.id === id);
  console.log(movie);
  movie
  ? response.send(movie)
  : response.status(404).send({message: "No matching movie"}); 
});

app.delete("/movies/:id", async(request, response)=>{
  console.log(request.params);
  const { id } = request.params;
  const result = await deleteMovieById(id);
  
  result.deletedCount > 0
  ? response.send(result)
  : response.status(404).send({message: "No matching movie"}); 
});

app.put("/movies/:id", async(request, response)=>{
  console.log(request.params);
  const { id } = request.params;
  const data = request.body; //we will update in body
  const result = await updateMovieById(id, data);
  //const movie = movies.find((mv)=> mv.id === id);
  response.send(result);
  /*movie
  ? response.send(result)
  : response.status(404).send({message: "No matching movie"}); */
});
//movies -> all the movies
//movies?language=english -> only english movies
//movies?language=tamil -> only tamil movies
/*
app.get("/movies", (request, response)=>{
  //request -> query params
  console.log(request.query);
  const { language } = request.query;
  console.log(language);
  if(language){
    const filterMovies = movies.filter((mv)=> mv.language === language);
    response.send(filterMovies);
  } else {
    response.send(movies)
 }
});
*/
//movies -> all the movies
//movies?language=english -> only english movies
//movies?language=tamil -> only tamil movies
//movies?language=english&rating=8 -> filter by language and rating
//movies?rating=8 -> filter by movies and rating
app.post("/movies", async (request, response)=>{
  const data = request.body;
  //console.log(data);
  // create movies - db.movies.insertMany(data)
  const result = await createMovies(data);
  response.send(data);
});

app.get("/movies", async (request, response)=>{
  //request -> query params
  console.log(request.query);
  const filter = request.query;
  console.log(filter);
  if(filter.rating){
    filter.rating = +filter.rating;
  }
  //const { language, rating } = request.query;
  /*console.log(language, rating);
  let filterMovies = movies;
  if(language){
    filterMovies = filterMovies.filter((mv)=> mv.language === language);
  }
  if(rating){
    filterMovies = filterMovies.filter((mv)=> mv.rating === +rating);  
  }*/

  //db.movies.find({})
  const filterMovies = await getMovies(); // find always reurns in cursor
  console.log(filterMovies); 
  // Cursor is a pagination 1 2 3 4 5 6 Next
  response.send(filterMovies);
  
});

 app.listen(PORT, ()=> console.log("App is started", PORT));





async function getMovieById(id) {
  return await client
    .db("day40")
    .collection("movies")
    .findOne({ id: id });
}

function createMovies(data) {
  return client
    .db("day40")
    .collection("movies")
    .insertMany(data);
}

function updateMovieById(id, data) {
  return client
    .db("day40")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}

function deleteMovieById(id) {
  return client
    .db("day40")
    .collection("movies")
    .deleteOne({ id: id });
}

async function getMovies() {
  return await client.db("day40").collection("movies").find({}).toArray();
}
 // Other ways to find using url
 // https://www.youtube.com/results?search_query=maanaadu+trailer
 // things after "?" is query params(parameters)