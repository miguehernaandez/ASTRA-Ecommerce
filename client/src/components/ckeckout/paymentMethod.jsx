import React, {useEffect} from 'react';
import { CreateOrder, UpdateOrderToProcessStatus, deleteOrderCart, confirmOrder, UpdateOrderToFullfilled, UpdateOrderToreject} from '../../store/actions/checkout_actions';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, updateFromCart, deleteCart } from '../../store/actions/cart_actions';
import { getOrders } from '../../store/actions/order_actions';
import { Link } from 'react-router-dom';
import s from '../../styles/carrito.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../multimedia/logo.png';
import CardVacio from '../../multimedia/carrtvacio.png';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookie from 'js-cookie';
import { Button, Form, Container, Navbar, Table} from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import cookie from 'js-cookie'


const stripePromise = loadStripe('pk_test_51HhisyJCzko8yllshTIdDvi4wXchIr9Qldywmk851YSOTubs7MbPWyS4YmE3n0IDR2VA1ha15pVFFsEKL4juFMnk00rPudOUZh')

/********************************************* Form Pay ***************************************************** */
function CardForm({total, confirOrderProps, objenderProps, checkoutEndProps})  {
    const [loading, setLoading] = useState(false)
    const stripe = useStripe();
    const elements = useElements();
    let history = useHistory();
    console.log(total)
    console.log(checkoutEndProps)
    let statuCheckout = checkoutEndProps && checkoutEndProps;
    // if(checkoutEndProps){
    //     setLoading(true)
    // }
    
    // if(loading){
    //     console.log('terminado')
    // }

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement),
        })
        setLoading(true)
        if(!error){
            console.log(paymentMethod)
            confirOrderProps(paymentMethod.id, total, objenderProps.id  )
            
            history.push('/paymethod/sucess')
            //await sendStatusOrder(checkoutEndProps)
           // UpdateOrderToCreateFullorRejectProps(objenderProps.id, statuCheckout)
           //setLoading(false)
        }else{
            console.log(error)
        }
        setLoading(false)
    }

    // let StatusOrder = checkoutEndProps || ""
    // console.log('final', StatusOrder)
   

    // const sendStatusOrder = (StatusOrder) => {

    //             return history.push('/paymethod/sucess?status='+StatusOrder)

    // }

    

    // if(statuCheckout){
    //     console.log('aqui true')
    //     //UpdateOrderToSucess(objenderProps.id)
        
    //     return
    //    //return history.push('/paymethod/sucess')
    // }else{
    //     console.log('aqui False')
    //    //return history.push('/paymethod/failed')
    // }
    

    return (
        <Form onSubmit={handlerSubmit}>
        <CardElement 
            options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
        />
        <Button type="submit" className={s.buttonFormPay}>
            {loading ? "Pagando" : "Finalizar compra"}
        </Button>
        </Form>
    );
  };
  /************************************************************************************************************ */




const PaymentMethod = ({cartP, UpdateOrderToProcessStatusP, checkoutP, UpdateOrderTorejectP, UpdateOrderToFullfilledP, confirmOrderP, orderCreatedP, getOrdersP, orderP,userLogin,}) => {
    const [form, setForm] = useState({
        city:"",
        adress:"",
        phone: "",
        postal: ""
    })
    let orderConfirmFunction = confirmOrderP
    console.log('Orden Creada...')
    console.log(orderCreatedP)
    console.log('Ordenes...')
    console.log(orderP)
    console.log('estado de la Orden')
    console.log(checkoutP)
    
    //let product = orderCreatedP ? orderCreated.products : []
    let checkoutEnd = checkoutP;
    let orderRender =  orderP && orderP.filter(x => x.id === orderCreatedP.id)
    cookie.set('orderCreated', JSON.stringify(orderRender[0]))
    let objender =  orderRender[0] || cookie.getJSON('orderCreated');
    let products = objender && objender.products
    let orderP2 =  orderP.length < 1? [] :  orderP[0].products
    // const  qty = location.search.split('=')[1]

    console.log('Orden para renderizar')
    console.log(products)

    /********** USEEFECT *********** */
    useEffect(()=> {
        if(checkoutEnd === false){
            console.log('Podes hacer la peticion aca')
            UpdateOrderTorejectP(orderCreatedP.id)
            getOrdersP();
            return
        }
        getOrdersP();
    },[])
     /********** USEEFECT *********** */
    console.log('*****ORDER******')
    console.log(userLogin)
    let history = useHistory()


    const handlerInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handlerSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        UpdateOrderToProcessStatusP(orderCreatedP.id, form)
    }

    


    return(
        
        <div>

            {/* < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/> */}
            <div className={`${s.cont_prin} my-3`}>
                <div className={s.cont1}>
                    <img className={`${s.logo}`} src={logo}></img>
                    <ul>
                        <li><i>1</i><span>Resumen de compra</span></li>
                        <li><i>2</i><span>Datos de envio</span></li>
                        <li><i>3</i><span>Forma de pago</span></li>

                    </ul>
                </div>
                <Container className={s.contFormPay}>
                    <div>
                        <h1>Resumen de la Orden</h1>
                        <div>
                            {!products || products.length < 1 ? <h3>Emply...</h3> : 
                            <div>
                                <Table  size="sm">
                                <thead className={s.tableTitle}>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cant</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(x => {
                                    return (
                                        <tr>
                                            <td>{x.name}</td>
                                            <td>{x.order_line.quantity}</td>
                                            <td>{x.price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                                </Table>
                                <Table>
                                    <tr>
                                        <td>
                                            <h1>Total: $ {objender && objender.total}</h1>
                                        </td>
                                    </tr>
                                </Table>
                             
                            </div>
                             }
                        </div>
                    </div>
                    <div className={s.contFormCardPay}>
                    <Elements stripe={stripePromise}>
                        <CardForm 
                        total={objender.total}
                        confirOrderProps={orderConfirmFunction}
                        objenderProps={objender}
                        checkoutEndProps={checkoutEnd}
                        UpdateOrderToSucess={UpdateOrderToFullfilledP}
                        />
                    </Elements>
                    </div>
                </Container>
                
                
                    <div className={s.cont_button1}>
                        {/* <Button className={s.buttonF} >Finalizar compra</Button>{"    "} */}
                        <Button className={s.buttonFC} >Cancelar compra</Button>

                    </div>

            </div>
             



                          
        </div>


    )

}


function mapStateToProps(state){
    return {
        cartP: state.cart,
        orderP : state.orders,
        userLogin: state.userLogged,
        orderCreatedP : state.orderCreated,
        checkoutP : state.checkout
    }
}

function mapDispatchToProps(dispatch){
    return {
        addToCartP : (id, qty) => dispatch(addToCart(id, qty)),
        removeFromCartP : (id) => dispatch(removeFromCart(id)),
        updateFromCartP : (id, qty) => dispatch(updateFromCart(id, qty)),
        deleteCartP: () => dispatch(deleteCart()),
        getOrdersP : () => dispatch(getOrders()),
        CreateOrderP : (cartP2, userId) => dispatch(CreateOrder(cartP2, userId)),
        UpdateOrderToProcessStatusP : (id, data) => dispatch(UpdateOrderToProcessStatus(id, data)),
        deleteOrderCartP : (id) => dispatch(deleteOrderCart(id)),
        confirmOrderP : (id, total, OrderId) => dispatch(confirmOrder(id, total, OrderId)),
        UpdateOrderToFullfilledP : (id) => dispatch(UpdateOrderToFullfilled(id)),
        UpdateOrderTorejectP : (id) => dispatch(UpdateOrderToreject(id))
 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);