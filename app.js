var express = require("express");//import express package
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));//to use body parser
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/toDolist", { useNewUrlParser: true });

var toDoSchema = new mongoose.Schema({
    task: String
});

var ToDo = mongoose.model("ToDo", toDoSchema);

//ROUTES
app.get("/", function(req, res){
  res.redirect("/todo");
})

app.get("/todo", function(req, res){
  ToDo.find({}, function(err, todos){
    if(err){
      console.log("Error occurred! "+ err);
    } else {
      res.render("index", {todos: todos});
    }
  });
});

app.post("/new", function(req, res){
  var task = req.body.task;
  if(task !== ""){
    ToDo.create({task: req.body.task}, function(err, newTask){
      if(err){
        console.log(err);
      } else {
        console.log(newTask);
        res.redirect("/todo");
      }
    });
  } else{
    res.redirect("/todo");
  }
});

app.post("/delete", function(req, res){
  var id = req.body.id;
  console.log(id);
  ToDo.deleteOne({ _id: id }, function (err) {
    if(err){
      console.log(err);
    } else {
      res.redirect("/todo");
    }
  });
});

app.listen(9001, function(){
  console.log("Server is running!");
})
