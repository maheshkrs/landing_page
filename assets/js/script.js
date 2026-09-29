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
       CASE STUDY CARDS
       Bootstrap controls the tabs
    ========================================= */

    const cards =
        document.querySelectorAll(".case-card");


    /* =========================================
       OPEN CASE STUDIES PAGE
       WITH SELECTED CATEGORY
    ========================================= */

    const viewAllBtn =
        document.querySelector(".view-all-btn");

    if (viewAllBtn) {

        viewAllBtn.addEventListener("click", function (event) {

            const activeTab =
                document.querySelector(".case-tab.active");

            if (!activeTab) {
                return;
            }

            const target =
                activeTab.getAttribute("data-bs-target");

            if (target) {

                event.preventDefault();

                const category =
                    target.replace("#", "");

                window.location.href =
                    "case-studies.html?category=" +
                    encodeURIComponent(category);

            }

        });

    }


    /* =========================================
       READ CATEGORY FROM URL
    ========================================= */

    const params =
        new URLSearchParams(window.location.search);

    const categoryFromUrl =
        params.get("category");


    if (categoryFromUrl) {

        const tab =
            document.querySelector(
                '.case-tab[data-bs-target="#' +
                categoryFromUrl +
                '"]'
            );


        if (tab && typeof bootstrap !== "undefined") {

            const bootstrapTab =
                new bootstrap.Tab(tab);

            bootstrapTab.show();


            setTimeout(function () {

                tab.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "center"
                });

            }, 100);

        }

    }


    /* =========================================
       MODAL ELEMENTS
    ========================================= */

    const modal =
        document.getElementById("projectModal");

    const modalClose =
        document.getElementById("projectModalClose");

    const modalCategory =
        document.getElementById("modalCategory");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalDescription =
        document.getElementById("modalDescription");

    const modalMedia =
        document.getElementById("modalMedia");


    /* =========================================
       CHECK MODAL
    ========================================= */
if (!modal) {
    return;
}


    /* =========================================
       OPEN MODAL
       CLICK ANYWHERE ON CARD
    ========================================= */

    cards.forEach(function (card) {

        card.addEventListener("click", function (event) {

            /*
             * If the user clicks the actual
             * View Case Study button, allow
             * the card click to continue.
             */

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

        });

    });


    /* =========================================
       CLOSE MODAL FUNCTION
    ========================================= */

    function closeProjectModal() {

        modal.classList.remove("show");

        document.body.classList.remove("modal-open");


        /* =====================================
           STOP VIDEOS
        ===================================== */

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


        /* =====================================
           CLEAR CATEGORY
        ===================================== */

        if (modalCategory) {

            modalCategory.innerHTML = "";

        }


        /* =====================================
           CLEAR TITLE
        ===================================== */

        if (modalTitle) {

            modalTitle.innerHTML = "";

        }


        /* =====================================
           CLEAR DESCRIPTION
        ===================================== */

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

    modal.addEventListener(
        "click",
        function (event) {

            /*
             * Close only when clicking the
             * modal background itself.
             */

            if (event.target === modal) {

                closeProjectModal();

            }

        }
    );


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