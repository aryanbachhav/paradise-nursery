# Paradise Nursery

Paradise Nursery is an online houseplant shop built with **React** and **Redux Toolkit**.
Visitors land on a welcome page, browse houseplants grouped by category, add them to a
shopping cart, and manage the cart (quantities, removal, totals).

## Features

- Landing page with company name, background image, About Us section and a **Get Started** button
- Product listing with 3 categories and 6 plants each (thumbnail, name, price)
- **Add to Cart** button that adds the plant, disables itself, and updates the cart icon count
- Navbar on the Plants and Cart pages with links to **Home**, **Plants** and **Cart**
- Shopping cart page with per-plant subtotal, overall total, quantity +/- buttons, delete button,
  **Checkout** ("Coming Soon") and **Continue Shopping**

## Project structure

```
src/
  main.jsx        entry point, Redux Provider
  store.js        Redux store
  CartSlice.jsx   cart slice (addItem, removeItem, updateQuantity)
  App.jsx         landing page + page switching
  App.css         landing page styles (background image)
  AboutUs.jsx     company details
  ProductList.jsx plant catalogue + navbar
  CartItem.jsx    shopping cart page
```

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`.
