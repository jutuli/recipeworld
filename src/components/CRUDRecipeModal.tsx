import { useEffect } from "react";
import supabase from "../utils/supabase";
import { useMainContext } from "../context/MainProvider";
import { useLocation, useNavigate } from "react-router-dom";

const CRUDRecipeModal = () => {
  const navigate = useNavigate();
  const {
    categories,
    setCategories,
    modalMode,
    currentRecipe,
    showModal,
    setShowModal,
    setRefreshRecipe,
  } = useMainContext();
  if (!showModal) return null;

  const location = useLocation();

  const fetchCategories = async () => {
    const { data: categories } = await supabase.from("categories").select("*");
    if (categories) {
      setCategories(categories);
    }
  };

  useEffect(() => {
    if (showModal) {
      fetchCategories();
    }
  }, [showModal]);

  // Handle Modal Close
  const handleClose = () => {
    setShowModal(false);
  };

  // Handle Form Submit to add or edit a recipe
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // send data to supabase
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const ingredientsString = formData.get("ingredients") as string;
    const ingredientsArray = ingredientsString
      .split(",")
      .map((ingredient) => ingredient.trim());

    const recipeData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      servings: Number(formData.get("servings")),
      ingredients: ingredientsArray,
      instructions: formData.get("instructions"),
      image_url: formData.get("image_url") as string,
      created_at: new Date(),
      category_id: formData.get("category_id") as string,
    };
    // If edit mode, the recipe is being updated
    if (modalMode === "edit" && currentRecipe?.id) {
      const { error } = await supabase
        .from("recipes")
        .update(recipeData)
        .eq("id", currentRecipe.id);
      if (error) {
        console.error("Error updating recipe:", error);
      } else {
        console.log("Recipe updated successfully");
        navigate("/recipe/" + currentRecipe.id);
      }
    }

    // if add mode, the recipe is being added
    else {
      const { error } = await supabase.from("recipes").insert([recipeData]);
      if (error) {
        console.error("Error inserting recipe:", error);
      } else {
        console.log("Recipe added successfully");
        navigate("/recipes");
      }
    }
    setRefreshRecipe(true);
    handleClose();
  };

  // Handle Delete Recipe
  const handleDelete = async () => {
    if (currentRecipe) {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", currentRecipe.id);
      if (error) {
        console.error("Error deleting recipe:", error);
      } else {
        console.log("Recipe deleted successfully");
        navigate("/recipes");
      }
      handleClose();
    }
  };

  return showModal ? (
    <div className="fixed top-1/6 left-1/4 h-2/3 w-1/2 rounded-lg bg-slate-50 p-4 shadow-lg">
      <div className="flex items-start justify-between">
        {modalMode === "add" ? (
          <h1 className="text-2xl font-bold">Add Recipe</h1>
        ) : (
          <h1 className="text-2xl font-bold">Edit Recipe</h1>
        )}
        <button onClick={handleClose} className="cursor-pointer">
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          defaultValue={modalMode === "edit" ? currentRecipe?.name : ""}
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          defaultValue={modalMode === "edit" ? currentRecipe?.description : ""}
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          defaultValue={modalMode === "edit" ? currentRecipe?.servings : 1}
          className="mb-2 rounded-lg border border-slate-300 p-2"
          min={1}
          max={100}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          defaultValue={
            modalMode === "edit" ? currentRecipe?.ingredients.join(", ") : ""
          }
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          defaultValue={modalMode === "edit" ? currentRecipe?.instructions : ""}
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          defaultValue={modalMode === "edit" ? currentRecipe?.image_url : ""}
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <select
          name="category_id"
          className="mb-2 rounded-lg border border-slate-300 p-2"
          defaultValue={modalMode === "edit" ? currentRecipe?.category_id : ""}
        >
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <button
          type="submit"
          className="cursor-pointer rounded-full bg-amber-300 p-2 font-bold hover:bg-amber-400"
        >
          Submit
        </button>
      </form>
      {modalMode === "edit" && (
        <div className="flex w-full items-end justify-end">
          <button
            type="button"
            className="mt-2 flex cursor-pointer justify-end rounded-full bg-slate-300 px-4 py-2 hover:bg-slate-500 hover:text-white"
            onClick={handleDelete}
          >
            Delete Recipe
          </button>
        </div>
      )}
    </div>
  ) : null;
};

export default CRUDRecipeModal;
