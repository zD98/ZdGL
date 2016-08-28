function Tetrahedron(opt){
    this.end = [0,0,0];
    this.position = opt.position || [0,0,0];
    this.r = 0;
    this.t = 0;
    this.durity = 1;
    this.tmpDis = [0,0,0];
    this.tempMatrix = [
            1,0,0,this.position[0],
            0,1,0,this.position[1],
            0,0,1,this.position[2],
            0,0,0,1    
    ];
}
Tetrahedron.prototype.setEnd = function(end,durity){
    this.end = end;
    this.durity = durity;
    this.t = 1;
}
Tetrahedron.prototype.setVeloty = function(){
    var x = this.end[0] - this.position[0];
    var y = this.end[1] - this.position[1];
    var z = this.end[2] - this.position[2];
    this.tmpDis[0] = x*this.t / this.durity;
    this.tmpDis[1] = y*this.t/ this.durity;
    this.tmpDis[2] = z*this.t  / this.durity;
    this.t++;
};
Tetrahedron.prototype.getMatrix = function (){
    var matrix = Matrix.rotate(this.tempMatrix,Math.PI/180,[1,0,0]);
    if(this.t<=this.durity){
        this.setVeloty();
        this.position[0] += this.tmpDis[0]; 
        this.position[1] += this.tmpDis[1]; 
        this.position[2] += this.tmpDis[2]; 
        matrix = Matrix.translate(matrix,this.position);
    }
    this.tempMatrix = matrix;
    if(this.t == 360){
        this.t = 0;
    }
    return matrix;
}
