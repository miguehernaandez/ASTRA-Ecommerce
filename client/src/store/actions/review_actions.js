import axios from "axios";

import{
    ADD_REVIEW, 
    UPDATE_REVIEW, 
    DELETE_REVIEW,
    ERROR_MESSAGE
} from '../constants/constans';

const url = "localhost:3001";

export function addReview(review, productId){
    return async (dispatch)=>{
        await axios.post(`http://${url}/product/${productId}/review`, review)
        .then(res => {
            if(res.status === 200) {
                return dispatch({
                    type: ADD_REVIEW,
                    products: res.data.data
                })
            }
            else{
                return dispatch({
                    type: ERROR_MESSAGE,
                    message:"error al agregar review"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
           
               



    }
}