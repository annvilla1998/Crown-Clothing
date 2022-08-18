import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decrementItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = decrementCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = deleteItemFromCart(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

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
