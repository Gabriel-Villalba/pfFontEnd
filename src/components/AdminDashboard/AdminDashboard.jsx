import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin.jsx'
import CategoriesAdmin from './CategoriesAdmin/CategoriesAdmin.jsx';
import { getAllProducts, getCategories } from "../../Redux/action/action";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <Container>
      <h1 className="my-4">Admin Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Productos</Card.Header>
            <Card.Body>
              <ProductsAdmin />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Categorías</Card.Header>
            <Card.Body>
              <CategoriesAdmin />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
