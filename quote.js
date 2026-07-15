// Load the quote-page compatibility stylesheet after the main site styles.
// This keeps the repair isolated to quote.html and avoids changing homepage layouts.
const quoteStylesheet = document.createElement("link");
quoteStylesheet.rel = "stylesheet";
quoteStylesheet.href = "quote-fix.css?v=20260715-1";
document.head.appendChild(quoteStylesheet);

document.title = "Get a Quote | Haulin Assets Mafia";

const quoteDescription = document.querySelector('meta[name="description"]');
if (quoteDescription) {
  quoteDescription.setAttribute(
    "content",
    "Request a hauling quote from Haulin Assets Mafia for dump truck hauling, shale, rock, sand, mulch, top soil, fill dirt, driveway material, and material delivery."
  );
}

const quoteWizard = document.getElementById("quoteWizard");
const steps = document.querySelectorAll(".wizard-step");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const progressBar = document.getElementById("progressBar");
const reviewBox = document.getElementById("reviewBox");

let currentStep = 1;
const totalSteps = steps.length;
const quoteData = {};

function showStep(stepNumber) {
  steps.forEach((step) => {
    step.classList.remove("active");

    if (Number(step.dataset.step) === stepNumber) {
      step.classList.add("active");
    }
  });

  if (progressBar) {
    progressBar.style.width = `${(stepNumber / totalSteps) * 100}%`;
  }

  if (backBtn) {
    backBtn.style.display = stepNumber === 1 ? "none" : "inline-flex";
  }

  if (nextBtn) {
    nextBtn.style.display = stepNumber === totalSteps ? "none" : "inline-flex";
  }

  if (stepNumber === totalSteps) {
    updateReview();
  }
}

function saveInputs() {
  if (!quoteWizard) return;

  const inputs = quoteWizard.querySelectorAll("input, textarea, select");

  inputs.forEach((input) => {
    if (!input.name) return;

    if (input.type === "file") {
      if (input.files && input.files.length > 0) {
        const fileNames = Array.from(input.files)
          .map((file) => file.name)
          .join(", ");

        quoteData[input.name] = fileNames;
      }

      return;
    }

    if (input.value.trim() !== "") {
      quoteData[input.name] = input.value.trim();
    }
  });
}

function updateReview() {
  saveInputs();

  const entries = Object.entries(quoteData);

  if (!reviewBox) return;

  if (entries.length === 0) {
    reviewBox.innerHTML = "<p>No quote details entered yet.</p>";
    return;
  }

  reviewBox.innerHTML = entries
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");
}

document.querySelectorAll(".choice-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const parentStep = button.closest(".wizard-step");

    if (parentStep) {
      const buttons = parentStep.querySelectorAll(".choice-btn");
      buttons.forEach((btn) => btn.classList.remove("selected"));
    }

    button.classList.add("selected");

    const name = button.dataset.name;
    const value = button.dataset.value;

    if (name && value) {
      quoteData[name] = value;
    }

    const photoUploadBox = document.getElementById("photoUploadBox");

    if (button.classList.contains("photo-choice") && photoUploadBox) {
      if (button.dataset.showPhotos === "true") {
        photoUploadBox.classList.add("show");
        quoteData["Photos"] = "Yes, customer can send photos";

        return;
      }

      photoUploadBox.classList.remove("show");
      quoteData["Photos"] = "No photos";
    }

    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    saveInputs();

    if (currentStep < totalSteps) {
      currentStep++;
      showStep(currentStep);
    }
  });
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });
}

if (quoteWizard) {
  quoteWizard.addEventListener("submit", (event) => {
    event.preventDefault();

    saveInputs();
    updateReview();

    const subject = encodeURIComponent("Haulin Ass Quote Request");

    const body = encodeURIComponent(
      Object.entries(quoteData)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    );

    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
  });
}

showStep(currentStep);
