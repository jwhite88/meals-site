import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import HamburgerDrawer, { useFocusBounder } from "react-hamburger-drawer";
import { slide as Menu } from "react-burger-menu";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import HeaderContext from "../utils/showhideheader";
import { recipeSearch } from "../utils/recipeapiFns";
import savoryrecipies from "../assets/images/savoryrecipes.svg";

import { categories } from "../utils/categories";

function Header() {
  const categoryHolder = useRef();
  const searchInput = useRef();
  const [search, setSearch] = useState("");
  const [showHeader, setShowHeader, , setRecipeSearchResults] =
    useContext(HeaderContext);
  const navigate = useNavigate();

  useEffect(() => {
    setShowHeader(true);
  }, [setShowHeader]);

  const handleSearchChange = (evt) => {
    evt.preventDefault();
    setSearch(evt.target.value);
  };

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      console.log(evt.keyCode);
      if (evt.keyCode === 13) {
        recipeSearch(search)
          .then((result) => {
            console.log(result.meals);
            setRecipeSearchResults(result.meals);
            navigate(`/searchresults`);
            if (result.meals === null) {
              console.log("No hits");
            }
          })
          .catch((err) => {
            console.log(`An ${err} has occurred`);
          });
        searchInput.current.value = "";
      }
    },
    [search, setRecipeSearchResults, navigate]
  );
  return (
    <div className={`${showHeader ? "bg-image" : ""}`}>
      <nav className="relative flex flex-row  justify-between items-center h-12 px-8 bg-greeny-500 font-['Comfortaa'] text-lg">
        <div>
          <Link to="/">
            <img
              className="min-w-[20rem] max-w-[20rem]"
              src={savoryrecipies}
              alt="Savory Recipes"
            />
          </Link>
        </div>
        <div className="lg:ml-[-200px]">
          <input
            ref={searchInput}
            type="text"
            name={search}
            id="search"
            onChange={handleSearchChange}
            onKeyUp={handleSubmit}
            placeholder="Search for Recipes..."
            className="inline-block pl-2 rounded-[10px]"
          />
        </div>
        <div>
          <div>
            <ul
              className="flex flex-row recipe-menu text-offblack-900 "
              ref={categoryHolder}
            >
              <Menu width={"15rem"} right>
                {categories.map((category, idx) => {
                  return (
                    <li key={idx} className="pr-5 hover:text-offblack-50">
                      <Link
                        className="hover:bg-greeny-100 p-2 rounded-md"
                        to={`category/${category}`}
                      >
                        {category}
                      </Link>
                    </li>
                  );
                })}
              </Menu>
            </ul>
          </div>
        </div>
      </nav>
      <section>
        {showHeader && (
          <h1 className="pt-20 pl-8 text-8xl italic font-['Merienda'] text-reddy-500 ">
            Make Something Great!!
          </h1>
        )}
      </section>
    </div>
  );
}

export default Header;
