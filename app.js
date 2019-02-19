const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//seedDB();

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
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
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
  res.render('campgrounds/new');
});

//Show - shows more info about one campground
app.get('/campgrounds/:id', (req, res) => {
  //find campgournd with provided ID
  Campground.findById(req.params.id)
    .populate('comments')
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show template with that campground
        res.render('campgrounds/show', { campground: foundCampground });
      }
    });
});

//============================
//Comments Routes
//============================

app.get('/campgrounds/:id/comments/new', (req, res) => {
  //Find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { campground: campground });
    }
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
  //Look up camground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      redirect('/campgrounds');
    } else {
      //Create new comment
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          //Connet new comment to campground
          campground.comments.push(comment);
          campground.save();
          //Redirect campground show page
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('The YelpCamp Sever has started!');
});
