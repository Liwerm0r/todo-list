const express = require('express'),
  app = express(),
  date = require(`${__dirname}/date.js`),
  mongoose = require('mongoose'),
  _ = require('lodash'),
  port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');

////////////////////////////////////////////////////////////////////////////////
// ///////////////////      DB STUFF     ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true, useUnifiedTopology: true});
// create DB schema
const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({ name: "Welcome to your todolist!" });
const item2 = new Item({ name: "Hit the + button to add a new item." });
const item3 = new Item({ name: "<-- Hit this to delete an item." });
const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemSchema]
});

const List = mongoose.model('List', listSchema);

// GET Requests

app.get("/", (req, res) => {

  Item.find({}, (err, items ) => {

    if ( !items.length ) {
      Item.insertMany(defaultItems, (err) => {
        if ( err ) {
          console.log(err);
        } else {
          console.log("Successfully saved default items do DB.");
        }
      });
      res.redirect("/");
    }
    res.render('list', { listTitle: "Today", newItems: items });
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName }, (err, foundList) => {
    if ( !err ) {
      if ( !foundList ) {
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect(`/${customListName}`);
      } else {
        res.render('list', { listTitle: foundList.name, newItems: foundList.items});
      }
    }
  });
});

app.get("/about", (req, res) => {
  res.render('about', {});
});


// POST Requests

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

    const item = new Item({ name: req.body.newItem });
    if ( listName === "Today") {
      item.save();
      res.redirect("/");
    } else {
      List.findOne({ name: listName }, (err, foundList) => {
        foundList.items.push(item);
        foundList.save();
        res.redirect(`/${listName}`);
      });
    }
});

app.post("/delete", (req, res) => {
  const itemId = req.body.itemToDelete;
  const listName = req.body.list;

  if ( listName === "Today" ) {
    Item.findByIdAndRemove(itemId, {useFindAndModify: false}, (err) => {
      if ( !err ) {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull : { items: { _id: itemId }}}, (err, foundList) => {
      if ( !err ) {
        res.redirect(`/${listName}`);
      }
    });
  }


});


app.listen(port, () => {
  console.log(`Server is runnig on port: ${port}`);
});
