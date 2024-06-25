
/* eslint-disable no-case-declarations */
const initialState = {
    products: [],
    allProducts: [],
    categories: [],
    getCategories: [],
    detail: {},
    formData: {
        Nombre: '',
        Descripcion: '',
        Precio: 0,
        Stock: 0,
        name: '',
        Imagen_URL: '',
        onOffer: false,
        Brand: '',
  },
  validations: {
      Nombre: '',
      Descripcion: '',
      Precio: 0,
      Stock: 0,
      name: '',
      Imagen_URL: '',
      onOffer: false,
      Brand: '',
  },
   userAdmin:"",
   users:"",
   idCarrito:"",
   cart:"",
  // productCart:[]
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {

      case "GET_PRODUCTS":
        return {
          ...state,
          allProducts: action.payload,
        };

      case "GET_PRODUCT_BY_NAME":
              // const product= state.allProducts.filter((nombre) =>
              //     nombre.Nombre?.includes(action.payload))
              return {
                ...state,
              allProducts: action.payload
        };       
        
      case "GET_PRODUCT_BY_ID":
            return {
              ...state,
              detail: action.payload,
            };
      case "POST_PRODUCTS":
          return state;
        
      case "DELETE_PRODUCTS":
         // case "AgregarAlCarrito"://ADD_PRODUCT_TO_CART
            
               //console.log(action.payload)
                 return {
                   ...state,
                  cart: action.payload ,

                 }


        //return state; 
       
      case "UPDATEPRODUCT":
        return state;   

      case "SET_CATEGORIES":
        return {
          ...state,
          categories: action.payload,
        };
  
      case "BY_CATEGORIES": //* este reducers si bien esta desarrollado, se esta usando una funcion de la app
        const allProducts = state.allProducts;
        console.log('allProducts', allProducts)
        const categoriesFiltered = allProducts.filter((category) => {
          return (
            category.Categories[0].name &&
            category.Categories[0].name.includes(action.payload)
      
          );
        });
        if (!categoriesFiltered.length) {
          return {
            ...state,
            alert: "No se encontraron productos en la categoría especificada",
            //
          };
        }
        return {
          ...state,
          allProducts: categoriesFiltered,
        };
  
  
      case "ORDER_BY_PRICE":
        const sortedProducts =
          action.payload === "asc"
            ? [...state.allProducts].sort(
                (a, b) => parseFloat(a.Precio) - parseFloat(b.Precio)
                //console.log("preios es :"+ a.Precio)
              )
            : [...state.allProducts].sort(
                (a, b) => parseFloat(b.Precio) - parseFloat(a.Precio)
              );
        return {
          ...state,
          allProducts: sortedProducts,
        };
  
      case "ACTUALIZARDATOSFORMULARIO":
        return {
          ...state,
          formData: {
            ...state.formData,
            ...action.payload
        }
      };

      case "ACTUALIZARDATOSVALIDACIONES":
          return {
          ...state,
          validations: {
            ...state.validations,
            ...action.payload
          }
        };
      case "LOGIN": 
      //console.log(action.payload[0])
      console.log(action.payload[2])
      return{
        ...state,
        users: action.payload[0],//*id usuario
        idCarrito : action.payload[1],//* id carrito 
        userAdmin:action.payload[2]//* es administrador
      }
    case "LOGIN_ADMIN":
       return {
        ...state,
        userAdmin: action.payload //* userAdmin true
       }
      case "ADD_TO_CART":
        return {
            ...state,
            cart: [...state.cart, action.payload]
        };
        case "UPDATE_CART_QUANTITY":
          return {
              ...state,
              cart: state.cart.map(item => 
                  item.product.id === action.payload.productId 
                      ? { ...item, quantity: action.payload.quantity }
                      : item
              )
          };

      case "REMOVE_FROM_CART":
          return {
              ...state,
              cart: state.cart.filter(item => item.product.id !== action.payload.productId)
          };
          case "DELETE_ONE_PRODUCTS"://* borrando solo UNproducto del carrito
            return {
                ...state,
                cart:action.payload
            };

      default:
        //console.log("pasando por nada");
        return state;
    }
  }
  
