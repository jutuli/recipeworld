import React, { useEffect } from 'react';
import supabase from '../utils/supabase';

const RecipeHorizontalCard = () => {
  const fetchData = async () => {
    const { data: recipes } = await supabase.from('recipes').select('*');
  };
  useEffect(() => {
    fetchData();
  }, []);

  return <div></div>;
};

export default RecipeHorizontalCard;
