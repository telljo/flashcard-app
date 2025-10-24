import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCard, updateCard, createCard } from "../../api/cards";
import styles from "./_card_details_form.module.scss";
import Button from "../../components/Button";
import formStyles from "../../styles/_form.module.scss";

export default function CardDetailsForm() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId;
  const cardId = params.cardId
  const isEditMode = Boolean(cardId);

  const [card, setCard] = useState(null);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      getCard(deckId, cardId).then((res) => {
        setCard(res.data);
        setFront(res.data.front);
        setBack(res.data.back);
      });
    } else {
      setCard({});
    }
  }, [deckId, cardId, isEditMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode) {
        const res = await updateCard(deckId, cardId, { front, back });
        navigate(`/decks/${deckId}/cards/${res.data.id}`);
      } else {
        const res = await createCard(deckId, { front, back });
        navigate(`/decks/${deckId}/cards/${res.data.id}`);
      }
    } catch (err) {
      setError("Failed to save card");
      console.error(err);
    }
  }

  if (!card) return <p>Loading...</p>;

  return (
    <div className={styles.cardDetailsForm}>
      <h1>{isEditMode ? "Edit Card" : "Create Card"}</h1>

      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <div className={formStyles.formField}>
          <div className="flexRow-s">
            <label className={formStyles.formLabel}>Front:</label>
            <p style={{ color: "red", margin: 0 }}>*</p>
          </div>
          <input
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          />
        </div>

        <div className={formStyles.formField}>
          <div className="flexRow-s">
            <label className={formStyles.formLabel}>Back:</label>
            <p style={{ color: "red", margin: 0 }}>*</p>
          </div>
          <input
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit" variant="primary" size="md">
          {isEditMode ? "Update Card" : "Create Card"}
        </Button>
      </form>
    </div>
  );
}
