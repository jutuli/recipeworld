import React from "react";
import RecipeVerticalCard from "../components/RecipeVerticalCard";

const Home = () => {
  return (
    <div>
      <h2 className="py-10 text-center text-3xl font-bold">Favorite Recipes</h2>
      <RecipeVerticalCard />
    </div>
  );
};

export default Home;
