export default function validateInfo(values){
  let errors = {}


//name
if(!values.userName.trim()){
  errors.userName = "Nombre de Usuario requerido"
}

//userMail
if(!values.userMail) {
  errors.userMail = "Email requerido"
}else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.userMail)){
    errors.userMail = "Email ingresado es invalido"

}

if(!values.userPassword){
  errors.userPassword = 'Contraseña es requerida'
} else if(values.userPassword.length < 8){
  errors.userPassword = "Contraseña debe tener 8 o mas caracteres"
}

if(!values.userPasswordConfirm){
  errors.userPasswordConfirm = 'Contraseña es requerida'
} else if(values.userPasswordConfirm !== values.userPassword){
  errors.userPasswordConfirm = "Las contraseña no son iguales"
}

return errors;






}
