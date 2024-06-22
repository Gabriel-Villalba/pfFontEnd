import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginado/Paginado.jsx';
import { Link } from 'react-router-dom';
import { getAllProducts, addToCart } from "../../Redux/action/action";

const Products = () => {
    const dispatch = useDispatch(); 
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(6);
    const [addedToCart, setAddedToCart] = useState({}); 


    useEffect(() => {
        dispatch(getAllProducts()); 
    }, [dispatch]);     

    const products = useSelector((state) => state.allProducts);
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        const addedItems = {};
        cart.forEach(item => {
            addedItems[item.product.id] = true;
        });
        setAddedToCart(addedItems);
    }, [cart]);


    useEffect(() => {
        setCurrentPage(1);
    }, [products]); 
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * pageSize;
        return products.slice(startIndex, startIndex + pageSize);
    };
  //console.log('startIndex',startIndex)
  
  
    const currentProducts = getCurrentPageItems();

    //console.log('currentProducts',currentProducts)
    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        setAddedToCart({ ...addedToCart, [product.id]: true }); 
    };


    return (
        <div className="container mt-5">
            <h1 className="mb-4">PRODUCTS</h1>
            <div className="row">
                {currentProducts.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card h-100">
                            <img src={product.Imagen_URL} className="card-img-top" alt={product.Nombre} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/products/${product.id}`}>{product.Nombre}</Link>
                                </h5>
                                <p className="card-text">${product.Precio}</p>

                                {product.Categories && product.Categories.length > 0 && (
                                    <div>
                                        <h6>Categorías:</h6>
                                        <ul className="list-unstyled">
                                            {product.Categories.map((category, index) => (
                                                <li key={index}>{category.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <button
                                    className={`btn mt-2 ${addedToCart[product.id] ? 'btn-added' : 'btn-outline-secondary'}`}
                                    onClick={() => handleAddToCart(product)}
                                    disabled={addedToCart[product.id]}>
                                    <i className="fas fa-shopping-cart"></i>
                                    {addedToCart[product.id] ? 'En el carrito' : 'Agregar al carrito'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Paginado items={products} pageSize={pageSize}   currentPage={currentPage}  onPageChange={handlePageChange} />
        </div>
    );
};

export default Products;
