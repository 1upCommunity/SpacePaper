class PlanetBase {
  constructor(name, scene, info) {
    this.name = name;
    this.scene = scene;
    this.info = info;
    this.mesh = null;

    let _light = new BABYLON.HemisphericLight(
      name,
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    _light.diffuse = new BABYLON.Color3(1, 1, 1);
    _light.specular = new BABYLON.Color3(1, 1, 1);
    _light.intensity = 1;
    this.light = _light;

    this.spin = [
        0, 0, 0
    ]
  }

  update() {
    this.frame += Math.random() * 0.01;
    try {
    this.mesh.rotation.x += this.spin[0];
    this.mesh.rotation.y += this.spin[1];
    this.mesh.rotation.z += this.spin[2];

      this._update();

      this.light.position = this.mesh.position;
    } catch {}
  }
}

class Earth extends PlanetBase {
    constructor(scene, info) {
        super("Earth", scene, info);
        this.mesh = null;
        this.loadMesh();
    }

    async loadMesh(){
        await BABYLON.SceneLoader.ImportMesh("", "models/earth/", "scene.gltf", this.scene, function (newMeshes) {
            this.mesh = newMeshes[0];
            this.mesh.rotationQuaternion = null;
            this.mesh.position.z = 180;
            this.mesh.position.y = -150;
            this.mesh.position.x = 50;
            this.mesh.receiveShadows = true;
            this.mesh.checkCollisions = true;
            this.mesh.isPickable = false;
            this.mesh.material = this.info[2].plastic;

            this.mesh.scaling.x = 2;
            this.mesh.scaling.y = 2;
            this.mesh.scaling.z = 2;
        }.bind(this));
    }

    _update() {
        this.mesh.rotation.y = new Date().getTime() / 500000;
        this.mesh.rotation.x = Math.sin(this.mesh.rotation.y) * 0.1;
        this.mesh.rotation.z = Math.cos(this.mesh.rotation.y) * 0.1;
    }
}
