[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19899839&assignment_repo_type=AssignmentRepo)
# 🚀 MERN Stack Blog Application

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, image uploads, comments, and advanced search functionality.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT tokens
- Protected routes and middleware
- Secure password hashing with bcrypt
- Token-based session management

### 📝 Blog Management
- Create, read, update, and delete blog posts
- Rich text content with markdown support
- Automatic slug generation from titles
- Featured image uploads with multer
- Category-based organization

### 🖼️ Image Upload System
- Drag-and-drop image uploads
- Image preview functionality
- Automatic file naming and storage
- Support for multiple image formats (JPEG, PNG, GIF)

### 💬 Comments System
- Add comments to blog posts
- User attribution for comments
- Timestamp tracking
- Nested comment structure

### 🔍 Advanced Search & Filtering
- Real-time search across titles and content
- Category-based filtering
- Pagination for large datasets
- Responsive search results

### 📱 Responsive Design
- Mobile-first responsive design
- Bootstrap components for consistent UI
- Modern, clean interface
- Cross-browser compatibility

## 🏗️ Project Structure

```
week-4-mern-integration-assignment-nfvic/
├── client/                          # React front-end
│   ├── public/                      # Static files
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx          # Navigation component
│   │   │   ├── PostCard.jsx        # Post display card
│   │   │   └── CommentForm.jsx     # Comment input form
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx            # Home page with post list
│   │   │   ├── PostDetail.jsx      # Single post view
│   │   │   ├── PostForm.jsx        # Create/edit post form
│   │   │   ├── Login.jsx           # User login page
│   │   │   ├── Register.jsx        # User registration page
│   │   │   └── CategoryForm.jsx    # Category management
│   │   ├── context/                 # React context providers
│   │   │   ├── AuthContext.jsx     # Authentication state
│   │   │   ├── PostContext.jsx     # Posts state management
│   │   │   └── CategoryContext.jsx # Categories state
│   │   ├── services/                # API services
│   │   │   └── api.js              # Axios API client
│   │   ├── App.jsx                 # Main application component
│   │   └── index.js                # Application entry point
│   └── package.json                # Client dependencies
├── server/                          # Express.js back-end
│   ├── config/                      # Configuration files
│   ├── controllers/                 # Route controllers
│   │   ├── postController.js       # Post CRUD operations
│   │   ├── categoryController.js   # Category management
│   │   └── authController.js       # Authentication logic
│   ├── models/                      # Mongoose models
│   │   ├── Post.js                 # Blog post schema
│   │   ├── Category.js             # Category schema
│   │   └── User.js                 # User schema
│   ├── routes/                      # API routes
│   │   ├── posts.js                # Post endpoints
│   │   ├── categories.js           # Category endpoints
│   │   └── auth.js                 # Auth endpoints
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js                 # JWT authentication
│   │   ├── upload.js               # File upload handling
│   │   └── validation.js           # Input validation
│   ├── uploads/                     # Image storage directory
│   ├── server.js                   # Main server file
│   └── package.json                # Server dependencies
└── README.md                       # Project documentation
```

## 🛠️ Technology Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Bootstrap** - CSS framework for styling
- **React Context** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **bcrypt** - Password hashing
- **express-validator** - Input validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd week-4-mern-integration-assignment-nfvic
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create `.env` files in both server and client directories:

   **Server (.env)**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mern-blog
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

   **Client (.env)**
   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

5. **Start the development servers**

   **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

   **Start the frontend development server**
   ```bash
   cd client
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Post Endpoints

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&category=categoryId&q=searchTerm
Authorization: Bearer <token>
```

#### Get Single Post
```http
GET /api/posts/:id
Authorization: Bearer <token>
```

#### Create Post
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "My Blog Post",
  "content": "Post content here...",
  "category": "categoryId",
  "featuredImage": <file>
}
```

#### Update Post
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Post
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post!"
}
```

### Category Endpoints

#### Get All Categories
```http
GET /api/categories
Authorization: Bearer <token>
```

#### Create Category
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology"
}
```

## 🔧 Key Features Implementation

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed using bcrypt
3. JWT token is generated and stored in localStorage
4. Protected routes check for valid token
5. Token is automatically included in API requests

### File Upload System
1. Multer middleware handles multipart/form-data
2. Images are stored in `/uploads` directory
3. Unique filenames prevent conflicts
4. File type validation ensures only images are uploaded
5. Image URLs are generated for frontend display

### Search and Filtering
1. Real-time search across post titles and content
2. Category-based filtering
3. Pagination for performance
4. Case-insensitive search with regex

### State Management
1. React Context for global state
2. Separate contexts for auth, posts, and categories
3. Optimistic UI updates for better UX
4. Error handling and loading states

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Create, read, update, delete posts
- [ ] Image upload functionality
- [ ] Search and filtering
- [ ] Comment system
- [ ] Category management
- [ ] Responsive design on mobile
- [ ] Protected route access

### API Testing
Use tools like Postman or curl to test endpoints:

```bash
# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test post creation
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer <token>" \
  -F "title=Test Post" \
  -F "content=Test content" \
  -F "category=categoryId"
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **JWT Token Issues**
   - Check JWT_SECRET in environment variables
   - Ensure token is being sent in Authorization header
   - Verify token expiration

3. **File Upload Errors**
   - Check uploads directory exists
   - Verify file size limits
   - Ensure correct file types

4. **CORS Issues**
   - Check CORS configuration in server.js
   - Verify frontend URL in CORS settings

### Debug Mode
Enable debug logging by setting `NODE_ENV=development` in server `.env` file.

## 📝 Environment Variables

### Server (.env)
```env
PORT=5000                    # Server port
MONGODB_URI=mongodb://...    # MongoDB connection string
JWT_SECRET=your-secret-key   # JWT signing secret
NODE_ENV=development         # Environment mode
```

### Client (.env)
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api  # API base URL
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the MERN Stack Integration Assignment.

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js team for the web framework
- React team for the frontend library
- Bootstrap for the UI components
- All open-source contributors

---

**Built with ❤️ using the MERN stack** 