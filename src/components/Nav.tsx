import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex justify-between items-center bg-white px-4 py-8 border-t-12 border-t-yellow-300">
      <h3 className="font-bold">RecipeWorld</h3>
      <div className="flex items-center gap-10 mx-4">
        <ul className="flex gap-4">
          <Link to={'/'}>Home</Link>
          <Link to={'/recipes'}>Recipes</Link>
          <Link to={'/about-us'}>About Us</Link>
        </ul>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
};

export default Nav;
