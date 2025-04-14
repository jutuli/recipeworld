import { useContext } from "react";
import { IUser } from "../interfaces/IUser";
import { mainContext } from "../context/MainProvider";
import { Link } from "react-router-dom";

interface IProfileProps {
  user: IUser | null;
  isLoggedIn: boolean;
}

const Profile = () => {
  // get user data from context
  const { user, isLoggedIn } = useContext(mainContext) as IProfileProps;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2">
      {isLoggedIn ? (
        <>
          <h1 className="mb-4 text-lg font-bold">Profile</h1>
          <p>{user?.email}</p>
        </>
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
