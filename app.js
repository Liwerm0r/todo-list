const express = require('express'),
  app = express(),
  port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');

let newItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];


app.get("/", (req, res) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const date = new Date().toLocaleDateString('en-EN', options);
  res.render('list', {
    listTitle: date,
    newItems: newItems
  });
});

app.get("/work", (req, res) => {
  res.render('list', {
    listTitle: 'Work List',
    newItems: workItems
  });
});

// app.post("/work", (req, res) => {
//   console.log(req.body);
//   workItems.push(req.body.newItem);
//   res.redirect("/work");
// });


app.post("/", (req, res) => {
  if ( req.body.list === "Work List") {
    workItems.push(req.body.newItem);
    res.redirect("/work")
  } else {
    newItems.push(req.body.newItem);
    res.redirect("/");
  }
});


app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
