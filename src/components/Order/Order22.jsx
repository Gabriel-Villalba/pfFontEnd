import { useRef } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { CREATE_PREFERENCE_Url } from "../../Redux/URLs/URLs";
import { useState } from "react";

function Orders() {
  const actions = useSelector((state) => state.cart);
  const [preferenceId, setPreferenceId] = useState(null);

  const totalPrice =
    actions.length > 0 &&
    actions.reduce((total, item) => {
      const price = parseFloat(item.Precio) || 0;
      return total + price * item.amount;
    }, 0);

  //*******Mercado Pago****** */
  initMercadoPago("APP_USR-f30e2368-a4b5-4e70-be3e-da3cedb0b7b1", {
    locale: "es-AR",
  });
console.log(totalPrice)
  const createPreference = async () => {
    try {
      const response = await axios.post(CREATE_PREFERENCE_Url, {
        title: "productos de indumentaria",
        quantity: 1,
        unit_price: totalPrice,
      });
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const componentPDF = useRef();
 
  console.log(actions);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Factura BellaMuse",
    onAfterPrint: () => alert("Data save in PDF"),
  });
  let summary = 0;
  actions.map((t) => {
    return (summary = summary + parseInt(t.total));
  });

  const handleBuy = async () => {
    const id = await createPreference();
    id ? setPreferenceId(id) : alert("Error");
  };

  //  const handlePurchase = () => {
  //       alert('Pasarela de pagos del Sr Gabriel');
  //   };

  return (
    <div className="container">
      <div
        className="col-sm-12 col-md-12 col-lg-12 my-3"
        style={{ paddingTop: "20px" }}
      >
        <div ref={componentPDF} style={{ width: "100%" }}>
          <h1>ORDEN DE COMPRA</h1>
          <Table striped bordered hover>
            {" "}
            {/* Utilizar componente de tabla de Bootstrap */}
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action) => (
                <tr key={action.id}>
                  <td>{action.Nombre}</td>
                  <td>{action.Precio}</td>
                  <td>{action.amount}</td>
                  <td>{action.Precio * action.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <span> Total a pagar: {totalPrice} USD </span>
        </div>
      </div>
      <button onClick={generatePDF}>PDF</button>
      <button onClick={handleBuy}>Pagar</button>
      {preferenceId && (
        <Wallet
          initialization={{ preferenceId: preferenceId }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      )}
    </div>
  );
}

export default Orders;
