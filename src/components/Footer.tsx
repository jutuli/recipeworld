import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer>
      <div className="flex items-center justify-between bg-amber-300 px-4 py-8">
        <h3
          className="cursor-pointer text-2xl font-bold"
          onClick={() => navigate("/")}
        >
          RecipeWorld
        </h3>
        <div className="mx-4 flex items-center gap-10">
          <ul className="flex gap-4">
            <li className="cursor-pointer">
              <a href="https://instagram.com" target="_blank">
                Instagram
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="https://facebook.com" target="_blank">
                Facebook
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="https://x.com" target="_blank">
                X
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
