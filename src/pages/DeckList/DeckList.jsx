import { useEffect, useState } from "react";
import { getDecks } from "../../api/decks";
import Deck from "../Deck/Deck";
import { useNavigate } from "react-router-dom";

function DeckList() {
  const navigate = useNavigate();
  const handleDeckClick = (deck) => {
    navigate("/decks/" + deck.id);
  };
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    getDecks().then((res) => setDecks(res.data));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck} onClick={handleDeckClick} />
      ))}
    </div>
  );
}

export default DeckList;
