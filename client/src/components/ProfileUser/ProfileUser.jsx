import React from 'react';
import { useEffect } from 'react';
import {connect} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Form, Button, FormControl, Jumbotron } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom'
import {logout,  loginActiontest} from '../../store/actions/loginActions'
import Cookie from 'js-cookie';


const ProfileUser = ({userLoggedP, logoutP, loginActionP}) => {

    const history = useHistory();
    console.log(userLoggedP)
    // useEffect(()=> {
    //     if(!userLoggedP){
    //         return history.push('/login')
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
        <Jumbotron>
                    <h1> {userLoggedP ? 'Hello, Wellcome ' + userLoggedP.name : 'User or Password Incorrect! '}!</h1>
                    <p>
                        Logged Success !!
                    </p>
                    <p>
                        {userLoggedP ?  <Button variant="primary">Learn more</Button> : <Link to={'/login'}>Try Now</Link>}
                       
                    </p>
                    {userLoggedP && <Button onClick={handlerClick}>logout</Button>}
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
