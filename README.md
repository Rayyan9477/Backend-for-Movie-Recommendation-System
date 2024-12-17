# Movie Recommendation System Backend

## Description
This project is the backend for a Movie Recommendation System. It provides a RESTful API for managing users, movies, reviews, recommendations, and more. The backend is built using Node.js, Express, and MongoDB, with API documentation provided by Swagger.

## Features
- User authentication and management
- Movie management (CRUD operations)
- Review and rating system
- Personalized movie recommendations
- Custom movie lists
- Article and discussion management
- Notification system
- Swagger API documentation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rayyan9477/Backend-for-Movie-Recommendation-System.git
   cd Backend-for-Movie-Recommendation-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost/movierecommendation
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```
   For development with hot-reloading:
   ```bash
   npm run dev
   ```

## Usage
The API is available at `http://localhost:5000/api`. Swagger documentation is accessible at `http://localhost:5000/api-docs`.

### API Endpoints

#### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - User login

#### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/wishlist` - Get user's wishlist
- `POST /users/wishlist` - Add movie to wishlist

#### Movies
- `GET /movies/{id}` - Get movie details
- `POST /movies` - Add a new movie (Admin)
- `PUT /movies/{id}` - Update a movie (Admin)
- `DELETE /movies/{id}` - Delete a movie (Admin)
- `GET /movies/{id}/similar` - Get similar movies
- `GET /movies/top/month` - Get top movies of the month
- `GET /movies/top/genre/{genre}` - Get top movies by genre
- `GET /movies/{id}/boxoffice` - Get box office details of a movie

#### Reviews
- `POST /reviews` - Add or update a review
- `GET /reviews/{movieId}` - Get reviews for a movie

#### Recommendations
- `GET /recommendations` - Get personalized recommendations
- `GET /recommendations/trending` - Get trending movies

#### Lists
- `POST /lists` - Create a new custom list
- `GET /lists` - Get user's custom lists
- `POST /lists/{listId}/movies` - Add a movie to a list

#### Articles
- `GET /articles` - Get all articles

#### Discussions
- `GET /discussions` - Get all discussions
- `POST /discussions` - Create a new discussion
- `POST /discussions/{id}/comments` - Add a comment to a discussion

#### Notifications
- `GET /notifications` - Get user notifications
- `PUT /notifications/{id}/read` - Mark a notification as read

#### Admin
- `GET /admin/stats` - Get site statistics
- `DELETE /admin/reviews/{id}` - Delete a user review
- `GET /admin/movies` - Retrieve all movies
- `GET /admin/trending-genres` - Get trending genres

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## Contact
- GitHub: [Rayyan9477](https://github.com/Rayyan9477)
- LinkedIn: [Rayyan Ahmed](https://www.linkedin.com/in/rayyan-ahmed9477/)
- Email: [rayyanahmed265@yahoo.com](mailto:rayyanahmed265@yahoo.com)
