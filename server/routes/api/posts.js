const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const post = await loadPostCollection();
  res.send(await post.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const post = await loadPostCollection();
  await post.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
  const post = await loadPostCollection();
  await post.deleteOne({
    _id: new mongodb.ObjectId(req.params.id),
  });
  res.status(200).send();
});

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://Segmentree:qwertyuiop.1@cluster0.ziewb.mongodb.net/Vuexpress?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  );

  return client.db('Vuexpress').collection('posts');
}

module.exports = router;
