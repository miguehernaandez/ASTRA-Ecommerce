import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import * as faIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";


import { connect } from 'react-redux'
import s from '../../styles/SideBar.module.css';
import {getCategories,getProductByCategory} from '../../store/actions/category_actions'
import { IoIcon } from 'react-icons/io';
import * as bsIcon from "react-icons/bi";

function SideBar({categories,getCategoryP,getProductByCategoryP}) {
    const [sidebar,setSideBar] = useState(false)
    
    const showSideBar= ()=>setSideBar(!sidebar)
    
    return (
        <>
        <div className={s.navbar}>
            <Link to="#" className= {s.menuBars} >
                <faIcons.FaBars onClick={showSideBar}>
                    {console.log("se hizo click "+sidebar )}
                    <h1>Categorias.</h1>
                </faIcons.FaBars>
            </Link>
            
        </div>
        <nav className={ sidebar ? `${s.navMenu} ${s.active}`:`${s.navMenu}`}>
            <ul className={s.navMenuItems}>
                <li className={s.navbarToogle}>
                    <Link to ="#" className={s.menuBars} >
                        <AiIcons.AiOutlineClose onClick={showSideBar}/>
                        
                    </Link>
                </li>
                <li>
                    <bsIcon.BiCart/>
                    <div className={s.menuCont}>
                    <h4 ><a id='links' href="/products/catalogo" >Mostrar todos</a></h4>
                    </div>
                    
                </li>
                {
                    categories.map((item,index)=>{
                        return(
                            <li key={index}  onClick={()=>getProductByCategoryP(item.name)}>
                                <bsIcon.BiCart/>
                                <div className={s.menuCont}>
                                     <span><h4 onClick={showSideBar}>{item.name}</h4></span>
                                </div>                           
                           </li>
                        );
                    })
                }



            </ul>
        </nav>
        </>
    )
}
function mapStateToProps(state){
    return {
        categories: state.categories,

    }
}
function mapDispatchToProps(dispatch){
    return {
        getCategoryP: () =>  dispatch(getCategories()),
        getProductByCategoryP:(name)=>dispatch(getProductByCategory(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
