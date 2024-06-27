import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { actualizarDatosFormulario, actualizarDatosValidaciones, getCategories } from '../../Redux/action/action.js';
import { validateForm } from './formValidations.js';
import { CREATE_PRODUCT_url } from '../../Redux/URLs/URLs.js';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';


const Form = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const validations = useSelector(state => state.validations);
  const categories = useSelector(state => state.categories);
  const [showValidation, setShowValidation] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  const cld = new Cloudinary({ cloud: { cloudName: 'dyxgoxs6m' } });


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleFocus = (name) => {
    setShowValidation(prevState => ({ ...prevState, [name]: true }));
  };

  const handleBlur = (name) => {
    setShowValidation(prevState => ({ ...prevState, [name]: false }));
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    const newValue = type === 'file' ? files[0] : value;
    const newFormData = { ...formData, [name]: newValue };
    dispatch(actualizarDatosFormulario(newFormData));

    const newValidations = validateForm({ ...formData, [name]: newValue });
    dispatch(actualizarDatosValidaciones(newValidations));

    if (newValidations[name]) {
      setShowValidation(prevState => ({ ...prevState, [name]: true }));
    } else {
      setShowValidation(prevState => ({ ...prevState, [name]: false }));
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'product_images');
  
    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dyxgoxs6m/image/upload', formData);
      const imageUrl = response.data.secure_url;
      setUploadedImageUrl(imageUrl);
      dispatch(actualizarDatosFormulario({ Imagen_URL: imageUrl }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    const newFormData = { ...formData, name: value };
    dispatch(actualizarDatosFormulario(newFormData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newValidations = validateForm(formData);
    if (Object.keys(newValidations).length > 0) {
      dispatch(actualizarDatosValidaciones(newValidations));

      const validationErrors = {};
      Object.keys(newValidations).forEach(field => {
        if (newValidations[field]) {
          validationErrors[field] = true;
        }
      });
      setShowValidation(validationErrors);
      return;
    }

    // Asegurando que Precio y Stock son números
    const formDataToSend = {
      ...formData,
      Precio: parseFloat(formData.Precio.replace(',', '.')),  // Convertir a número
      Stock: parseInt(formData.Stock, 10),  // Convertir a entero
    };

    // Verificar si Precio o Stock son NaN después de la conversión
    if (isNaN(formDataToSend.Precio) || isNaN(formDataToSend.Stock)) {
      setErrorMessage('Precio o Stock tienen un formato inválido');
      return;
    }

    try {
      const response = await axios.post(CREATE_PRODUCT_url, formDataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status !== 200) {
        throw new Error('Error al crear producto');
      }
      setSuccessMessage('¡El Producto se creó exitosamente!');

      dispatch(actualizarDatosFormulario({
        Nombre: '',
        Descripcion: '',
        Precio: 0,
        Stock: 0,
        name: '',
        Imagen_URL: '',
        onOffer: false,
        Brand: '',
      }));
      setShowValidation({});
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage('El producto ya existe o falta completar campos obligatorios');
        } else {
          setErrorMessage('Error al crear producto. Por favor, intenta de nuevo.');
        }
      } else {
        setErrorMessage('Error al conectar con el servidor.');
      }
      console.error('Error al enviar el formulario:', error);
    }
};


  const img = uploadedImageUrl 
  ? cld.image(uploadedImageUrl)
      .resize(auto().width(500).height(500).gravity(autoGravity()))
      .format('auto')
      .quality('auto') 
  : null;




  return (
    <div> 
    <br /> 
    <h2 className="titleF">Crear Productos</h2>
    <br />
    <div className='formulario-contenedor'>
    
      
      {successMessage && <p>{successMessage}</p>}
      {!successMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className='campos'
            type="text"
            id="Nombre"
            name="Nombre"
            placeholder="Name"
            value={formData.Nombre}
            onChange={handleChange}
            onFocus={() => handleFocus('Nombre')}
            onBlur={() => handleBlur('Nombre')}
            required
          />
          {showValidation.Nombre && validations.Nombre && <p className='Validacion'>{validations.Nombre}</p>}
        </div>
        <div>
          <input
            className='campos'
            type="text"
            id="Descripcion"
            name="Descripcion"
            placeholder="Description"
            value={formData.Descripcion}
            onChange={handleChange}
            onFocus={() => handleFocus('Descripcion')}
            onBlur={() => handleBlur('Descripcion')}
            required
          />
          {showValidation.Descripcion && validations.Descripcion && <p className='Validacion'>{validations.Descripcion}</p>}
        </div>
        <div>
          <input
            className='campos'
            type="text"
            id="Precio"
            name="Precio"
            placeholder="Price"
            value={formData.Precio === 0 ? '' : formData.Precio}
            onChange={handleChange}
            onFocus={() => handleFocus('Precio')}
            onBlur={() => handleBlur('Precio')}
            required
          />
          {showValidation.Precio && validations.Precio && <p className='Validacion'>{validations.Precio}</p>}
        </div>
        <div>
          <input
            className='campos'
            type="text"
            id="Stock"
            name="Stock"
            placeholder="Stock"
            value={formData.Stock === 0 ? '' : formData.Stock}
            onChange={handleChange}
            onFocus={() => handleFocus('Stock')}
            onBlur={() => handleBlur('Stock')}
          />
          {showValidation.Stock && validations.Stock && <p className='Validacion'>{validations.Stock}</p>}
        </div>
        <div>
          <input
            className='campos'
            type="text"
            id="Brand"
            name="Brand"
            placeholder="Brand"
            value={formData.Brand}
            onChange={handleChange}
            onFocus={() => handleFocus('Brand')}
            onBlur={() => handleBlur('Brand')}
            required
          />
          {showValidation.Brand && validations.Brand && <p className='Validacion'>{validations.Brand}</p>}
        </div>
        <div>
          <input
            className='campos'
            type="file"
            id="Imagen"
            name="Imagen"
            onChange={handleFileChange}
            onFocus={() => handleFocus('Imagen')}
            onBlur={() => handleBlur('Imagen')}
            required
          />
          {showValidation.Imagen && validations.Imagen && <p className='Validacion'>{validations.Imagen}</p>}
        </div>
        {img && (
          <AdvancedImage cldImg={img} />
        )}
        

        <div>
          <label className='campoLabelSlect' htmlFor="onOffer">On Offer:</label>
          <input
            type="checkbox"
            id="onOffer"
            name="onOffer"
            checked={formData.onOffer}
            onChange={(e) => dispatch(actualizarDatosFormulario({ onOffer: e.target.checked }))}
          />
        </div>
        <div className='marco_select'>
          <select
            className='campos'
            id="categorias"
            name="name"
            required
            onChange={handleCategoryChange}
            value={formData.name}
          >
            <option value="">Select category</option>
            {categories.map(categoria => (
              <option key={categoria.id} value={categoria.name}>{categoria.name}</option>
            ))}
          </select>
          {showValidation.name && validations.name && <p className='Validacion'>{validations.name}</p>}
        </div>
        <button type="submit" className="createButton">Create Product</button>
      </form>
    </div>
    </div>
  );
};

export default Form;
