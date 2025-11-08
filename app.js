let start = document.querySelector(".start");
let input = document.querySelector(".numberInput");
let submit = document.querySelector(".submitBTN");
let b = document.querySelector("b");
let ol = document.querySelector("ol");
let msg = document.querySelector(".message");

let randomNumber = null;
let limit = 10;

// Sound files
let startSound = new Audio("sounds/start.mp3");
let winSound = new Audio("sounds/win.mp3");
let loseSound = new Audio("sounds/lose.mp3");
let wrongSound = new Audio("sounds/wrong.mp3");
let bgm = new Audio("sounds/bgm.mp3");
bgm.loop = true;

// Start / Restart Game
start.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    limit = 10; // ✅ reset limit
    b.innerText = limit;
    ol.innerHTML = "";
    msg.textContent = "🎮 Game started! Make your guess.";
    submit.disabled = false;
    start.innerText = "Start Game";
    start.style.display = "none";

    bgm.currentTime = 0;
    bgm.play();
    startSound.play();
});

// Handle Guess Submission
submit.addEventListener("click", function () {
    if (randomNumber == null) {
        msg.textContent = "Please start the game first!";
        input.value = "";
        return;
    }

    let guess = Number(input.value.trim());

    if (isNaN(guess) || guess <= 0 || guess > 100) {
        msg.textContent = "⚠️ Please enter a valid number (1-100)!";
        wrongSound.play();
        input.value = "";
        return;
    }

    // Add guess to list
    let li = document.createElement("li");
    li.innerText = guess;
    ol.appendChild(li);

    if (guess === randomNumber) {
        msg.textContent = "🎉 Congratulations! You guessed it right!";
        winSound.play();
        bgm.pause();
        submit.disabled = true;
        start.innerText = "Restart";
        start.style.display = "inline-block";
    } 
    else if (guess < randomNumber) {
        msg.textContent = "⬆️ Your guess is too low...";
        wrongSound.play();
        b.innerText = --limit;
    } 
    else {
        msg.textContent = "⬇️ Your guess is too high...";
        wrongSound.play();
        b.innerText = --limit;
    }

    if (limit <= 0 && guess !== randomNumber) {
        msg.textContent = "❌ Game Over! Better luck next time!";
        loseSound.play();
        bgm.pause();
        submit.disabled = true;
        start.innerText = "Restart";
        start.style.display = "inline-block";
    }

    input.value = "";
});
