import { client } from "./index.js";

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

export { 
  getMovieById, 
  deleteMovieById, 
  updateMovieById, 
  createMovies, 
  getMovies 
}
