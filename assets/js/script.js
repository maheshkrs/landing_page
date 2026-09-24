
document.addEventListener("DOMContentLoaded", function () {

  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const counter = document.getElementById("lightboxCounter");

  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let images = [];
  let currentIndex = 0;

  // Open gallery when button is clicked
  document.querySelectorAll(".gallery-btn").forEach(function (button) {

    button.addEventListener("click", function () {

      const galleryId = button.dataset.gallery;
      const gallery = document.getElementById(galleryId);

      if (!gallery) return;

      images = Array.from(gallery.querySelectorAll("img"))
        .map(img => ({
          src: img.src,
          alt: img.alt
        }));

      if (!images.length) return;

      currentIndex = 0;

      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      showImage();
    });

  });


  // Display current image
  function showImage() {

    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;

    counter.textContent =
      (currentIndex + 1) + " / " + images.length;
  }


  // Next image
  nextBtn.addEventListener("click", function () {

    currentIndex = (currentIndex + 1) % images.length;
    showImage();

  });


  // Previous image
  prevBtn.addEventListener("click", function () {

    currentIndex =
      (currentIndex - 1 + images.length) % images.length;

    showImage();

  });


  // Close lightbox
  function closeLightbox() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

  }

  closeBtn.addEventListener("click", closeLightbox);


  // Close when clicking outside image
  lightbox.addEventListener("click", function (e) {

    if (e.target === lightbox) {
      closeLightbox();
    }

  });


  // Keyboard navigation
  document.addEventListener("keydown", function (e) {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();

    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    }

    if (e.key === "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + images.length) % images.length;

      showImage();
    }

  });

});
