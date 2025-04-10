import CRUDRecipeModal from "./CRUDRecipeModal";
import { useMainContext } from "../context/MainProvider";

const AddRecipe = () => {
  const { setModalMode, showModal, setShowModal } = useMainContext();

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
          setModalMode("add");
        }}
        className="cursor-pointer rounded-full bg-amber-300 px-4 py-2 font-semibold hover:bg-amber-400"
      >
        {" "}
        &#10133; Add Recipe
      </button>
      {showModal && <CRUDRecipeModal />}
    </div>
  );
};

export default AddRecipe;
