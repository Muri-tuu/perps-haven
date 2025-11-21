import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { ReviewProvider } from './context/ReviewContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import TawkToChat from './components/TawkToChat';
import './index.css';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ShopProvider>
      <ThemeProvider>
        <ReviewProvider>
          <div className="app">
            <Navbar />
            <Hero />
            <div id="gallery">
              <ProductList />
            </div>
            <Reviews />
            <Footer />
            <CartDrawer />
            <CheckoutModal />
            <TawkToChat />
          </div>
        </ReviewProvider>
      </ThemeProvider>
    </ShopProvider>
  );
}

export default App;
