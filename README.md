before you run, check for dependencies:
npm install

to run program:
node app.js


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