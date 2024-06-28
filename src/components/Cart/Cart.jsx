import { useSelector, useDispatch } from 'react-redux';
//import {removeFromCart } from '../../Redux/action/action';
import {borrarProductoDelCarrito } from '../../Redux/action/action';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const idCart = useSelector(state => state.idCarrito)
    const navigate = useNavigate();
//console.log(cart)
    const handleRemove = (id) => {
        dispatch(borrarProductoDelCarrito(id, idCart));
    };
    const handlePurchase = () => {
       navigate("/orden")
    };
    const totalPrice = cart.length > 0 && cart.reduce((total, item) => {
       const price = parseFloat(item.Precio) || 0;
        return total + price * item.amount;
    }, 0);
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
            <ul className="cart-list" >
                {cart.length > 0 && cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <span className="item-name">{item.Nombre}</span> 
                        <span className="item-price-unit">${parseFloat(item.Precio).toFixed(2)}</span>
                        <span className="item-quantity">{item.amount}</span>
                        <span className="item-total-price">Total: ${(item.Precio * item.amount).toFixed(2)}</span>
                        <button onClick={() => handleRemove(item.id)} className="remove-button">X</button>
                    </li>
                ))}
                
            </ul>
            <h2 className="total-price">${totalPrice}</h2>
            <button onClick={handlePurchase} className="purchase-button">Continuar compra</button>
        </div>
    );
};

export default Cart;
