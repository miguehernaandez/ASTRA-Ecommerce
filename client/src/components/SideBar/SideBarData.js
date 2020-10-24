import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

import {
    getCategories,
    AddCategorie,
    updCategory,
    deleteCategory
} from '../../store/actions/category_actions';

 
export  const SideBarData = [
    {
        title:sbd.name,
        path:'/',
        icon:<AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title:'Audio',
        path:'/',
        icon:<MdIcons.MdAudiotrack/>,
        cName:'nav-text'
    },
    {
        title:'Video',
        path:'/',
        icon:<AiIcons.AiFillVideoCamera/>,
        cName:'nav-text'
    }
]

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);