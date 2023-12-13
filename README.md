# VueBlog

My Vue project for SoftUni's regular exam.

# About

This is a blog for people to discuss different topics
by creating posts and commenting on them.

# Setup

To setup the project, first clone the repository.

After that, go inside the vue-blog folder and install the node modules.

```js
// In the \VueBlog folder
cd .\vue-blog\
npm install
```

Next, you need to go inside the back-end folder and install the node modules.

```js
// In the \VueBlog folder
cd .\back-end\
npm install
```

Finally, you can go inside the folders, start the front and back end

```js
// In \VueBlog\vue-blog and \VueBlog\back-end folders
npm run dev
```

and open the application on http://localhost:5173/

# Tech stack

For the front-end I used:

- vite with VueJS template;
- vue-router;
- vuelidate;
- pinia;
- axios.

For the back-end I used:

- nodemon;
- express;
- bcrypt;
- cookie-parser;
- cors;
- dotenv;
- express-mongo-sanitize;
- express-rate-limit;
- helmet;
- jsonwebtoken;
- mongoose;
- multer;
- xss-clean.
