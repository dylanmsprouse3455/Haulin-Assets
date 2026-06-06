const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});


window.addEventListener("load", () => {
  const introScreen = document.getElementById("introScreen");

  if (!introScreen) return;

  setTimeout(() => {
    introScreen.classList.add("hide");
  }, 1500);

  setTimeout(() => {
    introScreen.remove();
  }, 2200);
});