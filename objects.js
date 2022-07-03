class ObjectBase {
  constructor(name, scene, info) {
    this.name = name;
    this.scene = scene;
    this.info = info;
    this.mesh = null;
    this.material = null;

    this.floatmode = {
        spin: false,
        float: false,
        spin_random: false,
        move_direction: false
    }

    this.spin = [
        (Math.random() * Math.PI * 2) / 300,
        (Math.random() * Math.PI * 2) / 140,
        (Math.random() * Math.PI * 2) / 280,
    ]
  }

    setPosition(x, y, z) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    setRotation(x, y, z) {
        this.mesh.rotation.x = x;
        this.mesh.rotation.y = y;
        this.mesh.rotation.z = z;
    }
    
    update(){
        if(this.floatmode.float){
            // get time
            let time = new Date().getTime() / 4000;
            let time2 = time * 0.5;
            let time3 = time * 0.25;
            let time4 = time * 0.125;

            // get position
            let x = perlin.get(time, time2) * 10
            let y = perlin.get(time3, time4) * 10
            let z = perlin.get(time4, time)

            // set position
            this.mesh.position.x = x;
            this.mesh.position.y = y;
            this.mesh.position.z = z;
        }
        if(this.floatmode.spin_random){
            let time = new Date().getTime() / 1000000;
            let time2 = time * 0.5;
            let time3 = time * 0.25;
            let time4 = time * 0.125;

            // get spin
            let x = perlin.get(time, time2) * 360
            let y = perlin.get(time3, time4) * 360
            let z = perlin.get(time4, time) * 360

            // set spin
            this.mesh.rotation.x = x;
            this.mesh.rotation.y = y;
            this.mesh.rotation.z = z;
        }
        if(this.floatmode.spin){
            this.mesh.rotation.x += this.spin[0];
            this.mesh.rotation.y += this.spin[1];
            this.mesh.rotation.z += this.spin[2];
        }
        if(this.floatmode.move_direction != false){
            this.mesh.rotation.x = 0;
            this.mesh.rotation.y = 0;
            this.mesh.rotation.z = 0;
            this.mesh.position.x += this.move_direction[0];
            this.mesh.position.y += this.move_direction[1];
            this.mesh.position.z += this.move_direction[2];
            if(this.floatmode.spin_random){
                let time = new Date().getTime() / 1000000;
                let time2 = time * 0.5;
                let time3 = time * 0.25;
                let time4 = time * 0.125;
    
                // get spin
                let x = perlin.get(time, time2) * 360
                let y = perlin.get(time3, time4) * 360
                let z = perlin.get(time4, time) * 360
    
                // set spin
                this.mesh.rotation.x = x;
                this.mesh.rotation.y = y;
                this.mesh.rotation.z = z;
            }
        }
    }
}

class WaterDrop extends ObjectBase {
    constructor(scene, info) {
        super("waterdrop", scene, info);
        this.mesh = BABYLON.Mesh.CreateSphere("waterdrop", 256, 5, scene);
        this.mesh.position.z = -4;
        this.mesh.material = this.info[2].water;
        this.mesh.receiveShadows = true;
        this.mesh.checkCollisions = true;
        this.mesh.isPickable = false;

        this.floatmode.float = true;
        this.floatmode.spin_random = true;
        this.move_direction = [
            80,
            (Math.random() * 2) - 1,
            (Math.random() * 2) - 1
        ]
    }
}
