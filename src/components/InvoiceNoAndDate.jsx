import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const InvoiceNoAndDate = ({ setInvoiceNumber }) => {
  const [date, setDate] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleInvoiceNumber = (e) => {
    setInvoiceNumber(e.target.value);
  };

  return (
    <div>
      <h1>INVOICE</h1>
      <Form className="mb-4">
        <Form.Group as={Row} controlId="numberField" className="mb-4">
          <Form.Label column sm={3} className="text-end">
            Invoice No :
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              onChange={handleInvoiceNumber}
              className="border-0"
              placeholder="Put Invoice No"
              type="text"
              min={0}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="datepicker">
          <Form.Label column sm={3} className="text-end">
            Invoice Date :
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              className="border-0"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default InvoiceNoAndDate;
