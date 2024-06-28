import axios from "axios";
import {
  GET_ALL_PRODUCTS_url,
  GET_PRODUCT_url,
  GET_PRODUCT_NAME_url,
  CREATE_PRODUCT_url,
  //UPDATE_PRODUCT_url,
  DELETE_PRODUCT_url,
  GET_CATEGORIAS_url,
  CREATE_CATEGORIA_url,
  DELETE_CATEGORIA_url,
  POST_LOGIN_url,
  //POST_NEWUSER_url,
  POST_CREATE_CART_url,
  GET_USER_url,
  GET_PRODUCT_INTO_CART_url,
  POST_ADD_PRODUCT_TO_CART_url,
  DELETE_ONE_PRODUCT_INTO_CART_url

  
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
  console.log("llega hasta aca")
  return async (dispatch) => {
    try {
      await axios.delete(`${DELETE_PRODUCT_url}/${id}`);
     // console.log(prueba)
      dispatch(getAllProducts());
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
    
      console.error("Error al obtener los tipos:", error.message);
    }
  };
}
//************ crear y borrar categorias ***************/ 

export function postCategory(payload) {
  return async function () {
    try {
      await axios.post(CREATE_CATEGORIA_url, { ...payload });
      alert("Categoría creada con éxito");
    } catch (error) {
      alert("¡Ya existe o hubo algún problema durante la creación! Vuelve más tarde");
    }
  };
}


export const deleteCategory = (id) => {
  console.log(id)
  return async (dispatch) => {
    try {
      await axios.delete(`${DELETE_CATEGORIA_url}${id}`);
      dispatch(getCategories());
    } catch (error) {
      console.error("Error al eliminar la categoría:", error.message);
    }
  };
};
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
      const user = await axios.post(POST_LOGIN_url, { Nombre, Email });
      //console.log(user.data)
     if(user.data.userAdmin === true){
        console.log("Llego el administrador")
        dispatch({type : "LOGIN_ADMIN", payload: user.data.userAdmin})//* si es admin, solo despachamos admin "true"
     }else {
      if (user.data.hasCart === false) {//*no tiene carrito
        const newCart = await axios.post(POST_CREATE_CART_url, {
          UserId: user.data.id,
        });
        console.log("carrito creado 😊", newCart.data.id);
      }
     
           //*traemos los productos que tiene este usuarioen su carrito
          
      const newCart = user.data.cartId || newCart.data.id;
      const idCart = newCart
      const agregar = await axios.get(`${GET_PRODUCT_INTO_CART_url}${idCart}`); 
      const id = user.data.id;
      dispatch({
        type: "LOGIN",
        payload: [id, newCart, agregar.data],
      });
     }    
    } catch (error) {
      console.error("Error ", error.message);
    }
  };
}
//***************obtener todo el carrito************************* */
export function getProductIntoCart(idCart) {
  return async function (dispatch) {
    const agregar = await axios.get(`${GET_PRODUCT_INTO_CART_url}${idCart}`);
    dispatch({
      type: "GET_PRODUCT=INTO=CART",
      payload: agregar.data,
      });
  }
}

//****************AGREGAR AL CARRITO************************** */
export function agregarAlCarrito(id_products,quantity, idCart ) {
  return async function (dispatch) {
    try {
     const pepe = await axios.post(POST_ADD_PRODUCT_TO_CART_url, {
        id_products, quantity, idCart
        });
       if(pepe.data.message){
        alert(pepe.data.message);
       }else{
        alert("El producto se agrego con exito al carrito");
        const agregar = await axios.get(`${GET_PRODUCT_INTO_CART_url}${idCart}`);
        dispatch({
          type: "DELETE_PRODUCTS",
          payload: agregar.data,
          });
       }
      
    } catch (error) {
      console.error("Error al agregar al carrito:", error.message);
      }
      };
}
//**********************BORRAR UN PRODUCTO DEL CARRITO********************************* */
export function borrarProductoDelCarrito(id, idCart) {
  return async function (dispatch) {
    try {
      await axios.delete(`${DELETE_ONE_PRODUCT_INTO_CART_url}${id}`);
     // console.log("Aca esta el error")
      const eliminar = await axios.get(`${GET_PRODUCT_INTO_CART_url}${idCart}`);
      //console.log(eliminar)
      dispatch({
        type: "DELETE_ONE_PRODUCTS",
        payload: eliminar.data,
        });
        } catch (error) {
          console.error("Error al eliminar del carrito:", error.message);
        }
      };
}

////////////////////////////

export const addToCart = (item) => (dispatch, getState) => {
  const state = getState();
  const product = state.allProducts.find(p => p.id === item.id);
  if (!product) {
      console.error("Product not found");
      return;
  }
  const cartItem = {
      ...item,
      product: {
          ...product,
          Precio: parseFloat(product.Precio) || 0  
      },
      quantity: item.quantity || 1
  };
  dispatch({
      type: "ADD_TO_CART",
      payload: cartItem
  });
};

export const updateCartQuantity = (productId, quantity) => {
  return {
      type: "UPDATE_CART_QUANTITY",
      payload: { productId, quantity }
  };
};

// Acción para eliminar un producto del carrito
export const removeFromCart = (productId) => {
  return {
      type: "REMOVE_FROM_CART",
      payload: { productId }
  };
};
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


