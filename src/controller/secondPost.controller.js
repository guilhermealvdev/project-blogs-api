// criei esse segundo controller pro post pois o outro irá atingir maximo de linhas (lint)
// lembrar de importar aqui

const getAllPosts = async (req, res) => res.status(200).json({ message: 'Pro lint nao dar erro' });

module.exports = { getAllPosts };
