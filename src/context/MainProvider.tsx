import { createContext, useContext, useEffect, useState } from "react";
import { ICategory } from "../interfaces/ICategory";
import { IRecipe } from "../interfaces/IRecipe";

interface IMainContext {
  categories: ICategory[] | null;
  favoriteRecipes: IRecipe[] | null;
  newRecipes: IRecipe[] | null;
  modalMode: "add" | "edit" | "delete";
  currentRecipe: IRecipe | null;
  setCategories: (categories: ICategory[] | null) => void;
  setFavoriteRecipes: (recipes: IRecipe[] | null) => void;
  setNewRecipes: (recipes: IRecipe[] | null) => void;
  setModalMode: (mode: "add" | "edit" | "delete") => void;
  setCurrentRecipe: (recipe: IRecipe | null) => void;
}

export const mainContext = createContext<IMainContext | undefined>(undefined);

export const useMainContext = () => {
  const context = useContext(mainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState<IRecipe[] | null>(
    null,
  );
  const [newRecipes, setNewRecipes] = useState<IRecipe[] | null>(null);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe | null>(null);

  const contextValue = {
    categories,
    favoriteRecipes,
    newRecipes,
    modalMode,
    currentRecipe,
    setCategories,
    setFavoriteRecipes,
    setNewRecipes,
    setModalMode,
    setCurrentRecipe,
  };

  return (
    <>
      <mainContext.Provider value={contextValue}>
        {children}
      </mainContext.Provider>
    </>
  );
};

export default MainProvider;
