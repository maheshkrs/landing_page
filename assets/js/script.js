document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       NAVBAR SCROLL
    ========================================= */

    const navbar = document.querySelector(".site-navbar");

    if (navbar) {

        function updateNavbar() {

            if (window.scrollY > 50) {
                navbar.classList.add("navbar-scrolled");
            } else {
                navbar.classList.remove("navbar-scrolled");
            }

        }

        updateNavbar();

        window.addEventListener("scroll", updateNavbar);
    }


    /* =========================================
       CASE STUDY TABS
    ========================================= */

    const tabs = document.querySelectorAll(".case-tab");

    const cards = document.querySelectorAll(".case-card");


    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            /* Remove active from all tabs */

            tabs.forEach(function (item) {
                item.classList.remove("active");
            });


            /* Add active to clicked tab */

            tab.classList.add("active");


            /* Get selected category */

            const filter = tab.getAttribute("data-filter");


            /* Filter cards */

            cards.forEach(function (card) {

                const category = card.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });


    /* =========================================
       MODAL ELEMENTS
    ========================================= */

    const modal = document.getElementById("projectModal");

    const modalClose = document.getElementById("projectModalClose");

    const modalCategory = document.getElementById("modalCategory");

    const modalTitle = document.getElementById("modalTitle");

    const modalDescription = document.getElementById("modalDescription");

    const modalMedia = document.getElementById("modalMedia");


    /* =========================================
       CHECK MODAL
    ========================================= */

    if (!modal) {

        console.error(
            "Modal error: #projectModal was not found."
        );

        return;
    }


    /* =========================================
       OPEN MODAL
       CLICK ANYWHERE ON CARD
    ========================================= */

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            /* Find hidden project source */

            const source =
                card.querySelector(".project-source");


            if (!source) {

                console.error(
                    "Modal error: .project-source was not found inside this card.",
                    card
                );

                return;
            }


            /* =====================================
               CATEGORY
            ===================================== */

            const category =
                source.querySelector(".project-category");


            if (category && modalCategory) {

                modalCategory.innerHTML =
                    category.innerHTML;

            }


            /* =====================================
               TITLE
            ===================================== */

            const title =
                source.querySelector("h2");


            if (title && modalTitle) {

                modalTitle.innerHTML =
                    title.innerHTML;

            }


            /* =====================================
               DESCRIPTION
            ===================================== */

            const description =
                source.querySelector(".project-description");


            if (description && modalDescription) {

                modalDescription.innerHTML =
                    description.innerHTML;

            }


            /* =====================================
               MEDIA
            ===================================== */

            const media =
                source.querySelector(".project-media");


            if (media && modalMedia) {

                modalMedia.innerHTML =
                    media.innerHTML;

            }


            /* =====================================
               SHOW MODAL
            ===================================== */

            modal.classList.add("show");

            document.body.classList.add("modal-open");


            /* Start modal at top */

            modal.scrollTop = 0;

            window.scrollTo(0, 0);

        });

    });


    /* =========================================
       CLOSE MODAL FUNCTION
    ========================================= */

    function closeProjectModal() {

        modal.classList.remove("show");

        document.body.classList.remove("modal-open");


        /* Stop videos */

        if (modalMedia) {

            const videos =
                modalMedia.querySelectorAll("video");


            videos.forEach(function (video) {

                video.pause();

                video.currentTime = 0;

            });


            /* Clear media */

            modalMedia.innerHTML = "";

        }


        /* Clear content */

        if (modalCategory) {
            modalCategory.innerHTML = "";
        }

        if (modalTitle) {
            modalTitle.innerHTML = "";
        }

        if (modalDescription) {
            modalDescription.innerHTML = "";
        }

    }


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeProjectModal();

            }
        );

    }


    /* =========================================
       CLICK OUTSIDE MODAL
    ========================================= */
if (modalClose) {
    modalClose.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        closeProjectModal();
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("show")) {
        closeProjectModal();
    }
});


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("show")
            ) {

                closeProjectModal();

            }

        }
    );

});