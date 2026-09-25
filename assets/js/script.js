document.addEventListener("DOMContentLoaded", function () {

  const lightbox = document.getElementById("galleryLightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const counter = document.getElementById("lightboxCounter");

  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let media = [];
  let currentIndex = 0;


  // Open gallery when button is clicked
  document.querySelectorAll(".gallery-btn").forEach(function (button) {

    button.addEventListener("click", function () {

      const galleryId = button.dataset.gallery;
      const gallery = document.getElementById(galleryId);

      if (!gallery) return;

      // Get both images and videos
      media = Array.from(
        gallery.querySelectorAll("img, video")
      ).map(function (item) {

        return {
          type: item.tagName.toLowerCase(),
          src: item.src,
          alt: item.alt || ""
        };

      });

      if (!media.length) return;

      currentIndex = 0;

      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      showMedia();
    });

  });


  // Display current image or video
  function showMedia() {

    const current = media[currentIndex];

    if (current.type === "img") {

      // Show image
      lightboxImage.style.display = "block";
      lightboxVideo.style.display = "none";

      lightboxImage.src = current.src;
      lightboxImage.alt = current.alt;

      // Stop video
      lightboxVideo.pause();
      lightboxVideo.removeAttribute("src");
      lightboxVideo.load();

    } else if (current.type === "video") {

      // Hide image
      lightboxImage.style.display = "none";

      // Show video
      lightboxVideo.style.display = "block";
      lightboxVideo.src = current.src;
      lightboxVideo.load();

    }

    counter.textContent =
      (currentIndex + 1) + " / " + media.length;
  }


  // Next
  nextBtn.addEventListener("click", function () {

    currentIndex =
      (currentIndex + 1) % media.length;

    showMedia();

  });


  // Previous
  prevBtn.addEventListener("click", function () {

    currentIndex =
      (currentIndex - 1 + media.length) % media.length;

    showMedia();

  });


  // Close lightbox
  function closeLightbox() {

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Stop video
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();

  }


  closeBtn.addEventListener("click", closeLightbox);


  // Close when clicking outside
  lightbox.addEventListener("click", function (e) {

    if (e.target === lightbox) {
      closeLightbox();
    }

  });


  // Keyboard navigation
  document.addEventListener("keydown", function (e) {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    }

    if (e.key === "ArrowRight") {

      currentIndex =
        (currentIndex + 1) % media.length;

      showMedia();

    }

    if (e.key === "ArrowLeft") {

      currentIndex =
        (currentIndex - 1 + media.length) % media.length;

      showMedia();

    }

  });

});