var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var compression = require("compression");
var indexRouter = require("./routes/index");
var topicRouter = require("./routes/topic");
var helmet = require("helmet");
app.use(helmet());

app.use(express.static("public")); // public 디렉토리 안에서 static 파일들을 찾겠다.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.use("/", indexRouter);
app.use("/topic", topicRouter);

// route, routing
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, function () {
  console.log(`Example app listening at http://localhost:3000`);
});
