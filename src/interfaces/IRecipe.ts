export interface IRecipe {
  id: number;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  ingredients: string[];
  image_url: string;
  category_id: string;
  created_at: string;
}
