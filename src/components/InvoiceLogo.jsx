import React, { useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import InvoiceNoAndDate from "./InvoiceNoAndDate";

const InvoiceLogo = ({ setInvoiceNumber }) => {
  const [logo, setLogo] = useState(null);
  const [showButton, setShowButton] = useState(true);

  const fileInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(URL.createObjectURL(file));
    setShowButton(false);
  };

  const handleDeleteClick = () => {
    setLogo(null);
    setShowButton(true);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <hr style={{ border: "5px solid blue" }} />
      <Row>
        <Col>
          <InvoiceNoAndDate setInvoiceNumber={setInvoiceNumber} />
        </Col>
        <Col>
          <div className="d-flex justify-content-end">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              {showButton && (
                <Button className="hide-section" onClick={handleUploadClick}>
                  Upload Logo
                </Button>
              )}
              {logo && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={logo}
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    alt="Logo"
                  />
                  <Button className="hide-section" onClick={handleDeleteClick}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <hr style={{ border: "5px solid blue" }} />
    </div>
  );
};

export default InvoiceLogo;
