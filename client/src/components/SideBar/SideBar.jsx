import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import * as faIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { connect } from 'react-redux'
import './SideBar.css';
import {getCategories,getProductByCategory} from '../../store/actions/category_actions'
import { IoIcon } from 'react-icons/io';
import * as bsIcon from "react-icons/bi";

function SideBar({categories,getCategoryP,getProductByCategoryP}) {
    const [sidebar,setSideBar] = useState(false)
    
    const showSideBar= ()=>setSideBar(!sidebar)
    return (
        <>
        <div className='navbar'>
            <Link to="#" className='menu-bars'>
                <faIcons.FaBars onClick={showSideBar}>
                    {console.log("se hizo click "+sidebar )}
                    <h1>Categorias.</h1>
                </faIcons.FaBars>
            </Link>
            
        </div>
        <nav className={ sidebar ? 'nav-menu active':'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toogle'>
                    <Link to ="#" className='menu-bars'>
                        <AiIcons.AiOutlineClose/>
                    </Link>
                </li>
                {
                    categories.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName} onClick={()=>getProductByCategoryP(item.name)}>
                                <bsIcon.BiCart/>
                                <span><h4>{item.name}</h4></span>
                                                               
                                
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
