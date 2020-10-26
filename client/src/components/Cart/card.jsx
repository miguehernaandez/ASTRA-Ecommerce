import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import { addToCart, removeFromCart, updateFromCart, deleteCart } from '../../store/actions/cart_actions'
import { getOrders } from '../../store/actions/order_actions'
import { Link } from 'react-router-dom'
import s from '../../styles/carrito.module.css'
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../multimedia/logo.png';
import CardVacio from '../../multimedia/carrtvacio.png';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import Navegacion from '../Navegacion/Navegacion'
import { useState } from 'react';




const CartShop = ({match, location, addToCartP, cartP, removeFromCartP, updateFromCartP, deleteCartP, getOrdersP, orderP,userLogin}) => {
    const [quantity, setQuantity] = useState(0)
    const {idUser} = match.params
    //console.log(cartP[0].products)
    let cartP2 =  cartP.length < 1 ? [] :  cartP[0].products
    let orderP2 =  orderP.length < 1? [] :  orderP[0].products
    // const  qty = location.search.split('=')[1]
    var enlacesUserConAdmin = [
        { text: 'Catalogo', to: '/products/catalogo' },
        { text: 'FAQs', to: '/' },
        { text: 'Contacto', to: '/' },
        { text: 'Ayuda', to: '/' },
        // { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
        { text: 'ADMIN', to: '/admin' },
    ];
    var enlacesUserSinAdmin = [
        { text: 'Catalogo', to: '/products/catalogo' },
        { text: 'FAQs', to: '/' },
        { text: 'Contacto', to: '/' },
        { text: 'Ayuda', to: '/' },
        // { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
    ]


    /********** USEEFECT *********** */
    // useEffect(()=> {
    //     getOrdersP();
    //     if(userLogin){
    //         cartP2 = orderP[0].products
    //     }
        
    // },[])
     /********** USEEFECT *********** */
    console.log('*****ORDER******')
    console.log(userLogin)


    return(
        
        <div>
            
            <div>
            < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/>
            <div className={s.cont_prin}>
                <div className={s.cont1}>
                    <img className={`${s.logo}`} src={logo}></img>
                    <ul>
                        <li><i>1</i><span>Resumen de compra</span></li>
                        <li><i>2</i><span>Datos de envio</span></li>
                        <li><i>3</i><span>Forma de pago</span></li>

                    </ul>
                </div>
                <h1>Mi carrito</h1>
                {cartP2.length < 1 ? 
                <div className={s.cardVacio}>
                    <img src={CardVacio}></img>
                    <h1>!TU CARRITO DE COMPRAS AHORA ESTA VACIO¡</h1> 
                    <h6>Busca y añade los articulos que mas te gusten al carrito</h6>
                    <Link className={s.link} to='/'>Sigue comprando</Link>
                </div>
               :
                <div className={s.cont2}>                  
                     <div className={s.cont_table}>
                        <Table  size="sm">
                            <thead className={s.tableTitle}>
                                <tr>
                                    <th>Producto</th>
                                    <th>Envio</th>
                                    <th>Precio</th>
                                    <th className={s.cantidadTitle}>Cantidad</th>
                                    <th>Total</th>
                                    <th className={s.nada}></th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartP2.map((product, index) =>{
                                    return(
                                        <tr className={s.tableDescrip} >
                                        <Link to={'/products/product/' + product.id}>
                                            <td className={s.product}>
                                                <div className={s.cont_img}>
                                                <img src={product.image}></img>
                                                </div>
                                                <a>{product.name}</a>
                                            </td>
                                        </Link>
                                        <td >Se enviara Pronto</td>
                                        <td className={s.PreCant}>$ {product.price}</td>
                                         {/* <div className={s.cont_cant}> */}
                                        <td className={s.cantidad}>
                                             {/* <div className={s.button1} onClick={() => increment(product)}>-</div>  */}
                                            {/* <input className={s.input} type="number" name="name" value={product.qty}  onChange={(e)=> addToCartP(product.id, e.target.value)}/> */}
                                            {/* {<div className={s.button2} onClick={() => decrement(product)}>+</div> } */}
                                            <select name='Cantidad' id='Cantidad' value={product.order_line.quantity} onChange={(e) => updateFromCartP(product.id, e.target.value)}>
                                                {[...Array(product.stock).keys()].map(x => {
                                                    return (
                                                        <option value={x+1}>{x+1}</option>
                                                    )
                                                })}
							                </select>

                                        </td>
                                        {/* </div> */}
                                    <td className={s.PreCant}>$ {product.order_line.quantity * product.price}</td>
                                        <td className={s.icon}>
                                        <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => removeFromCartP(product.id)} />
                                        </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </Table>
                    </div>
                    <div className={s.cont_total}>
                        <div className={s.total}>
                            <Table striped borderless size="sm">
                            <tbody  className={s.tabletotal}>
                                <tr>
                                    <td className={s.subinfo1}>Subtotal</td>
                                    <td className={s.subPrecio}>$ {cartP2.reduce((a,c) => a + c.order_line.quantity*c.price,0)}</td>
                                </tr>
                                <tr>
                                    <td className={s.subinfo1}>Iva</td>
                                    <td className={s.subPrecio}>$ { Math.trunc(cartP2.reduce((a,c) => a + c.order_line.quantity*c.price,0) * 0.19)  }</td>
                                </tr>
                                <tr>
                                    <td className={s.subinfo2}>Total</td>
                                    <td className={s.subPrecio}>$ { ( Math.trunc(cartP2.reduce((a,c) => a + c.order_line.quantity*c.price,0) * 0.19)) + cartP2.reduce((a,c) => a + c.order_line.quantity*c.price,0) }</td>
                                </tr>
                            </tbody>
                            </Table>

                        </div>
                    </div>
                    <div className={s.cont_button1}>
                        <Button className={s.buttonF}>Finalizar compra</Button>{"    "}
                        <Button className={s.buttonFC} onClick={deleteCartP}>Cancelar compra</Button>

                    </div>

                </div>
             } 

            </div>
       
            </div>

                          
        </div>


    )

}


function mapStateToProps(state){
    return {
        cartP: state.cart,
        orderP : state.orders,
        userLogin: state.userLogged
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCartP : (id, qty) => dispatch(addToCart(id, qty)),
        removeFromCartP : (id) => dispatch(removeFromCart(id)),
        updateFromCartP : (id, qty) => dispatch(updateFromCart(id, qty)),
        deleteCartP: () => dispatch(deleteCart()),
        getOrdersP : () => dispatch(getOrders())
 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartShop);