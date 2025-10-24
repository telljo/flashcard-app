import PropTypes from "prop-types";
import styles from "./_card.module.scss";

function Card({ card, onClick}) {
  return (
    <div
      className={`${styles.card} ${onClick ? 'clickable' : ""}`}
      onClick={() => onClick?.(card)}
    >
      <h2>{card.front}</h2>
      <p>{card.back}</p>
    </div>
  );
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default Card;
