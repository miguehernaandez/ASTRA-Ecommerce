import React from 'react';
import s from '../../styles/review.module.css';
import {Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Review = ({handlerRate})=>{
    return (
        <div className={s.container}>
             <form name='rate' className={s.rating} >
                    <input id="rate-1" name='rate'type="radio" value='5' onChange={handlerRate}></input>
                   <label for="rate-1" name='rate'></label>
                   <input id="rate-2" name='rate' type="radio" value='4' onChange={handlerRate}></input>
                   <label for="rate-2" name='rate'></label>
                   <input id="rate-3" name='rate' type="radio" value='3' onChange={handlerRate}></input>
                   <label for="rate-3" name='rate'></label>
                   <input id="rate-4" name='rate' type="radio" value='2' onChange={handlerRate}></input>
                   <label for="rate-4" name='rate'></label>
                   <input id="rate-5" name='rate' type="radio" value='1' onChange={handlerRate}></input>
                   <label for="rate-5" name='rate'></label>
             </form>
               
        </div>
    )
           
   
}

export default Review