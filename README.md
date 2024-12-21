##  Project Name : Blogify-Backend
### Live link : https://blogify-backend-ten.vercel.app/
 
### Descripttion :

Blogify-Backend is a blog website backend that is built using Express, Node.js, Mongoose, and TypeScript, with zod for data validation. It allows users to create, update and delete blogs while providing secure authentication token. When a user login with email and password then the server provides a secure authentication token. This blogify application also includes a public blog api for blog viewing with search, filter and sorting functionalities. An admin can manage blogs and users with his specific permissions. And this application also responds gracefully to any error.

 
## Feature details of Blogify Website

#### Authentication & Authorization
New user can register on the website and subsequently log in with email and password. Upon login server provide an authentication token. An Admin also login on the website.
 
### User role
#### Create, Update and Delete Blogs
With a valid user authentication token, users can create, update, and delete their own blog posts. Creating a new blog post requires both a title and content, both of which must be strings. 
 

### Admin role
#### Blocked User and Delete Blogs
With a valid admin authentication token, admin can blocked any user and delete any blog posts. But admin cannot update any blog.
 
#### Public Blog api
The blog api offers public viewing all blogs without any authentication token. Also it provides some powerful features such as searching, filtering and sorting. This combination of features makes it easy to find and explore any relevant blog content.
 
####  Error Handling
This application responds gracefully to any error. such as zod validation error, not found error, validation error, internal server error, authentication and authorization. And all error responses follow a standardized format for easy interpretation. This error handling provide a consistent experience.  

### Technologies Used  
- **Node.js**: Backend runtime.  
- **TypeScript**: Type-safe development.  
- **Express.js**: Backend framework.  
- **MongoDB**: Database.  
- **Mongoose**: MongoDB object modeling. 
- **Bcrypt**: To hash a Password.


### Installation

#### Prerequisites
- **Node.js** v22.11.0
- **MongoDB**

#### Steps
1. Clone the repository:
    ```sh
    git clone <https://github.com/hriday316/blogify-backend-node.git>
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Create a `.env` file in the root directory:
    ```env
    PORT=3000
    DB_URL=your_DBURL
    NODE_ENV=your_node_env
    BCRYPT_SALT_ROUND=your_salt_round
    ACCESS_TOKEN_SECRET=your_secret_key
    ACCESS_EXPIRES_IN=your_expiresIn_time
    ```
4. Start the development server:
    ```sh
    npm run start:dev