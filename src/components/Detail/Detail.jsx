import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductsById } from "../../Redux/action/action"; 

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(getProductsById(id));
  }, [dispatch, id]);

  const handleClickClose = () => {
    navigate('/products'); 
  };

  const product = useSelector((state) => state.detail);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Detail</h1>
      {product ? (
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <img src={product.Imagen_URL} className="card-img-top" alt={product.Nombre} />
            <div className="card-body">
              <h5 className="card-title">{product.Nombre}</h5>
              <p className="card-text">{product.Descripcion}</p>
              <p className="card-text">${product.Precio}</p>
              {product.Categories && product.Categories.length > 0 && (
                <div>
                  <h6>Categorías:</h6>
                  <ul className="list-unstyled">
                    {product.Categories.map((category, index) => (
                      <li key={index}>{category.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button onClick={handleClickClose} className="btn btn-danger mt-2">Cerrar</button>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Detail;
