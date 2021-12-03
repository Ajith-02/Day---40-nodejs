
import express from "express";
const router = express.Router();
import { getMovieById, deleteMovieById, updateMovieById, createMovies, getMovies } from "../helper.js";


router.get("/:id", async(request, response)=>{
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
  
  router.delete("/:id", async(request, response)=>{
    console.log(request.params);
    const { id } = request.params;
    const result = await deleteMovieById(id);
    
    result.deletedCount > 0
    ? response.send(result)
    : response.status(404).send({message: "No matching movie"}); 
  });
  
  router.put("/:id", async(request, response)=>{
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
  router.post("/", async (request, response)=>{
    const data = request.body;
    //console.log(data);
    // create movies - db.movies.insertMany(data)
    const result = await createMovies(data);
    response.send(data);
  });
  
  router.get("/", async (request, response)=>{
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
  
  export const moviesRouter = router;



