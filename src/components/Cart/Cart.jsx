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

    const totalPrice = cart.reduce((total, item) => {
        const price = parseFloat(item.product.Precio) || 0;
        return total + price * item.quantity;
    }, 0);
//console.log('totalPrice', totalPrice)
    return (
        <div>
            <h1>Carrito de Compras</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.product.id}>
                        {item.product.Nombre} - 
                        <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value))}
                            min="1"
                        />
                        x ${parseFloat(item.product.Precio).toFixed(2)}
                        <button onClick={() => handleRemove(item.product.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
};

export default Cart;
