import AddRecipe from "../components/AddRecipe";
import FavoriteRecipes from "../components/FavoriteRecipes";
import NewRecipes from "../components/NewRecipes";

const Recipes = () => {
  return (
    <div className="w-full">
      <FavoriteRecipes />
      <NewRecipes />
      <div className="mb-4 flex flex-col items-center justify-center gap-2 font-semibold">
        <p>Can't find, what you're looking for? Add your own recipe!</p>
        <AddRecipe />
      </div>
    </div>
  );
};

export default Recipes;
