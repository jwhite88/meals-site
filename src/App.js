import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";

function App() {
  return (
    <div className=''>
      <Header />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='category/:categoryId' element={<Category />} />
      </Routes>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
