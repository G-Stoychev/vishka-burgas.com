import vishkaImg from "./imgData.js";

document.getElementById("hamburger").addEventListener("click", function () {
    document.getElementById("menuLinks").classList.toggle("active");
});

const gallery = document.querySelector(".gallery");
const slides = document.querySelector(".slides");

let galleryHTML = "";
let sliderHTML = "";

vishkaImg.forEach((v) => {
    galleryHTML += `
    <div class="img-wrapper">
        <img id="gImg" src="${v.img}" alt="${v.alt}"  title="${v.name}" loading="lazy"/>
        <span class="fullsize">&#10530;</span>
    </div>
    `;
    sliderHTML += `<img src="${v.img}" alt="${v.alt}"  title="${v.name}" />`;
});

if (gallery) gallery.innerHTML = galleryHTML;
if (slides) slides.innerHTML = sliderHTML;

let index = 0;
let sliderInterval;

const updateSlider = () => {
    if (!slides) return;
    slides.style.transform = `translateX(-${index * 100}%)`;
};

document.querySelector(".prev")?.addEventListener("click", () => {
    index = (index - 1 + vishkaImg.length) % vishkaImg.length;
    updateSlider();
});

document.querySelector(".next")?.addEventListener("click", () => {
    index = (index + 1) % vishkaImg.length;
    updateSlider();
});

const startInterval = () => {
    sliderInterval = setInterval(() => {
        index = (index + 1) % vishkaImg.length;
        updateSlider();
    }, 5000);
};
function resetSlider() {
    clearInterval(sliderInterval);
    startInterval();
}

document.querySelectorAll("#gImg").forEach((img, i) => {
    img.addEventListener("click", () => {
        index = i;
        updateSlider();
        resetSlider();
        document.querySelector(".slider").showModal();
    });
});

document.querySelectorAll(".fullsize").forEach((img, i) => {
    img.addEventListener("click", () => {
        index = i;
        updateSlider();
        resetSlider();
        document.querySelector(".slider").showModal();
    });
});

startInterval();

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".slider").close("slider");
});
