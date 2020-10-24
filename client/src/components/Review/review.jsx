import React from 'react';
import s from '../../styles/review.module.css';
import {Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Review = ()=>{
    return (
        <div className={s.container}>
               <div className={s.rating}>
                   <input id="rating-1" name='rating'type="radio" value='1'></input>
                   <label for="rating-1" name='rating'></label>
                   <input id="rating-2" name='rating' type="radio" value='2'></input>
                   <label for="rating-2" name='rating'></label>
                   <input id="rating-3" name='rating' type="radio" value='3'></input>
                   <label for="rating-3" name='rating'></label>
                   <input id="rating-4" name='rating' type="radio" value='4'></input>
                   <label for="rating-4" name='rating'></label>
                   <input id="rating-5" name='rating' type="radio" value='5'></input>
                   <label for="rating-5" name='rating'></label>
               </div>
        </div>
    )
           
   
}

export default Review