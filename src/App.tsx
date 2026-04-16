import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import SearchPage from "./pages/search/SearchPage";
import CategoryPage from "./pages/category/CategoryPage";
import AreaPage from "./pages/area/AreaPage";
import AreaMealsPage from "./pages/area/AreaMealsPage";
import MealDetailPage from "./pages/meal/MealDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/areas" element={<AreaPage />} />
            <Route path="/area/:name" element={<AreaMealsPage />} />
            <Route path="/meal/:id" element={<MealDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
