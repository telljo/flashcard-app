import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeck, deleteDeck } from "../../api/decks";
import styles from "./_deck_details.module.scss"
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";

export default function DeckDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getDeck(id).then((res) => setDeck(res.data));
  }, [id]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.deckDetails}>
        <div className={styles.deckHeader}>
          <div>
            <h2 style={{marginBottom: "0.5em"}}>{deck.name}</h2>
          </div>

          <div className={"flexRow-m"}>
            <Button
              onClick={() => navigate("/decks/" + deck.id + "/edit")}
              variant="primary"
              size="md">Edit deck
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={() => setShowConfirm(true)}
            >
              Delete deck
            </Button>

            <ConfirmDialog
              isOpen={showConfirm}
              title="Delete Deck?"
              message={`Are you sure you want to permanently delete "${deck.name}"?`}
              onCancel={() => setShowConfirm(false)}
              onConfirm={() => deleteDeck(deck.id).then(() => navigate("/"))}
            />
          </div>
        </div>
        <p>{deck.description || "No description"}</p>

      </div>
    </>
  );
}