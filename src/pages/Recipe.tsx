import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import Recipes from "./Recipes";

interface IRecipe {
  id: string;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  ingredients: string[];
  category: {
    id: number;
    name: string;
  };
  image_url: string;
}

const Recipe = () => {
  const { name } = useParams();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(true);

  // Fetch the recipe data using the name parameter
  const fetchRecipe = async () => {
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("*, category: categories(name)")
      .eq("name", name)
      .single();
    if (error) {
      console.error("Error fetching recipe:", error);
    } else {
      setRecipe(recipe);
    }
  };

  useEffect(() => {
    fetchRecipe();
    setLoadingRecipe(false);
  }, []);

  if (loadingRecipe) {
    return <p className="py-10 text-center">Recipe is loading...</p>;
  }

  if (!recipe) {
    return <p className="py-10 text-center">Recipe not found.</p>;
  }

  return (
    <div className="pb-10">
      <h2
        style={{ backgroundImage: `url(${recipe.image_url})` }}
        className="bg-cover bg-center px-30 py-20 text-center text-3xl font-bold text-white"
      >
        {recipe.name}
      </h2>
      <div className="px-10">
        <h3 className="my-4 text-center text-xl italic">
          {recipe.description}
        </h3>
        <div className="recipe-details flex flex-col gap-4">
          <p>This recipe is for {recipe.servings} servings.</p>
          <div>
            <h4 className="pb-2 font-bold">Ingregients</h4>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-inside list-disc">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pb-2 font-bold">Instructions</h4>
            <p>{recipe.instructions}</p>
          </div>
        </div>
        <Link to={"/recipes"} className="mt-6 flex justify-end">
          <button className="font-sm cursor-pointer rounded-full bg-amber-300 px-4 py-2">
            ← All Recipes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
