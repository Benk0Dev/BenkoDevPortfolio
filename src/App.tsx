import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MainSection from "./components/MainSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { updateTheme } from "./utils/theme";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    updateTheme();
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <MainSection />
              <Contact />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
