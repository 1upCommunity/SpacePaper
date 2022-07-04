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
    }

    this.spin = [
        (Math.random() * Math.PI * 2) / 300,
        (Math.random() * Math.PI * 2) / 140,
        (Math.random() * Math.PI * 2) / 280,
    ]

    this.move = [
        0, 0, 0
    ]
  }

    setPosition(x, y, z) {
        this.mesh.position.x = x;
        this.mesh.position.y = y;
        this.mesh.position.z = z;
    }

    setRotation(x, y, z) {
        this.mesh.rotate(x, y, z);
    }
    
    _update(){}
    
    update(){
        try{
            if(this.floatmode.float){
                // get time
                let time = new Date().getTime() / 4000;
                let time2 = time * 0.5;
                let time3 = time * 0.25;
                let time4 = time * 0.125;

                // get position
                let x = perlin.get(time, time2)
                let y = perlin.get(time3, time4)
                let z = perlin.get(time4, time)

                // set position
                this.mesh.position.x += x/100;
                this.mesh.position.y += y/100;
                this.mesh.position.z += z/100;
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
            let pos = this.mesh.position
            this.setPosition(pos.x + this.move[0], pos.y + this.move[1], pos.z + this.move[2])

            this._update()
        } catch {}
    }
}

class WaterDrop extends ObjectBase {
    constructor(scene, info) {
        super("waterdrop", scene, info);
        this.mesh = BABYLON.Mesh.CreateSphere("waterdrop", 16, 5, scene);
        this.mesh.position.z = -20;
        this.mesh.material = this.info[2].water;
        this.mesh.receiveShadows = true;
        this.mesh.checkCollisions = true;
        this.mesh.isPickable = false;

        this.floatmode.float = true;
        this.floatmode.spin_random = true;
    }

    _update() {
        let time = new Date().getTime() / 100000;
        var positions = this.mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        for (var i = 0; i < positions.length; i += 3) {
            positions[i] += Math.random(Math.sin(time + i / 3)) * 0.01;
            positions[i + 1] += Math.random(Math.cos(time + i / 3)) * 0.01;
            positions[i + 2] += Math.random(Math.sin(time + i / 3)) * 0.01;
        }
        this.mesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions, true);
    }
}

class iPad extends ObjectBase {
    constructor(scene, info) {
        super("iPad", scene, info);
        this.mesh = null
        this.floatmode.float = true;
        this.floatmode.spin_random = true;
        this.loadMesh();
    }

    async loadMesh(){
        await BABYLON.SceneLoader.ImportMesh("", "models/ipad_mini/", "scene.gltf", this.scene, function (newMeshes) {
            this.mesh = newMeshes[0];
            this.mesh.rotationQuaternion = null;
            this.mesh.position.z = -20;
            this.mesh.receiveShadows = true;
            this.mesh.checkCollisions = true;
            this.mesh.isPickable = false;
            this.mesh.material = this.info[2].plastic;

            this.mesh.scaling.x = 0.01;
            this.mesh.scaling.y = 0.01;
            this.mesh.scaling.z = 0.01;
        }.bind(this));
    }
}

class Pen extends ObjectBase {
    constructor(scene, info) {
        super("pen", scene, info);
        this.mesh = null
        this.floatmode.float = true;
        this.floatmode.spin_random = true;
        this.loadMesh();
    }

    async loadMesh(){
        await BABYLON.SceneLoader.ImportMesh("", "models/pen/", "scene.gltf", this.scene, function (newMeshes) {
            this.mesh = newMeshes[0];
            this.mesh.rotationQuaternion = null;
            this.mesh.position.z = -20;
            this.mesh.position.y = 5
            this.mesh.position.x = -5
            this.mesh.receiveShadows = true;
            this.mesh.checkCollisions = true;
            this.mesh.isPickable = false;

            this.mesh.scaling.x = 0.3;
            this.mesh.scaling.y = 0.3;
            this.mesh.scaling.z = 0.3;
        }.bind(this));
    }
}

class Diary extends ObjectBase {
    constructor(scene, info) {
        super("diary", scene, info);
        this.mesh = null
        this.floatmode.float = true;
        this.floatmode.spin_random = true;
        this.loadMesh();
    }

    async loadMesh(){
        await BABYLON.SceneLoader.ImportMesh("", "models/low_poly_bookdiary/", "scene.gltf", this.scene, function (newMeshes,) {
            this.mesh = newMeshes[0];
            this.mesh.rotationQuaternion = null;
            this.mesh.position.z = -20;
            this.mesh.position.y = 5
            this.mesh.position.x = 5
            this.mesh.receiveShadows = true;
            this.mesh.checkCollisions = true;
            this.mesh.isPickable = false;

            this.mesh.scaling.x = 10;
            this.mesh.scaling.y = 10;
            this.mesh.scaling.z = 10;
        }.bind(this));
    }
}
