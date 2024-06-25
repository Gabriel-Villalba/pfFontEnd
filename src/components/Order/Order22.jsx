import  {useRef} from 'react';
import { useSelector } from 'react-redux';
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
                    <td>{action.quantity}</td>
                    <td>{action.total}</td>
                  </tr>
                ))}
                
              </tbody>
              
            </Table>
            <span> Total a pagar: {summary} USD  </span>
           </div>
        </div>
        <button onClick={generatePDF}>PDF</button>
        <button >Pagar</button>
    
    </div>
  );
}

export default Orders;