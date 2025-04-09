import React, { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { IRecipe } from "../interfaces/IRecipe";
import RecipeHorizontalCard from "./RecipeHorizontalCard";

const NewRecipes = () => {
  const [newRecipes, setNewRecipes] = useState<IRecipe[] | null>(null);

  const fetchData = async () => {
    const { data: recipes } = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);
    if (recipes) {
      setNewRecipes(recipes);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="new-recipes mb-10">
      <h2 className="py-10 text-center text-3xl font-bold">New Recipes</h2>
      {newRecipes ? (
        <div className="flex flex-col gap-6 px-40">
          {newRecipes.map((recipe) => (
            <RecipeHorizontalCard key={recipe.id} {...recipe} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewRecipes;
