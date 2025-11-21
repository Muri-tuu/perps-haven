# Perps Haven

Perps Haven is a modern, responsive e-commerce application built with React, designed to provide a premium shopping experience for luxury accessories.

## 🚀 Project Overview

This project was developed to transition from a static HTML website to a dynamic, component-based React application. It features a seamless shopping cart, product variant selection, and an integrated email notification system for orders.

### Key Features

*   **Dynamic Product Catalog**: Browse products with multiple color variants and real-time image updates.
*   **Shopping Cart**: Add items, adjust quantities, and view total costs in a slide-out drawer.
*   **Checkout System**: A multi-step checkout modal that captures user details and delivery preferences.
*   **Email Notifications**: Automated order confirmation emails sent to the admin via EmailJS.
*   **Theme System**: Toggle between "Light Luxury" and "Dark Luxury" modes for a personalized viewing experience.
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

## 🛠️ Technology Stack

*   **Frontend Framework**: [React](https://react.dev/) (v18+)
*   **Build Tool**: [Vite](https://vitejs.dev/) for fast development and optimized production builds.
*   **Styling**: Vanilla CSS with a custom variable-based theming system.
*   **State Management**: React Context API (`ShopContext`, `ThemeContext`) for global state handling.
*   **Email Service**: [EmailJS](https://www.emailjs.com/) for client-side email sending.
*   **Deployment**: Optimized for [Vercel](https://vercel.com/).

## 📂 Project Structure

The codebase is organized for scalability and maintainability:

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx      # Navigation and cart toggle
│   ├── Hero.jsx        # Landing page banner
│   ├── ProductList.jsx # Grid display of products
│   ├── CartDrawer.jsx  # Slide-out shopping cart
│   ├── CheckoutModal.jsx # Order form and logic
│   └── ...
├── context/            # Global state management
│   ├── ShopContext.jsx # Cart and product logic
│   └── ThemeContext.jsx # Light/Dark mode logic
├── utils/              # Helper functions
│   └── emailService.js # EmailJS integration logic
├── App.jsx             # Main application layout
└── main.jsx            # Entry point
```

## 🔒 Security Measures

*   **Environment Variables**: Sensitive keys are stored in `.env` and excluded from version control via `.gitignore`.
*   **Security Headers**: Configured via `vercel.json` to prevent XSS, Clickjacking, and MIME-sniffing attacks.
*   **Input Validation**: Form inputs are validated to ensure data integrity before processing.

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Muri-tuu/perps-haven.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and add your EmailJS keys:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 🤝 Contributing

This project is a collaborative effort to build a high-quality e-commerce platform. Code is managed via Git, with a focus on clean, readable, and documented implementation.
