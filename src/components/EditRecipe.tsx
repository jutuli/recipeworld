import React, { useState } from "react";
import CRUDRecipeModal from "./CRUDRecipeModal";
import { useMainContext } from "../context/MainProvider";

const EditRecipe = () => {
  const [showModal, setShowModal] = useState(false);
  const { setModalMode } = useMainContext();

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
          setModalMode("edit");
        }}
        className="cursor-pointer rounded-full bg-amber-300 px-4 py-2 hover:bg-amber-400"
      >
        {" "}
        &#9998; Edit
      </button>
      <CRUDRecipeModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default EditRecipe;
