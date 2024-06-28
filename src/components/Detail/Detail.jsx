import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsById, agregarAlCarrito } from "../../Redux/action/action";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);

  //const usuario = useSelector((state) => state.users)
  const idCart = useSelector((state) => state.idCarrito);
    // console.log("carrito ",idCart)
     //console.log("usuario ",usuario)

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  const handleClickClose = () => {
    navigate('/products');
  };
  useEffect(() => {
    if (cart.some(item => item.id === id)) {
      setAddedToCart(true);
    }
  }, [cart, id]);
  
  const handleAddToCart = () => {
  if (product) {
    const nombreProduct = product.Nombre
    const id_products = product.id;
    const productInCart = cart.filter((item) => {
      if (item.Nombre === nombreProduct) {
        return true;
      }
      return false;
    });
    //console.log(productInCart)
    if (productInCart===nombreProduct) {
      // El producto ya está en el carrito
      console.log('El producto ya existe en el carrito');
    } else {
      // Agrega el producto al carrito
      idCart ? dispatch(agregarAlCarrito(id_products, quantity, idCart)) : console.log("no hay id ")
      setAddedToCart(true);
      
    }
  }
};

  

  const product = useSelector((state) => state.detail);
  //console.log(product.Nombre)
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Detail</h1>
      {product ? (
        <div className="col-md-4 mb-4">

          <div className="card h-100">
            <button onClick={handleClickClose} className="botonCerrar">X</button>
            <img src={product.Imagen_URL} className="card-img-top" alt={product.Nombre} />
            <div className="card-body">
              <h5 style={{ fontWeight: 'bold' }}>{product.Nombre}</h5>
              <p className="card-text">{product.Descripcion}</p>
              <h6 style={{ fontWeight: 'bold' }}>Price:</h6>
              <p className="card-text">${product.Precio}</p>
              {product.Categories && product.Categories.length > 0 && (
                <div>
                  <h6 style={{ fontWeight: 'bold' }}>Categories:</h6>
                  <ul className="list-unstyled">
                    {product.Categories.map((category, index) => (
                      <li key={index}>{category.name}</li>
                    ))}
                  </ul>
                </div>
              )}
                <div className="mt-2">
                <label htmlFor="quantity" style={{ fontWeight: 'bold' }}>Quantity:</label>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  min="1"
                  className="quantity-input"
                />
              </div>
              <button
                 className={`btn-agregarCarrito ${addedToCart ? 'added' : ''}`}
                onClick={handleAddToCart}
                disabled={addedToCart}
              >
                <i className="fas fa-shopping-cart"></i>
                {addedToCart ? 'En el carrito' : 'Agregar al carrito'}
              </button>
            </div>

          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}

    </div>
  );
};

export default Detail;
