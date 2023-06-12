const submitBtn = document.getElementById("submit-name");
submitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const name = nameInput.value;
  localStorage.setItem("name", name);
  window.location.href = "../../mangoti/index.html";
});