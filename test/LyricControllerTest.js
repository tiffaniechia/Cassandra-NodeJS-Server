var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var lyricController = require('../src/LyricController.js');
var urlService = require('../src/UrlService.js');

describe('Lyric Controller', function () {
    before(function() {
        var stubbedResponseResults =  [
            {
                "context": "<em>Blank</em>, <em>space</em>",
                "instrumental": false,
                "snippet": "Blank Space Lyric Snippet",
                "title": "Blank Space",
                "url": "Blank space URL",
                "viewable": true,
                "artist": {
                    "name": "Taylor Swift",
                    "url": "Taylor Swift URL"
                }
            }
        ];

        sinon.stub(urlService, 'getLyricSearchResults', function (searchterm) {
            return JSON.stringify(stubbedResponseResults);
        });
    });

    describe('#isLyricValid', function () {
        it('should call getLyricSearchResults with search term', function(){
            lyricController.isValidLyric('blank space');
            urlService.getLyricSearchResults.should.have.been.calledWith('blank space');
        });

        it('should return true if search term is a valid lyric', function () {
            lyricController.isValidLyric('blank space').should.equal(true);
        });

        it('should return false if search term is an invalid lyric', function () {
            lyricController.isValidLyric('blank interrupting words space').should.equal(false);
        });

        it('should parse out symbols from search terms and response results', function () {
            lyricController.isValidLyric('blank space!').should.equal(true);
        });

    });
});
