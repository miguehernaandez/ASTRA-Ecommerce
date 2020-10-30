import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Form, ListGroup, Card, Button, ButtonGroup, Row, Container } from 'react-bootstrap';
import { getCategories, getProductByCategory } from '../../store/actions/category_actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from '../../styles/filter.module.css';


function Filter({ categories, getProductByCategoryP, products}){
   return (
           <Row className={`${s.row} `}>  {/* my-5 */}
            <div id={s.viewport} className={`${s.filtro}`}>
                <div id={s.sidebar}>
                    <header>
                      <label className={`${s.border}`}href="#">Resultados ({products.length})</label>
                    </header>
                    <ListGroup className={`${s.content} p-0 m-0  ${s.center} d-flex flex-row justify-content-center`}>
                    <ul className={`p-0 m-0`}>
                        <li className={`${s.bR} mb-3`}>
                        <a href='/products/catalogo' className={`${s.bR} d-flex flex-row justify-content-center`}><ListGroup.Item id={s.button} className={`${s.itemList}`}>Mostrar todos</ListGroup.Item></a>
                        </li>
                        {categories.map(x => {
                            return (
                                <li key={x.id} className={`${x.cName} ${s.bR} d-flex flex-row justify-content-center mb-1`} onClick={() => getProductByCategoryP(x.name)}>
                                    <ListGroup.Item id={s.button} className={s.itemList}>{x.name}</ListGroup.Item>
                                </li>
                            )
                        })}
                    </ul>
                    </ListGroup>
                </div>
            </div>
            </Row>
    )
}

function mapStateToProps(state) {
	return {
        categories: state.categories,
        products: state.products
	};
}
function mapDispatchToProps(dispatch) {
	return {
		getCategoryP: () => dispatch(getCategories()),
		getProductByCategoryP: (name) => dispatch(getProductByCategory(name)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
