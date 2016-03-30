/**
 * Created by zd98 on 2016/3/30.
 */
function circle (row){
  var pos = [],inx = [];
  var R =0.5,r = 0.2;
  for(var i =0 ;i<=row;i++){
    var a = Math.PI *2 / row *i;
    var x1 = R*Math.cos(a);
    var y1 = R*Math.sin(a);
    var z = 0;
    var x2 = r*Math.cos(a);
    var y2 = r*Math.sin(a);
    pos.push(x1,y1,z,x2,y2,z);
  }

  for(var j = 0;j<row*2;j++){
    inx.push(j,j+1,j+2);
  }

  return　[pos,inx];
}

function torus(row, column, irad, orad){
  var pos =[], col = [], idx = [];
  for(var i = 0; i <= row; i++){
    var r = Math.PI * 2 / row * i;
    var rr = Math.cos(r);
    var ry = Math.sin(r);
    for(var ii = 0; ii <= column; ii++){
      var tr = Math.PI * 2 / column * ii;
      var tx = (rr * irad + orad) * Math.cos(tr);
      var ty = ry * irad;
      var tz = (rr * irad + orad) * Math.sin(tr);
      pos.push(tx, ty, tz);
      var tc = hsva(360 / column * ii, 1, 1, 1);
      col.push(tc[0], tc[1], tc[2], tc[3]);
    }
  }
  for(i = 0; i < row; i++){
    for(ii = 0; ii < column; ii++){
      r = (column + 1) * i + ii;
      idx.push(r, r + column + 1, r + 1);
      idx.push(r + column + 1, r + column + 2, r + 1);
    }
  }
  return [pos, col, idx];
}

function torusN(row, column, irad, orad){
  var pos =[], col = [],nor = [] ,idx = [];
  for(var i = 0; i <= row; i++){
    var r = Math.PI * 2 / row * i;
    var rr = Math.cos(r);
    var ry = Math.sin(r);
    for(var ii = 0; ii <= column; ii++){
      var tr = Math.PI * 2 / column * ii;
      var tx = (rr * irad + orad) * Math.cos(tr);
      var ty = ry * irad;
      var tz = (rr * irad + orad) * Math.sin(tr);
      
      var rx = rr * Math.cos(tr);
      var rz = rr * Math.sin(tr);
      pos.push(tx, ty, tz);
      nor.push(rx,ry,rz);
      var tc = hsva(360 / column * ii, 1, 1, 1);
      col.push(tc[0], tc[1], tc[2], tc[3]);
    }
  }
  for(i = 0; i < row; i++){
    for(ii = 0; ii < column; ii++){
      r = (column + 1) * i + ii;
      idx.push(r, r + column + 1, r + 1);
      idx.push(r + column + 1, r + column + 2, r + 1);
    }
  }
  return [pos,nor,col, idx];
}