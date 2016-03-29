/**
 * Created by zd98 on 2016/3/25.
 */

function Matrix(matrix){
}

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
Matrix.genNormal = function(vertices, indices){
  
};
