import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginado from '../Paginado/Paginado.jsx'
import { Link } from 'react-router-dom';
import { getAllProducts} from "../../Redux/action/action";


const Products = () => {
    const dispatch = useDispatch(); 
    const [currentPage, setCurrentPage] = useState([]);
    const [pageSize]=useState(6);
   

    useEffect(() => {
        dispatch(getAllProducts()); 
      }, [dispatch])     
      // eslint-disable-next-line no-unused-vars
  
      const products = useSelector((state) => state.allProducts)

      useEffect(() => {
        setCurrentPage(1);
    }, [products]); 
    

    //console.log(products)
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * pageSize;
        return products.slice(startIndex, startIndex + pageSize);
    };

    const currentProducts = getCurrentPageItems();
    

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
                </div>
                </div>
                </div>
            ))}
        </div>
        <Paginado items={products} pageSize={6} onPageChange={handlePageChange} />
    </div>
    );
};

export default Products;
