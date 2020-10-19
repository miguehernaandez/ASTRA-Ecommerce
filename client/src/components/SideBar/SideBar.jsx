import React,{useState} from 'react';
import { Link } from 'react-router-dom'
import * as faIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {SideBarData} from './SideBarData.js';
import './SideBar.css';
export default function SideBar() {
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
                    SideBarData.map((item,index)=>{
                        return(
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>

                                </Link>
                                
                            </li>
                        );
                    })
                }


            </ul>
        </nav>
        </>
    )
}
