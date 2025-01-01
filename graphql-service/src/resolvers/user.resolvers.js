const pool = require("../client"); // Import the pool from db.js

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const result = await pool.query("SELECT * FROM users");
        return result.rows; // Return the result rows from the query
      } catch (err) {
        console.error("Error fetching users:", err);
        throw new Error("Failed to fetch users");
      }
    },
    user: async (_, { id }) => {
      try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [
          id,
        ]);
        return result.rows[0]; // Return a single user by id
      } catch (err) {
        console.error("Error fetching user:", err);
        throw new Error("Failed to fetch user");
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      try {
        const result = await pool.query(
          "INSERT INTO users(name, email, age) VALUES($1, $2, $3) RETURNING *",
          [name, email, age]
        );
        return result.rows[0]; // Return the newly created user
      } catch (err) {
        console.error("Error creating user:", err);
        throw new Error("Failed to create user");
      }
    },
    updateUser: async (_, { id, name, email, age }) => {
      try {
        const result = await pool.query(
          "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
          [name, email, age, id]
        );
        return result.rows[0]; // Return the updated user
      } catch (err) {
        console.error("Error updating user:", err);
        throw new Error("Failed to update user");
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await pool.query("DELETE FROM users WHERE id = $1", [id]);
        return true; // Return true if deletion is successful
      } catch (err) {
        console.error("Error deleting user:", err);
        throw new Error("Failed to delete user");
      }
    },
  },
};

module.exports = userResolvers;
