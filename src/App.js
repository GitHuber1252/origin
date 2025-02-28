import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FloorPlan from "./FloorPlan";
import RoutePlanner from "./RoutePlanner";

function Instructions() {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Инструкция по пользованию</h2>
      <p>Здесь будет руководство пользователя.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Навигационное меню */}
        <nav className="bg-blue-600 text-white p-4 flex justify-center gap-4">
          <Link to="/" className="hover:underline">Инструкция</Link>
          <Link to="/plan" className="hover:underline">План здания</Link>
          <Link to="/navigation" className="hover:underline">Навигация</Link>
        </nav>

        {/* Маршруты страниц */}
        <Routes>
          <Route path="/" element={<Instructions />} />
          <Route path="/plan" element={<FloorPlan />} />
          <Route path="/navigation" element={<RoutePlanner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
