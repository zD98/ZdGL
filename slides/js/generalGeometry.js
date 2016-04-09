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
function Sphere(r, row, column,color){
  let pos = [],nor = [], col = [], inx=[];
  for(let i =0 ;i<column+1;i++){
    //经度
    let a = Math.PI*2/column*i;
    
    let ca = Math.cos(a);
    let sa = Math.sin(a);
    for(let j = 0;j<row+1;j++){
      //纬度
      let b = Math.PI*2/row*j;
      let cb = Math.cos(b);
      let sb = Math.sin(b);
      let x = r*cb*ca;
      let y = r*sb;
      let z = r*cb*sa;

      if(color){
        var tc = color;
      }else{
        tc = hsva(360/row*i,1,1,1);
      }

      pos.push(x,y,z);
      nor.push(cb*ca,sb,cb*sa);
      col.push(tc[0],tc[1],tc[2],tc[3]);
    }
  }
  //general segments
  for(let i = 0;i<column;i++){
    for(let j = 0;j<row;j++){
      r = i*row+j;
      inx.push(r,r+row,r+1);
      inx.push(r+1,r+row+1,r+row);
    }
  }
  return {pos:pos,nor:nor,col:col,inx:inx};
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

function torusNT(row, column, irad, orad){
  var pos =[], tex = [],nor = [] ,idx = [];
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

      tex.push(ii/row,i/column);
    }
  }
  for(i = 0; i < row; i++){
    for(ii = 0; ii < column; ii++){
      r = (column + 1) * i + ii;
      idx.push(r, r + column + 1, r + 1);
      idx.push(r + column + 1, r + column + 2, r + 1);
    }
  }
  return [pos,nor,tex, idx];
}