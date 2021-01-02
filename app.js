const express = require('express'),
  app = express(),
  port = 3000;

app.use(express.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  var today = new Date().getDay();
  var day = "";

  switch (today) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error");
  }
  res.render('list', {
    day: day
  });
});

app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
