
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
  }
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {

      case "GET_PRODUCTS":
        return {
          ...state,
          allProducts: action.payload,
        };

      case "GET_PRODUCT_BY_NAME":
              const product= state.allProducts.filter((nombre) =>
                  nombre.Nombre?.includes(action.payload))
              return {
                ...state,
              allProducts: product
        };       
        
      case "GET_PRODUCT_BY_ID":
            return {
              ...state,
              detail: action.payload,
            };
      case "POST_PRODUCTS":
          return state;
        
      case "DELETE_PRODUCTS":
        return state; 
       
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
  
      default:
        //console.log("pasando por nada");
        return state;
    }
  }
  
