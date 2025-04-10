import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

interface IAddRecipeModalProps {
  open: boolean;
  onClose: () => void;
}

interface ICategory {
  id: number;
  name: string;
}

const CRUDRecipeModal = ({ open, onClose }: IAddRecipeModalProps) => {
  if (!open) return null;

  const [categories, setCategories] = useState<ICategory[] | null>(null);

  const fetchCategories = async () => {
    const { data: categories } = await supabase.from("categories").select("*");
    if (categories) {
      setCategories(categories);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    const { error } = await supabase.from("recipes").insert([recipeData]);
    if (error) {
      console.error("Error inserting recipe:", error);
    } else {
      console.log("Recipe added successfully");
      onClose();
    }
  };

  return (
    <div className="fixed top-1/6 left-1/4 h-2/3 w-1/2 rounded-lg bg-slate-50 p-4 shadow-lg">
      <div className="flex items-start justify-between">
        <h1 className="text-2xl font-bold">Add Recipe</h1>
        <button onClick={onClose} className="cursor-pointer">
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          className="mb-2 rounded-lg border border-slate-300 p-2"
          defaultValue={1}
          min={1}
          max={100}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (comma separated)"
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          className="mb-2 rounded-lg border border-slate-300 p-2"
        />
        <select
          name="category_id"
          className="mb-2 rounded-lg border border-slate-300 p-2"
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
    </div>
  );
};

export default CRUDRecipeModal;
