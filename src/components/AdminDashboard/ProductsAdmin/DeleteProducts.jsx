import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from '../../../Redux/action/action.js';

const DeleteProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);



  return (
    <div className="deleteContainer">
      <h2>Delete Products</h2>
      <ul className="productsList">
        {products.map(product => (
          <li key={product.id} className="item">
            {product.Nombre}
            <button onClick={() => dispatch(deleteProduct(product.id))}className="deleteButton">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteProducts;