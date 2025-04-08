import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="flex justify-between items-center bg-amber-300 px-4 py-8 ">
        <h3 className="font-bold text-2xl">RecipeWorld</h3>
        <div className="flex items-center gap-10 mx-4">
          <ul className="flex gap-4">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>X</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
