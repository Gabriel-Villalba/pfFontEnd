import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.jsx";
import Product from "./components/Products/Products.jsx";
//import Detail from "./components/Detail/Detail.jsx";
import Nav from "./components/HomePage/NavBar/NavBar.jsx";
import Form from "./components/Form/Form.jsx"
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import FooterBottom from "./components/footer/FooterBottom/FooterBottom.jsx"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginButton from './components/loginAuht0/LoginButton/loginButton.jsx'
import LogOutButton from './components/loginAuht0/Logout/Logout.jsx'
import Profile from './components/loginAuht0/Profile.jsx'
import { useAuth0 } from "@auth0/auth0-react"
import {
  filterByCategories,
  orderByPrice,
  getAllProducts,
  getCategories
} from "./Redux/action/action.js";
//import { Button } from 'bootstrap';

function App() {
    const dispatch = useDispatch();
    const [setSearchTerm] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState('');
    const [categories, setCategories] = useState([]);

    const {isAuthenticated} = useAuth0()
   
//*********OBTENER Y LISTAR CATEGORIAS****************** */
    useEffect(() => {
        dispatch(getCategories()); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [dispatch])
      const listcategories = useSelector(state => state.categories)
//console.log(listcategories)
      useEffect(()=> setCategories(listcategories),[listcategories])
      // eslint-disable-next-line react-hooks/exhaustive-deps
     
      //console.log(categories)
 //*************************** */
  const handleSearch = (term) => {
    setSearchTerm(term);
  }
  //*********FILTRADO *******************//
  // eslint-disable-next-line no-undef

  const handleCategoriesFilter = (e) => {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if (e.target.value != "") {
        setSelectedCategory(e.target.value)
       dispatch(filterByCategories(e.target.value));
    } else {
       dispatch(getAllProducts());
    }
  };

  //**************ORDENAMIENTO POT PRECIO********** */
  const handleSelectChange = (e) => {
    dispatch(orderByPrice(e.target.value));
    setSortOrder(e.target.value);
  };
  
//   const setSortOrder = (event) => {
//     dispatch(orderByPrice(event.target.value));
//   };
//   useEffect(()=>setSortOrder(e.target.value),[])

  return (
    <>
          <div>

                <div className="bg-dark text-white py-2">
                    <div className="container d-flex justify-content-between">
                        <p className="mb-0">support@email.com</p>
                    {isAuthenticated ? (
                    <> 
                    <Profile/>
                    <LogOutButton/>
                    </>) : 
                    (<LoginButton/>)}
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
                                    onChange={(e) => handleSelectChange(e)}>
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
            <FooterBottom/>  
    </>
    );
}

export default App;