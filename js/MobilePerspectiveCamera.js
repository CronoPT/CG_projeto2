class MobilePerspectiveCamera extends THREE.PerspectiveCamera{
    
    
    constructor(ball, ballDistance, height, fov, aspect, near, far){
        super(fov, aspect, near, far);
        this.ballDistance = ballDistance;
        this.height = height;
        this.setBall(ball);
    }

    moveCamera(){
        var angle = this.ball.getAngle() + Math.PI;
        this.position.x = this.ball.position.x + (Math.sin(angle)* this.ballDistance);
        this.position.z = this.ball.position.z + (Math.cos(angle)* this.ballDistance);
        
        this.lookAt(this.ball.position);
        console.table([this.position, this.ball.position]);
    }
    
    setBall(ball){
        this.ball = ball;
        this.position.y = this.ball.radius + this.height;
        this.moveCamera();
    }

}