import React from 'react';
import { Table, Button } from 'react-bootstrap';
// import AddProduct from '../Modals/AddProduct';
// import AddCategories from '../Modals/AddCategories';
// import AddProductCategories from '../Modals/AddProductCategories';
// import UpdateProduct from '../Modals/UpdateProduct';
import s from '../../styles/adminProduct.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { getUsers, deleteUser, updateUser } from '../../store/actions/userActions';

const url = 'localhost:3001';

const UsersData = ({ usersP, successP, getUsersP, deleteUserP, updateUserP }) => {
	// console.log(usersP);
	// console.log(successP);
	/*********************** Local States ************************* */
	// const [users, setUsers] = useState(usersP);

	/*********************** Functions **************************** */

	const handleDelete = function (id, email) {
		var confirmDelete = window.confirm(`Estas a punto de eliminar el usuario:\n${email}\nDeseas continuar?`);
		if (confirmDelete) {
			deleteUserP(id);
		}
	};

	const handleUpdatePassword = function (email, id, password, role) {
		console.log('Funciona el boton del lapiz PASSWORD');
		var confirmResetPassword = window.confirm(`Estas a punto de resetear la contraseña del usuario:\n${email}\nDeseas continuar?`);
		if (confirmResetPassword) {
			const data = {
				email,
				id,
				password: 'randomPassword',
				role,
			};
			console.log(data);
			updateUserP(data);
		}
	};

	const handleUpdateRole = function (email, id, password, role) {
		// Siempre le llegan los datos de la tabla, por lo que cada vez que se ejecute esta funcion deberia actualizarse la tabla
		console.log('Funciona el boton del lapiz ROLE');
		var newRole;
		if (role == 'client') {
			newRole = 'admin';
		} else {
			newRole = 'client';
		}
		var confirmRoleChange = window.confirm(`Estas a punto de cambiar los permisos del usuario:\n${email}\nDejara de ser ${role} y pasara a ser ${newRole} \nDeseas continuar?`);
		if (confirmRoleChange) {
			const data = {
				email,
				id,
				password,
				role: newRole,
			};
			console.log(data);
			updateUserP(data);
		}
	};

	/****************************** Component Life Cycle ********************************** */

	useEffect(() => {
		getUsersP();
		// deleteUsersP();
	}, []);

	/****************************** Render ********************************** */

	return (
		<div>
			<div>
				{/* <Menu/> */}
				<div className={s.table_prin}>
					<Table striped bordered hover size='sm'>
						<thead className={s.tableTitle}>
							<tr>
								<th>ID</th>
								<th>Email</th>
								<th>Password</th>
								<th>Rol</th>
								<th>Fecha de Creacion</th>
								<th className={s.tableActions}>Action</th>
							</tr>
						</thead>

						<tbody>
							{usersP.map((usuario) => {
								return usersP ? (
									<tr className={s.tableDescrip} key={usuario.id}>
										<td>{usuario.id}</td>
										<td>{usuario.email}</td>
										<td>
											{usuario.password}
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={`mx-3 ${s.iconUpdate}`} onClick={() => handleUpdatePassword(usuario.email, usuario.id, usuario.password, usuario.role)} />
										</td>
										<td>
											{usuario.role}
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={`mx-3 ${s.iconUpdate}`} onClick={() => handleUpdateRole(usuario.email, usuario.id, usuario.password, usuario.role)} />
										</td>
										<td>{usuario.createdAt}</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={`mx-3 ${s.iconDelete}`} onClick={() => handleDelete(usuario.id, usuario.email)} />
										</td>
									</tr>
								) : (
									<tr className={s.tableDescrip} key={usuario.id}>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>No hay datos</td>
										<td>
											<FontAwesomeIcon icon={faPlusCircle} size={'1x'} className={s.iconAdd} />
										</td>
										<td className={s.icons}>
											<FontAwesomeIcon icon={faPencilAlt} size={'1x'} className={s.iconUpdate} />
											<FontAwesomeIcon icon={faTrashAlt} size={'1x'} className={s.iconDelete} />
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</div>
		</div>
	);
};

function mapStateToProps(state) {
	return {
		usersP: state.users,
		successP: state.createUserSuccess,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getUsersP: () => dispatch(getUsers()),
		deleteUserP: (id) => dispatch(deleteUser(id)),
		updateUserP: (data) => dispatch(updateUser(data)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersData);
