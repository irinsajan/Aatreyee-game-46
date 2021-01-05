//crating the slingshot class
class SlingShot{
//Adding the constructor and the bodies to attach
    constructor(bodyA, pointB){
//Giving the properties
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 60
        }
// Adding the point B , declraing the sling as a constraint body and also adding it to the world
            this.pointB = pointB;
            this.sling = Constraint.create(options);
            World.add(world, this.sling);
       
        
    }

// Adding the fly function
    fly(){
         this.sling.bodyA = null;
    }
//Adding the attach function
    attach(body){
         this.sling.bodyA = body;
    }

    display(){
        
//Giving an if statement that if sling is body A then create the link betweeen body A and point B
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(4);
            line(pointA.x,pointA.y,pointB.x,pointB.y);
            
        } 
    }
    
}
