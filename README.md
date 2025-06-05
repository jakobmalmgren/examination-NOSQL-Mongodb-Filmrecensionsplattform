<!-- Movie Review Platform Backend
This is a movie review platform backend where users can perform various operations such as registering, logging in, managing movies, and submitting reviews. The backend is built with Node.js and Express, using bcrypt for secure password hashing, JWT for authentication and role-based authorization, and follows an MVC architecture with middleware for handling requests.

Features
User registration and login with role-based access control (user and admin).

Movie management (CRUD operations) — create, read, update, or delete movies.

Review management — create, read, update, and delete reviews.

Fetch movies with average ratings to see movie scores at a glance.

Mongoose Models
Movie:

title

director

releaseYear

genre

Review:

movieId (reference to Movie)

userId (reference to User)

rating

comment

createdAt

User:

username

email

password (hashed with bcrypt)

role (user or admin)

API Endpoints:

POST /movies — Add a new movie
GET /movies — Get all movies
GET /movies/:id — Get movie details
PUT /movies/:id — Update a movie
DELETE /movies/:id — Delete a movie
GET /movies/:id/reviews — Get all reviews for a movie
POST /reviews — Add a new review
GET /reviews — Get all reviews
GET /reviews/:id — Get review details
PUT /reviews/:id — Update a review
DELETE /reviews/:id — Delete a review
POST /register — Register a new user
POST /login — Log in a user
GET /movies/ratings — Get all movies with their average ratings

1.How to Start the Project

1.Clone the repository
2.Install dependencies, npm install
3.Create a database in MongoDB.
4.Add your credentials in an .env file (.env.example for reference)
5.Start the server:node server.js, tthe server is running on: (http://localhost:4000)

2.Documentation POSTMAN

POST /movies
![post a movie](images/POSTmovies.png)

GET /movies
![get a movie](images/GETmovies.png)

GET /movies/:id
![get a movie with ID](images/GET-movies-id.png)

PUT /movies/:id
![update a movie with ID](images/PUT-movies-id.png)

DELETE /movies/:id
![delete a movie with ID](images/DELETE-movies-id.png)

GET /movies/:id/reviews
![get reviews from spec movie ID](images/GET-movies-id-reviews.png)

POST /reviews
![post reviews](images/POST-reviews.png)

GET /reviews
![get reviews](images/GET-reviews.png)

GET /reviews/:id
![get reviews with spec ID](images/GET-reviews-id.png)

PUT /reviews/:id
![update reviews with spec ID](images/PUT-reviews-id.png)

DELETE /reviews/:id
![delete reviews with spec ID](images/DELETE-reviews-id.png)

POST /register
![register user](images/POSTregister.png)

POST /login
![login user](images/POSTlogin.png)

//extra:
GET /movies/ratings
![get all ratings of all movies](images/GET-movies-ratings.png)

3.Documentation MONGODB

-mongodb -USERS
![MONGODB USERS](images/usersInMongoDB.png)

-mongodb -MOVIES
![MONGODB USERS](images/moviesInMongoDB.png)

-mongodb -REVIEWS
![MONGODB USERS](images/reviewsInMongoDB.png) -->

# 🎬 Movie Review Platform Backend

This is a movie review platform backend where users can perform various operations such as registering, logging in, managing movies, and submitting reviews.  
The backend is built with **Node.js** and **Express**, using **bcrypt** for secure password hashing, **JWT** for authentication and role-based authorization, and follows an **MVC architecture** with middleware for handling requests.

---

## 🚀 Features

- User registration and login with role-based access control (`user` and `admin`)
- Movie management (CRUD operations)
- Review management (CRUD operations)
- Fetch movies with average ratings to see movie scores at a glance

---

## 🧩 Mongoose Models

### 🎞️ Movie

- `title`
- `director`
- `releaseYear`
- `genre`

### ✍️ Review

- `movieId` (reference to Movie)
- `userId` (reference to User)
- `rating`
- `comment`
- `createdAt`

### 👤 User

- `username`
- `email`
- `password` (hashed with bcrypt)
- `role` (`user` or `admin`)

---

## 📬 API Endpoints

### 🎥 Movies

- `POST /movies` — Add a new movie
- `GET /movies` — Get all movies
- `GET /movies/:id` — Get movie details
- `PUT /movies/:id` — Update a movie
- `DELETE /movies/:id` — Delete a movie
- `GET /movies/:id/reviews` — Get all reviews for a movie
- `GET /movies/ratings` — Get all movies with their average ratings

### 📝 Reviews

- `POST /reviews` — Add a new review
- `GET /reviews` — Get all reviews
- `GET /reviews/:id` — Get review details
- `PUT /reviews/:id` — Update a review
- `DELETE /reviews/:id` — Delete a review

### 👥 Users

- `POST /register` — Register a new user
- `POST /login` — Log in a user

---

## ⚙️ How to Start the Project

1. Clone the repository  
   `git clone <repo-url>`

2. Install dependencies  
   `npm install`

3. Create a database in **MongoDB**

4. Add your credentials in a `.env` file  
   (use `.env.example` as reference)

5. Start the server  
   `node server.js`  
   The server runs on: [http://localhost:4000](http://localhost:4000)

---

## 📮 API Documentation (Postman)

### 🎥 Movies

#### `POST /movies`

![Post a movie](images/POSTmovies.png)

#### `GET /movies`

![Get all movies](images/GETmovies.png)

#### `GET /movies/:id`

![Get movie by ID](images/GET-movies-id.png)

#### `PUT /movies/:id`

![Update a movie](images/PUT-movies-id.png)

#### `DELETE /movies/:id`

![Delete a movie](images/DELETE-movies-id.png)

#### `GET /movies/:id/reviews`

![Get reviews for specific movie](images/GET-movies-id-reviews.png)

#### `GET /movies/ratings`

![Get all movie ratings](images/GET-movies-ratings.png)

---

### ✍️ Reviews

#### `POST /reviews`

![Post a review](images/POST-reviews.png)

#### `GET /reviews`

![Get all reviews](images/GET-reviews.png)

#### `GET /reviews/:id`

![Get review by ID](images/GET-reviews-id.png)

#### `PUT /reviews/:id`

![Update review](images/PUT-reviews-id.png)

#### `DELETE /reviews/:id`

![Delete review](images/DELETE-reviews-id.png)

---

### 👤 Users

#### `POST /register`

![Register user](images/POSTregister.png)

#### `POST /login`

![Login user](images/POSTlogin.png)

---

## 🧾 MongoDB Collections

### 👥 Users

![MongoDB Users](images/usersInMongoDB.png)

### 🎬 Movies

![MongoDB Movies](images/moviesInMongoDB.png)

### ✍️ Reviews

![MongoDB Reviews](images/reviewsInMongoDB.png)

---
