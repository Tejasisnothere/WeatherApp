import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
const app = express();
const port = 3000;


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/submit', async (req, res) => {
    const { lat, lon } = req.body;
    console.log('Received:', lat, lon);

    if (!lat || !lon) {
        let output = await getWeather();
        res.json(output);
    }
    else {
        let output = await getWeather(lat, lon);
        res.json(output);
        console.log(output);

    }


}
)

app.listen(port, () => console.log(`server running at local host:${port}`));


async function getWeather(lat = 19.07, lon = 72.87) {

    let API = '3668f8ada77036a46b51c9d72f411841';
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`)

    let datajson = await data.json()
    console.log(datajson)

    let object = {
        temp: Math.round(datajson.main.temp - 273.16),
        hum: datajson.main.humidity,
        speed: datajson.wind.speed,
        gust: datajson.wind.gust,
        main: datajson.weather[0].main,
        desc: datajson.weather[0].description,
        id: datajson.weather[0].id
    }
    return object;
}

