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
                res.render('Movie', {
                    image: data.Poster != null ? data.Poster : "N/A",
                    title: data.Title != null ? data.Title : "N/A",
                    year: data.Year != null ? data.Year : "N/A",
                    release: data.Released != null ? data.Released : "N/A",
                    runtime: data.Runtime != null ? data.Runtime : "N/A",
                    genre: data.Genre != null ? data.Genre : "N/A",
                    director: data.Director != null ? data.Director : "N/A",
                    writer: data.Writer != null ? data.Writer : "N/A",
                    actors: data.Actors != null ? data.Actors : "N/A",
                    plot: data.Plot != null ? data.Plot : "N/A",
                    language: data.Language != null ? data.Language : "N/A",
                    country: data.Country != null ? data.Country : "N/A",
                    awards: data.Awards != null ? data.Awards : "N/A",
                    ratings: data.Ratings[0] != null ? data.Ratings[0].Value : "N/A",
                    imdb_ratings: data.imdbRating != null ? data.imdbRating : "N/A",
                    boxoffice: data.BoxOffice != null ? data.BoxOffice : "N/A"
                })
            }
        })
    })
})

app.listen(3000,function()
{
    console.log("Server started on port 3000");
})
