import React, { Component, useState } from 'react';
import axios from 'axios';
import { Form, ListGroup, Card, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from '../../styles/filter.module.css';

export default function Filter(props){
   return (
        <div className={`${s.filtro}`}>
            {/* <Form onChange={props.handlerSelect}>
            {props.categories.map(x => {
                return (
               <a className={s.stl}>
                    {x.name}
                </a>
                )
            })}
            </Form> */}
            <div id={s.viewport}>
                <div id={s.sidebar}>
                    <header>
                    <a href="#">Resultados ({props.products.length})</a>
                    </header>
                    <ul className={s.nav}>
                        {props.categories.map(x => {
                            return (
                                <li>
                                <Card style={{ width: '18rem' }}  className={s.button}>
                                <ListGroup variant="flush">
                                    <button><ListGroup.Item>{x.name}</ListGroup.Item></button>
                                </ListGroup>
                                </Card>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                </div>
    )
}

