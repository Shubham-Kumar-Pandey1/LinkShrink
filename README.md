# URL Shortener Project

This is a scalable URL shortener web application developed using **MongoDB**, **Node.js**, **Express**, **HTML**, **CSS**, **JavaScript**, and **EJS**. The app allows users to shorten URLs and manage custom short links with additional features to come.

## Features

- **URL Shortening**: Easily shorten long URLs for simple sharing.
- **Link Redirection**: Redirect to the original URL when accessing a short link.
- **Database Storage**: MongoDB is used to store URL data efficiently.
- **User Authentication**: Secure login system for users to manage their short links.
- **User Authorization**: Admin users can access and view all URLs they’ve created. If logged in, log out by deleting the cookie named `auth_token` and use the admin credentials:
  - Email: `admin@gmail.com`
  - Password: `admin`
  - Endpoint: [http://localhost:8000/admin](http://localhost:8000/admin)
- **Custom Short Links** (Upcoming Feature): Premium feature for creating custom short URLs.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Authentication**: JWT-based authentication

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shubham-Kumar-Pandey1/URL_Shortener
   ```

1. **Navigate into the project directory**:
   ```bash
   cd URL_Shortener
   ```
1. **Install dependencies**:
   ```bash
   npm install
   ```
1. **Install a code editor and MongoDB**:
For an optimal development experience, I recommend installing Visual Studio Code. You can use any other code editor you're comfortable with, but Visual Studio Code provides great support for JavaScript, Node.js, and MongoDB.
If you're using MongoDB locally, download and install MongoDB for your operating system.
After installation, start MongoDB </br>.

1. **Run the application**:
   ```bash
   npm start
   ```
Open your browser and visit http://localhost:8000 to see the app in action.

Give this amazing project a try! While it's still in development with more updates to come, feel free to enjoy the current features. I would greatly appreciate your feedback! Please share your thoughts via email at meetshubham1702kumar@gmail.com.