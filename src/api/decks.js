import api from "./api";

// Fetch all decks
export const getDecks = () => {
  return api.get("/decks");
};

// Fetch a single deck by ID
export const getDeck = (id) => {
  return api.get(`/decks/${id}`);
};

// Create a new deck
export const createDeck = (data) => {
  return api.post("/decks", data);
};

// Update a deck
export const updateDeck = (id, data) => {
  return api.put(`/decks/${id}`, data);
};

// Delete a deck
export const deleteDeck = (id) => {
  return api.delete(`/decks/${id}`);
};
