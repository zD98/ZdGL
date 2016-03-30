/**
 * Created by zd98 on 2016/3/25.
 */

function Matrix(matrix){
  if(matrix==undefined||Object.prototype.toString.call(matrix) !== '[object Array]'){
    matrix = [
      1,0,0,0,
      0,1,0,0,
      0,0,1,0,
      0,0,0,1
    ];
  }
  this.matrix = matrix;
}

Matrix.prototype.transform = function(){
  let matrix = this.matrix;
  return [
    matrix[0],matrix[4],matrix[8],matrix[12],
    matrix[1],matrix[5],matrix[9],matrix[13],
    matrix[2],matrix[6],matrix[10],matrix[14],
    matrix[3],matrix[7],matrix[11],matrix[15]
  ];
};

Matrix.prototype.translate = function(){
  var mat = this.matrix;
  var dist = [];
  for(let i = 0;i<12;i++){
    dist[i] = mat[i];
  }
  dist[12] = mat[0] * vec3[0] + mat[4] * vec3[1] + mat[8]  * vec3[2] + mat[12];
  dist[13] = mat[1] * vec3[0] + mat[5] * vec3[1] + mat[9]  * vec3[2] + mat[13];
  dist[14] = mat[2] * vec3[0] + mat[6] * vec3[1] + mat[10] * vec3[2] + mat[14];
  dist[15] = mat[3] * vec3[0] + mat[7] * vec3[1] + mat[11] * vec3[2] + mat[15];
  return dist
};


Matrix.transform = function(matrix){
  return [
    matrix[0],matrix[4],matrix[8],matrix[12],
    matrix[1],matrix[5],matrix[9],matrix[13],
    matrix[2],matrix[6],matrix[10],matrix[14],
    matrix[3],matrix[7],matrix[11],matrix[15]
  ];
};

Matrix.cross = function(pre,fol) {
  var matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 0];
  for (var i = 0; i < 16; i++) {
    var value = 0;
    for (var j = 0; j < 4; j++) {
      value += fol[j * 4 + i % 4] * pre[j + 4 * Math.floor((i / 4))];
    }
    matrix[i] = value;
  }
  return matrix;
};
Matrix.multiply  = function(pre, fol){
  var matrix = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 0];
  for (var i = 0; i < 16; i++) {
    var value = 0;
    for (var j = 0; j < 4; j++) {
      value += fol[j * 4 + i % 4] * pre[j + 4 * Math.floor((i / 4))];
    }
    matrix[i] = value;
  }
  return matrix;
};
Matrix.scale = function (mat, vec3){
    var dist = [];
    for(let i = 0;i<12;i++){
      dist[i] = mat[i]*vec3(i/3);
    }
    for(let i = 12;i<16;i++){
      dist[i] = mat[i];
    }
    return dist;
};
Matrix.rotate = function(mat, angle, axis){
  var dist  ;
  var sq = Math.sqrt(axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]);
  if(!sq){return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];}
  var a = axis[0]/sq,b = axis[1]/sq,c = axis[2]/sq;
  var tc = Math.cos(angle); var ts = Math.sin(angle);
  var r = [
    a*a*(1-tc)+tc, a*b*(1-tc)+c*ts, a*c*(1-tc)-b*ts,0,
    a*b*(1-tc)-c*ts,b*b*(1-tc) +tc,b*c*(1-tc)+a*ts,0, 
    a*c*(1-tc)+b*ts,b*c*(1-tc) - a*ts,c*c*(1-tc)+tc,0,
    0,0,0,1
  ];
  console.log(mat);
  dist = Matrix.multiply(r, mat);
  return dist;

};
Matrix.translate = function(mat, vec3){
  var dist = [];
  for(let i = 0;i<12;i++){
    dist[i] = mat[i];
  }
  dist[12] = mat[0] * vec3[0] + mat[4] * vec3[1] + mat[8]  * vec3[2] + mat[12];
  dist[13] = mat[1] * vec3[0] + mat[5] * vec3[1] + mat[9]  * vec3[2] + mat[13];
  dist[14] = mat[2] * vec3[0] + mat[6] * vec3[1] + mat[10] * vec3[2] + mat[14];
  dist[15] = mat[3] * vec3[0] + mat[7] * vec3[1] + mat[11] * vec3[2] + mat[15];
  return dist
};
Matrix.lookAt = function(eye, center, up){
  eye = new Vector(eye[0],eye[1],eye[2]);
  center = new Vector(center[0],center[1], center[2]);
  up = new Vector(up[0],up[1],up[2]);
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
  return Matrix.multiply([
    u.x,u.y,u.z,0,
    v.x,v.y,v.z,0,
    n.x,n.y,n.z,0,
    0,0,0,1
  ],matrix);
};
Matrix.perspective  =  function(a,width,height,nZ,fZ){
  var matrix = [
    1,0,0,0,
    0,1,0,0,
    0,0,1,0,
    0,0,1,0];
  var tana = Math.tan(a/2.0);
  var ar = width/height;
  var k = (-nZ-fZ)/(nZ-fZ);
  var b = (2*fZ*nZ)/(nZ-fZ);
  matrix[0] = 1/(tana*ar);
  matrix[5] = 1/tana;
  matrix[10] = k;
  matrix[11] = b;
  return matrix;
};
Matrix.inverse = function(mat){
  
  var dist = [];
  var a = mat[0],  b = mat[1],  c = mat[2],  d = mat[3],
    e = mat[4],  f = mat[5],  g = mat[6],  h = mat[7],
    i = mat[8],  j = mat[9],  k = mat[10], l = mat[11],
    m = mat[12], n = mat[13], o = mat[14], p = mat[15],
    q = a * f - b * e, r = a * g - c * e,
    s = a * h - d * e, t = b * g - c * f,
    u = b * h - d * f, v = c * h - d * g,
    w = i * n - j * m, x = i * o - k * m,
    y = i * p - l * m, z = j * o - k * n,
    A = j * p - l * n, B = k * p - l * o,
    ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
  dist[0]  = ( f * B - g * A + h * z) * ivd;
  dist[1]  = (-b * B + c * A - d * z) * ivd;
  dist[2]  = ( n * v - o * u + p * t) * ivd;
  dist[3]  = (-j * v + k * u - l * t) * ivd;
  dist[4]  = (-e * B + g * y - h * x) * ivd;
  dist[5]  = ( a * B - c * y + d * x) * ivd;
  dist[6]  = (-m * v + o * s - p * r) * ivd;
  dist[7]  = ( i * v - k * s + l * r) * ivd;
  dist[8]  = ( e * A - f * y + h * w) * ivd;
  dist[9]  = (-a * A + b * y - d * w) * ivd;
  dist[10] = ( m * u - n * s + p * q) * ivd;
  dist[11] = (-i * u + j * s - l * q) * ivd;
  dist[12] = (-e * z + f * x - g * w) * ivd;
  dist[13] = ( a * z - b * x + c * w) * ivd;
  dist[14] = (-m * t + n * r - o * q) * ivd;
  dist[15] = ( i * t - j * r + k * q) * ivd;
  return dist;
};