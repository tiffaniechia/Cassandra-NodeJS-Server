before you run, check for dependencies:
npm install

to run program:
node app.js

to run tests:
mocha test

lyrics API:
http://api.lyricsnmusic.com/api

sample lyric query search:
http://api.lyricsnmusic.com/songs?api_key=[YOUR_API_KEY]&lyrics=Imagine%20all%20the%20people


sample response contract:
[
    {
        "artist": {
            "name": "Coldplay",
            "url": "http://www.lyricsnmusic.com/coldplay"
        },
        "title": "Clocks",
        "url": "http://www.lyricsnmusic.com/coldplay/clocks-lyrics/5725306",
        "snippet": "The lights go out and I can't be saved\r\nTides that I tried to swim against\r\n...",
        "context": "\r\n\r\nConfusion that never stops\r\nThe closing walls and the ticking <em>clocks</em>",
        "viewable": true,
        "instrumental": false
    }
]

getLyricsMatch:
//just checks for matches from context parameter in response
// response returns a 'context' in which the API server picks out the phrase which it thinks matches the search best
// response wraps the 'matches' in '<em>' tags
// parsing this response it will return if the context matches the search.
//also currently just returns a count

getFullLyricsOfAllMatches:
// api returns non-consecutive word matches - returns results that matches any permutations of the search
    // example: 'I heaven sheep' would yield results even though there are no lyrics with these 3 consecutive words together
    // it would return results that matches 'I', 'heaven', 'sheep' or any permutations it can find
// to get full lyrics, first it checks for these matches
// find if lyric body is viewable
// gets the DOM from the url if viewable
// returns if the full lyric matches the search (currently just adds to count)