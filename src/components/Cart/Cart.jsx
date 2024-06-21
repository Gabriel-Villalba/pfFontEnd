import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/action/action';

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.carrito);
    console.log('cart', cart)
    const userId = useSelector(state => state.user.id);
    console.log('userId', userId)

    useEffect(() => {
        if (userId) {
            dispatch(addToCart(userId));
        }
    }, [dispatch, userId]);

    // const handleRemoveFromCart = (productId) => {
    //     dispatch(removeFromCart({ userId, productId }));
    // };

    const totalPrice = cart.reduce((total, item) => total + item.product.Precio * item.quantity, 0);

    return (
        <div>
            <h1>Carrito de Compras</h1>
            <ul>
                {cart.map(item => (
                    <li key={item.productId}>
                        {item.product.Nombre} - {item.quantity} x ${item.product.Precio.toFixed(2)}
                        {/* <button onClick={() => handleRemoveFromCart(item.productId)}>Eliminar</button> */}
                    </li>
                ))}
            </ul>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
        </div>
    );
};

export default Cart;
