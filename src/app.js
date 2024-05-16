const express = require('express');
const loginController = require('./controller/login.controller');
const userController = require('./controller/user.controller');
const categoriesController = require('./controller/categories.controller');
const postController = require('./controller/post.controller');
const { validarLogin } = require('./middleware/validador');
const authMiddleware = require('./middleware/authMIddleware');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`

app.post('/login', loginController.loginFunction);

app.post('/user', validarLogin, userController.userFunction);

app.get('/user', authMiddleware, userController.getAllUsers);

app.get('/user/:id', authMiddleware, userController.getUserId);

app.post('/categories', authMiddleware, categoriesController.createCategory);

app.get('/categories', authMiddleware, categoriesController.getCategories);

app.post('/post', authMiddleware, postController.createPost);
module.exports = app;
