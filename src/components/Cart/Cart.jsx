import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../Redux/action/action';
import { Link } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

//console.log('cart', cart)

    const handleQuantityChange = (productId, quantity) => {
        if (quantity >= 1 && quantity <= 10) {
            dispatch(updateCartQuantity(productId, quantity));
        }
    };
//console.log('productId',productId)
    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    // const handlePurchase = () => {
    //     alert('Compra realizada con éxito!');
    // };

    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.Precio) || 0;
        return total + price * item.quantity;
    }, 0);
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
            <ul className="cart-list"                               >
                {cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <span className="item-name">{item.Nombre}</span> 
                        <span className="item-price-unit">${parseFloat(item.Precio).toFixed(2)}</span>
                        <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            min="1"
                            className="quantity-input"
                        />
                        
                        <span className="item-total-price">Total: ${(item.Precio * item.quantity).toFixed(2)}</span>
                        <button onClick={() => handleRemove(item.id)} className="remove-button">X</button>
                    </li>
                ))}
                
            </ul>
            <h2 className="total-price">${totalPrice.toFixed(2)}</h2>
            {/* <button onClick={handlePurchase} className="purchase-button">Comprar</button> */}
            <Link className="nav-link" to="/orden"> <button className="purchase-button">Facturar</button></Link>
        </div>
    );
};

export default Cart;
