import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDeck } from "../../api/decks";
import styles from "./_deck_details_form.module.scss"
import Button from "../../components/Button";
import formStyles from "../../styles/_form.module.scss"
import { useNavigate } from "react-router-dom";
import { updateDeck } from "../../api/decks";

export default function DeckDetailsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getDeck(id).then((res) => {
      setDeck(res.data);
      setUpdatedName(res.data.name);
      setUpdatedDescription(res.data.description);
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      updateDeck(
        deck.id,
        {
          name: updatedName,
          description: updatedDescription
        }
      ).then((res) => {
        setDeck(res.data);
        navigate("/decks/" + deck.id);
      }
      );
    } catch (err) {
      setError(err);
    }
  }

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.deckDetailsForm}>
      <h1>Edit Deck</h1>

      <form className={formStyles.formContainer} onSubmit={handleSubmit}>
        <div className={formStyles.formField}>
          <label
            className={formStyles.formLabel}
          >Name</label>
          <input
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
        </div>

        <div className={formStyles.formField}>
          <label
            className={formStyles.formLabel}
          >Description</label>
          <input
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <Button
          type="submit"
          variant="primary"
          size="md">Update deck
        </Button>
      </form>
    </div>
  );
}