// Check for when a gamepad is connected
window.addEventListener("gamepadconnected", (event) => {
    const gamepad = event.gamepad;
    document.querySelector(".status").textContent = `Gamepad connected: ${gamepad.id}`;
    console.log(gamepad.id);
    checkControllerType(gamepad);
    document.querySelector(".controller-outline").style.display = "block";
    document.querySelector(".buttons-section").style.display = "block";
    updateGamepad();
});


// Check for when a gamepad is disconnected
window.addEventListener("gamepaddisconnected", (event) => {
    document.querySelector(".status").textContent = "No gamepad connected.";
    document.querySelector(".controller-outline").style.display = "None";
    document.querySelector(".buttons-section").style.display = "None";
    document.querySelector(".buttons-section").innerHTML = "";

});


// Check for what type of controller is connected and display an appropriate svg file, removes the svg file from the site as the gamepad is disconnected.
function checkControllerType(gamepad) {
    let controllerType = document.querySelector(".controller-outline");
    if (gamepad.id.includes("DualSense")) {
        controllerType.setAttribute("src", "/controller_input_website/src/img/dualsense-svgrepo-com.svg");
        updateButtionsSection(gamepad);
    } else {
        controllerType.style.display = "none";
    }

    if (gamepad.id.includes("xinput")) {
        controllerType.setAttribute("src", "/controller_input_website/src/img/xbox-control-for-one-svgrepo-com.svg");
        updateButtionsSection(gamepad);
    } else {
        controllerType.style.display = "none";
    }
}

// Update the buttons-section div with all the buttons from the gamepad
function updateButtionsSection(gamepad) {
    for (let i = 0; i < gamepad.buttons.length; i++) {
        document.querySelector(".buttons-section").insertAdjacentHTML("beforeend",
            `<div>
                Button ${i+1}
                <div id="box${i+1}" class="feedback-box"></div>
            </div>`);
    }
};


// Constantly updates when input from a controller is received
function updateGamepad() {
    let gamepads = navigator.getGamepads() ? navigator.getGamepads() : [];
    if (!gamepads) return;

    let gp = gamepads[0];
    if (!gp) return;

    for (let i = 0; i < gp.buttons.length; i++) {
        let box = document.getElementById("box" + (i + 1));
        if (gp.buttons[i].pressed) {
            box.classList.add("filled");
        } else {
            box.classList.remove("filled")
        }
    }
    requestAnimationFrame(updateGamepad);
}