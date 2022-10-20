// Connexion persistente à la base MongoDB
import { MongoClient } from "mongodb";

export const DB_NAME = 'ny';
export const DB_COLLECTION = 'restaurants';

// Déclaration de la connectionString
const CONNECTION_STRING = "mongodb://root:example@mongo:27017"; // Avec Docker
// const CONNECTION_STRING = 'mongodb://localhost:27017'; // Installation locale de MongoDB

// Initialise une connexion à la base MongoDB
export const client = new MongoClient(CONNECTION_STRING);
let db = null;

export function openDatabase() {
  return client.connect().then(() => {
    db = client.db(DB_NAME);

    return db;
  });
};


export async function getBoroughs() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const boroughs = await restaurants.distinct("borough");

  return boroughs.slice(2);
}

export async function getCuisines() {
  const db = await client.db(DB_NAME);
  const restaurants = await db.collection(DB_COLLECTION);
  const boroughs = await restaurants.distinct("cuisine");

  return boroughs.slice(5);
}



export async function searchrestos(name) {
  const db = await client.db(DB_NAME)
  const restos = await db.collection(DB_COLLECTION);
  const searchResults = await restos.find({ 'name': { '$regex': name, '$options': 'i' } }, {
    fields: { borough: 1, cuisine: 1, name: 1, address: 1, grade: 0 }
  }).slice(5)

  return searchResults;

}

export async function exploreResto(borough, cuisine) {
  const db = await client.db(DB_NAME)
  const restos = await db.collection(DB_COLLECTION);
  const searchResults = await restos.find({ 'name': borough, 'cuisine': cuisine }).slice(5)

  return searchResults;

}

