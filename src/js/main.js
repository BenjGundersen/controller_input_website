// Check for when a gamepad is connected

window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    document.querySelector(".status").textContent = `Gamepad connected: ${gamepad.id}`;
    console.log(gamepad.id);
    checkControllerType(gamepad);
    document.querySelector(".controller-outline").style.display = "block";
    updateLoop();
});


// Check for when a gamepad is disconnected
window.addEventListener("gamepaddisconnected", (event) => {
    document.querySelector(".status").textContent = "No gamepad connected.";
    document.querySelector(".controller-outline").style.display = "None";

});

// Check for what type of controller is connected and display an appropriate svg file, removes the svg file from the site as the gamepad is disconnected.
function checkControllerType(gamepad) {
    let controllerType = document.querySelector(".controller-outline");
    if (gamepad.id.includes("DualSense")) {
        controllerType.setAttribute("src", "/controller_input_website/src/img/dualsense-svgrepo-com.svg")
    } else {
        controllerType.style.display = "none";
    }

    if (gamepad.id.includes("xinput")) {
        controllerType.setAttribute("src", "/controller_input_website/src/img/xbox-control-for-one-svgrepo-com.svg")
    } else {
        controllerType.style.display = "none";
    }
}

// Constantly updates when input from a controller is received
function updateLoop() {
    const gamepads = navigator.getGamepads();
    for (const gamepad of gamepads) {
        if (gamepad) {
            for (let i = 0; i < gamepad.buttons.length; i++) {
                console.log(`Button ${i}: ${gamepad.buttons[i].pressed ? "Pressed" : "Released"}`);
            }
            for (let i = 0; i < gamepad.axes.length; i++) {
                console.log(`Axis ${i}: ${gamepad.axes[i]}`);
            }
        }
    }
    requestAnimationFrame(updateLoop);
}