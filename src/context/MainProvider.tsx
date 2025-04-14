import { createContext, useContext, useState } from "react";
import { ICategory } from "../interfaces/ICategory";
import { IRecipe } from "../interfaces/IRecipe";
import { IUser } from "../interfaces/IUser";

interface IMainContext {
  categories: ICategory[] | null;
  favoriteRecipes: IRecipe[] | null;
  newRecipes: IRecipe[] | null;
  modalMode: "add" | "edit";
  currentRecipe: IRecipe | null;
  showModal: boolean;
  refreshRecipe: boolean;
  user: IUser | null;
  isLoggedIn: boolean;
  setCategories: (categories: ICategory[] | null) => void;
  setFavoriteRecipes: (recipes: IRecipe[] | null) => void;
  setNewRecipes: (recipes: IRecipe[] | null) => void;
  setModalMode: (mode: "add" | "edit") => void;
  setCurrentRecipe: (recipe: IRecipe | null) => void;
  setShowModal: (show: boolean) => void;
  setRefreshRecipe: (refresh: boolean) => void;
  setUser: (user: IUser | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
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
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshRecipe, setRefreshRecipe] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const contextValue = {
    categories,
    favoriteRecipes,
    newRecipes,
    modalMode,
    currentRecipe,
    showModal,
    refreshRecipe,
    user,
    isLoggedIn,
    setCategories,
    setFavoriteRecipes,
    setNewRecipes,
    setModalMode,
    setCurrentRecipe,
    setShowModal,
    setRefreshRecipe,
    setUser,
    setIsLoggedIn,
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
