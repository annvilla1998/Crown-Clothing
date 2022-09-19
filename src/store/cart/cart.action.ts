import { CategoryItem } from '../categories/category.types';

import { createAction, withMatcher, ActionWithPayload } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES, CartItem } from './cart.types';


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>


export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
})

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
};

export const decrementItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = decrementCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = deleteItemFromCart(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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


const decrementCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    let item = cartItems.find(item => item.id === productToRemove.id);
        
    if(item && item.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }
    return cartItems.map(cartItem => 
        cartItem.id === productToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem);
}

const deleteItemFromCart = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
}
