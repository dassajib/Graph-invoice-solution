import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarView from "../layouts/NavbarView";
import PieChartComponent from "../components/PieChartComponent";
import InvoiceComponent from "../components/InvoiceComponent";

const Index = () => {
  return (
    <BrowserRouter>
      <NavbarView />
      <Routes>
        <Route path="/" element={<PieChartComponent />} />
        <Route path="/invoice" element={<InvoiceComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
