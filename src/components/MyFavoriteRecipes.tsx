import { useMainContext } from "../context/MainProvider";
import RecipeVerticalCard from "./RecipeVerticalCard";

const MyFavoriteRecipes = () => {
  const { myFavoriteRecipes } = useMainContext();

  return (
    <div>
      <>
        <h2 className="pt-8 pb-4 text-center text-2xl font-bold">
          My Favorite Recipes
        </h2>
        <div className="favorite-recipes grid grid-cols-3 gap-4 p-4">
          {myFavoriteRecipes?.map((recipe) => (
            <RecipeVerticalCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </>
    </div>
  );
};

export default MyFavoriteRecipes;
