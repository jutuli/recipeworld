import React, { useEffect } from "react";
import supabase from "../utils/supabase";
import { IRecipe } from "../interfaces/IRecipe";
import { Link } from "react-router-dom";

const RecipeHorizontalCard: React.FC<IRecipe> = ({
  name,
  description,
  image_url,
}) => {
  return (
    <div className="recipe-horizontal-card flex h-52 w-full gap-2 rounded-lg bg-slate-100 shadow-lg">
      <img
        src={image_url}
        alt={name}
        className="h-full w-1/3 rounded-l-lg object-cover"
      />
      <div className="flex h-full flex-col justify-between pt-2">
        <article className="flex flex-col gap-2 px-2 text-left">
          <h3 className="mt-2 text-xl font-bold">{name}</h3>
          <p>{description}</p>
        </article>
        <Link to={`/recipe/${name}`} className="px-2">
          <button className="font-sm mb-4 cursor-pointer rounded-full bg-amber-300 px-4 py-2">
            View Recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeHorizontalCard;
