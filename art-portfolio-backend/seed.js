const mongoose = require('mongoose');
const Art = require('./models/Art');

mongoose.connect('mongodb://127.0.0.1:27017/artGallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const artworks = [
  {
    title: 'Sunset Bliss',
    imageUrl: '/images/art1.jpg',
    comments: []
  },
  {
    title: 'Dancing Colors',
    imageUrl: '/images/art2.jpg',
    comments: []
  },
  {
    title: 'Silent Lake',
    imageUrl: '/images/art3.jpg',
    comments: []
  }
];

async function seedDB() {
  await Art.deleteMany({});
  await Art.insertMany(artworks);
  console.log("✅ Sample artworks added to MongoDB!");
  mongoose.connection.close();
}

seedDB();
