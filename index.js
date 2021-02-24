const express = require("express");
const https = require("https")

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res, next) => {
    const { city } = req.body
    const query = city
    apiKey = "<your openweather api key>"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(url, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            res.write(`<p>The Weather is currently ${weatherDescription}</p>`)
            res.write(`<h1>The Temperature in ${city} is ${temp} degrees Celcius</h1>`);
            res.write(`<img src="${imageUrl}">`)
            res.send();
        })
    })
})



app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}`);
});
