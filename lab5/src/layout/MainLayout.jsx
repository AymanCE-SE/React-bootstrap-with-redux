/** @format */

import React from "react";
import { Header } from "../components/Header";
import Products from "../pages/Products";
import { ProductForm } from "../pages/ProductForm";
import { ProductDetails } from "../pages/ProductDetails";
import Footer from "../components/Footer";
import { Home } from "../pages/Home";
import "../styles/productTable.css";
import "../styles/HomeSlider.css";
import "../styles/ProductCards.css";
import "../styles/login.css";
import "../styles/header.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NotFound } from "../pages/notFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SharedLayout from "../sharedlayout/SharedLayout";
import Login from "../pages/login";
import FooterOnlyLayout from "./FooterOnlyLayout";
import Register from "../pages/register";
export function MainLayout() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* sharing footer and header  */}
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="Products" element={<Products />} />
            <Route path="Products/:id" element={<ProductDetails />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
          </Route>
          {/* pages with footer only layout */}
          <Route path="/" element={<FooterOnlyLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
