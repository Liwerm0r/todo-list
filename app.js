const express = require('express'),
  app = express(),
  port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');

let newItems = ["Buy Food", "Cook Food", "Eat Food"];


app.get("/", (req, res) => {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const date = new Date().toLocaleDateString('en-EN', options);
  res.render('list', {
    date: date,
    newItems: newItems
  });
});


app.post("/", (req, res) => {
  newItems.push(req.body.newItem);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
