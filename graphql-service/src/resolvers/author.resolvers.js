const pool = require("../client"); // Import the pool from db.js

const authorResolvers = {
  Query: {
    authors: async () => {
      try {
        const result = await pool.query("SELECT * FROM authors");
        return result.rows; // Return the result rows from the query
      } catch (err) {
        console.error("Error fetching authors:", err);
        throw new Error("Failed to fetch authors");
      }
    },
    author: async (_, { id }) => {
      try {
        const result = await pool.query("SELECT * FROM authors WHERE id = $1", [
          id,
        ]);
        return result.rows[0]; // Return a single author by id
      } catch (err) {
        console.error("Error fetching author:", err);
        throw new Error("Failed to fetch author");
      }
    },
  },
  Mutation: {
    createAuthor: async (_, { name, books }) => {
      try {
        const result = await pool.query(
          "INSERT INTO authors(name, books) VALUES($1, $2) RETURNING *",
          [name, books]
        );
        return result.rows[0]; // Return the newly created author
      } catch (err) {
        console.error("Error creating author:", err);
        throw new Error("Failed to create author");
      }
    },
    updateAuthor: async (_, { id, name, books }) => {
      try {
        const result = await pool.query(
          "UPDATE authors SET name = $1, books = $2 WHERE id = $3 RETURNING *",
          [name, books, id]
        );
        return result.rows[0]; // Return the updated author
      } catch (err) {
        console.error("Error updating author:", err);
        throw new Error("Failed to update author");
      }
    },
    deleteAuthor: async (_, { id }) => {
      try {
        await pool.query("DELETE FROM authors WHERE id = $1", [id]);
        return true; // Return true if deletion is successful
      } catch (err) {
        console.error("Error deleting author:", err);
        throw new Error("Failed to delete author");
      }
    },
  },
};

module.exports = authorResolvers;
