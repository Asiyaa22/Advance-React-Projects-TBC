// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';
import CheckoutPage from './pages/CheckoutPage';
import CartSidebar from './components/CartSidebar';

export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <main style={{paddingTop:18}}>
        <div className="container">
          <Routes>
            <Route path="/" element={
              <div className="main-grid">
                <div>
                  <ProductList />
                </div>
                <div>
                  <CartSidebar />
                </div>
              </div>
            } />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<div className="container" style={{paddingTop:18}}><CartSidebar /></div>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
