var sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var queryService = require('../QueryService.js');
var urlService = require('../UrlService.js');

describe('QueryService', function () {
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
            queryService.isValidLyric('blank space');
            urlService.getLyricSearchResults.should.have.been.calledWith('blank space');
        });

        it('should return true if search term is a valid lyric', function () {
            queryService.isValidLyric('blank space').should.equal(true);
        });
    });
});
