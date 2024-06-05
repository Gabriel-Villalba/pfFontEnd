import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import Product from "./components/Products/Products.jsx";
//import Detail from "./components/Detail/Detail.jsx";
import Nav from "./components/NavBar/NavBar.jsx";
import Form from "./components/Form/Form.jsx"
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { GET_CATEGORIAS_url } from "./Redux/URLs/URLs.js";
import {
  filterByCategories,
  orderByPrice,
  getAllProducts,
} from "./Redux/action/action.js";
//import { Button } from 'bootstrap';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder] = useState('');
  const [categories, setCategories] = useState([]);
  console.log(searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    const mostrarCategorias = async () => {
      try {
        const categoryResponse = await axios.get(GET_CATEGORIAS_url);
        const categorias = (await categoryResponse).data;
        setCategories(categorias);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    mostrarCategorias();
  }, []);
 //*************************** */
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  //*********FILTRADO *******************//
  // eslint-disable-next-line no-undef

  const handleCategoriesFilter = (e) => {
    e.preventDefault();
    if (e.target.value != "") {
       dispatch(filterByCategories(e.target.value));
    } else {
       dispatch(getAllProducts());
    }
  };

  //**************ORDENAMIENTO POT PRECIO********** */
  const setSortOrder = (event) => {
    dispatch(orderByPrice(event.target.value));
  };

  return (
    <div>
            <div className="bg-dark text-white py-2">
                <div className="container d-flex justify-content-between">
                    <p className="mb-0">support@email.com</p>
                    <p className="mb-0">+012-345-6789</p>
                </div>
            </div>
            <Nav />
         
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
                           // value={selectedCategory}
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
                                onChange={(e) => setSortOrder(e)}>
                                <option value="">Precio</option>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                        </label>
                    </div>
                </div>
            
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Product />} />
                <Route path="/form" element={<Form />} />

            </Routes>
    
        </div>
    );
}

export default App;
