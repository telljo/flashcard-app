import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./pages/Header/Header";
import DeckDetails from "./pages/DeckDetails/DeckDetails";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/decks/:id" element={<DeckDetails />} />
        </Route>
      </Routes>
    </>
  );
}
