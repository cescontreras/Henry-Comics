import React, {useState} from "react";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {FormGroup, Form, Button, Label, Input, UncontrolledAlert} from 'reactstrap';
import {useHistory} from 'react-router-dom'

export default function UserForm() {
  const {register, errors, handleSubmit} = useForm();
  const history = useHistory()
  const [usuarioCreado, setUsuarioCreado]  = useState(false);
  const [visible, setVisible] = useState(false);

  
  const handleRegister = async (data) => {
    try {
    await axios.post('http://localhost:3001/user/add', data, { withCredentials: true });
    setUsuarioCreado(true);
    setVisible(true)
    } catch (error) {
    console.log(error)
    setUsuarioCreado(false);
    setVisible(true)
    }
  };

  // const onEnterKey = e => {
  //   if (e.key === 'Enter') handleRegister(e);
  // };
  // const handleSubmit =  e => {
  //   e.preventDefault();
  //   handleRegister();
  //   setUserData ({
  //     email:'',
  //     password:''
  //   })
  // }
  
  const onSubmit = (data, e) =>{
    console.log(data)
    handleRegister(data);
    e.target.reset();
    history.push('/login')
  }

  const onDismiss = () => setVisible(false);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="col-sm-6 order-sm-2 offset-sm-1 mt-5">
      {/* <label>
        Email:
        <input type="email" name="email" value={userData && userData.email} placeholder="Email" onChange={handleInputChange} onKeyPress={onEnterKey}/>
      </label>
      <label>
      Contraseña:
      <input type="password" name="password"  value={userData && userData.password} placeholder="Contraseña" onChange={handleInputChange} onKeyPress={onEnterKey}/>
      </label>
      <button type="submit">Registrer</button> */}
      <h4>Completa con tus datos para crear tu cuenta</h4>
      <h6>¡Disfruta de los beneficios exclusivos de la comunidad Henry Comic!</h6>
      <FormGroup>
        <Label>Nombre de Usuario</Label>
        <input 
         placeholder="Nombre de usuario"
         name="username"
         className="form-control col-4"
         ref={register({
          required:{
            value:true,
            message:"Campo requerido"}
         })}
        />
        
        <Label>Email</Label>
        <input 
          placeholder="ejemplo@email.com"
          name="email"
          className="form-control col-4"
          ref={register({
            required:"Email es requerido.",
            pattern:{
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Por favor ingresar email ejemplo@email.com'
            }
          })}
        />
        <span className="text-danger text-small d-block mb-2">
          {errors?.email?.message}
        </span>
      </FormGroup>
      <FormGroup>
        <Label>Contraseña</Label>
        <input 
          placeholder="Contraseña"
          name="password"
          type='password'
          className="form-control col-4"
          ref={register({
            required:{
              value:true,
              message:'Contraseña es requerida.'
            }
          })}
        />
        <span className="text-danger text-small d-block mb-2">
          {errors?.password?.message}
        </span>
      </FormGroup>
      
      <button type="submit" className="btn btn-primary">Crear cuenta</button>
      {usuarioCreado ? 
        <UncontrolledAlert className= 'alert col-4' color="success" isOpen={visible} toggle={onDismiss} >
        ¡Operacion exitosa!
        </UncontrolledAlert> :
        <UncontrolledAlert className= 'alert col-4' color="danger" isOpen={visible} toggle={onDismiss} >
        Error !! Cuenta Existente
        </UncontrolledAlert>
      }      
    </Form>
  )
}