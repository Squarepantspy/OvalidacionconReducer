import React, {useReducer} from 'react'

const FormVal = () => {

    const initialState = {
        firstName: {
            value: '',
            error : null
        },
        lastName : {
            value: '',
            error: null
        },
        email: {
            value: '',
            error: null
        }
    };
    const reducer = (state,action)=>{
        return {...state, [action.type] : {value: action.payload, error:action.validez} }
    }
    const [state,dispatch]= useReducer(reducer,initialState); // funcion use reducer
    

    const crearuser =(e)=>{
        e.preventDefault();// prevenir el comportamiento por defecto al momento del submit
        console.log("Bienvenido")
    }
    const sololetras=(campo)=>{
        let letters = /^[A-Za-z]+$/;
        if(campo.match(letters)){
            
            return false;
        }else{
            if (campo.length===0){
                return null} 
            else{
            return true;}
        }
    }
    const soloemail=(campo)=>{
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(campo.match(mailformat)){
            return false;
        }else{
            if (campo.length===0){
                return null} 
            else{
            return true;}
        }
    }
    const validacion= (tipo,valor)=>{
        switch(tipo){
            case "firstName" :
                {
                    return sololetras(valor);
                }
            case "lastName" :
                {
                    return sololetras(valor);
                }
            case "email" :
                {
                    return soloemail(valor)
                }
            default :
            return null;
        }
    }
    const handleChange =(e)=>{
        const {name : nombreprop, value : valueprop} = e.target;
        let val = validacion(nombreprop,valueprop);
        dispatch({type: nombreprop, //llama a la accion y pasa los valores para el siguiente estado
        payload: valueprop,
        validez : val})
    }

  return (
    <form className='container w-50' onSubmit={crearuser}>
        <label className='form-label'>Nombre</label>
        <input type="text" className='form-control' onChange={handleChange} name="firstName" value={state.firstName.value}/>
        {state.firstName.error !== null && (
        <p className="error">{state.firstName.error ? "Hay un error solo se permiten letras y un nombre" : <span>"No existe error"</span>}</p>
        )}
        <label className='form-label'>Apellido</label>
        <input type="text" className='form-control' onChange={handleChange} name="lastName" value={state.lastName.value}/>
        {state.lastName.error !== null && (
            <p className="error">{state.lastName.error ? "Hay un error solo se permiten letras y un apellido" : <span>"No existe error"</span>}</p>
        )}
        <label className='form-label'>Email</label>
        <input type="email" className='form-control' onChange={handleChange} name="email" value={state.email.value}/>
        {state.email.error !== null && (
            <p className="error">{state.email.error ? "Hay un error no es una sintaxis de mail valida" : <span>"No existe error"</span>}</p>
        )}
    </form>
  )
}

export default FormVal