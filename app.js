const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI //  // Call the getBeers method from the Punk API wrapper
  .getBeers()
  .then(beersFromApi => {   // Handle the successful response
    console.log("fetching beers");
    res.render('beers', { beers: beersFromApi });  // Render the 'beers' view, passing the beers data to it

  })
  .catch(error => {   // Handle any errors that occur during the API call
    console.log(error);
    res.render('error', { error: 'Error fetching beers' });   // Render an 'error' view, passing an error message

  });

  console.log("fetching beers");

});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getBeers()  // Fetch all beers
    .then(beersFromApi => {
      console.log("fetching a random beer");
      if (beersFromApi.length > 0) {
        const randomIndex = Math.floor(Math.random() * beersFromApi.length);  // Get a random index
        const randomBeer = beersFromApi[randomIndex];  // Select a random beer
        res.render('random-beer', { beer: randomBeer });  // Render the view with the random beer
      } else {
        res.render('error', { error: 'No beers available' });  // In case no beers are returned from the API
      }
    })
    .catch(error => {
      console.log(error);
      res.render('error', { error: 'Error fetching beers' });  // Render an error view in case of an API call failure
    });
});
  






app.listen(3000, () => console.log('🏃‍ on port 3000'));
