<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Three.js 3D Model</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
    <script>
        // Basic scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Add a light source
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        // Predefined camera positions
        const cameraPositions = {
            nederlands: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.0624, y: 10.562, z: 9.3551 } },
            espanol: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.0624, y: 10.562, z: 9.3551 } },
            français: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.0624, y: 10.562, z: 9.3551 } },
            english: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.0624, y: 10.562, z: 9.3551 } },
            peterson: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.3483, y: 10.418, z: 10.87 } },
            breathe: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.3483, y: 10.418, z: 10.87 } },
            alchemist: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.3483, y: 10.418, z: 10.87 } },
            meditations: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.3483, y: 10.418, z: 10.87 } },
            prince: { position: { x: 3.9, y: 5.2112, z: 10.967 }, lookAt: { x: 4.3483, y: 10.418, z: 10.87 } },
            matrix: { position: { x: 3.0324, y: -5.4637, z: 8.9867 }, lookAt: { x: -10.548, y: -5.2058, z: 13.507 } },
            glove: { position: { x: 0.41906, y: -5.3338, z: 9.8258 }, lookAt: { x: -13.402, y: -7.8815, z: 0.49287 } },
            golf: { position: { x: 0.41906, y: -5.3338, z: 9.8258 }, lookAt: { x: -13.402, y: -7.8815, z: 0.49287 } },
            xbox001: { position: { x: 0.77684, y: -5.4727, z: 8.2969 }, lookAt: { x: -10.23, y: -6.4363, z: 6.0922 } },
            ezio: { position: { x: 0.77684, y: -5.4727, z: 8.2969 }, lookAt: { x: -8.3319, y: -3.748, z: 5.7219 } },
            mustang: { position: { x: 0.46142, y: -5.4721, z: 5.8848 }, lookAt: { x: -8.5784, y: -3.9991, z: 3.6072 } },
            countach: { position: { x: 0.46142, y: -5.4721, z: 5.8848 }, lookAt: { x: -8.8921, y: -6.5353, z: 3.7709 } },
            goku: { position: { x: 0.46142, y: -5.4721, z: 4.0861 }, lookAt: { x: -8.7595, y: -5.3498, z: 1.7716 } },
            quote: { position: { x: 2.1757, y: 6.2608, z: 6.5333 }, lookAt: { x: 1.3309, y: 7.4849, z: 4.177 } },
            skillset: { position: { x: 0.50984, y: 3.9242, z: 6.1911 }, lookAt: { x: 0.7679, y: 5.0556, z: 4.161 } },
            education: { position: { x: -0.33675, y: 3.8006, z: 6.6323 }, lookAt: { x: -0.4495, y: 5.031, z: 4.166 } },
        };

        // Load the GLB model from Google Drive
        const loader = new THREE.GLTFLoader();
        loader.load('https://drive.google.com/uc?export=download&id=1Wz96Xdlp-WK8Xyuvf5gAVZqyyhMdK77o', function (gltf) {
            scene.add(gltf.scene);
            renderer.render(scene, camera);
        }, undefined, function (error) {
            console.error('An error occurred loading the model:', error);
        });

        // Set initial camera position and rotation
        camera.position.set(40.8, -29.284, 22.079);
        camera.rotation.set(
            THREE.Math.degToRad(76.616),
            THREE.Math.degToRad(0),
            THREE.Math.degToRad(53.146)
        );

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        window.addEventListener('resize', function() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        // Raycaster setup
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onMouseMove(event) {
            // Calculate mouse position in normalized device coordinates (-1 to +1)
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Update the raycaster with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);

            // Calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                const firstIntersect = intersects[0].object;

                // Use the object's name or another property to determine which predefined position to use
                const objectName = firstIntersect.name;
                const cameraPosition = cameraPositions[objectName];

                if (cameraPosition) {
                    camera.position.set(cameraPosition.position.x, cameraPosition.position.y, cameraPosition.position.z);
                    camera.lookAt(new THREE.Vector3(cameraPosition.lookAt.x, cameraPosition.lookAt.y, cameraPosition.lookAt.z));
                }
            }
        }

        window.addEventListener('mousemove', onMouseMove, false);
    </script>
</body>
</html>