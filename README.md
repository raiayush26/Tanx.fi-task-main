# Ecommerce (React) Coding Assessment

# Made by Atharv Atre 20BCE10594

## Overview

ShopKart is a Reactjs based ecommerce web app which has a
JSON server as backend. This web app has all the basic and
required functionalities and features like (New User
registration, Login authentication, products browsing,
detailed product view, add to cart functionality, add to
favourites functionality)

## Possible improvements

- Adding a search Functionality so that users can find
  Products easily.
- Adding a Not Found page.
- Create roles for users (Admin, non Admin).
- Forgot Password functionality.
- Add better animations and loading screens with attractive
  effects to make application more user friendly and
  interactive.
- Show similar products in the detailed products page.

## If more time was given

- I would have added a payment Gateway for secure online
  transactions.
- Create a CRUD operations Dashboard for admin role users.
- Implemented search engine optimizations using specific
  keywords.
- More Secure Login/Logout using JSON web Token.
- Implementing Filter and sort functionalities on the home
  page and navigation bar based on (price and product
  categories).

## Application workflow

The user of this react application should be able to view
all the products. The application have the following
workflow,

1. Create the login/register functionality.
2. Once the user is authenticated
3. Users can add the products to the cart page
4. Also user can add their favourite products

## Development Setup

- Clone this repo
- `npm install` - To install the dependencies
- `npm run server` - To start the JSON server
- `npm start` - To start the react app

## This project's user interface is like this.

### Login page

<img width="1512" alt="Screenshot 2022-07-24 at 10 44 13 AM" src="/public/Loginpage.png">

### Signup page

<img width="1512" alt="Screenshot 2022-07-24 at 10 44 13 AM" src="/public/signup page.png">

### Home page

<img width="1512" alt="Screenshot 2022-07-24 at 10 45 58 AM" src="/public/HomePage.png">

### Product detail page

<img width="675" alt="Screenshot 2022-07-24 at 10 53 17 AM" src="/public/Detailed Product page.png">

### Cart without login

<img width="1415" alt="Screenshot 2022-07-24 at 10 50 18 AM" src="/public/cart1page.png">

### Cart after login

<img width="1472" alt="Screenshot 2022-07-24 at 10 51 16 AM" src="/public/cart2page.png">

### Favourite products page

<img width="1472" alt="Screenshot 2022-07-24 at 10 51 16 AM" src="/public/Favouritespage.png">

### Orders page

<img width="1472" alt="Screenshot 2022-07-24 at 10 51 16 AM" src="/public/orderspage.png">

## API Usage

API can be launched using npm run server. | Endpoint |
Result |
|------------------------------|-----------------------------------------------------|
| /users | Lists all available users | | /products | Lists
all available products | | /orders | Lists all available
orders  
| /favourites | Lists all available favourites

Refer -
[JSON sever](https://www.npmjs.com/package/json-server) docs
for more information
