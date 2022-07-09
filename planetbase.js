class PlanetBase {
  constructor(name, scene, info) {
    this.name = name;
    this.scene = scene;
    this.info = info;
    this.meshes = [];

    let _light = new BABYLON.HemisphericLight(
      name,
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    _light.intensity = 10;
    this.lights = [_light];

    this.spin = [
    ]
  }
  
  addMesh(mesh, spin){
    this.meshes.push(mesh);
    this.spin.push(spin);

    mesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
  }

  update() {
    
    this.frame += Math.random() * 0.01;
    try {
      for (let i = 0; i < this.meshes.length; i++) {
        this.meshes[i].rotation.x = new Date().getTime() * this.spin[i][0];
        this.meshes[i].rotation.y = new Date().getTime() * this.spin[i][1];
        this.meshes[i].rotation.z = new Date().getTime() * this.spin[i][2];
      }
    } catch {}
  }

  hide() {
    for (let i = 0; i < this.meshes.length; i++) {
      this.meshes[i].isVisible = false;
    }
  }

  show() {
    for (let i = 0; i < this.meshes.length; i++) {
      this.meshes[i].isVisible = true;
    }
  }
}

class Sun extends PlanetBase {
  constructor(scene, info) {
      super("Sun", scene, info);

      // ground
      let sunTexture = new BABYLON.StandardMaterial("sunTexture", this.scene);
      sunTexture.diffuseTexture = new BABYLON.Texture(
        "./assets/sun.jpg",
        this.scene
      );

      let sun = BABYLON.Mesh.CreateSphere(
        "sun",
        128,
        500,
        this.scene
      );
      sun.material = sunTexture;
      sun.position.z = 250;
      sun.position.y = -180;
      sun.position.x = 50;

      this.addMesh(sun, [0, 0.0000003, 0]);
      this.hide()
  }
}

class Mercury extends PlanetBase {
  constructor(scene, info) {
      super("Mercury", scene, info);

      // ground
      let mercuryTexture = new BABYLON.StandardMaterial("mercuryTexture", this.scene);
      mercuryTexture.diffuseTexture = new BABYLON.Texture(
        "./assets/mercury.jpg",
        this.scene
      );

      let mercury = BABYLON.Mesh.CreateSphere(
        "mercury",
        128,
        500,
        this.scene
      );
      mercury.material = mercuryTexture;
      mercury.position.z = 250;
      mercury.position.y = -180;
      mercury.position.x = 50;

      this.addMesh(mercury, [0, 0.0000003, 0]);
      this.hide()
  }
}

class Venus extends PlanetBase {
  constructor(scene, info) {
      super("Venus", scene, info);

      // ground
      let venusTexture = new BABYLON.StandardMaterial("venusTexture", this.scene);
      venusTexture.diffuseTexture = new BABYLON.Texture(
        "./assets/venus.jpg",
        this.scene
      );
      // atmosphere
      let venusAtmosphere = new BABYLON.StandardMaterial("venusAtmosphere", this.scene);
      venusAtmosphere.diffuseTexture = new BABYLON.Texture(
        "./assets/venus_atmosphere.jpg",
        this.scene
      );
      venusAtmosphere.diffuseTexture.hasAlpha = true;
      venusAtmosphere.alpha = 0.6;

      let venus = BABYLON.Mesh.CreateSphere(
        "venus",
        128,
        500,
        this.scene
      );
      venus.material = venusTexture;
      venus.position.z = 250;
      venus.position.y = -180;
      venus.position.x = 50;

      let venusAtmosphereMesh = BABYLON.Mesh.CreateSphere(
        "venusAtmosphere",
        128,
        505,
        this.scene
      );
      venusAtmosphereMesh.material = venusAtmosphere;
      venusAtmosphereMesh.position.z = 250;
      venusAtmosphereMesh.position.y = -180;
      venusAtmosphereMesh.position.x = 50;

      this.addMesh(venus, [0, 0.0000003, 0]);
      this.addMesh(venusAtmosphereMesh, [0, 0.0000005, 0]);
      this.hide()
  }
}


class Earth extends PlanetBase {
    constructor(scene, info) {
        super("Earth", scene, info);

        // ground
        let earthTexture = new BABYLON.StandardMaterial("earthTexture", this.scene);
        earthTexture.diffuseTexture = new BABYLON.Texture(
          "./assets/earth.jpg",
          this.scene
        );
        // atmosphere
        let earthAtmosphere = new BABYLON.StandardMaterial("earthAtmosphere", this.scene);
        earthAtmosphere.diffuseTexture = new BABYLON.Texture(
          "./assets/earth_atmosphere.jpg",
          this.scene
        );
        earthAtmosphere.diffuseTexture.hasAlpha = true;
        earthAtmosphere.alpha = 0.5;

        let earth = BABYLON.Mesh.CreateSphere(
          "earth",
          128,
          500,
          this.scene
        );
        earth.material = earthTexture;
        earth.position.z = 250;
        earth.position.y = -180;
        earth.position.x = 50;

        let earthAtmosphereMesh = BABYLON.Mesh.CreateSphere(
          "earthAtmosphere",
          128,
          505,
          this.scene
        );
        earthAtmosphereMesh.material = earthAtmosphere;
        earthAtmosphereMesh.position.z = 250;
        earthAtmosphereMesh.position.y = -180;
        earthAtmosphereMesh.position.x = 50;

        this.addMesh(earth, [0, 0.0000003, 0]);
        this.addMesh(earthAtmosphereMesh, [0, 0.0000005, 0]);
        this.hide()
    }
}

class Mars extends PlanetBase {
  constructor(scene, info) {
      super("Mars", scene, info);

      // ground
      let marsTexture = new BABYLON.StandardMaterial("marsTexture", this.scene);
      marsTexture.diffuseTexture = new BABYLON.Texture(
        "./assets/mars.jpg",
        this.scene
      );

      let mars = BABYLON.Mesh.CreateSphere(
        "mars",
        128,
        500,
        this.scene
      );
      mars.material = marsTexture;
      mars.position.z = 250;
      mars.position.y = -180;
      mars.position.x = 50;

      this.addMesh(mars, [0, 0.0000003, 0]);
      this.hide()
  }
}

class Jupiter extends PlanetBase {
  constructor(scene, info) {
      super("Jupiter", scene, info);

      // ground
      let jupiterTexture = new BABYLON.StandardMaterial("jupiterTexture", this.scene);
      jupiterTexture.diffuseTexture = new BABYLON.Texture(
        "./assets/jupiter.jpg",
        this.scene
      );

      let jupiter = BABYLON.Mesh.CreateSphere(
        "jupiter",
        128,
        500,
        this.scene
      );
      jupiter.material = jupiterTexture;
      jupiter.position.z = 250;
      jupiter.position.y = -180;
      jupiter.position.x = 50;

      this.addMesh(jupiter, [0, 0.0000003, 0]);
      this.hide()
  }
}

class Saturn extends PlanetBase {
  constructor(scene, info) {
      super("Saturn", scene, info);

      // ground
      let saturnTexture = new BABYLON.StandardMaterial("saturnTexture", this.scene);
      saturnTexture.diffuseTexture = new BABYLON.Texture(
        "./assets/saturn.jpg",
        this.scene
      );

      let saturn = BABYLON.Mesh.CreateSphere(
        "saturn",
        128,
        500,
        this.scene
      );
      saturn.material = saturnTexture;
      saturn.position.z = 250;
      saturn.position.y = -180;
      saturn.position.x = 50;

      this.addMesh(saturn, [0, 0.0000003, 0]);
      this.hide()
  }
}

function createPlanets(scene, info){
  let planets = [];
  planets.push(new Mercury(scene, info));
  planets.push(new Venus(scene, info));
  planets.push(new Earth(scene, info));
  planets.push(new Mars(scene, info));
  planets.push(new Jupiter(scene, info));
  planets.push(new Saturn(scene, info));
  return planets;
}
