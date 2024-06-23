import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, postCategory, getCategories } from '../../../Redux/action/action.js'
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';

const CategoriesAdmin = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const [newCategory, setNewCategory] = useState({ name: '' });

  const handleChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCategory(newCategory));
    setNewCategory({ name: '' });
    dispatch(getCategories());
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    dispatch(getCategories());
  };

  return (
    <div>
      <h2>Categorías</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="categoryName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" name="name" value={newCategory.name} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Agregar Categoría</Button>
      </Form>
      <h2 className="mt-4">Lista de Categorías</h2>
      <ListGroup>
        {categories.map(category => (
          <ListGroup.Item key={category.id}>
            <Row>
              <Col>{category.name}</Col>
              <Col className="text-right">
                <Button variant="danger" onClick={() => handleDelete(category.id)}>Eliminar</Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CategoriesAdmin;
