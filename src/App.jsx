import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./pages/Header/Header";
import DeckDetails from "./pages/DeckDetails/DeckDetails";
import DeckDetailsForm from "./pages/DeckDetailsForm/DeckDetailsForm";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/decks/:id" element={<DeckDetails />} />
          <Route path="/decks/new" element={<DeckDetailsForm />} />
          <Route path="/decks/:id/edit" element={<DeckDetailsForm />} />
        </Route>
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          }
        }}
      />
    </>
  );
}
