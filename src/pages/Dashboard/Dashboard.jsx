import DeckList from "../DeckList/DeckList";

export default function Dashboard() {

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", textAlign: "center" }}>
      <h1>Welcome to your Dashboard 👋</h1>

      <h2>Your decks:</h2>
      <DeckList />
    </div>
  );
}
