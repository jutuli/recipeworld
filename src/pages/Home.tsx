import React from "react";
import FavoriteRecipes from "../components/FavoriteRecipes.tsx";

const Home = () => {
  return (
    <div>
      <h2 className="py-10 text-center text-3xl font-bold">Favorite Recipes</h2>
      <FavoriteRecipes />
    </div>
  );
};

export default Home;
