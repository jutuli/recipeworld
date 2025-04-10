import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Layout from "./layout/Layout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
