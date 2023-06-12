// Get the necessary elements from the HTML code
const mango = document.getElementById("mango");
const score = document.getElementById("score");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");
const mangoShape = document.getElementById("mango-shape");

// Define the initial score and mango position
let currentScore = localStorage.getItem("mangotiScore") || 0;
let mangoX = 0;
let mangoY = 0;
let mangoSrc = localStorage.getItem("mangotiMangoSrc") || "";

// Set the mango image source based on the selected mango shape or the saved source
if (mangoSrc) {
  mango.src = mangoSrc;
} else {
  mango.src = mangoShape.value;
}

// Set the score based on the saved score
score.textContent = currentScore;

// Set the mango position based on the saved position or randomly place it
if (localStorage.getItem("mangotiMangoX") && localStorage.getItem("mangotiMangoY")) {
  mangoX = parseInt(localStorage.getItem("mangotiMangoX"));
  mangoY = parseInt(localStorage.getItem("mangotiMangoY"));
  mango.style.left = mangoX + "px";
  mango.style.top = mangoY + "px";
} else {
  placeMango();
}

// Set the mango image source based on the selected mango shape
mangoShape.addEventListener("change", function() {
  if (mangoShape.value === "custom") {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", function() {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        mango.src = reader.result;
        localStorage.setItem("mangotiMangoSrc", reader.result);
      });
      reader.readAsDataURL(file);
    });
    fileInput.click();
  } else {
    mango.src = mangoShape.value;
    localStorage.setItem("mangotiMangoSrc", mangoShape.value);
  }
});

// If the saved mango source is a custom image, set the mango image source to the saved custom image source
if (mangoShape.value === "custom" && mangoSrc) {
  mango.src = mangoSrc;
}

// Define a function to handle clicking on the profile picture
function profilePicClicked() {
  document.getElementById("profile-pic-input").click();
}

// Add an event listener for clicking on the profile picture
document.getElementById("profile-pic").addEventListener("click", profilePicClicked);

// Define a function to handle uploading a new profile picture
function previewProfilePic(event) {
  const profilePic = document.getElementById("profile-pic");
  profilePic.src = URL.createObjectURL(event.target.files[0]);
  localStorage.setItem("profile-pic", profilePic.src);
}

// Add an event listener for uploading a new profile picture
document.getElementById("profile-pic-input").addEventListener("change", previewProfilePic);

// Define a function to randomly place the mango on the screen
function placeMango() {
  mangoX = Math.floor(Math.random() * (window.innerWidth - mango.width));
  mangoY = Math.floor(Math.random() * (window.innerHeight - mango.height));
  mango.style.left = mangoX + "px";
  mango.style.top = mangoY + "px";
  localStorage.setItem("mangotiMangoX", mangoX);
  localStorage.setItem("mangotiMangoY", mangoY);
}

// Define a function to handle clicking on the mango
function mangoClicked() {
  currentScore++;
  score.textContent = currentScore;
  placeMango();
}

// Add an event listener for clicking on the mango
mango.addEventListener("click", mangoClicked);

// Add an event listener for clicking the reset button
resetBtn.addEventListener("click", function() {
  currentScore = 0;
  score.textContent = currentScore;
  localStorage.setItem("mangotiScore", currentScore);
});

// Add an event listener for clicking the save button
saveBtn.addEventListener("click", function() {
  localStorage.setItem("mangotiScore", currentScore);
  localStorage.setItem("mangotiMangoSrc", mango.src);
  localStorage.setItem("mangotiMangoX", mangoX);
  localStorage.setItem("mangotiMangoY", mangoY);
  alert("Score and mango data saved!");
  
  // Display a message based on the score
  if (currentScore < 10000000000000000) {
    messageDiv.textContent = "You can do better!";
  } else if (currentScore < 10000000000000000000) {
    messageDiv.textContent = "Not bad!";
  } else if (currentScore < 10000000000000000000000000000000000000000000000000000000000) {
    messageDiv.textContent = "Great job!";
  } else {
    messageDiv.textContent = "You are a mango-catching expert!";
  }
});

// Get the name input element and set its value to the saved name
const nameInput = document.getElementById("name");
nameInput.value = localStorage.getItem("name");

// Add an event listener for the name input to save the name to local storage
nameInput.addEventListener("input", function() {
  localStorage.setItem("name", nameInput.value);
});