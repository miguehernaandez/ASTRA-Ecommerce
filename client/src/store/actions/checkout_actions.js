
import axios from 'axios'
const url = 'localhost:3001';

export const CreateOrder = (cart, idUser)=>{
    return (dispatch) => {
        console.log(cart)
        cart.forEach(x => {
            axios.post(`http://${url}/orders/shopping/${idUser}`, x)
                .then(res => {
                    console.log(res.data.data)
                })
                .catch(err => {
                    console.log('No funciono crear Orden ')
                })
        });
    }
}

export const deleteOrderCart = (id, status) => {
    return (dispatch) => {
        console.log('id: ', id)
        console.log('Status: ', status)
        axios.delete(`http://${url}/orders/shopping/${id}`)
    }
}