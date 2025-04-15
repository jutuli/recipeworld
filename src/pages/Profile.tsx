import { useContext, useState } from "react";
import { IUser } from "../interfaces/IUser";
import { mainContext } from "../context/MainProvider";
import { Link } from "react-router-dom";
import AddRecipe from "../components/AddRecipe";
import supabase from "../utils/supabase";

interface IProfileProps {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isLoggedIn: boolean;
}

const Profile = () => {
  // get user data from context
  const { user, setUser, isLoggedIn } = useContext(
    mainContext,
  ) as IProfileProps;
  const [isEditing, setIsEditing] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState<string>("");

  const handleEdit = () => {
    setIsEditing(true);
    setNewUserEmail(user?.email || "");
  };
  // Save the new user email to supabase
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (user && user.email) {
      const { error } = await supabase
        .from("users")
        .update({
          email: newUserEmail,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating user:", error);
      }
      console.log("User updated successfully");
    }

    if (user)
      setUser({
        ...user,
        email: newUserEmail,
      });
  };

  return (
    <div className="flex h-full w-full flex-col px-4">
      {isLoggedIn ? (
        <div className="align-start flex flex-col">
          <h1 className="mb-4 text-lg font-bold">Profile</h1>
          {!isEditing && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-2">
                <p>Email: {user?.email}</p>
                <p className="text-sm italic">
                  Need to edit your email? Click{" "}
                  <span
                    onClick={handleEdit}
                    className="cursor-pointer font-bold text-amber-400 not-italic"
                  >
                    here
                  </span>
                </p>
              </div>
              <AddRecipe />
            </div>
          )}
          {isEditing && (
            <form className="flex gap-2" onSubmit={handleSave}>
              <input
                className="flex w-80 rounded-full border border-slate-300 px-4 py-1"
                type="text"
                placeholder={user?.email}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="cursor-pointer rounded-full bg-slate-200 px-4 py-1 text-slate-700 hover:bg-slate-300"
              >
                Discard
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded-full bg-amber-300 px-6 py-1 font-bold hover:bg-amber-400"
              >
                Save
              </button>
            </form>
          )}
        </div>
      ) : (
        <>
          <p className="mb-4">
            Oops, you can only view this page when logged in
          </p>
          <Link
            to="/login"
            className="h-fit rounded-full bg-amber-300 px-4 py-2"
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
