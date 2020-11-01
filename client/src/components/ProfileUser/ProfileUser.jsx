import React from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Form, Button, FormControl, Jumbotron, Card, Image } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom'
import {logout,  loginActiontest} from '../../store/actions/loginActions'
import Cookie from 'js-cookie';
import {enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans';
import Navegacion from '../Navegacion/Navegacion'
import s from '../../styles/profile.module.css';
import placeholder from '../../multimedia/placeholder.png';


const ProfileUser = ({userLoggedP, logoutP, loginActionP}) => {

    const history = useHistory();
    console.log('ACAAAAAAAAAAAAAAAAAAAAAAAAAAA', userLoggedP)
    // useEffect(()=> {
    //     if(!userLoggedP){
    //         return history.push('/login')
    //     }else{
    //         setModal(true)
    //     }
    // },[])

    const handlerClick = () => {
    //    history.push('/')
    //    loginActionP()
    //    Cookie.remove('userLoad');
    //    return
    }


    return (
        <div className={s.all}>
        <Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} />
        <div className={s.background}>
        </div>
        <div className={s.contPrincipal}>
        {/* <Jumbotron className={s.prueba}>
                    <h1> Wellcome {userLoggedP.name} </h1>
                    <p>
                        Logged Success !!
                    </p>
                    <p>
                          <Button variant="primary">Learn more</Button> 
                    </p>
        </Jumbotron> */}
        <Card className={`${s.cardStyle} ${s.prueba}`}>
            <Image className={s.size} src={placeholder} roundedCircle/>
            <Card.Body className={s.cardItemUser}>{userLoggedP.name}</Card.Body>
            <Card.Body className={s.email}>{userLoggedP.email}</Card.Body>
        </Card>
        <Card className={`${s.cardStyle} ${s.compras}`}>
            <Card.Body className={s.cardItem}>Tus compras</Card.Body>
        </Card>
        <Card className={`${s.cardStyle}`}> 
            <Card.Body className={s.cardItem}>Tus reviews</Card.Body>
        </Card>
        </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        userLoggedP : state.userLogged,
        messageErrorP : state.messageError
    }
}

function mapDispatchToProps(dispatch){
    return {
        // loginActionP : () => dispatch(loginActiontest())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
