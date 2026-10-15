
const items = [...document.querySelectorAll(".gallery-item")];
const filterButtons = document.querySelectorAll(".filters button");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const caption = document.getElementById("image-caption");

let visibleItems = [...items];
let currentIndex = 0;

// Filter images by category
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        items.forEach(item => {
            const matches =
                filter === "all" || item.dataset.category === filter;

            item.classList.toggle("hidden", !matches);
        });

        visibleItems = items.filter(item => !item.classList.contains("hidden"));
    });
});

// Display an image in the lightbox
function showImage(index) {
    currentIndex = (index + visibleItems.length) % visibleItems.length;

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    caption.textContent =
        visibleItems[currentIndex].querySelector("figcaption").textContent;
}

// Open the lightbox when an image is clicked
items.forEach(item => {
    item.querySelector("img").addEventListener("click", () => {
        visibleItems = items.filter(
            image => !image.classList.contains("hidden")
        );

        currentIndex = visibleItems.indexOf(item);
        showImage(currentIndex);

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

// Next and previous buttons
document.getElementById("next").addEventListener("click", () => {
    showImage(currentIndex + 1);
});

document.getElementById("prev").addEventListener("click", () => {
    showImage(currentIndex - 1);
});

// Close the lightbox
function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
}

document.getElementById("close").addEventListener("click", closeLightbox);

// Close by clicking the dark background
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "ArrowRight") showImage(currentIndex + 1);
    if (event.key === "ArrowLeft") showImage(currentIndex - 1);
    if (event.key === "Escape") closeLightbox();
});
