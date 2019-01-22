const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/yelp_camp',
  { useNewUrlParser: true }
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//Schema setup
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image:
//       'https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//     description: 'A huge granite hill with no amenaties but greate view!'
//   },
//   (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(campground);
//     }
//   }
// );

app.get('/', (req, res) => {
  res.render('landing');
});

//Index Route - Shows all campgrounds
app.get('/campgrounds', (req, res) => {
  //Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { campgrounds: allCampgrounds });
    }
  });
  // res.render('campgrounds', { campgrounds: campgrounds });
});

//Create Route - Creates new campgrounds
app.post('/campgrounds', (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = { name: name, image: image, description: description };
  //Create a new campground and save to DB
  Campground.create(newCampground, (err, newlycreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
  // campgrounds.push(newCampground);
  // res.redirect('/campgrounds');
});

//NEW - Show form to create new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

//Show - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  //find campgournd with provided ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      //render show template with that campground
      res.render('show', { campground: foundCampground });
    }
  });
});

app.listen(3000, () => {
  console.log('The YelpCamp Sever has started!');
});
