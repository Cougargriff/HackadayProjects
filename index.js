/* Express setup */
var express = require("express");
var app = express();



const port = 3000;

app.use(express.static("public"));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.set('views', './views')
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "hello from ejs", moreText: "another one another one another one" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
