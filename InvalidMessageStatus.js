var InvalidMessageStatus = function () {

};

InvalidMessageStatus.prototype.popUpMessage = function () {
    return "Oh no, that isn't a lyric! Please try again.";
};

module.exports = InvalidMessageStatus;