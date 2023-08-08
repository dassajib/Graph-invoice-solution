import React, { useRef, useState } from "react";
import DownloadButton from "./DownloadButton";
import InvoiceLogo from "./InvoiceLogo";
import InvoiceInfo from "./InvoiceInfo";
import CalculationTable from "./CalculationTable";
import { Container } from "react-bootstrap";

const InvoiceComponent = () => {
    
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [customerName, setCustomerName] = useState("");

  const [invoiceForm, setInvoiceForm] = useState("");

  const dataRef = useRef();

  const isDataFilled = invoiceNumber && customerName && invoiceForm;

  return (
    <div ref={dataRef}>
      <DownloadButton isDataFilled={isDataFilled} dataRef={dataRef} />
      <Container id="main-content">
        <InvoiceLogo dataRef={dataRef} setInvoiceNumber={setInvoiceNumber} />
        <InvoiceInfo
          dataRef={dataRef}
          setCustomerName={setCustomerName}
          setInvoiceForm={setInvoiceForm}
        />
        <CalculationTable dataRef={dataRef} />
      </Container>
    </div>
  );
};

export default InvoiceComponent;
