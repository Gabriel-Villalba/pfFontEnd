import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import DeleteProducts from './ProductsAdmin/DeleteProducts.jsx'
import CategoriesAdmin from './CategoriesAdmin/CategoriesAdmin.jsx';
import DeleteCategories from './DeleteCategories/DeleteCategories.jsx'
import Form from '../Form/Form.jsx'; 



const AdminDashboard = () => {
  return (
    <div> 
    <div  className='panelAdmin'> <h2 className="title">Admin</h2></div> 
    <br />
    <Container className="adminContainer">
    <Tab.Container defaultActiveKey="createProduct">
      <Row className="my-4">
        <Col sm={3}>
          <Nav variant="pills" className="columnAdmin">
            <Nav.Item>
              <Nav.Link className="itemcolum"  eventKey="createProduct">Create Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="itemcolum"  eventKey="deleteProducts">Delete Products</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="itemcolum"  eventKey="createCategory">Create Categories</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  className="itemcolum" eventKey="deleteCategories">Delete Categories</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className="admin2">
            <Tab.Pane eventKey="createProduct">
              <Form />
            </Tab.Pane>
            <Tab.Pane eventKey="deleteProducts">
              <DeleteProducts />
            </Tab.Pane>
            <Tab.Pane eventKey="createCategory">
              <CategoriesAdmin />
            </Tab.Pane>
            <Tab.Pane eventKey="deleteCategories">
              <DeleteCategories />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </Container>
  </div>
);
};

export default AdminDashboard;