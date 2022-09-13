import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Recipe from "./components/Recipe";

function App() {
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='category/:categoryId' element={<Category />} />
        <Route path="/:recipeCategory/:recipeId" element={<Recipe />} />
      </Routes>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
