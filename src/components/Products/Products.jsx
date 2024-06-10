import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { getAllProducts} from "../../Redux/action/action";
 
//import axios from 'axios';

const Products = () => {
    const dispatch = useDispatch(); 
   

    useEffect(() => {
        dispatch(getAllProducts()); 
      }, [dispatch])     
      // eslint-disable-next-line no-unused-vars
  
      const products = useSelector((state) => state.allProducts)//bandera != 1 ? productosFiltrados : todoslosProdusctos
    //console.log(products)

return (
    <div className="container mt-5">
        <h1 className="mb-4">PRODUCTS</h1>

        <div className="row">
            {products.map(product => (
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
    </div>
    );
};

export default Products;


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getProductsById, getClean, deleteProduct} from "../../Redux/action/action.js";

// //import axios from 'axios';
// //import { deleteProduct } from '../../Redux/action/action';


// const Products = () => {
//     // const [products, setProducts] = useState([]);

//     // useEffect(() => {
//     //     const datosDeProductos = async () => {
//     //         try {
//     //             const productResponse = await axios.get('http://localhost:3000/products');
//     //             const productos = (await productResponse).data;
//     //             setProducts(productos);

//     //         } catch (error) {
//     //             console.error('Error fetching data:', error);
//     //         }
//     //     };

//     //     datosDeProductos();
//     // }, []);
//     const dispatch = useDispatch(); 
//     const {id} = useParams();

//     useEffect(() => {
//        dispatch(getProductsById(id));
//         dispatch(getClean());
//       }, [dispatch,id])
      
//       // eslint-disable-next-line no-unused-vars
//       const handleClickDelete = ()=>{
//         dispatch(deleteProduct(id));
//       }
    

//       const products = useSelector((state)=>state.detail)
//       useEffect(()=>{
//         console.log(products)
//       },[products])

//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Products</h1>

//             <div className="row">
                
//                 {products.map(product => (
//                     <div className="col-md-4 mb-4" key={product.id}>
//                         <div className="card h-100">
//                             <img src={product.Imagen_URL} className="card-img-top" alt={product.Nombre} />
//                             <div className="card-body">
//                                 <h5 className="card-title">{product.Nombre}</h5>
//                                 <p className="card-text">{product.Descripcion}</p>
//                                 <p className="card-text">${product.Precio}</p>
//                                 {product.Categories && product.Categories.length > 0 && (
//                                     <div>
//                                         <h6>Categorías:</h6>
//                                         <ul className="list-unstyled">
//                                             {product.Categories.map((category, index) => (
//                                                 <li key={index}>{category.name}</li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };


// export default Products;
