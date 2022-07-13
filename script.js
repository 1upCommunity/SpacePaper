const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var materials = {};
var meshes = [];
let lights = [];
let objects = [];

function createMaterials(scene, meshes, lights){
    const _eqTexture = new BABYLON.EquiRectangularCubeTexture('assets/skybox.jpg', scene, 512);
    const eqTexture = new BABYLON.EquiRectangularCubeTexture('assets/milky_way.jpg', scene, 512);

    for (var i = 0; i < meshes.length; i++) {
        meshes[i].checkCollisions = true;
    }

    var water = new BABYLON.WaterMaterial("water_material", scene);
    water.backFaceCulling = false;
	water.bumpTexture = new BABYLON.Texture("assets/waterbump.png", scene);
	water.windForce = 20;
	water.waveHeight = 0.0;
	water.bumpHeight = 1;
    water.bumpLength = 6;
	water.waveLength = 0.8;
	water.colorBlendFactor = 0.2;
    water.alpha = 0.5;
    for (var i = 0; i < meshes.length; i++) {
        water.addToRenderList(meshes[i]);
    }

    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = eqTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    var glass = new BABYLON.StandardMaterial("glass", scene);
	glass.backFaceCulling = false;
	glass.reflectionTexture = _eqTexture;
	glass.reflectionTexture.coordinatesMode = BABYLON.Texture.CUBE;
	glass.diffuseColor = new BABYLON.Color3(0, 0, 0);
	glass.specularColor = new BABYLON.Color3(0, 0, 0);
    glass.reflectionTexture.level = 1;
    glass.alpha = 0.1;
    glass.alphaMode = BABYLON.Engine.ALPHA_COMBINE;

    var plastic = new BABYLON.StandardMaterial("plastic", scene);
    plastic.backFaceCulling = false;
    plastic.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    plastic.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    plastic.specularPower = 1;
    plastic.alphaMode = BABYLON.Engine.ALPHA_COMBINE;

    materials.water = water;
    materials.skybox = skyboxMaterial;
    materials.glass = glass;
    materials.plastic = plastic;
}

let state = {
    alarm: false,
    planet: false,
}


let camera, _ui, planets;

function getState() {
    let time = new Date().getTime();

    // alarm state
    let alarmnoise = Math.abs(perlin.get(time / 50000, 0));
    if (alarmnoise < 0.1) {
        state.alarm = true;
    } else {
        state.alarm = false;
    }

    // set planet value from false, to 0 to 5
    let planetnoise = Math.round(perlin.get(time / 10000000, 1)*25);
    if(planetnoise < 0) {
        state.planet = false;
    } else {
        if(planetnoise > 5) {
            state.planet = 5;
        } else {
            state.planet = planetnoise;
        }
    }
}

// Add your code here matching the playground format
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    scene.fogStart = 0;
    scene.fogEnd = 100;
    scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    scene.fogDensity = 0.0;

    // create a red ambient light
    let _light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    _light.diffuse = new BABYLON.Color3(1, 0, 0);
    _light.specular = new BABYLON.Color3(1, 0, 0);
    _light.intensity = 0;
    lights.push(_light)

    let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);

    // create the window
    const _window = BABYLON.Mesh.CreateBox("box", 1, scene);
    _window.scaling.x = 150;
    _window.scaling.y = 150;
    _window.scaling.z = 0.1;
    _window.position.z = 25

    // create the wall
    const wallup = BABYLON.Mesh.CreateBox("wallup", 1, scene);
    wallup.scaling.x = 178;
    wallup.scaling.y = 1;
    wallup.scaling.z = 150;
    wallup.position.y = 60;
    wallup.position.z = -60;

    meshes.push(_window);
    meshes.push(wallup);

    // materials
    createMaterials(scene, meshes, lights);
    _window.material = materials.glass;
    wallup.material = materials.plastic;
    skybox.material = materials.skybox;
    skybox.infiniteDistance = true;

    camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 10, -45), scene);

    var light1 = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light1.position = new BABYLON.Vector3(12, 7, 10);
    light1.specular = new BABYLON.Color3(1, 1, 1);
    light1.intensity = 1;
    lights.push(light1);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, 0), scene);
    light2.position = new BABYLON.Vector3(-12, 7, -10);
    light2.specular = new BABYLON.Color3(1, 1, 1);
    light2.intensity = 1;
    lights.push(light2);

    for(let i = 0; i < meshes.length; i++){
        meshes[i].receiveShadows = true;
    }

    if(!dev){
        _ui = new UI(scene, [meshes, lights, materials]);
        objects.push(_ui);

        planets = createPlanets(scene);
        for(let i = 0; i < planets.length; i++){
            objects.push(planets[i]);
        }
    }

    return scene;
};

var scene = null;
async function create_scene() {
    scene = await createScene();
}
create_scene();

window.addEventListener('mousemove', function (e) {
    let _ = [e.clientX, e.clientY];
    gsap.to(camera.position, {
        duration: 0.5,
        x: -_[0]/200,
        y: _[1]/200,
    });
    gsap.to(camera.rotation, {
        duration: 0.5,
        x: -_[1]/20000,
        y: -_[0]/20000,
    });
});

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();

    getState();

    if(!dev){
        if(state.planet){
            planets[state.planet].show()

            for(let i = 0; i < planets.length; i++){
                if(i != state.planet){
                    planets[i].hide()
                }
            }
        }

        for(let i = 0; i < objects.length; i++){
            objects[i].update();
        }

        if(state.alarm){
            lights[0].intensity = 0.5 + Math.sin(Date.now() / 100);
            if(scene.fogDensity != 0.001){
                gsap.to(scene, {
                    duration: 3,
                    fogDensity:0.001,
                })
            }
        } else {
            lights[0].intensity = 0;
            if(scene.fogDensity != 0){
                gsap.to(scene, {
                    duration: 3,
                    fogDensity:0,
                })
            }
        }
    }
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
