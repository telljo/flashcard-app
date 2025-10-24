import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeck, updateDeck, createDeck } from "../../api/decks";
import styles from "./_deck_details_form.module.scss";
import Button from "../../components/Button";
import formStyles from "../../styles/_form.module.scss";

export default function DeckDetailsForm() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const isEditMode = Boolean(deckId);

  const [deck, setDeck] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      getDeck(deckId).then((res) => {
        setDeck(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
      });
    } else {
      setDeck({});
    }
  }, [deckId, isEditMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode) {
        const res = await updateDeck(deckId, { name, description });
        navigate(`/decks/${res.data.deckId}`);
      } else {
        await createDeck({ name, description });
        navigate("/");
      }
    } catch (err) {
      setError("Failed to save deck");
      console.error(err);
    }
  }

  if (!deck) return <p>Loading...</p>;

  return (
    <div className={styles.deckDetailsForm}>
      <h1>{isEditMode ? "Edit Flashcard Deck" : "Create Flashcard Deck"}</h1>

      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <div className={formStyles.formField}>
          <div className="flexRow-s">
            <label className={formStyles.formLabel}>Name:</label>
            <p style={{ color: "red", margin: 0 }}>*</p>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name this deck"
            required
          />
        </div>

        <div className={formStyles.formField}>
          <div className="flexRow-s">
            <label className={formStyles.formLabel}>Description:</label>
            <p style={{ color: "red", margin: 0 }}>*</p>
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is this deck for?"
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button type="submit" variant="primary" size="md">
          {isEditMode ? "Update Deck" : "Create Deck"}
        </Button>
      </form>
    </div>
  );
}
