const express = require('express'),
      app = express(),
      port = 3000;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  var today = new Date();

  if ( today.getDay() === 6 || today.getDay() === 0 ) {
    res.sendFile(`${__dirname}/index.html`);
  } else {
    res.write("<h1>Boo! I have to work!</h1>");
  }
})

app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
