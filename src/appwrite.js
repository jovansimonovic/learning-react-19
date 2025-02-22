import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // uses Appwrite SDK to check if the search term exists in the database
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    // if the search term exists, increments the count
    // else, creates a new document with search term and count set to 1
    if (result.documents.length > 0) {
      const document = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
        count: document.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    // uses Appwrite SDK to get the top 5 trending movies
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    
    return result.documents;
  } catch (error) {
    console.error(error);
  }
};
