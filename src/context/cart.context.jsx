import { createContext, useReducer } from 'react';
import {createAction} from '../utils/reducer/reducer.utils';

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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const INITIAL_STATE = {
    cartCount: 0,
    cartTotal: 0,
    cartItems: [],
    isCartOpen: false,
}

const cartReducer = (state, action) => {
    const { type, payload } = action;


    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }

        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
}




export const CartProvider = ({children}) => {
    const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount
            })
        )
        
    };
    
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const decrementItemFromCart = (productToRemove) => {
        const newCartItems = decrementCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = deleteItemFromCart(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = { 
        isCartOpen, 
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