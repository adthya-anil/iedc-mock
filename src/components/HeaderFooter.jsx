import React from "react";
import { Button } from "../components/ui/button";

export const Header = ({ onRegister }) => {
  return (
    <header className="dark-header">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#00FFD1]" />
        <span className="nav-text text-white/90 tracking-tight">IEDC CEC</span>
      </div>
      <nav className="dark-nav">
        <a href="#portal" className="dark-nav-link">Portal</a>
        <a href="#spark" className="dark-nav-link">Innovate</a>
        <a href="#bootcamp" className="dark-nav-link">Bootcamp</a>
        <a href="#people" className="dark-nav-link">People</a>
        <a href="#cta" className="dark-nav-link">Join</a>
        <Button className="btn-primary dark-button-animate" onClick={onRegister}>
          Register Now
        </Button>
      </nav>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full border-t border-white/20 py-10 mt-20" style={{background:"var(--bg-primary)"}}>
      <div className="dark-content-container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/70 body-small">
          © {new Date().getFullYear()} IEDC Bootcamp CEC
        </div>
        <div className="flex items-center gap-6">
          <a href="#mission" className="text-white/60 hover:text-white body-small">Mission</a>
          <a href="#bootcamp" className="text-white/60 hover:text-white body-small">Events</a>
          <a href="#people" className="text-white/60 hover:text-white body-small">Team</a>
        </div>
      </div>
    </footer>
  );
};