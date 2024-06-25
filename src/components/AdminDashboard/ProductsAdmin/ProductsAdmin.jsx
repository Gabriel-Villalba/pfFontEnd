import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, postProduct, getAllProducts } from  '../../../Redux/action/action.js'
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);
  const [newProduct, setNewProduct] = useState({
    Nombre: '', Descripcion: '', Precio: 0, Stock: 0, Imagen_URL: '', onOffer: false, Brand: ''
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(newProduct));
    setNewProduct({ Nombre: '', Descripcion: '', Precio: 0, Stock: 0, Imagen_URL: '', onOffer: false, Brand: '' });
    dispatch(getAllProducts());
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts());
  };

  return (
    <div>
      <h2>Productos</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="Nombre" value={newProduct.Nombre} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="Precio" value={newProduct.Precio} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" name="Descripcion" value={newProduct.Descripcion} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" name="Stock" value={newProduct.Stock} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productImageUrl">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control type="text" name="Imagen_URL" value={newProduct.Imagen_URL} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="productBrand">
          <Form.Label>Marca</Form.Label>
          <Form.Control type="text" name="Brand" value={newProduct.Brand} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Agregar Producto</Button>
      </Form>
      <h2 className="mt-4">Lista de Productos</h2>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product.id}>
            <Row>
              <Col>{product.Nombre} - ${product.Precio}</Col>
              <Col className="text-right">
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Eliminar</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ProductsAdmin;
