// Get elements

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const filterButtons = document.querySelectorAll(".filter-btn");


// Store currently visible images

let visibleImages = [];
let currentIndex = 0;


// Open Lightbox

galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        visibleImages = Array.from(
            document.querySelectorAll(".gallery-item:not([style*='display: none']) img")
        );

        currentIndex = visibleImages.indexOf(item.querySelector("img"));

        showImage();

        lightbox.style.display = "flex";
    });

});


// Show Image

function showImage() {

    lightboxImg.src = visibleImages[currentIndex].src;
}


// Next Button

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleImages.length) {
        currentIndex = 0;
    }

    showImage();
});


// Previous Button

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleImages.length - 1;
    }

    showImage();
});


// Close Lightbox

closeBtn.addEventListener("click", () => {

    lightbox.style.display = "none";

});


// Close when clicking outside image

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});


// Image Filters

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const filter = button.dataset.filter;


        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


// Keyboard Navigation

document.addEventListener("keydown", (event) => {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            closeBtn.click();
        }

    }

});