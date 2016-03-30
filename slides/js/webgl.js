/**
 * Created by zd98 on 2016/3/30.
 */
function createVBO(gl,data){
  var vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER,null);
  return vbo;
}
function createIBO(gl,data){
  var ibo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
  return ibo;
}
function createProgram(vs, fs){

}
function createShader(gl, source, type){
  var shader= gl.createShader(type);
  source = document.getElementById(source).text;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}
function setAttribute(gl,vbos, attL,attS){
  for(let i =0;i<vbos.length;i++){
    gl.bindBuffer(gl.ARRAY_BUFFER, vbos[i]);
    gl.enableVertexAttribArray(attL[i]);
    gl.vertexAttribPointer(attL[i],attS[i],gl.FLOAT,false,0,0);
  }
}