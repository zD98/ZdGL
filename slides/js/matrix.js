/**
 * Created by zd98 on 2016/3/25.
 */
var matrix = {
  scale:scale,
  translate:translate
};

function scale(s){

}
function translate(x,y,z){
  return [
    1,0,0,x,
    0,1,0,y,
    0,0,1,z,
    0,0,0,1
  ];
}
