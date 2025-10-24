import PropTypes from "prop-types";
import styles from "./_deck.module.scss";

function Deck({ deck, onClick }) {
  return (
    <div
      className={`${styles.deckCard} ${onClick ? 'clickable' : ""}`}
      onClick={() => onClick?.(deck)}
    >
      <h2>{deck.name}</h2>
      <p>{deck.description || "No description"}</p>
    </div>
  );
}

Deck.propTypes = {
  deck: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Deck;
