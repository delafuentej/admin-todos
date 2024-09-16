'use client';

import { hasCookie, getCookie, setCookie } from "cookies-next";

/* 
    cookie: 'cart'
    {
        article : quantity
        'uui-123-1': 2,
        'uui-123-2': 5,
        'uui-123-3': 4,
,    }
*/

export const getCookieCart = () : {[id: string]: number} => {
    if(hasCookie('cart')){
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
        return cookieCart;
    }
    return {};
};

export const addProductToCart = (id:string) => {
    const cookieCart = getCookieCart();
    
    if(cookieCart[id]){
        cookieCart[id] += 1;
    }else{
        cookieCart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cookieCart));
}  

export const removeProductFromCart = (id:string) => {
    const cookieCart = getCookieCart();
    delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart));

}
