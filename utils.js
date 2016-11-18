/**
 * Created by Waseem on 11/18/2016.
 */



Object.prototype.extend = function(obj) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      this[i] = obj[i];
    }
  }
};


