import { Route, Routes,useLocation  } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import Products from "./components/Products/Products.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Nav from "./components/NavBar/NavBar.jsx";
import Form from "./components/Form/Form.jsx"
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import LandingPage from "./components/Landing/LandinPage.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategories,
  orderByPrice,
  getAllProducts,
  getCategories,
} from "./Redux/action/action.js";
//import { Button } from 'bootstrap';

function App() {
  const [setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState('');
  const [categories, setCategories] = useState([]);
  //console.log(searchTerm);
  const dispatch = useDispatch();
  const location = useLocation(); 

  useEffect(() => {
  dispatch(getCategories())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const listcategories = useSelector(state => state.categories)

  useEffect(()=> {
    setCategories(listcategories) 
  },
  [listcategories])
 //*************************** */
  const handleSearch = (term) => {
    setSearchTerm(term);
  }
  //*********FILTRADO *******************//
  // eslint-disable-next-line no-undef

  const handleCategoriesFilter = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSelectedCategory(e.target.value)
       dispatch(filterByCategories(e.target.value));
    } else {
       dispatch(getAllProducts());
    }
  };

  //**************ORDENAMIENTO POT PRECIO********** */

  const handelSelectChange=(e)=> {
    dispatch(orderByPrice(e.target.value))
    setSortOrder(e.target.value)

  }
  // const setSortOrder = (event) => {
  //   dispatch(orderByPrice(event.target.value));
  // };

  return (
    <div>
      
            <div className="bg-dark text-white py-2">
                <div className="container d-flex justify-content-between">
                    <p className="mb-0">support@email.com</p>
                    <p className="mb-0">+012-345-6789</p>
                </div>
            </div>
            {location.pathname !== '/' && <Nav />}
            {location.pathname !== '/' && location.pathname !== '/form' && location.pathname !== '/home' && (
            <div className="container mt-3">
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <h1>Store</h1>
                    </div>
                        <div className="col-md-8 d-flex align-items-center">
                            <SearchBar onSearch={handleSearch} />
                            <div className="ms-3">
                                    <button className="btn btn-outline-secondary me-2">
                                    <i className="fas fa-heart"></i>
                                    </button>
                                    <button className="btn btn-outline-secondary">
                                    <i className="fas fa-shopping-cart"></i>
                                    </button>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                    <div className="col-md-6">
                        <label>
                        <select
                            className="form-select"
                            value={selectedCategory}
                            onChange={(e) => handleCategoriesFilter(e)}>
                            <option value="">All</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        </label>
                    </div>
                    <div className="col-md-6">
                        <label>
                            <select 
                                className="form-select"
                                value={sortOrder} 
                                onChange={(e) => handelSelectChange(e)}>
                                <option value="">Precio</option>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                        </label>
                    </div>
                </div>
            
            </div>
                )}
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<Products />} /> 
        <Route path="/form" element={<Form />} />
        <Route path="/products/:id" element={<Detail />} />  
        
      </Routes>
    
        </div>
    );
}

export default App;