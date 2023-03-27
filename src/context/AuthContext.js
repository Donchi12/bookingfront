import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import Loader from "../components/loader/loader";

const INITIAL_STATE = {
  user: null,
  loading: true
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    
    case "FETCHING":
      return {
        user: null,
        loading: true
      };
    case "FETCHING_ERROR":
      return {
        user: null,
        loading: false
      };
    case "GET_CURRENT_USER":
      return {
        user: action.payload,  
        loading: false
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, 
        loading: false    
      };
   
    case "LOGOUT":
      return {
        user: null,
        loading: false
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const id = localStorage.getItem("userId") || null
 


  useEffect(() => {
  const getUser = async() => {
    dispatch({type: "FETCHING"})
    try{
    const res = await axios.get(`/users/${id}`)
   
    dispatch({type: "GET_CURRENT_USER", payload: res.data.user})
    
  }catch(error){
      dispatch({type: "FETCHING_ERROR"})
    }
  }
  getUser()
   }, [id])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        dispatch,
      }}
    >
      {state.loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};
