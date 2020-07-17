const express=require("express");
const https = require("https");
const bodyParser =require("body-parser");

const app =express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req , res){
 res.sendFile(__dirname + "/index.html");
});
app.post("/",function(req,res){
  const nam = req.body.n1;



  const url ="https://api.openweathermap.org/data/2.5/weather?q="+ nam +"&appid=703459f9dc695c2c6cd7603d4d864d97&units=metric"
  https.get(url ,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata  =JSON.parse(data)
      const temp = weatherdata.main.temp
      const name = weatherdata.name
      const weatherdisc = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imgurl ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<p1>the weather is currently" + weatherdisc +"</p1>");
      res.write("<h1>temperature in  " +  name   +"  is " + temp + "  degress celcius</h1>");
      res.write("<img src= "+imgurl+">") ;
      res.send()
    })
  })
})

app.listen(3000,function () {
console.log("server is running on port 3000")  ;
});
