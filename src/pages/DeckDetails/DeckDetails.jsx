import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeck } from "../../api/decks";
import styles from "./_deck_details.module.scss"
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

export default function DeckDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    getDeck(id).then((res) => setDeck(res.data));
  }, [id]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.deckDetails}>
        <h2>{deck.name}</h2>
        <p>{deck.description || "No description"}</p>

        <Button
          onClick={() => navigate("/decks/" + deck.id + "/edit")}
          variant="primary"
          size="md">Edit deck
        </Button>
      </div>
    </>
  );
}