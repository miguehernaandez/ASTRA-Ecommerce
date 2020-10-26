import React from 'react';
import {Table, Button } from 'react-bootstrap';
import AddCategory from '../Modals/AddCategory';
import UpdateCategory from '../Modals/UpdateCategory';
import axios from 'axios';
import {useState, useEffect} from 'react';
import s from '../../styles/adminCategories.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    getOrders,
    // AddCategorie,
    // updCategory,
    // deleteCategory
} from '../../store/actions/order_actions';
import {enlacesUser, enlacesUserConAdmin, enlacesUserSinAdmin, enlacesAdmin } from '../../constans/constans'
import Navegacion from '../Navegacion/Navegacion'

const url = 'localhost:3001';

const Orders = ({ orders, getOrdersP }) => {
    console.log('OBJETO ORDENES')
    console.log(orders)
    //console.log(props)
    /*********************** Local States ************************* */
    const [allOrders, setAllOrders] = useState([]);
    const [form, setForm] = useState({ name : "", description : "" });
    const [show, setShow] = useState(false);

    /*********************** Functions **************************** */
    const openModal = () => { setShow(true)  }
    const closeModal = () => { setShow(false)  }
    const handlerChange = (e) => {  setForm({ ...form, [e.target.name]:e.target.value})  }

    // const updateCategoryModal = (category)=> {
    //     let list = allOrders;
    //     list.map((dat, index)=>{
    //         if(dat.id === category.id) {
    //             list[index].name = category.name;
    //             list[index].description = category.description;
    //         }
    //     })
    //     setShowUpdate(true);
    //     setForm(category);
    //     setData(list);
    // }

    // const updateCategory = (dat)=>{
    //     console.log(dat)
    //         updCategoryP(dat);
    //         setShowUpdate(false);
    //     return;
    // }

    /*********************** Component Life Cycle *************************** */
    useEffect(()=> {
        getOrdersP();
    }, [])

    /****************************** Render ********************************** */
    return (
        <div>
          <Navegacion linksU={enlacesUserSinAdmin} linksA={enlacesAdmin} showSearchbar={false} />
            <div className={s.table_prin}>
                {/* <Menu/> */}
                <div>
                <Table striped bordered hover size="sm">
                        <thead className={s.tableTitle}>
                            <tr>
                            <th>Reference</th>
                            <th>User</th>
                            <th>Date Created</th>
                            <th>Status</th>
                            <th className={s.tableActions}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => {
                                return (
                                    <tr className={s.tableDescrip}>
                                        <td>{order.id}</td>
                                        <td>{order.user.email}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.status}</td>
                                        <td className={s.icons}>
                                            <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> {}} />
                                            <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => {}} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </Table>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        orders: state.orders,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getOrdersP: () =>  dispatch(getOrders()),
        // addCategoryP: (data) => dispatch(AddCategorie(data)),
        // updCategoryP: (data) => dispatch(updCategory(data)),
        // deleteCategoryP : (id) => dispatch(deleteCategory(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Orders);