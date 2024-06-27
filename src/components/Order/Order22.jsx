import  {useRef} from 'react';
import { useSelector} from 'react-redux';
import { Table } from 'react-bootstrap';
import {useReactToPrint} from "react-to-print"






function Orders () {

  const componentPDF= useRef()
  const actions = useSelector(state => state.cart);
  console.log(actions)
 
  const generatePDF = useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle: "Factura BellaMuse",
    onAfterPrint: ()=>alert("Data save in PDF")

  });
  let summary = 0
  actions.map((t) => {
    return summary = summary + parseInt(t.total);
  })

  //  const handlePurchase = () => {
  //       alert('Pasarela de pagos del Sr Gabriel');
  //   };
  const totalPrice = actions.length > 0 && actions.reduce((total, item) => {
    const price = parseFloat(item.Precio) || 0;
     return total + price * item.amount;
 }, 0);

  return (
    <div className='container'>
      
        <div className='col-sm-12 col-md-12 col-lg-12 my-3' style={{ paddingTop: '20px' }}>
           <div ref={componentPDF} style={{width:'100%'}}>
              <h1>ORDEN DE COMPRA</h1>
            <Table striped bordered hover> {/* Utilizar componente de tabla de Bootstrap */}
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {actions.map(action => (
                  <tr key={action.id}>
                    <td>{action.Nombre}</td>
                    <td>{action.Precio}</td>
                    <td>{action.amount}</td>
                    <td>{ action.Precio * action.amount  }</td>
                  </tr>
                ))}
                
              </tbody>
              
            </Table>
            <span> Total a pagar: {totalPrice} USD  </span>
           </div>
        </div>
        
        <button className='btn btn-warning' onClick={generatePDF}>PDF</button> 
        <button className='btn btn-warning'  >Pagar</button>
    
    </div>
  );
}

export default Orders;