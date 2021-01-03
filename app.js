const express = require('express'),
  app = express(),
  port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

// GET Requests

app.get("/", (req, res) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const date = new Date().toLocaleDateString('en-EN', options);
  res.render('list', {
    listTitle: date,
    newItems: items
  });
});

app.get("/work", (req, res) => {
  res.render('list', {
    listTitle: 'Work List',
    newItems: workItems
  });
});

app.get("/about", (req, res) => {
  res.render('about', {});
});


// POST Requests

app.post("/", (req, res) => {
  if ( req.body.list === "Work List" ) {
    workItems.push(req.body.newItem);
    res.redirect("/work")
  } else {
    items.push(req.body.newItem);
    res.redirect("/");
  }
});


app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
