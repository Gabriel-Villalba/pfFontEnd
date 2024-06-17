import axios from "axios";
import {
  GET_ALL_PRODUCTS_url,
  GET_PRODUCT_url,
  GET_PRODUCT_NAME_url,
  CREATE_PRODUCT_url,
  //UPDATE_PRODUCT_url,
  //DELETE_PRODUCT_url,
  GET_CATEGORIAS_url,
  POST_LOGIN_url,
  //POST_NEWUSER_url,
  POST_CREATE_CART_url,
  GET_USER_url

  
} from "../URLs/URLs.js";
//*************OBTENER TODOS LOS PRODUCTOS****** */
export function getAllProducts() {
  return function (dispatch) {
    axios.get(GET_ALL_PRODUCTS_url).then((products) =>
      dispatch({
        type: "GET_PRODUCTS",
        payload: products.data,
      })
    );
  };
}

//**********OBTENER PRODUCTOS POR SU NOMBRE ***** */
export function getProductsByName(name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${GET_PRODUCT_NAME_url}${name}`);
        dispatch({
            type: "GET_PRODUCT_BY_NAME",
            payload: response.data,
        });
    } catch (error) {
        console.error("Error al obtener el Producto:", error.message);
    }
  };
}
//******obtener producto por id para el details***** */

export function getProductsById(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${GET_PRODUCT_url}${id}`);
        dispatch({
            type: "GET_PRODUCT_BY_ID",
            payload: response.data,
        });
    } catch (error) {
        console.error("Error al obtener el Producto:", error.message);
    }
  };
}

//*******CREATE PRODUCTS***************** */
export function postProduct(payload) {
  //console.log("pasa por aca", payload);
  return async function () {
    try {
      await axios.post(CREATE_PRODUCT_url, {
        ...payload,
      });
      alert("Succefully created");
    } catch (error) {
      alert(
        "¡Ya existe o hubo algún problema durante la creación! Vuelve mas tarde"
      );
    }
  };
}
//************DELETE PRODUCTO ***************/ 
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`DELETE_PRODUCT_url${id}`);
      dispatch({ type: "DELETE_PRODUCTS" });
    } catch (error) {
      console.error("ACTIONS ERROR");
    }
  };
};
 //********ACTUALIZAR PRODUCTO ***** */
//  export const updateProducts = (id) => {
//   return {
//         type: "UPDATEPRODUCT",
//         //payload,
//   }
  
// };
 
//********CARGAMOS LAS CATEGORIAS EXISTENTES******** */
export function getCategories() {
  return async function (dispatch) {
    try {
      const categories = await axios.get(GET_CATEGORIAS_url);
      dispatch({
        type: "SET_CATEGORIES",
        payload: categories.data,
      });
    } catch (error) {
      console.error(error.message);
      //console.error(error.respon); // Estado de la respuesta
     // console.error(error.response.headers); // Encabezados de la respuesta
      console.error("Error al obtener los tipos:", error.message);
    }
  };
}
//***********FILTRO POR CATEGORIAS ****** */
export function filterByCategories(payload) {
  // console.log(payload);
  return {
    type: "BY_CATEGORIES",
    payload,
  };
}
//***********ORDEAMIENTO POR PRECIO********** */
export function orderByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload,
  };
}
 //******ACTUALIZA DATOS DEL FORMULARIO//// */
 export const actualizarDatosFormulario = (payload) => {//*cambie formData por payload
  return {
    type: "ACTUALIZARDATOSFORMULARIO",
    payload: payload
  };
};


export const actualizarDatosValidaciones = (payload) => { //* cambie payload por payload
  return {
    type: "ACTUALIZARDATOSVALIDACIONES",
    payload: payload
  };
};

//***********AUTENTICAR DATOS DE USUARIO********** */

export const login =(Email, Nombre) =>{ //*verificamos si el usuario existe en la db y si tiene carrito
  
  return async function (dispatch) {
    try {
     
      const user = await axios.post(POST_LOGIN_url, {Nombre, Email });
      //console.log(user.data.cartId)
      if(user.data.hasCart===false){
        const newCart= await axios.post(POST_CREATE_CART_url, {UserId:user.data.id});
       
      console.log("carrito creado 😊",newCart.data.id) 
      }
      const newCart = user.data.cartId ||  newCart.data.id
      const id = user.data.id
     // console.log(id)
      dispatch({
        type: "LOGIN",
        payload: [id,newCart]
      });
    } catch (error) {
      console.error("Error al obtener los tipos:", error.message);
    }
  };
}

//**************GET USUARIO****************************** */

export function getUser(Email) {
  return async function (dispatch) {
    try {
      const user = await axios.get(GET_USER_url,{Email});
      dispatch({
        type: "GET_USER",
        payload: user.data
      });
    } catch (error) {
      console.error(error.message);  
      console.error("Error al obtener user:", error.message);
    }
  };
}


