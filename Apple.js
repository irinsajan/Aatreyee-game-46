//Creating the apple class
class Apple
{
//adding the properties to the constructor
    constructor(x,y,radius){

    var options={
        isStatic:false,
        restitution:0,
        friction:1,
        density:0.2
    }

//defining all the properties and also adding the images
         this.body = Bodies.circle(x, y, radius, options);
            
         this.radius=radius;
            
         World.add(world,this.body);  
         this.image = loadImage("images/apple.png");

    }
    display(){
//creating the angle
        var angle = this.body.angle;
//pusing all the properties 
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.radius*2, this.radius*2);
        pop();
  }
}
