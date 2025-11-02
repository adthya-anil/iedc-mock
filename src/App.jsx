import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Header, Footer } from "./components/HeaderFooter";
import { Toaster } from "sonner";

function Shell({ children }) {
  const onRegister = () => {
    const ev = new CustomEvent('cta-register');
    window.dispatchEvent(ev);
  };

  return (
    <div className="App">
      <Header onRegister={onRegister} />
      {children}
      <Footer />
      <Toaster richColors theme="dark" position="top-right" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Shell>
            <LandingPage />
          </Shell>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;