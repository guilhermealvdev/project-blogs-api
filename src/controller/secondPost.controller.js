// criei esse segundo controller pro post pois o outro irá atingir maximo de linhas (lint)
const { BlogPost, User, Category } = require('../models');

const getAllPosts = async (req, res) => { // res.status(200).json({ message: 'Pro lint nao dar erro' }); // Para o Req 13
  // 1. e 2.
  const allPosts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'], // Removi password pra nao voltar
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] }, // Isso remove os atributos da tabela "ponte" dos resultados !!
        attributes: ['id', 'name'],
      },
    ],
  });
  // console.log(allPosts.toJSON());
  return res.status(200).json(allPosts); // Remover pro codigo continuar
  // 3.
};

// const categories = await Category.findAll({ where: { id: categoryIds } });
/*
Ideia inicial:
1. Buscar dados na tabela blog_posts
2. Usar o userId da tabela blog_posts para procurar o user com mesmo id
3. Usar o id do blog_posts para procurar post_id na tabela posts_categories
4. Pegar o category_id da tabela posts_categories e procurar o id na tabela categories
*/

// Req 14

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postUnico = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category, as: 'categories', through: { attributes: [] }, attributes: ['id', 'name'],
      },
    ],
  });

  const existePost = await BlogPost.findOne({ where: { id } });
  if (!existePost) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(postUnico);
};

module.exports = { getAllPosts, getPostById };
