import { useContext } from "react";
import AddRecipe from "../components/AddRecipe";
import FavoriteRecipes from "../components/FavoriteRecipes";
import NewRecipes from "../components/NewRecipes";
import { mainContext } from "../context/MainProvider";

const Recipes = () => {
  const { isLoggedIn } = useContext(mainContext) as { isLoggedIn: boolean };

  return (
    <div className="w-full">
      <FavoriteRecipes />
      <NewRecipes />
      {isLoggedIn && (
        <div className="mb-10 flex flex-col items-center justify-center gap-2 font-semibold">
          <p>Can't find, what you're looking for? Add your own recipe!</p>
          <AddRecipe />
        </div>
      )}
    </div>
  );
};

export default Recipes;
