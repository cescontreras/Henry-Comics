import React, {useState, useEffect} from 'react';
import { UncontrolledCollapse, Button, CardBody, Card, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import './carrito.css';
import axios from 'axios';
import CartProduct from './CartProduct';

export default function Carrito(){

    const [carrito, setCarrito] = useState([]);

    const carritoGet = async () =>{
        try{
          const {data} =  await axios.get(`http://localHost:3001/user/${1}/cart`)
          setCarrito(data.products)
        }catch(err){

        }
    }

    const carritoDelete = async (id) =>{
        try{
            await axios.delete(`http://localHost:3001/user/${1}/cart/${id}`,)
            carritoGet();
          }catch(err){
  
          }
    }

    useEffect(() => {
        carritoGet();
    }, [])

   

    const totalProduct = () =>{
        let nuevo;
        if(carrito !== []){
            nuevo =  carrito.map(cart => cart.price * cart.lineaDeOrden.quantity);
        }

        let total = nuevo.reduce((a, b) => a + b, 0);
        
        return `$${total}`
    }


    return(
        <div className='cart'>
            
            <Button color='dark' id='toggler' style={{marginBottom: '1rem'}}>
                <FontAwesomeIcon icon={faShoppingCart}/>
            </Button>
            <UncontrolledCollapse toggler='#toggler'>
                <Card>
                    <CardBody>
                        <h3 className='title-carrito'>Carrito</h3>
                        <div>
                            <ul className='list-carrito'>
                                <label>Producto: </label>
                                {carrito && carrito.map(cart=>(
                                    <div>

                                            <CartProduct 
                                                name={cart.name}
                                                quantity={cart.lineaDeOrden.quantity}
                                                id={cart.id}
                                                price={cart.price}
                                                carritoDelete={carritoDelete}
                                                carritoGet={carritoGet}
                                            />
                                    </div>  
                                ))}
                            </ul>
                        </div>
                        <div className='total'>
                                <label>Total: {totalProduct()}</label>
                        </div>
                        <div className='buttons'>
                            <Button color='dark'>Comprar</Button>
                            <Button color='danger'>Cancelar</Button>
                        </div>
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    );
};
