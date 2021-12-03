import { client } from "./index.js";

export async function getMovieById(id) {
  return await client
    .db("day40")
    .collection("movies")
    .findOne({ id: id });
}
export function createMovies(data) {
  return client
    .db("day40")
    .collection("movies")
    .insertMany(data);
}
export function updateMovieById(id, data) {
  return client
    .db("day40")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
}
export function deleteMovieById(id) {
  return client
    .db("day40")
    .collection("movies")
    .deleteOne({ id: id });
}
export async function getMovies() {
  return await client.db("day40").collection("movies").find({}).toArray();
}
