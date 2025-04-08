import React, { use } from 'react';
import { useLocation } from 'react-router-dom';
import BannerImage from '../assets/Banner.png';

const Banner = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname === '/' ||
      location.pathname === '/recipes' ||
      location.pathname === '/about-us' ? (
        <p
          style={{ backgroundImage: `url(${BannerImage})` }}
          className="bg-cover bg-center text-white text-xl font-bold text-center py-12 px-30">
          {' '}
          Be inspired, cook with passion and experience unforgettable moments at
          the table.
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

export default Banner;
