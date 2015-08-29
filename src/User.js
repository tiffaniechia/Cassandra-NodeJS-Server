var User = function (parameters) {
    this.name = parameters.name;
    this.location = parameters.location;
    this.status = "";
};

User.prototype.getStatusMessage = function(){
  return this.status
};

module.exports = User;