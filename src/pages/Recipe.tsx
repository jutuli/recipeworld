import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../utils/supabase";
import { useMainContext } from "../context/MainProvider";
import EditRecipe from "../components/EditRecipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";

const Recipe = () => {
  const { id } = useParams();
  const {
    currentRecipe,
    setCurrentRecipe,
    refreshRecipe,
    setRefreshRecipe,
    isLoggedIn,
    myFavoriteRecipes,
    setMyFavoriteRecipes,
  } = useMainContext();

  const [loadingRecipe, setLoadingRecipe] = useState<boolean>(true);

  // Fetch the recipe data using the name parameter
  const fetchRecipe = async () => {
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("*, category: categories(name)")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching recipe:", error);
    } else {
      setCurrentRecipe(recipe);
    }
    setLoadingRecipe(false);
  };

  useEffect(() => {
    setLoadingRecipe(true);
    fetchRecipe();
    setRefreshRecipe(false);
  }, [refreshRecipe]);

  if (loadingRecipe) {
    return <p className="py-10 text-center">Recipe is loading...</p>;
  }

  if (!currentRecipe) {
    return <p className="py-10 text-center">Recipe not found.</p>;
  }

  return (
    <div className="w-full pb-10">
      <h2
        style={{
          backgroundImage: `url(${currentRecipe.image_url})`,
          position: "relative",
        }}
        className="relative bg-cover bg-center px-30 py-20 text-center text-3xl font-bold text-white"
      >
        {" "}
        <div
          className="absolute inset-0 bg-black opacity-40"
          style={{ zIndex: 1 }}
        ></div>
        <span className="relative z-10">{currentRecipe.name}</span>
      </h2>
      <div className="px-10">
        <h3 className="my-4 text-center text-xl italic">
          {currentRecipe.description}
        </h3>
        <div className="flex items-center justify-end gap-6">
          {isLoggedIn && (
            <>
              <FontAwesomeIcon
                icon={
                  myFavoriteRecipes?.some(
                    (recipe) => recipe.id === currentRecipe.id,
                  )
                    ? solidBookmark
                    : regularBookmark
                }
                className="cursor-pointer text-2xl text-amber-300"
                onClick={() => {
                  if (
                    myFavoriteRecipes?.some(
                      (recipe) => recipe.id === currentRecipe.id,
                    )
                  ) {
                    setMyFavoriteRecipes(
                      myFavoriteRecipes.filter(
                        (recipe) => recipe.id !== currentRecipe.id,
                      ),
                    );
                  } else {
                    setMyFavoriteRecipes(
                      myFavoriteRecipes
                        ? [...myFavoriteRecipes, currentRecipe]
                        : [currentRecipe],
                    );
                  }
                }}
              />
              <div className="flex justify-end">
                <EditRecipe />
              </div>
            </>
          )}
        </div>
        <div className="recipe-details flex flex-col gap-4">
          <p>This recipe is for {currentRecipe.servings} servings.</p>
          <div>
            <h4 className="pb-2 font-bold">Ingregients</h4>
            <ul>
              {currentRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="list-inside list-disc">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pb-2 font-bold">Instructions</h4>
            <p>{currentRecipe.instructions}</p>
          </div>
        </div>
        <Link to={"/recipes"} className="mt-6 flex justify-end">
          <button className="font-sm cursor-pointer rounded-full bg-amber-300 px-4 py-2 hover:bg-amber-400">
            ←
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Recipe;
