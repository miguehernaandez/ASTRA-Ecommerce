// Axios
import axios from 'axios';
import { getUsers, createUser } from './userActions'
import Cookie from 'js-cookie';

import {
    ERROR_MESSAGE,
    ADD_TO_CARD,
    REMOVE_FROM_CART,
    UPDATE_FROM_CART,
    DELETE_CART
} from '../constants/constans';



const url = 'localhost:3001';
const userData = {
    email: 'Astra_Guest@guest.com',
    password: 'guest',
    role: 'Guest'
}


export function addToCart(id, qty, userID){
    console.log('entre a AddToCart')
    const product = {id, qty}
    let idUser = 1;
    console.log(product)
    return async (dispatch, getState)=> {

        axios.post(`http://${url}/users/${userID ? userID : 1}/cart`, product)
            .then(res => {
                console.log('*****')
                console.log(res.data)
                if(res.status === 200){
                    dispatch({
                        type: ADD_TO_CARD,
                        products: res.data.data
                    })
                    const state = getState()
                    console.log(state.cart)
                    // // Guardar Items en Cookies
                    // const {cart:{cartItems}} = getState()
                    Cookie.set('cartItems', JSON.stringify(state.cart))
                }else{
                    dispatch({
                        type: ERROR_MESSAGE,
                        message: 'Error al obtener productos por Categoria'
                   })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
}


export function removeFromCart(productId){
    console.log('********id delete**********')
    console.log(productId)
    return (dispatch, getState) => {
        axios.delete(`http://${url}/users/1/cart/${productId}`)
            .then(res => {
                console.log('***********res of the route delete *****************')
                console.log(res.data.data)
                dispatch({
                    type:REMOVE_FROM_CART,
                    payload: res.data.data
                })
                const state = getState()
                console.log(state.cart)
                // // Guardar Items en Cookies
                // const {cart:{cartItems}} = getState()
                Cookie.set('cartItems', JSON.stringify(state.cart))
            })
            .catch(er => {
                console.log('ERRO EN EL CATHC DE DELETE')
            })
    }
}

export function updateFromCart(id, qty){
    return (dispatch, getState) => {
        axios.put(`http://${url}/users/1/cart`, {id,qty})
            .then(res => {
                dispatch({
                    type:UPDATE_FROM_CART,
                    payload: res.data.data
                })
                const state = getState()
                console.log(state.cart)
                // // Guardar Items en Cookies
                // const {cart:{cartItems}} = getState()
                Cookie.set('cartItems', JSON.stringify(state.cart))

            })

    }
}

export function deleteCart(){
    return (dispatch, getState) => {
        axios.delete(`http://${url}/users/1/cart`)
            .then(res => {
                console.log(res.data.data)
                // dispatch({
                //     type: DELETE_CART,
                //     payload: res.data.data
                // })
            })

            .catch(er => {
                console.log('ERROR AL VACIAR CART')
            })
    }
}