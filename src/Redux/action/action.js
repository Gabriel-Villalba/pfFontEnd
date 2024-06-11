import axios from "axios";
import {
  GET_ALL_PRODUCTS_url,
  GET_PRODUCT_url,
  CREATE_PRODUCT_url,
  //UPDATE_PRODUCT_url,
  //DELETE_PRODUCT_url,
  GET_CATEGORIAS_url,
  
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
  return {
    type: "GET_PRODUCT_BY_NAME",
    payload: name,
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
 export const updateProducts = () => {
  return {
        type: "UPDATEPRODUCT",
        //payload,
  }
  
};
 
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


