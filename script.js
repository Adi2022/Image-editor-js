const fileInput = document.querySelector(".file-input");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const preImage = document.querySelector(".preview-img img");
const rotateOptions = document.querySelectorAll(".options button");
const filterSlider = document.querySelector(".slider input");
const filterValue = document.querySelector(".filter-info .value");
const chooseImgBtn = document.querySelector(".choose-img");
const resetFilterBtn = document.querySelector(".reset-filter");
const saveImgBtn = document.querySelector(".save-img");
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;
const applyFilters = () => {
  preImage.style.transform = `rotate(${rotate}deg) scale(${flipVertical},${flipHorizontal})`;
  preImage.style.filter = `brightness(${brightness}%)saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
};
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  preImage.src = URL.createObjectURL(file);
  preImage.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};
filterOptions.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else if (option.id === "grayscale") {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});
const updateFilter = () => {
  filterValue.innerText = `${filterSlider.value}%`;

  const selectedFilter = document.querySelector(".filter .active");

  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
};
rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }

    applyFilters();
  });
});

const resetFilter = () => {
  (brightness = 100), (saturation = 100), (inversion = 0), (grayscale = 0);
  (rotate = 0), (flipHorizontal = 1), (flipVertical = 1);
  filterOptions[0].click();
  applyFilters();
};
const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = preImage.naturalWidth;
  canvas.height = preImage.naturalHeight;
  ctx.filter = `brightness(${brightness}%)saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
  ctx.translate(canvas.width, canvas.height);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    preImage,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );
  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};
fileInput.addEventListener("change", loadImage);
resetFilterBtn.addEventListener("click", resetFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
saveImgBtn.addEventListener("click", saveImage);
filterSlider.addEventListener("input", updateFilter);
