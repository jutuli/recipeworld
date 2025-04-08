import React, { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import { Link } from 'react-router-dom';

interface IRecipe {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

const RecipeVerticalCard = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[]>([]);

  const fetchData = async () => {
    const { data: recipes } = await supabase.from('recipes').select('*');
    if (recipes) {
      setFavoriteRecipes(recipes.slice(0, 3));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="favorite-recipes grid grid-cols-3 p-4 gap-4">
      {favoriteRecipes.map((recipe) => (
        <div
          key={recipe.id}
          className="recipe-card rounded-lg shadow-lg bg-white flex flex-col gap-2 h-80 justify-between">
          <img
            src={recipe.image_url}
            alt={recipe.name}
            className="rounded-t-lg h-40 w-full object-cover"
          />
          <article className="flex flex-col px-2 text-left">
            <h3 className="font-bold mt-2 text-xl">{recipe.name}</h3>
            <p>{recipe.description}</p>
          </article>
          <Link to={`/recipe/${recipe.id}`} className="px-2 ">
            <button className="rounded-full bg-amber-300 px-4 py-2 font-sm mb-4">
              View Recipe
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RecipeVerticalCard;
