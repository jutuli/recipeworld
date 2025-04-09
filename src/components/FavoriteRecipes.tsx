import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Link } from "react-router-dom";
import RecipeVerticalCard from "./RecipeVerticalCard";

interface IRecipe {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([]);

  const fetchData = async () => {
    const { data: recipes } = await supabase.from("recipes").select("*");
    if (recipes) {
      setFavoriteRecipes(recipes.slice(0, 3));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="favorite-recipes grid grid-cols-3 gap-4 p-4">
      {favoriteRecipes.map((recipe) => (
        <RecipeVerticalCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
};

export default FavoriteRecipes;
