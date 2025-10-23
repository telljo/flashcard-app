import { useEffect, useState } from "react";
import { getDecks } from "../../api/decks";
import Deck from "../Deck/Deck";
import { useNavigate } from "react-router-dom";
import styles from "./_deck_list.module.scss"
import { CirclePlus } from "lucide-react";

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
      className={styles.deckList}
    >
      {decks.map((deck) => (
        <Deck key={deck.id} deck={deck} onClick={handleDeckClick} />
      ))}
      <button
        onClick={() => navigate("/decks/new")}
        className={styles.newDeckButton}
      >
        <CirclePlus size={20} />
        Create Deck
      </button>
    </div>
  );
}

export default DeckList;
