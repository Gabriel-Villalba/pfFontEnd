import { useSelector, useDispatch } from "react-redux";
//import {removeFromCart } from '../../Redux/action/action';
import { borrarProductoDelCarrito } from "../../Redux/action/action";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const idCart = useSelector((state) => state.idCarrito);
  //console.log('cart', cart)

  // const handleamountChange = (productId, amount) => {
  //     if (amount >= 1 && amount <= 10) {
  //         dispatch(updateCartamount(productId, amount));
  //     }
  // };
  console.log(cart);
  const handleRemove = (id) => {
    //dispatch(removeFromCart(productId));
    dispatch(borrarProductoDelCarrito(id, idCart));
  };

  const handlePurchase = () => {
    alert("Compra realizada con éxito!");
  };
  
  const totalPrice = cart.length > 0 && cart.reduce((total, item) => {
    const price = parseFloat(item.Precio);
    if (!isNaN(price)) {
      return total + price * item.amount;
    } else {
      console.warn(`Precio no válido para el producto con ID ${item.id}.`);
      return total;
    }
  });
  //const primerProducto = cart
  //console.log(primerProducto[12].Precio)
  // const totalPrice = cart.reduce((total, item) => {
  //     const price = parseFloat(item.Precio) || 0;
  //     return total + price * item.amount;
  // }, 0);
  //console.log('totalPrice', totalPrice)
  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      <div className="cart-header">
        <span className="header-item">Producto</span>
        <span className="header-item">Precio</span>
        <span className="header-item">Cantidad</span>
        <span className="header-item">Total</span>
        <span className="header-item">Eliminar</span>
      </div>
      <ul className="cart-list">
        {cart.length > 0 && cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="item-name">{item.Nombre}</span>
            <span className="item-price-unit">
              ${parseFloat(item.Precio).toFixed(2)}
            </span>
            <span className="item-amount">{item.amount}</span>

            {/* <input 
                            type="number" 
                            value={item.amount} 
                            onChange={(e) => handleamountChange(item.product.id, parseInt(e.target.value))}
                            min="1"
                            className="amount-input"
                        /> */}

            <span className="item-total-price">
              Total: ${(item.Precio * item.amount).toFixed(2)}
            </span>
            <button
              onClick={() => handleRemove(item.id)}
              className="remove-button"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <h2 className="total-price">${totalPrice.toFixed(2)}</h2>
      <button onClick={handlePurchase} className="purchase-button">
        Comprar
      </button>
    </div>
  );
};

export default Cart;
