// LOGO INTRO
window.addEventListener("load", () => {
  const introScreen = document.getElementById("introScreen");

  if (introScreen) {
    setTimeout(() => {
      introScreen.classList.add("hide");
    }, 1600);

    setTimeout(() => {
      introScreen.style.display = "none";
    }, 2300);
  }
});

// MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
}

// MATERIAL MODAL DATA
const materialData = {
  rock: {
    title: "Rock",
    img: "rock.png",
    description:
      "Rock is a strong material used for driveways, base layers, drainage areas, and general property improvement.",
    uses:
      "Driveways, drainage, parking areas, base layers, muddy spots, and construction access.",
    notes:
      "Rock size and type can affect price and availability. Final recommendation depends on the job area and intended use."
  },

  "fill-dirt": {
    title: "Fill Dirt",
    img: "fill-dirt.png",
    description:
      "Fill dirt is commonly used to build up low areas, fill holes, level rough ground, and prepare areas for future work.",
    uses:
      "Filling holes, leveling yards, building up low spots, rough grading, and property correction.",
    notes:
      "Fill dirt is not usually the best choice for planting grass or gardens. Top soil is better for finished growing areas."
  },

  "top-soil": {
    title: "Top Soil",
    img: "top-soil.png",
    description:
      "Top soil is the upper, richer layer of soil used for growing grass, plants, and improving landscaping areas.",
    uses:
      "Lawns, gardens, flower beds, landscaping, yard repair, and final surface layers.",
    notes:
      "Top soil is best for growth and finishing. It is usually not used as deep structural fill."
  },

  mulch: {
    title: "Mulch",
    img: "mulch.png",
    description:
      "Mulch is used for landscaping, flower beds, moisture control, and improving the look of outdoor areas.",
    uses:
      "Flower beds, landscaping, trees, curb appeal, weed control, and moisture retention.",
    notes:
      "Mulch helps protect soil and gives property a cleaner finished look."
  },

  shale: {
    title: "Shale",
    img: "shale.png",
    description:
      "Shale is a practical, affordable material often used for driveways, access roads, muddy areas, and rough parking areas.",
    uses:
      "Driveways, muddy entrances, job sites, access roads, rough parking areas, and farm/property roads.",
    notes:
      "Crushed blue shale can be a cheaper alternative to expensive quarry stone for many practical jobs."
  },

  sand: {
    title: "Sand",
    img: "sand.png",
    description:
      "Sand is used for leveling, bedding, drainage support, and certain construction or landscaping needs.",
    uses:
      "Leveling, bedding pipe or block, drainage support, landscaping, and certain construction jobs.",
    notes:
      "The right sand depends on the project. Some jobs need specific types of sand."
  },

  "concrete-block": {
    title: "Concrete Block",
    img: "concrete-block.png",
    description:
      "Concrete block hauling is useful when removing old block, broken concrete, or leftover masonry material.",
    uses:
      "Cleanup, removal, tear-outs, old block, broken concrete, and construction debris hauling.",
    notes:
      "Concrete and block loads may depend on weight, access, dump location, and whether the material is clean or mixed with debris."
  },

  "demo-material": {
    title: "Demo Material",
    img: "demo-material.png",
    description:
      "Demo material hauling helps clear out job sites, cleanup projects, old structures, and property debris.",
    uses:
      "Job site cleanup, tear-outs, construction debris, property cleanup, and hauling unwanted material.",
    notes:
      "Some demo material may require special disposal depending on what it contains. Details should be confirmed before hauling."
  }
};

// MATERIAL MODAL
const materialCards = document.querySelectorAll(".material-card");
const materialModal = document.getElementById("materialModal");
const materialClose = document.getElementById("materialClose");

const materialModalImg = document.getElementById("materialModalImg");
const materialModalTitle = document.getElementById("materialModalTitle");
const materialModalDescription = document.getElementById("materialModalDescription");
const materialModalUses = document.getElementById("materialModalUses");
const materialModalNotes = document.getElementById("materialModalNotes");

if (
  materialCards.length &&
  materialModal &&
  materialClose &&
  materialModalImg &&
  materialModalTitle &&
  materialModalDescription &&
  materialModalUses &&
  materialModalNotes
) {
  materialCards.forEach((card) => {
    card.addEventListener("click", () => {
      const materialKey = card.dataset.material;
      const material = materialData[materialKey];

      if (!material) return;

      materialModalImg.src = material.img;
      materialModalImg.alt = material.title;
      materialModalTitle.textContent = material.title;
      materialModalDescription.textContent = material.description;
      materialModalUses.textContent = material.uses;
      materialModalNotes.textContent = material.notes;

      materialModal.classList.add("active");
    });
  });

  materialClose.addEventListener("click", () => {
    materialModal.classList.remove("active");
  });

  materialModal.addEventListener("click", (event) => {
    if (event.target === materialModal) {
      materialModal.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      materialModal.classList.remove("active");
    }
  });
}