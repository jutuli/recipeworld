import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { Link } from "react-router-dom";

interface IRecipe {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

const RecipeVerticalCard = () => {
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
        <div
          key={recipe.id}
          className="recipe-card flex h-80 flex-col justify-between gap-2 rounded-lg bg-white shadow-lg"
        >
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="h-40 w-full rounded-t-lg object-cover"
          />
          <article className="flex flex-col px-2 text-left">
            <h3 className="mt-2 text-xl font-bold">{recipe.name}</h3>
            <p>{recipe.description}</p>
          </article>
          <Link to={`/recipe/${recipe.name}`} className="px-2">
            <button className="font-sm mb-4 cursor-pointer rounded-full bg-amber-300 px-4 py-2">
              View Recipe
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeVerticalCard;
