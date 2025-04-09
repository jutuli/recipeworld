import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import RecipeVerticalCard from "./RecipeVerticalCard";
import { IRecipe } from "../interfaces/IRecipe";

const FavoriteRecipes = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([]);

  const fetchData = async () => {
    const { data: recipes } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(3);
    if (recipes) {
      setFavoriteRecipes(recipes.slice(0, 3));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="py-10 text-center text-3xl font-bold">Favorite Recipes</h2>
      <div className="favorite-recipes grid grid-cols-3 gap-4 p-4">
        {favoriteRecipes.map((recipe) => (
          <RecipeVerticalCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </>
  );
};

export default FavoriteRecipes;
