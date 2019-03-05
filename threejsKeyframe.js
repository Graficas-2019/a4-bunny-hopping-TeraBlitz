var renderer = null, 
scene = null, 
camera = null,
root = null,
group = null,
bunny = null,
grass = null,
directionalLight = null;
var objLoader = null;

var duration = 10, // sec
loopAnimation = true;

var grassMapUrl = "grass.jpg";

function run()
{
    requestAnimationFrame(function() { run(); });
    
        // Render the scene
        renderer.render( scene, camera );

        // Update the animations
        KF.update();

        // Update the camera controller
        orbitControls.update();
}


function loadObj()
{
    if(!objLoader)
        objLoader = new THREE.OBJLoader();
    
    objLoader.load(
        'Stanford_Bunny_OBJ-JPG/20180310_KickAir8P_UVUnwrapped_Stanford_Bunny.obj',

        function(object)
        {
            var texture = new THREE.TextureLoader().load('Stanford_Bunny_OBJ-JPG/bunnystanford_res1_UVmapping3072_g005c.jpg');

            object.traverse( function ( child ) 
            {
                if ( child instanceof THREE.Mesh ) 
                {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.map = texture;
                }
            } );
                    
            gun = object;
            gun.scale.set(5,5,5);
            gun.position.z = 0;
            gun.position.x = 1;7
            gun.position.y = -1.7;
            
            bunny.add(gun);
            scene.add(bunny);
        },
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.log( 'An error happened' );
    
        });
}

function createScene(canvas) 
{
    
    const { width, height } = getWidthAndHeight();
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    canvas.height=height;
    renderer.setSize(width, height);
    
    // Create a new Three.js scene
    scene = new THREE.Scene();

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, width /height, 1, 4000 );
    camera.position.set(0, 2, 20);
    scene.add(camera);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1);

    // Create and add all the lights
    directionalLight.position.set(0, 1, 2);
    root.add(directionalLight);

    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);
    
    // Create a group to hold the objects
    group = new THREE.Object3D;
    bunny= new THREE.Object3D;
    root.add(group);

    // Create a texture map
    var grassMap = new THREE.TextureLoader().load(grassMapUrl);
    grassMap.wrapS = grassMap.wrapT = THREE.RepeatWrapping;
    grassMap.repeat.set(100, 100);

    var color = 0xffffff;
    var ambient = 0x888888;
    
    // Put in a ground plane to show off the lighting
    geometry = new THREE.PlaneGeometry(200, 200, 50, 50);
    grass = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({color:color, map:grassMap, side:THREE.DoubleSide}));
    grass.rotation.x = -Math.PI / 2;
    grass.position.y = 0;
    
    // Add the grass to our group
    root.add( grass );

    
    // Now add the group to our scene
    scene.add( root );

    loadObj();
    // Create a group to hold the objects
    group = new THREE.Object3D;
    root.add(group);

}

function playAnimations()
{


    bunnyAnimator = new KF.KeyFrameAnimator;
    bunnyAnimator.init({ 
            interps:
                [
                    { 
                        keys:[0,.06,.12,.18,.24,.3,.36,.42,.48,.54,.6,.66,.72,.78,.84,.90,.96,1],
                        values:[
                                { x : 0, y:1.7, z: 0 },
                                { x : 1, y:2.7, z: 1 },
                                { x : 2, y:1.7, z: 2 },
                                { x : 1, y:2.7, z: 3 },
                                { x : 0, y:1.7, z: 4 },
                                { x : -1, y:2.7, z: 3 },
                                { x : -2, y:1.7, z: 2 },
                                { x : -1, y:2.7, z: 1 },
                                { x : 0, y:1.7, z: 0 },
                                { x : 1, y:2.7, z: -1 },
                                { x : 2, y:1.7, z: -2 },
                                { x : 1, y:2.7, z: -3 },
                                { x : 0, y:1.7, z: -4 },
                                { x : -1, y:2.7, z: -3 },
                                { x : -2, y:1.7, z: -2 },
                                { x : -1, y:2.7, z: -1 },
                                { x : 0, y:1.7, z: -0 }


                                ],
                        target:bunny.position
                    },
                    {
                        keys:[0,.06,.12,.18,.24,.3,.36,.42,.48,.54,.6,.66,.72,.78,.84,.90,.96,1], 
                        values:[
                                { y: Math.PI*8 / 2 },
                                { y: Math.PI*8 / 2 },
                                { y: Math.PI*8 / 2  },
                                { y: Math.PI*7 / 2  },
                                { y: Math.PI*7 / 2  },
                                { y: Math.PI*6 / 2 },
                                { y: Math.PI*6 / 2 },
                                { y: Math.PI*6 / 2  },
                                { y: Math.PI*6 / 2  }, //half
                                { y: Math.PI*6 / 2  },
                                { y: Math.PI*6 / 2 },
                                { y: Math.PI*7 / 2 },
                                { y: Math.PI*7 / 2  },
                                { y: Math.PI*7 / 2  },
                                { y: Math.PI*8 / 2  },
                                { y: Math.PI*8 / 2  },
                                { y: Math.PI*8 / 2  }
                                ],
                        target:bunny.rotation
                    },
                ],
            loop: loopAnimation,
            duration:duration * 1000
        });
        bunnyAnimator.start();

    directionalLight.color.setRGB(1, 1, 1);

    lightAnimator = new KF.KeyFrameAnimator;
    lightAnimator.init({ 
        interps:
            [
                { 
                    keys:[0,.06,.12,.18,.24,.3,.36,.42,.48,.54,.6,.66,.72,.78,.84,.90,.96,1], 
                    values:[
                            { r: 1, g : 1, b: 1 },
                            { r: 1, g : 1, b: 1 },
                            { r: 1, g : 1, b: 1 },
                            { r: 0.66, g : 0.66, b: 0.66 },
                            { r: 0.66, g : 0.66, b: 0.66 },
                            { r: 0.66, g : 0.66, b: 0.66 },
                            { r: .333, g : .333, b: .333 },
                            { r: .333, g : .333, b: .333 },
                            { r: .333, g : .333, b: .333 },
                            { r: 0, g : 0, b: 0 },
                            { r: 0, g : 0, b: 0 },
                            { r: 0, g : 0, b: 0 },
                            { r: .667, g : .667, b: .667 },
                            { r: .667, g : .667, b: .667 },
                            { r: .667, g : .667, b: .667 },
                            { r: 1, g : 1, b: 1 },
                            ],
                    target:directionalLight.color
                },
            ],
        loop: loopAnimation,
        duration:duration * 1000,
    });
    lightAnimator.start();
}


function getWidthAndHeight() {
    const width = $(window).width();
    const height = $(window).height();
    return { width, height };
  }
  