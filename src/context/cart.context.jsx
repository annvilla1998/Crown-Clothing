import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains product to addItemToCart
    let item = cartItems.find(item => item.id === productToAdd.id);
    if(item){
        //if found increment quantity
        return cartItems.map(cartItem => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem);
        //return new array with modified cartItems
    }else{
        return [...cartItems, {...productToAdd, quantity: 1}];
    }
    
}

const decrementCartItem = (cartItems, productToRemove) => {
    let item = cartItems.find(item => item.id === productToRemove.id);
    if(item.quantity > 1){
        return cartItems.map(cartItem => 
            cartItem.id === productToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem);
    }else if(item.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }
}

const deleteItemFromCart = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    decrementItemFromCart: () => {},
    removeItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})




export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        setCartCount(newCartCount);
    },[cartItems]);
    
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        setCartTotal(newCartTotal);
    },[cartItems]);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const decrementItemFromCart = (productToRemove) => {
        setCartItems(decrementCartItem(cartItems, productToRemove));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(deleteItemFromCart(cartItems, productToRemove))
    }

    const value = { isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount,
        decrementItemFromCart,
        removeItemFromCart,
        cartTotal
    };
    
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}