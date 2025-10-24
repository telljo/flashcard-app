import api from "./api";

// Fetch all cards for a deck
export const getCards = (deckId) => {
  return api.get(`/decks/${deckId}/cards`);
};

// Fetch a single card by ID within a deck
export const getCard = (deckId, id) => {
  return api.get(`/decks/${deckId}/cards/${id}`);
};

// Create a new card within a deck
export const createCard = (deckId, data) => {
  return api.post(`/decks/${deckId}/cards`, data);
};

// Update a card within a deck
export const updateCard = (deckId, id, data) => {
  return api.put(`/decks/${deckId}/cards/${id}`, data);
};

// Delete a card within a deck
export const deleteCard = (deckId, id) => {
  return api.delete(`/decks/${deckId}/cards/${id}`);
};
