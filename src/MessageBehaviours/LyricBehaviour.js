var LyricBehaviour = function (content) {
    this.content = content;
};

LyricBehaviour.prototype.displayContent = function () {
    return this.content;
};

module.exports = LyricBehaviour;