#  Cassandra + NodeJS + Lyric API Server Spike

[![Code Climate](https://codeclimate.com/github/tiffaniechia/Cassandra-NodeJS-Server/badges/gpa.svg)](https://codeclimate.com/github/tiffaniechia/Cassandra-NodeJS-Server)

Install dependencies:
```
brew install cassandra
brew install python
pip install cql
npm install
```
Run project:
```
node app.js
```

Run tests:
```javascript
//run once
gulp mocha

//trigger run on file change
gulp watch-mocha
```

Lyrics API:
```
http://api.lyricsnmusic.com/api
```

Search for lyrics by words in lyrics:
```
http://api.lyricsnmusic.com/songs?api_key=[YOUR_API_KEY]&lyrics=Tickingy%20Clocks
```

Response Contract:
```json
[
    {
        "artist": {
            "name": "Coldplay",
            "url": "http://www.lyricsnmusic.com/coldplay"
        },
        "title": "Clocks",
        "url": "http://www.lyricsnmusic.com/coldplay/clocks-lyrics/5725306",
        "snippet": "The lights go out and I can't be saved\r\nTides that I tried to swim against\r\n...",
        "context": "\r\n\r\nConfusion that never stops\r\nThe closing walls and the <em>ticking</em> <em>clocks</em>",
        "viewable": true,
        "instrumental": false
    }
]
```
Note About Response:

The API returns broad matches for search query. This means that searching for an invalid lyric such as 'heaven blank sheep' would yield results matching permutations of the search query.
