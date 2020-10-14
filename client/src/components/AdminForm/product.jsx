import React from 'react';
import { Table, Button } from 'react-bootstrap';
import AddProduct from '../Modals/AddProduct';
import AddCategories from '../Modals/AddCategories';
import AddProductCategories from '../Modals/AddProductCategories';
import UpdateProduct from '../Modals/UpdateProduct';
import s from '../../styles/adminProduct.module.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faPencilAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import {
    getCategories,
    getProducts,
    addProduct
} from '../../store/actions/actions'

const url = 'localhost:3001';

const Product = ({productsP, getCategoryP, getProductP, categoriesP, addProductP})=> {
    
    /*********************** Local States ************************* */
    const [data, setData] = useState(productsP);
    const [dataObject, setDataObject] = useState({});
    const [cat, setCat] = useState(categoriesP);
    const [productCat, setProdutCat] = useState([]);
    const [form, setForm] = useState({
        name : "",
        description : "",
        price : "",
        stock : "",
        category : [],
        dimentions: "",
        image: "",
    })
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [editCategories, setEditCategories] = useState(false);


    /*********************** Functions **************************** */
    const openModal = ()=> { setShow(true)  }
    const closeModal = ()=> { setShow(false)  }
    const closeModalUpdate = ()=> { setShowUpdate(false) }
    const handlerChange = (e) => {  setForm({ ...form, [e.target.name]: e.target.value})  }
    const updateProductModal = (product)=> {
        console.log(product)
        let cont = 0;
        let list = data
        console.log(list)
        list.map((dat)=>{
            if(dat.id === product.id) { 
                list[cont].id = product.id
                list[cont].name = product.name
                list[cont].description = product.description
                list[cont].price = product.price
                list[cont].stock = product.stock
                list[cont].category = product.category
            }
            cont++
        })
        setShowUpdate(true)
        setForm(product)
        setData(list)
    }



    const handlerProductCat = (e) => {
        if (e.target.checked){
            if (!productCat.includes(e.target.value)){
                setProdutCat([...productCat, e.target.value]);
            }
        }
        else {
            let catIndex = productCat.indexOf(e.target.value);
            productCat.splice(catIndex,1)
            setProdutCat(productCat);
        }
        console.log(productCat);
        return;
    }

   

    const insertProduct = async () => {
        //addProductP(form, productCat, categoriesP)
        form.sku = Math.random();
        form.category = productCat; 
        await axios.post(`http://${url}/products`, form)
            .then(res => {
                setProdutCat([]);
                let productCategoriesId = [];
                let productId = res.data.data.id;
                form.category.forEach(selectedCat => {
                    productCategoriesId.push(categoriesP.filter(elem => elem.name === selectedCat)[0].id);
                })
                
                productCategoriesId.forEach(catId => {
                    axios.put(`http://${url}/products/${productId}/category/${catId}`)
                        .then(()=>{
                            getProductP();
                            setShow(false);
                            setProdutCat([]);
                        })
                })
            })
    }

    const addProductCat = async (dat) => {
        setProdutCat([]);
        let productId = dat.id;
        let catIds = [];
        productCat.forEach(selectedCat => {
            catIds.push(categoriesP.filter(elem => elem.name === selectedCat)[0].id);
        })
        catIds.forEach(catId => {
            axios.put(`http://${url}/products/${productId}/category/${catId}`)
            .then(()=>{
                getProductP();
                setEditCategories(false);
                setProdutCat([]);
                setDataObject({});
            })
        })
    }

    const deleteProductCat = (productId, catId) => {
        axios.delete(`http://${url}/products/${productId}/category/${catId}`)
            .then(()=>{
                getProductP();
            })
    }

    const updateProduct = (dat)=>{
        //console.log(dat)
        console.log(dat)
        axios.put(`http://${url}/products/${dat.id}`, dat)
            .then(dat => {
                setShowUpdate(false);
                getProductP();
            })
    }

    const deleteProduct = (id)=>{
        if(window.confirm('Are you sure remove this product?')){
            axios.delete(`http://${url}/products/${id}`)
                .then(dat => {
                    getProductP()
                })
        }
    }

    /*********************** Component Life Cycle *************************** */
    useEffect(()=> {
        getCategoryP();
        getProductP()
    }, [])

    /****************************** Render ********************************** */
    return (
        <div>
        <div>
            {/* <Menu/> */}
            <div className= {s.table_prin}>
            <Table  striped bordered hover size="sm">
                    <thead className={s.tableTitle}>
                        <tr>
                        <th>Name</th>
                        <th className={s.tibleThDescrip}>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Dimentions</th>
                        <th>Category</th>
                        <th className={s.tableActions} >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsP.map((dat,index) => {
                            return (
                                (dat.categories.length < 1)?
                                <tr className={s.tableDescrip} key={index}>
        
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.dimentions}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faPlusCircle} size={'1x'} className={s.iconAdd} onClick={()=> {
                                            setEditCategories(true);
                                            setDataObject(dat);
                                        }} />
                                    </td>
                                    <td className={s.icons}>
                                    <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> updateProductModal(dat)} />
                                    <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => deleteProduct(dat.id)} />                                  
                                        {/* <Button className={s.buttonDelete} onClick={() => deleteProduct(dat.id)}>Delete</Button>{"  "}
                                        <Button className={s.buttonUp} onClick={()=> updateProductModal(dat)}>Update</Button> */}
                                    </td>
                                </tr>
                                :
                                <tr className={s.tableDescrip} key={index}>
            
                                    <td>{dat.name}</td>
                                    <td>{dat.description}</td>
                                    <td>{dat.price}</td>
                                    <td>{dat.stock}</td>
                                    <td>{dat.dimentions}</td>
                                    <td>{dat.categories.map(category => {   
                                            let productId = dat.id;
                                            let catId = category.id;
                                            return <h6 className={s.tableDescrip}>{category.name} <span onClick={() => deleteProductCat(productId, catId)} className={s.spanDelete}>x</span></h6>
                                        })}
                                        <FontAwesomeIcon icon={faPlusCircle} size={'1x'} className={s.iconAdd} onClick={()=> {
                                            setEditCategories(true);
                                            setDataObject(dat);
                                        }} />
                                    </td>
                                    <td className={s.icons}>
                                        <FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} onClick={()=> updateProductModal(dat)} />
                                        <FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} onClick={() => deleteProduct(dat.id)} />                                   
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
            </Table>
            <Button className={s.buttonADD} onClick={openModal}>Add Product</Button>
            </div>
        </div>
        {/**************************** ADD PRODUCT MODAL ******************************** */}
        <AddProduct 
            data={data}
            show={show}
            closeModal={closeModal}
            handlerChange={handlerChange}
            insertProduct={insertProduct}
            setShowCategories={setShowCategories}
            productCat={productCat}
            
        />

        {/*********************** ADD PRODUCT CATEGORIES MODAL ************************** */}
        <AddProductCategories 
            cat={categoriesP}
            showCategories={showCategories}
            handlerProductCat={handlerProductCat}
            setShowCategories={setShowCategories}
        />

        {/************************** UPDATE PRODUCT MODAL ******************************** */}
        <UpdateProduct 
            form={form}
            showUpdate={showUpdate}
            closeModalUpdate={closeModalUpdate}
            handlerChange={handlerChange}
            updateProduct={updateProduct}
            setShowCategories={setShowCategories}
        />

        {/************************** EDIT CATEGORIES MODAL ******************************* */}
        <AddCategories 
            cat={categoriesP}
            dat={dataObject}
            editCategories={editCategories}
            handlerProductCat={handlerProductCat}
            setEditCategories={setEditCategories}
            addProductCat={addProductCat}
        />
    </div>
    )
}



function mapStateToProps(state){
    return {
        productsP: state.products,
        categoriesP: state.categories
    }
}

function mapDispatchToProps(dispatch){
    return {
        getCategoryP: () =>  dispatch(getCategories()),
        getProductP: () => dispatch(getProducts()),
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)