/**
 * Created by zd98 on 2016/3/26.
 */
var camera = function (){
  
  return {
    setCamera:setCamera
  };
  
  function setCamera(eye, center, up){
    var n = center.sub(eye);
    n.normalize();
    var u = up;
    u.normalize();
    u = u.cross(n);
    
    var v = n.cross(u);
    var x = -eye.x;
    var y = -eye.y;
    var z = -eye.z;
    var matrix = [
      1,0,0,x,
      0,1,0,y,
      0,0,1,z,
      0,0,0,1
    ];
    return Matrix.cross([
      u.x,u.y,u.z,0,
      v.x,v.y,v.z,0,
      n.x,n.y,n.z,0,
      0,0,0,1
    ],matrix);
  }
}();
