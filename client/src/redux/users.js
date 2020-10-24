import axios from 'axios'
import { localToUser } from './carrito';

//CONSTANTES


const GET_LOGIN = 'GET_LOGIN';
const GET_USERS = 'GET_USERS';
const VERIFY = 'VERIFY'
const LOGOUT = 'LOGOUT'

 //STATE

const initialState = {
    user: "",
    users: [],
    userLogin:{
        id:null,
        login: false
    }
}

 // REDUCER

export default function userReducer(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state, 
                users: action.payload,
            }
        case GET_LOGIN:
            return{
                ...state,
                userLogin:{
                    id: action.payload.id,
                    name: action.payload.firstname,
                    username: action.payload.username,
                    email: action.payload.email,
                    isAdmin: action.payload.isAdmin,
                    login: true
                }
            }
        case VERIFY:
            return{
                ...state,
                userLogin:{
                    id: action.payload.id,
                    name: action.payload.firstname,
                    username: action.payload.username,
                    email: action.payload.email,
                    isAdmin: action.payload.isAdmin,
                    login: true
                }
            }
        case LOGOUT:
            return {
                ...state,
                userLogin:{
                    id:null,
                    login: false
                }
            }
        default:
            return{
                ...state
            }
    }
}

// ACTIONS

export const getUsers = (id) => async(dispatch) => {
    try{
    const {data} = await axios.get(`http://localhost:3001/users/${id}`, { withCredentials: true })
        dispatch({ 
            type: GET_USERS, 
            payload: data
    })
    }catch(error){
        console.log(error)
    }
    ;
};

// Buscara solo un usuario el logueado
export let id;

export const getLogin = (body) => async(dispatch) => {
    console.log('login', body)
    try{
    const {data} = await axios.post('http://localhost:3001/user/login', body, { withCredentials: true })
    id = data.user.id
        
      dispatch({ 
            type: GET_LOGIN, 
            payload: data.user
    },
        window.alert(`Bienvenido ${data.user.email}`)
    )
    }catch(error){
        console.log(error)
    }
    ;
};

export const verifyLogin = () => async(dispatch) => {
    try{
        const {data} = await axios.get('http://localhost:3001/auth/me',{ withCredentials: true })
        console.log('auth/me',data)
        dispatch({
            type: VERIFY,
            payload: data
        })
    }catch(err){
        console.log(err)
    }
}

export const logOut = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    })
}

