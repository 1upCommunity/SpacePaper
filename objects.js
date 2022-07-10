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

    let _light = new BABYLON.HemisphericLight(name, new BABYLON.Vector3(0, 1, 0), scene);
    _light.diffuse = new BABYLON.Color3(1, 1, 1);
    _light.specular = new BABYLON.Color3(1, 1, 1);
    _light.intensity = 1;
    this.light = _light;
	
    this.light.includedOnlyMeshes.push(this.mesh);
    
    this.spin = [
        (Math.random() * Math.PI * 2) / 300,
        (Math.random() * Math.PI * 2) / 140,
        (Math.random() * Math.PI * 2) / 280,
    ]

    this.move = [
        0, 0, 0
    ]

    this.frame = 0
    this.seeds = [
        Math.random()*100,
        Math.random()*100,
        Math.random()*100,
        Math.random()*100,
        Math.random()*100,
        Math.random()*100,
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
        this.frame += Math.random() * 0.01;
        try{
            if(this.floatmode.float){
                // get position
                let x = perlin.get(this.seeds[0], this.frame)
                let y = perlin.get(this.seeds[2], this.frame)
                let z = perlin.get(this.seeds[4], this.frame)

                // set position
                this.mesh.position.x += x/50;
                this.mesh.position.y += y/50;
                this.mesh.position.z += z/50;
            }
            if(this.floatmode.spin_random){
                // get spin
                let x = perlin.get(this.seeds[1], this.frame) * Math.PI * 2
                let y = perlin.get(this.seeds[3], this.frame) * Math.PI * 2
                let z = perlin.get(this.seeds[5], this.frame) * Math.PI * 2

                // set spin
                this.mesh.rotation.x += x/1000;
                this.mesh.rotation.y += y/1000;
                this.mesh.rotation.z += z/1000;
            }
            if(this.floatmode.spin){
                this.mesh.rotation.x += this.spin[0];
                this.mesh.rotation.y += this.spin[1];
                this.mesh.rotation.z += this.spin[2];
            }
            let pos = this.mesh.position
            this.setPosition(pos.x + this.move[0], pos.y + this.move[1], pos.z + this.move[2])

            this._update()

            this.light.position = this.mesh.position
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

class UI extends ObjectBase {
    constructor(scene, info) {
        super("UI", scene, info);
        this.mesh = null
        this.loadMesh();
    }

    async loadMesh(){
        await BABYLON.SceneLoader.ImportMesh("", "models/scifi-interior/", "scene.gltf", this.scene, function (newMeshes,) {
            this.mesh = newMeshes[0];
            this.mesh.rotationQuaternion = null;
            this.mesh.position.y = -50;
            this.mesh.position.x = -50;
            this.mesh.position.z = 20;
            this.mesh.rotation.y = Math.PI;
            this.mesh.receiveShadows = true;
            this.mesh.checkCollisions = true;
            this.mesh.isPickable = false;

            this.mesh.scaling.x = 0.2;
            this.mesh.scaling.y = 0.2;
            this.mesh.scaling.z = 0.02;

            // ambient light
            var ambient = new BABYLON.HemisphericLight("ambient", new BABYLON.Vector3(0, 1, 0), this.scene)
            this.ambient_light = ambient;
        }.bind(this));
    }
}
