import React, {useEffect} from 'react';
import { CreateOrder, UpdateOrderToProcessStatus, deleteOrderCart, confirmOrder, UpdateOrderToFullfilled, UpdateOrderToreject} from '../../store/actions/checkout_actions';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, updateFromCart, deleteCart } from '../../store/actions/cart_actions';
import { getOrders } from '../../store/actions/order_actions';
import s from '../../styles/carrito.module.css';
import logo from '../../multimedia/logo.png';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Container, Navbar, Table} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Checkout from '../Modals/Checkout';




const CheckoutSucess = ({cartP, UpdateOrderTorejectP, checkoutP, UpdateOrderToFullfilledP, orderCreatedP, getOrdersP, orderP, userLogin}) => {

    // const {idUser} = match.params
    console.log('Orden Creada...')
    console.log(orderCreatedP)
    console.log('Ordenes...')
    console.log(orderP)
    console.log('estado de la Orden')
    console.log(checkoutP)
    //let product = orderCreatedP ? orderCreated.products : []
    let checkoutEnd = checkoutP;
    let orderRender =  orderP && orderP.filter(x => x.id === orderCreatedP.id)
    let objender =  orderRender[0];
    let products = objender && objender.products
    let orderP2 =  orderP.length < 1? [] :  orderP[0].products

    const [showCheckout, setShowCheckout] = useState(true);
    // const  qty = location.search.split('=')[1]
    
    console.log('Orden para renderizar')
    console.log(products)
  

    /********** USEEFECT *********** */
    useEffect(()=> {
        getOrdersP();
    },[])
     /********** USEEFECT *********** */
    console.log('*****ORDER******')
    console.log(userLogin)
    let history = useHistory()


    const handlerClick = () => {
        UpdateOrderToFullfilledP(orderCreatedP.id)
        setShowCheckout(false)
        return
    }

    const handlerClickReject = () => {
        console.log('Recahzar Order', orderCreatedP.id)
        UpdateOrderTorejectP(orderCreatedP.id)
        //history.push('/paymethod')
        return
    }

    return(
        <>
        <div>
            {checkoutEnd ? 
                    <div className={`${s.cont_prin} my-3`}>
                        <div className={s.cont1}>
                            <img className={`${s.logo}`} src={logo}></img>
                            <ul>
                                <h1>Compra exitosa!!</h1>
                            </ul>
                        </div>
                        <Container className={s.contFormPay}>
                           <h1>Compra succes</h1>
                        </Container>
                        
                        
                            <div className={s.cont_button1}>
                                {/* <Button className={s.buttonF} >Finalizar compra</Button>{"    "} */}
                                <Button className={s.buttonFC} as={Link} to={'/'}>Terminar</Button>
        
                            </div>
        
                    </div> :
                             <div className={`${s.cont_prin} my-3`}>
                                <div className={s.cont1}>
                                    <img className={`${s.logo}`} src={logo}></img>
                                    <ul>
                                        <h1>Ah ocurrido un error al enviar el pago.!</h1>
                                    </ul>
                                </div>
                                <Container className={s.contFormPay}>
                                    <h1>Compra fallida</h1>
                                </Container>
                                <div className={s.cont_button1}>
                                    {/* <Button className={s.buttonF} >Finalizar compra</Button>{"    "} */}
                                    <Button className={s.buttonFC}  as={Link} to={'/paymethod'}>intentar nuevamente</Button>
                                </div>
                            </div>
                    }
            {/* < Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={false}/> */}
         
        </div>
        <Checkout 
            checkoutEnd={checkoutEnd}
            showCheckout={showCheckout}
            setShowCheckout={setShowCheckout}
            handlerClick={handlerClick}
            user={userLogin}
            order={orderCreatedP}
        />
        </>
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
        UpdateOrderToFullfilledP : (idOrder) => dispatch(UpdateOrderToFullfilled(idOrder)),
        UpdateOrderTorejectP : (id) => dispatch(UpdateOrderToreject(id))
        //deleteOrderCartP : (id, status) => dispatch(deleteOrderCart(id, status))
 
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSucess);