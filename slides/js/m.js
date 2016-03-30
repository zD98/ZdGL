/**
 * Created by zd98 on 2016/3/29.
 */
var m = function(){
  
  return {
    create:function(){
      var m = new Float32Array(16);
      m[0] =1; m[1] = 0; m[2] = 0; m[3] =0;
      m[4] =0; m[5] = 1; m[6] = 0; m[7] =0;
      m[8] =0; m[9] = 0; m[10] = 1; m[11] =0;
      m[12] =0; m[13] = 0; m[14] = 0; m[15] =1;

      return m;
    },
    multiply :function(pre, fol){
      var dist = this.create();
      for (var i = 0; i < 16; i++) {
        var value = 0;
        for (var j = 0; j < 4; j++) {
          value += fol[j * 4 + i % 4] * pre[j + 4 * Math.floor((i / 4))];
        }
        dist[i] = value;
      }
      return dist;
    },
    scale : function(mat, vec3){
      var dist = this.create();
      for(let i = 0;i<12;i++){
        dist[i] = mat[i]*vec3(i/3);
      }
      for(let i = 12;i<16;i++){
        dist[i] = mat[i];
      }
      return dist;
    },
    translate : function(mat, vec3){
      var dist = this.create();
      for(let i = 0;i<12;i++){
        dist[i] = mat[i];
      }
      dist[12] = mat[0] * vec3[0] + mat[4] * vec3[1] + mat[8]  * vec3[2] + mat[12];
      dist[13] = mat[1] * vec3[0] + mat[5] * vec3[1] + mat[9]  * vec3[2] + mat[13];
      dist[14] = mat[2] * vec3[0] + mat[6] * vec3[1] + mat[10] * vec3[2] + mat[14];
      dist[15] = mat[3] * vec3[0] + mat[7] * vec3[1] + mat[11] * vec3[2] + mat[15];
      return dist
    },
    rotate:function(mat){

    },

    lookAt:function(eye,center,up){
      var dist;
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
      dist = this.multiply([
        u.x,u.y,u.z,0,
        v.x,v.y,v.z,0,
        n.x,n.y,n.z,0,
        0,0,0,1
      ],matrix);
      return dist;
    },
    perspective:function(){
      
    },
    transform:function(){
      
    }
  }
}();