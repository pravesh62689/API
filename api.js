cconst express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/",(req,res)=>{
    const appId = "399e1e846802a323fce64169e51386bd";
    const City = req.body.cityName;
    const Units = "metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+City+"&units="+Units+"&appid="+appId;
    
    https.get(url,(response)=>{

        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const Description = weatherData.weather[0].description;
            const imageInfo = weatherData.weather[0].icon;
            const imageURL = " http://openweathermap.org/img/wn/"+imageInfo+"@2x.png";
            res.write("<h1>The Current Temperature at "+City+" is "+temp+"and Looks like"+Description+"</h1>");
            res.write("<img src="+imageURL+">");
            res.send();
        })
    })
})

app.listen(3000,()=>{
    console.log("successfully started");
})