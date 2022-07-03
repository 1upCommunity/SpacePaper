const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var materials = {};
var meshes = [];
let lights = [];
let objects = [];

function createMaterials(scene, meshes, lights){
    const _eqTexture = new BABYLON.EquiRectangularCubeTexture('assets/skybox.jpg', scene, 512);
    const eqTexture = new BABYLON.EquiRectangularCubeTexture('assets/milky_way.jpg', scene, 512);

    var water = new BABYLON.WaterMaterial("water_material", scene);
    water.backFaceCulling = false;
	water.bumpTexture = new BABYLON.Texture("assets/waterbump.png", scene);
	water.windForce = 1;
	water.waveHeight = 0.2;
	water.bumpHeight = 100;
    water.bumpLength = 6;
	water.waveLength = 0.8;
	water.colorBlendFactor = 0;
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
    glass.alpha = 0.2;
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
}

// Add your code here matching the playground format
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    // create a red ambient light
    let _light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    _light.diffuse = new BABYLON.Color3(1, 0, 0);
    _light.specular = new BABYLON.Color3(1, 0, 0);
    _light.intensity = 0;
    lights.push(_light)

    let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);

    // create the window
    const _window = BABYLON.Mesh.CreateBox("box", 1, scene);
    _window.scaling.x = 120;
    _window.scaling.y = 30;
    _window.scaling.z = 0.1;
    _window.position.z = 0.5;

    // create the wall
    const _walltop = BABYLON.Mesh.CreateBox("walltop", 1, scene);
    _walltop.scaling.x = 150;
    _walltop.scaling.y = 10;
    _walltop.scaling.z = 1;
    _walltop.position.y = 20;

    const _wallbottom = BABYLON.Mesh.CreateBox("wallbottom", 1, scene);
    _wallbottom.scaling.x = 150;
    _wallbottom.scaling.y = 10;
    _wallbottom.scaling.z = 1;
    _wallbottom.position.y = -20

    const _wallleft = BABYLON.Mesh.CreateBox("wallleft", 1, scene);
    _wallleft.scaling.x = 15;
    _wallleft.scaling.y = 35;
    _wallleft.scaling.z = 1;
    _wallleft.position.x = -67.5;

    const _wallright = BABYLON.Mesh.CreateBox("wallright", 1, scene);
    _wallright.scaling.x = 15;
    _wallright.scaling.y = 35;
    _wallright.scaling.z = 1;
    _wallright.position.x = 67.5;

    const walldown = BABYLON.Mesh.CreateBox("walldown", 1, scene);
    walldown.scaling.x = 178;
    walldown.scaling.y = 1;
    walldown.scaling.z = 150;
    walldown.position.y = -30;
    walldown.position.z = -60;

    const wallup = BABYLON.Mesh.CreateBox("wallup", 1, scene);
    wallup.scaling.x = 178;
    wallup.scaling.y = 1;
    wallup.scaling.z = 150;
    wallup.position.y = 30;
    wallup.position.z = -60;

    meshes.push(_window);
    meshes.push(_walltop);
    meshes.push(_wallbottom);
    meshes.push(_wallleft);
    meshes.push(_wallright);
    meshes.push(walldown);
    meshes.push(wallup);

    // materials
    createMaterials(scene, meshes, lights);
    _window.material = materials.glass;
    _walltop.material = materials.plastic;
    _wallbottom.material = materials.plastic;
    _wallleft.material = materials.plastic;
    _wallright.material = materials.plastic;
    walldown.material = materials.plastic;
    wallup.material = materials.plastic;
    skybox.material = materials.skybox;
    skybox.infiniteDistance = true;

    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -38), scene);

    // when the mouse is scrolled, the camera moves
    scene.onPrePointerObservable.add( function(pointerInfo, eventState) {
        var event = pointerInfo.event;
        var delta = 0;
        if (event.wheelDelta) {
            delta = event.wheelDelta;
        }
        else if (event.detail) {
            delta = -event.detail;
        }
        if (delta) {
            delta = -delta
            if(delta > 0 && camera.position.x < 28){
                gsap.to(camera.position, {duration: 0.5, x: camera.position.x + 10});
            }
            else if(delta < 0 && camera.position.x > -27){
                gsap.to(camera.position, {duration: 0.5, x: camera.position.x - 10});
            }
        }
    }, BABYLON.PointerEventTypes.POINTERWHEEL, false);

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

    for(let j = 0; i < lights.length; i++){
        var generator = new BABYLON.ShadowGenerator(1024, lights[i]);
        generator.useKernelBlur = true;
        generator.useBlurExponentialShadowMap = true;
        generator.blurKernel = 32;
        generator.blurScale = 2;
        generator.usePoissonSampling = true;
        generator.bias = 0.01;
        generator.forceBackFacesOnly = true;
        generator.useKernelBlur = true;
        generator.useBlurExponentialShadowMap = true;
        for (var i = 0; i < meshes.length; i++) {
            shadowGenerator.addShadowCaster(meshes[i]);
        }
    }

    // create a sample water drop
    let _waterdrop = new WaterDrop(scene, [meshes, lights, materials]);
    objects.push(_waterdrop);

    return scene;
};

var scene = null;
async function create_scene() {
    scene = await createScene();
}
create_scene();

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();

    // update the water drop
    for(let i = 0; i < objects.length; i++){
        objects[i].update();
    }

    if(state.alarm){
        lights[0].intensity = 0.5 + Math.sin(Date.now() / 100) * 0.5;
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.01;
        scene.fogColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        scene.fogStart = 0;
        scene.fogEnd = 100;
        scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    } else {
        lights[0].intensity = 0;
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0;
        scene.fogColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        scene.fogStart = 0;
        scene.fogEnd = 100;
        scene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    }
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
