const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
    const scene = new BABYLON.Scene(engine);

    const _eqTexture = new BABYLON.EquiRectangularCubeTexture('skybox.jpg', scene, 512);
    const eqTexture = new BABYLON.EquiRectangularCubeTexture('milky_way.jpg', scene, 512);
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = eqTexture;
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;

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


    // create the window
    const window = BABYLON.Mesh.CreateBox("box", 1, scene);
    window.material = glass;
    window.scaling.x = 120;
    window.scaling.y = 30;
    window.scaling.z = 0.1;
    window.position.z = 0.5;

    // create the wall
    const _walltop = BABYLON.Mesh.CreateBox("walltop", 1, scene);
    _walltop.material = plastic;
    _walltop.scaling.x = 150;
    _walltop.scaling.y = 10;
    _walltop.scaling.z = 1;
    _walltop.position.y = 20;

    const _wallbottom = BABYLON.Mesh.CreateBox("wallbottom", 1, scene);
    _wallbottom.material = plastic;
    _wallbottom.scaling.x = 150;
    _wallbottom.scaling.y = 10;
    _wallbottom.scaling.z = 1;
    _wallbottom.position.y = -20

    const _wallleft = BABYLON.Mesh.CreateBox("wallleft", 1, scene);
    _wallleft.material = plastic;
    _wallleft.scaling.x = 15;
    _wallleft.scaling.y = 35;
    _wallleft.scaling.z = 1;
    _wallleft.position.x = -67.5;

    const _wallright = BABYLON.Mesh.CreateBox("wallright", 1, scene);
    _wallright.material = plastic;
    _wallright.scaling.x = 15;
    _wallright.scaling.y = 35;
    _wallright.scaling.z = 1;
    _wallright.position.x = 67.5;

    const walldown = BABYLON.Mesh.CreateBox("walldown", 1, scene);
    walldown.material = plastic;
    walldown.scaling.x = 178;
    walldown.scaling.y = 1;
    walldown.scaling.z = 150;
    walldown.position.y = -30;
    walldown.position.z = -60;

    const wallup = BABYLON.Mesh.CreateBox("wallup", 1, scene);
    wallup.material = plastic;
    wallup.scaling.x = 178;
    wallup.scaling.y = 1;
    wallup.scaling.z = 150;
    wallup.position.y = 30;
    wallup.position.z = -60;

    const camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 0, -50), scene);

    // when the a and d keys are pressed, the camera will rotate
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
        if (evt.sourceEvent.key === "a" && camera.rotation.y > -0.5) {
            camera.rotation.y -= 0.01;
        }
        if (evt.sourceEvent.key === "d" && camera.rotation.y < 0.5) {
            camera.rotation.y += 0.01;
        }
    }
    ));

    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, 0, 0), scene);
    light.position = new BABYLON.Vector3(12, 7, 10);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.intensity = 1;
    var light = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, 0), scene);
    light.position = new BABYLON.Vector3(-12, 7, -10);
    light.specular = new BABYLON.Color3(1, 1, 1);
    light.intensity = 1;

    var generator = new BABYLON.ShadowGenerator(512, light);
    generator.useBlurExponentialShadowMap = true;
    generator.blurKernel = 32;
    generator.blurScale = 2;
    generator.usePoissonSampling = true;
    generator.bias = 0.01;
    generator.forceBackFacesOnly = true;
    generator.useKernelBlur = true;
    generator.useBlurExponentialShadowMap = true;
    generator.addShadowCaster(wallup);
    generator.addShadowCaster(walldown);
    generator.addShadowCaster(_wallleft);
    generator.addShadowCaster(_wallright);
    generator.addShadowCaster(_walltop);
    generator.addShadowCaster(_wallbottom);
    generator.addShadowCaster(window);

    return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});