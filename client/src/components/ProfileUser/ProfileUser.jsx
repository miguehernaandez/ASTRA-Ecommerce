import React from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Form, Button, FormControl, Jumbotron } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom'
import {logout,  loginActiontest} from '../../store/actions/loginActions'
import Cookie from 'js-cookie';
import {enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans';
import Navegacion from '../Navegacion/Navegacion'


const ProfileUser = ({userLoggedP, logoutP, loginActionP}) => {

    const history = useHistory();
    console.log(userLoggedP)
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
        <div>
        <Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesUserConAdmin} showSearchbar={true} />
        <Jumbotron>
                    <h1> Wellcome {userLoggedP.name} </h1>
                    <p>
                        Logged Success !!
                    </p>
                    <p>
                          <Button variant="primary">Learn more</Button> 
                    </p>
        </Jumbotron>
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
