const mongoose = require('mongoose');
const Campground = require('./models/campgrounds');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Clouds Rest',
    image:
      'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus similique sed enim voluptatem voluptatibus neque est nostrum consequatur, asperiores maxime illo quam possimus, omnis at provident voluptate ipsum autem. Voluptatum.'
  },
  {
    name: 'Star House',
    image:
      'https://images.unsplash.com/photo-1519708495087-ca1b71df408c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus similique sed enim voluptatem voluptatibus neque est nostrum consequatur, asperiores maxime illo quam possimus, omnis at provident voluptate ipsum autem. Voluptatum.'
  },
  {
    name: 'Snow Crest',
    image:
      'https://images.unsplash.com/photo-1520963959303-a5cc3bdf9260?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus similique sed enim voluptatem voluptatibus neque est nostrum consequatur, asperiores maxime illo quam possimus, omnis at provident voluptate ipsum autem. Voluptatum.'
  }
];

function seedDB() {
  //Remove all campgrounds
  Campground.deleteMany({}, err => {
    if (err) {
      console.log(err);
    } else {
      //Add a few campgrounds
      data.forEach(seed => {
        Campground.create(seed, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Campground Added');
            //Create a comment
            Comment.create(
              {
                text: 'This place is dope yo',
                author: 'The Dude'
              },
              (err, comment) => {
                if (err) {
                  console.log(err);
                } else {
                  data.comments.push(comment);
                  data.save();
                  console.log('Created a comment');
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = seedDB;
