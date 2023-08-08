import React, { useState } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";

const CalculationTable = ({dataRef}) => {
  const [products, setProducts] = useState([
    { productName: "", quantity: 0, unitPrice: 0, total: 0 },
  ]);
  const [vatTax, setVatTax] = useState(0);
  const [discount, setDiscount] = useState(0);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;

    const { quantity, unitPrice } = updatedProducts[index];
    updatedProducts[index].total = quantity * unitPrice;

    setProducts(updatedProducts);
  };

  const handleAddRow = () => {
    setProducts([
      ...products,
      { productName: "", quantity: 0, unitPrice: 0, total: 0 },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const calculateSubTotal = () => {
    return products.reduce((total, product) => total + product.total, 0);
  };

  const calculateFinalTotal = () => {
    const finalTotal = calculateSubTotal() + calculateVAT() - calculateDiscount();
    return finalTotal.toFixed(2);
  };

  const calculateVAT = () => {
    const subTotal = calculateSubTotal();
    // Replace 0.01 with the VAT/Tax percentage entered by the user
    return subTotal * (vatTax / 100);
  };

  const calculateDiscount = () => {
    // Use the discount amount entered by the user directly
    return discount;
  };

  return (
    <div>
      <Table id="calculation-table">
        <thead style={{borderStyle: "hidden"}}>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th className="hide-section">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td style={{padding: 0, borderStyle: "hidden"}}>
                <Form.Control
                  type="text"
                  value={product.productName}
                  onChange={(e) =>
                    handleProductChange(index, "productName", e.target.value)
                  }
                />
              </td>
              <td style={{padding: 0, borderStyle: "hidden"}}>
                <Form.Control
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                />
              </td>
              <td style={{padding: 0, borderStyle: "hidden"}}>
                <Form.Control
                  type="number"
                  value={product.unitPrice}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "unitPrice",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </td>
              <td style={{borderStyle: "hidden"}}>{product.total}</td>
              <td style={{borderStyle: "hidden", padding: 4}} className="hide-section">
                {index === products.length - 1 && (
                  <Button
                    style={{ padding: "2px 10px", marginRight: "2px" }}
                    variant="success"
                    onClick={handleAddRow}
                  >
                    +
                  </Button>
                )}
                {index > -1 && (
                  <Button
                    style={{ padding: "2px 12px" }}
                    variant="danger"
                    onClick={() => handleRemoveRow(index)}
                  >
                    -
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Container className="mt-5 mb-5">
        <Row>
          <Col md={8}></Col>
          <Col md={4}>
            <Form>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={6}>
                  Sub Total :
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    className="border-0"
                    type="number"
                    readOnly
                    value={calculateSubTotal()}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={6}>
                  VAT/Tax (%) :
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    className="border-0"
                    type="number"
                    value={vatTax}
                    onChange={(e) => setVatTax(parseFloat(e.target.value))}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={6}>
                  Discount :
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    className="border-0"
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={6}>
                  Final Total :
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    className="border-0"
                    type="number"
                    readOnly
                    value={calculateFinalTotal()}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CalculationTable;
