import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart } from '../../Redux/action/action';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

//console.log('cart', cart)

    const handleQuantityChange = (productId, quantity) => {
        if (quantity >= 1) {
            dispatch(updateCartQuantity(productId, quantity));
        }
    };
//console.log('productId',productId)
    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handlePurchase = () => {
        alert('Compra realizada con éxito!');
    };

    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.product.Precio) || 0;
        return total + price * item.quantity;
    }, 0);
//console.log('totalPrice', totalPrice)
    return (
        <div className="cart-container">
            <h1 className="cart-title">Carrito de Compras</h1>
            <ul className="cart-list"                               >
                {cart.map(item => (
                    <li key={item.product.id} className="cart-item">
                        <span className="item-name">{item.product.Nombre}</span> 
                        <span className="item-price-unit">${parseFloat(item.product.Precio).toFixed(2)}</span>
                        <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                            min="1"
                            className="quantity-input"
                        />
                        
                        <span className="item-total-price">Total: ${(item.product.Precio * item.quantity).toFixed(2)}</span>
                        <button onClick={() => handleRemove(item.product.id)} className="remove-button">X</button>
                    </li>
                ))}
                
            </ul>
            <h2 className="total-price">Total: ${totalPrice.toFixed(2)}</h2>
            <button onClick={handlePurchase} className="purchase-button">Comprar</button>
        </div>
    );
};

export default Cart;
