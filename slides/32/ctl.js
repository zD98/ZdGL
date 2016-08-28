function Ctl (option){
    this.option = {};
    this.option.canvas = option.canvas || '';
    this.option.vertexShader = option.vertexShader||'';
    this.option.fragShader = option.fragmentShader || '';
    this.objs = [];
    this._init();
}
Ctl.prototype._init = function (){
    this.canvas = document.querySelector(this.option.canvas);
    this.canvas.width = 1200;
    this.canvas.height = 900;
    this.gl = this.canvas.getContext('webgl');
    var gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this._createProgram(gl,this.option.vertexShader,this.option.fragShader)
    this._initGL();
}
Ctl.prototype._initGL = function(){
    var gl = this.gl;
    this._initCamera();
    
    var v = triangle([0,0,0],1);
    var vbos = [],attL = [],attS = [];
    vbos[0] = this._createVBO(v[0]);
    attL[0] = gl.getAttribLocation(this.program, "aVertexPosition");
    attS[0] = 3;
    console.log(v[0])
    this.setAttribute(vbos,attL,attS);
    var ibo = this._createIBO(v[1]);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);
    
    var VPMatrixLocation = gl.getUniformLocation(this.program,"vpMatrix");
    this.pvMatrix = Matrix.transform(this.pvMatrix)
    gl.uniformMatrix4fv(VPMatrixLocation, 0, this.pvMatrix);
}
Ctl.prototype._initCamera = function (){
    var project = this._setPerspectiveProj(Math.PI/2,400,300,1,100);
    var eye = new Vector(0,0,50);
    var center = new Vector(0,0,0);
    var up = new Vector(0,1,0);
    var view = this._setCamera(eye, center, up);  
    this.pvMatrix = Matrix.cross(project,view);
}
Ctl.prototype._setPerspectiveProj = function(a,width,height,nZ,fZ){
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
        return  matrix;
}
Ctl.prototype._setCamera = function(eye, center, up){
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
Ctl.prototype._createVBO = function (data){
    var gl = this.gl;
    var vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,null);
    return vbo;
};

Ctl.prototype._createIBO = function (data) {
    var gl = this.gl;
    var ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(data),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,null);
    return ibo;
}
Ctl.prototype.setAttribute = function (vbos,attL, attS){
    var gl = this.gl;
    for(var i =0;i<vbos.length;i++){
        gl.bindBuffer(gl.ARRAY_BUFFER, vbos[i]);
        gl.enableVertexAttribArray(attL[i]);
        gl.vertexAttribPointer(attL[i],attS[i],gl.FLOAT,false,0,0);
    }
}
Ctl.prototype.addObj = function (){

}
Ctl.prototype.render = function (){
    var gl = this.gl;
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    var mMatrixLocation = gl.getUniformLocation(this.program,"mMatrix");
    var tempMatrix = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
    ];
    for(var i = 0;i<this.objs.length;i++){
        
        // var mMatrix = Matrix.translate(tempMatrix,[0,i*3,0]);
        // mMatrix = Matrix.transform(mMatrix);
        var mMatrix = objs[i].getMatrix();
        mMatrix = Matrix.transform(mMatrix); 
        gl.uniformMatrix4fv(mMatrixLocation, false, mMatrix);
        gl.drawElements(gl.TRIANGLES,12,gl.UNSIGNED_SHORT,0);
    }
    // let mMatrix = Matrix.rotate(tempMatrix,0.5,[1,0,0]);

    gl.flush();
    
    var error = gl.getError();
    while(error){
        console.log(error);
        error = gl.getError();
    }
    requestAnimationFrame(this.render.bind(this));
};
Ctl.prototype._createProgram = function(gl,vShader, fShader){
    var program = gl.createProgram();
    var vertexShader = this._createShader(gl,vShader,gl.VERTEX_SHADER);
    var fragShader = this._createShader(gl, fShader, gl.FRAGMENT_SHADER);
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("Unable to initialize the shader program.");
    }
    this.program = program;
    gl.useProgram(program);
};
Ctl.prototype._createShader = function(gl, source, type){
    var shader= gl.createShader(type);
    source = document.getElementById(source).text;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}
Ctl.prototype.createVertex = function(cb){
}

Ctl.prototype.setObjs = function(objs){ 
    this.objs = objs;
};

