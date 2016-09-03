function Tetrahedron(opt){
    this.end = [0,0,0];
    this.position = opt.position || [0,0,0];
    console.log(this.position)
    this.r = 0;
    this.t = 0;
    this.durity = 1;
    this.v = [0,0,0];
    this.mMatrix = [
            1,0,0,this.position[0],
            0,1,0,this.position[1],
            0,0,1,this.position[2],
            0,0,0,1    
    ];
    this.rMatrix = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    ]
    // this.rMatrix = Matrix.rotate(this.rMatrix,(Math.PI/180)*(Math.random()+1),[Math.random(),Math.random(),Math.random()]);
    this.rx = [Math.random(),Math.random(),Math.random()];
}
Tetrahedron.prototype.setEnd = function(end,durity){
    this.end = end;
    this.durity = durity;
    this.t = 1;
    this.setVeloty();
}
Tetrahedron.prototype.setVeloty = function(){
    var x = this.end[0] - this.position[0];
    var y = this.end[1] - this.position[1];
    var z = this.end[2] - this.position[2];
    var t= this.t / this.durity;
    this.v[0] =x * (1-(1-t)*(1-t));
    this.v[1] = y * (1-(1-t)*(1-t));
    this.v[2] = z * (1-(1-t)*(1-t));
};
Tetrahedron.prototype.getMatrix = function (){
    this.rMatrix = Matrix.rotate(this.rMatrix,Math.PI/180,this.rx);
    var matrix = this.mMatrix;
    if(this.t<=this.durity){
        this.position[0] = this.position[0] + this.v[0];
        this.position[1] = this.position[1] + this.v[1];
        this.position[2] = this.position[2] + this.v[2];
        matrix = Matrix.translate(matrix,this.position);
        this.setVeloty();
        this.t++;
    }else{
        this.t = 1;
        this.durity = 0;
    }
    this.mMatrix = matrix;
    return {
        mMatrix: this.mMatrix,
        rMatrix: this.rMatrix
    };
}
