const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Art = require('./models/Art');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB (make sure MongoDB is running locally!)
mongoose.connect('mongodb://127.0.0.1:27017/artGallery', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Home route (optional)
app.get('/', (req, res) => {
  res.send('🎨 Backend Server is Running!');
});

// View a specific artwork with comments
app.get('/art/:id', async (req, res) => {
  try {
    const art = await Art.findById(req.params.id);
    res.render('art', { art });
  } catch (err) {
    res.status(404).send('Artwork not found');
  }
});

// Post a comment
app.post('/art/:id/comment', async (req, res) => {
  const { username, text } = req.body;
  const art = await Art.findById(req.params.id);
  art.comments.push({ username, text });
  await art.save();
  res.redirect(`/art/${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// GET all artworks as JSON
app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await Art.find();        // fetch all from MongoDB
    res.json(artworks);                       // send as JSON array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
