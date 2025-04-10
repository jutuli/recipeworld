import { useState } from "react";
import CRUDRecipeModal from "./CRUDRecipeModal";
import { useMainContext } from "../context/MainProvider";

const AddRecipe = () => {
  const [showModal, setShowModal] = useState(false);
  const { setModalMode } = useMainContext();

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
          setModalMode("add");
        }}
        className="rounded-full bg-amber-300 px-4 py-2 font-semibold hover:bg-amber-400"
      >
        {" "}
        &#10133; Add Recipe
      </button>
      <CRUDRecipeModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default AddRecipe;
