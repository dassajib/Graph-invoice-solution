import React, { useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const PieChartComponent = () => {
  const [data, setData] = useState([]);
  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const chartRef = useRef(null);

  const handleAdd = () => {
    if (keyInput.trim() !== "" && valueInput.trim() !== "") {
      const newData = [...data, { key: keyInput, value: parseInt(valueInput) }];
      setData(newData);
      setKeyInput("");
      setValueInput("");
    }
  };

  const handlePrint = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("chart.pdf");
      });
    }
  };

  const chartData = {
    labels: data.map((item) => item.key),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <Container fluid className="py-5">
      <Card className="shadow-lg p-3">
        <Row>
          <Col md={6} xs={12} className="mb-3">
            <Form>
              <Form.Group controlId="keyInput">
                <Form.Label>Key</Form.Label>
                <Form.Control
                  type="text"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="valueInput">
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="number"
                  value={valueInput}
                  onChange={(e) => setValueInput(e.target.value)}
                />
              </Form.Group>
              <Button onClick={handleAdd} variant="primary" className="mr-2">
                Add
              </Button>
              <Button onClick={handlePrint} variant="secondary">
                Download as PDF
              </Button>
            </Form>
          </Col>
          <Col md={6} xs={12}>
            <div ref={chartRef}>
              <Pie data={chartData} />
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default PieChartComponent;
