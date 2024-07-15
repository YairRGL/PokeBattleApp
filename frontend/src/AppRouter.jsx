import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import PokemonList from "./pages/Home/PokemonList";
import PrivateRoute from "./components/PrivateRoute";
import Battle from "./pages/Battle/Battle";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route element={<PrivateRoute />}>
      <Route path="/home" element={<PokemonList />} />
      <Route path="/battle" element={<Battle />} />
    </Route>
  </Routes>
);

export default AppRouter;