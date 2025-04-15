import FavoriteRecipes from "../components/FavoriteRecipes";
import NewRecipes from "../components/NewRecipes";

const Recipes = () => {
  return (
    <div className="w-full">
      <FavoriteRecipes />
      <NewRecipes />
    </div>
  );
};

export default Recipes;
