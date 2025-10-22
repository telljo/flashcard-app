import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeck } from "../api/decks";
import Deck from "./Deck";

export default function DeckDetails() {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    getDeck(id).then((res) => setDeck(res.data));
  }, [id]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ maxWidth: "600px", textAlign: "center" }}>
      <Deck key={deck.id} deck={deck} />
    </div>
  );
}