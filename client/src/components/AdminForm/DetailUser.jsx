import React from 'react'
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap';
import {  Link  } from 'react-router-dom';
import Navegacion from '../Navegacion/Navegacion';
var enlacesUser = [
    { text: 'Catalogo', to: '/products/catalogo' },
    { text: 'FAQs', to: '/' },
    { text: 'Contacto', to: '/' },
    { text: 'Ayuda', to: '/' },
    { text: 'Registro', to: '/users' }, // Por ahora para probar nomas
    { text: 'ADMIN', to: '/admin' },
];



const UserDetaul = ({userSelectedP}) => {
    console.log(userSelectedP)
    return (
        
        <div>
             < Navegacion links={enlacesUser} showSearchbar={false}/>
            {userSelectedP.length === 0 || userSelectedP[0].orders.length === 0 ? 
            
            
                <div className='container'>
                   
                    <h1>No hay Ordenes para este Usuario</h1>
                    <Link to='/'>Volver al Home</Link>
                </div>    
            
            
            :
            
            <div className='container'>

                    <h3>Ordenes de este Usuario: {userSelectedP[0].orders.length}</h3>
                    <div>
                    {userSelectedP.map((x, index) => {
                        return (
                            <div>
                                <h1>Orden No.{index+1}</h1>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>User</th>
                            <th>Rol</th>
                            <th>Status</th>
                            <th>Create</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{x.email}</td>
                            <td>{x.role}</td>
                            <td>{x.orders[0].status}</td>
                            <td>{x.orders[0].createdAt}</td>
                            </tr>
                        </tbody>
                        </Table>
                    </div>
                )
                })}
                    
               </div>

            </div>   
            
            
            }

        </div>
    )
}


function mapStateToProps(state) {
	return {
		userSelectedP: state.userSelected
	};
}

function mapDispatchToProps(dispatch) {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetaul);
