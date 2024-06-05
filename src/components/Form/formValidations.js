export const validateForm = (formData) => {
  const errors = {};

  if (!formData.Nombre || formData.Nombre.length < 3 || formData.Nombre.length > 50) {
    errors.Nombre = "El nombre debe tener entre 3 y 50 caracteres.";
  }

  if (!formData.Descripcion || formData.Descripcion.length < 20) {
    errors.Descripcion = "La descripción debe tener al menos 20 caracteres.";
  }

  if (isNaN(parseFloat(formData.Precio)) || formData.Precio <= 0) {
    errors.Precio = "El precio debe ser un número positivo.";
  }

  if (isNaN(parseInt(formData.Stock)) || formData.Stock < 0) {
    errors.Stock = "El stock debe ser un número entero positivo o cero.";
  }

  if (!formData.Imagen_URL || !/\.(jpg|jpeg|png|gif)$/.test(formData.Imagen_URL)) {
    errors.Imagen_URL = "La URL de la imagen es obligatoria y debe ser de tipo .jpg, .jpeg, .png, o .gif.";
  }

  if (!formData.Brand || formData.Brand.length < 3 || formData.Brand.length > 30) {
    errors.Brand = "La marca debe tener entre 3 y 30 caracteres.";
  }

  if (!formData.name) {
    errors.name = "La categoría es obligatoria.";
  }

  return errors;
};
