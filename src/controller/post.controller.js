const { BlogPost, PostCategory, Category, sequelize } = require('../models');
const jwt = require('jsonwebtoken');

async function createPost(req, res) {
  const { title, content, categoryIds } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Verificar se todas as categorias existem
    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    // Usando transação para garantir atomicidade
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost.create(
        { title, content, userId, published: new Date(), updated: new Date() },
        { transaction: t }
      );

      const postCategories = categoryIds.map((categoryId) => ({
        postId: newPost.id,
        categoryId,
      }));

      await PostCategory.bulkCreate(postCategories, { transaction: t });

      return newPost;
    });

    return res.status(201).json(result);

  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { createPost };