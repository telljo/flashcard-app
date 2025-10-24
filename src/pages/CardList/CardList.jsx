import { useEffect, useState } from "react";
import { getCards } from "../../api/cards";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import styles from "./_card_list.module.scss"
import { CirclePlus } from "lucide-react";
import PropTypes from "prop-types";

function CardList({ deck }) {
  const navigate = useNavigate();
  const handleCardClick = (card) => {
    navigate("/cards/" + card.id);
  };
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards(deck.id).then((res) => setCards(res.data));
  }, []);

  return (
    <div
      className={styles.cardList}
    >
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
      <button
        onClick={() => navigate("/cards/new")}
        className={styles.newCardButton}
      >
        <CirclePlus size={20} />
        Create Card
      </button>
    </div>
  );
}

CardList.propTypes = {
  deck: PropTypes.object.isRequired
};

export default CardList;
