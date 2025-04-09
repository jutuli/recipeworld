import React from "react";
import { Link } from "react-router-dom";
import { IRecipe } from "../interfaces/IRecipe";

const RecipeVerticalCard: React.FC<IRecipe> = ({
  name,
  description,
  image_url,
}) => {
  return (
    <div className="recipe-card flex h-90 flex-col gap-2 rounded-lg bg-slate-100 shadow-lg">
      <img
        src={image_url}
        alt={name}
        className="h-36 w-full rounded-t-lg object-cover"
      />
      <div className="flex h-full flex-col justify-between">
        <article className="flex flex-col px-2 text-left">
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

export default RecipeVerticalCard;
