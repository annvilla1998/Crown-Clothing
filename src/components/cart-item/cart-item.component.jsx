import { CartItemContainer, Image, ItemDetails } from './cart-item.styles.js';


const CartItem = ({ cartItem }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    return (
        <CartItemContainer>
            <Image src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span className="name">{name}</span>
                <span className="price">{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;