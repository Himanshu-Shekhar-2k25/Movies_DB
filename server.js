const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const path = require('path')
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs')
app.set('views','./views')

app.get('/',function(req,res)
{
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
})

app.post('/',function(req,res)
{
    const movie = req.body.movie_name
    const year = req.body.yearOfRelease
    const apikey = '5aa6ab5e'
    const url = 'http://www.omdbapi.com/?t='+movie+'&y='+year+'&plot=full&apikey=5aa6ab5e'

    http.get(url, function(response)
    {
        response.on("data",function(data)
        {
            data = JSON.parse(data)

            if(data.Response == 'False')
            {
                const filePath = path.join(__dirname, 'index.html');
                res.sendFile(filePath);
            }
            else    
            {
                const filePath = path.join(__dirname, 'Movie.ejs');
                res.render(filePath,{image:data.Poster,title:data.Title,year:data.Year,release:data.Released,runtime:data.Runtime,genre:data.Genre,director:data.Director,writer:data.Writer,actors:data.Actors,plot:data.Plot,language:data.Language,country:data.Country,awards:data.Awards,ratings:data.Ratings[0].Value,imdb_ratings:data.imdbRating,boxoffice:data.BoxOffice})
            }
        })
    })
})

app.listen(3000,function()
{
    console.log("Server started on port 3000");
})
