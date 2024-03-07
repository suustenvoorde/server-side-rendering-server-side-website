// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'
const playlistsData = await fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// Maak een GET route voor de index
app.get('/', function(request, response) {
  response.render('index')
})

app.get('/lessons', function(request, response) {
  fetchJson('https://fdnd-agency.directus.app/items/tm_story?fields=id,title,summary,audio.audio_file,audio.speaker_profile.name').then((stories) => {
    response.render('lessons', {playlists: playlistsData.data, stories: stories.data})
  })
})

app.get('/all-stories', function(request, response) {
  response.render('all-stories')
})

app.get('/playlist:id', function(request, response) {
  response.render('playlist')
})

app.get('/story:id', function(request, response) {
  response.render('story')
})

app.get('/story-settings', function(request, response) {
  response.render('story-settings')
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})