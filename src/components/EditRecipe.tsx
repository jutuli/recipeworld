import CRUDRecipeModal from "./CRUDRecipeModal";
import { useMainContext } from "../context/MainProvider";

const EditRecipe = () => {
  const { setModalMode, setShowModal, showModal } = useMainContext();

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
      {showModal && <CRUDRecipeModal />}
    </div>
  );
};

export default EditRecipe;
