import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import { Header, Footer } from "./components/HeaderFooter";
import { Toaster } from "sonner";
import LiquidEther from "./components/ui/LiquidEther";

function Shell({ children }) {
  const onRegister = () => {
    const ev = new CustomEvent('cta-register');
    window.dispatchEvent(ev);
  };

  return (
    <>
      {/* Global Liquid Ether Background - Outside normal flow */}
      <LiquidEther
        colors={['#00FFD1', '#6FD2C0', '#4DE6D1']}
        mouseForce={40}
        cursorSize={150}
        resolution={0.6}
        dt={0.014}
        BFECC={true}
        isViscous={false}
        autoDemo={true}
        autoSpeed={0.2}
        autoIntensity={0.8}
        takeoverDuration={0.01}
        autoResumeDelay={10000}
        autoRampDuration={0.1}
      />
      <div className="App">
        <Header onRegister={onRegister} />
        {children}
        <Footer />
        <Toaster richColors theme="dark" position="top-right" />
      </div>
    </>
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