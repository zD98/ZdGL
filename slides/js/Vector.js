/**
 * Created by zd98 on 2016/3/26.
 */
function Vector(x,y,z) {
  this.x = x||0;
  this.y = y||0;
  this.z = z||0;
}

Vector.prototype.normalize = function(){
  var x = this.x,y = this.y,z= this.z;
  var len = Math.sqrt(x*x+y*y+z*z);
  this.x = x/len;
  this.y = y/len;
  this.z = z/len;
};

Vector.prototype.cross = function(vector){
  var nV = new Vector();
  nV.x = this.y*vector.z - this.z*vector.y;
  nV.y = this.z*vector.x - this.x*vector.z;
  nV.z = this.x*vector.y - this.y*vector.x;
  return nV;
};

Vector.prototype.dot = function(vector){
  
};

Vector.prototype.sub = function(vector){
  var nV = new Vector();
  nV.x = this.x - vector.x;
  nV.y = this.y - vector.y;
  nV.z = this.z - vector.z;
  return nV;
};

Vector.prototype.add = function (vector) {
  var nV = new Vector();
  nV.x = this.x - vector.x;
  nV.y = this.y - vector.y;
  nV.z = this.z - vector.z;
  return nV;
};