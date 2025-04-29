import express from 'express'
import bodyParser from 'body-parser'
const app = express();
const port = 3000;


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/submit', (req, res) =>{
    const {username, email} = req.body;
    console.log('Received:', username, email);

    res.render('thankyou', {name: username, email: email});
})

app.listen(port, ()=> console.log(`server running at local host:${port}`));

