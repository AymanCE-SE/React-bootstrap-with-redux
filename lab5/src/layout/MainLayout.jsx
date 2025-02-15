import React from 'react'
import { Header } from '../components/Header'
import Products from '../pages/Products'
import { ProductForm } from '../pages/ProductForm'
import {ProductDetails} from '../pages/ProductDetails'
import Footer from '../components/Footer'
import { Home } from '../pages/Home'
import '../styles/productTable.css'
import '../styles/HomeSlider.css'
import { NotFound } from '../pages/notFound'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SharedLayout from '../sharedlayout/SharedLayout'
export  function MainLayout() {
  return (
    <>
      <BrowserRouter>
                    <Routes>
                      <Route path='/' element={<SharedLayout />}>
                        <Route  index element={<Home />}/>
                        <Route path='Products' element={<Products />}/>
                        <Route path='Products/:id' element={<ProductDetails />}/>
                        <Route path='products/:id/edit' element={<ProductForm />} />
                      </Route>
                        <Route path='*' element={<NotFound />}></Route>
                    </Routes>  
      </BrowserRouter>

    </>
  )
}
