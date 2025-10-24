import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCard, deleteCard } from "../../api/cards";
import styles from "./_card_details.module.scss"
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import Card from "../Card/Card";

export default function CardDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId;
  const cardId = params.cardId
  const [card, setCard] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    getCard(deckId, cardId).then((res) => setCard(res.data));
  }, [deckId, cardId]);

  if (!card) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.cardDetails}>
        <div className={styles.cardHeader}>
          <div>
            <h1 style={{marginBottom: "0.5em"}}>Card Details</h1>
          </div>
          <div className={"flexRow-m"}>
            <Button
              onClick={() => navigate(`/decks/${deckId}/cards/${cardId}/edit`)}
              variant="primary"
              size="md">Edit card
            </Button>

            <Button
              variant="danger"
              size="md"
              onClick={() => setShowConfirm(true)}
            >
              Delete card
            </Button>

            <ConfirmDialog
              isOpen={showConfirm}
              title="Delete Card?"
              message={"Are you sure you want to permanently delete this card?"}
              onCancel={() => setShowConfirm(false)}
              onConfirm={() => deleteCard(deckId, cardId).then(() => navigate(`/decks/${deckId}`))}
            />
          </div>
        </div>

        <Card key={card.id} card={card} />
      </div>
    </>
  );
}