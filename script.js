document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".card-container");

    const imageSection = document.querySelector(".img");
    const mainQuestion = card.querySelector(":scope > h1");
    const yesNoContainer = document.querySelector(".scontainer");

    const yesBtn = document.getElementById("yesbtn");
    const noBtn = document.getElementById("nobtn");
    const okBtn = document.getElementById("okbtn");

    const dateScreen = document.querySelector(".date");
    const dateInput = document.getElementById("dateInput");
    const timeInput = document.getElementById("timeInput");
    const fixBtn = document.getElementById("fix");

    const hiddenScreens =
        card.querySelectorAll(":scope > .hidden");

    const yesScreen = hiddenScreens[0];
    const foodScreen = hiddenScreens[1];
    const finalScreen = hiddenScreens[2];


    /* =========================================
       MAKE DATE SCREEN A REAL SCREEN
    ========================================= */

    dateScreen.classList.add("date-screen");


    /* =========================================
       SCREEN 5
    ========================================= */

    const validationScreen =
        document.createElement("div");

    validationScreen.className =
        "hidden dynamic-validation-screen";

    validationScreen.innerHTML = `
        <h1>Are you sure? ❤️</h1>

        <p id="selectedFoodText"></p>

        <div class="validation-buttons">

            <button id="confirmFood" type="button">
                Yes, confirm ❤️
            </button>

            <button id="changeFood" type="button">
                Change
            </button>

        </div>
    `;

    card.appendChild(validationScreen);


    const selectedFoodText =
        validationScreen.querySelector(
            "#selectedFoodText"
        );

    const confirmFood =
        validationScreen.querySelector(
            "#confirmFood"
        );

    const changeFood =
        validationScreen.querySelector(
            "#changeFood"
        );


    /* =========================================
       HIDE EVERYTHING
    ========================================= */

    function hideAllScreens() {

        // Screen 1
        imageSection?.classList.add("hidden");
        mainQuestion?.classList.add("hidden");
        yesNoContainer?.classList.add("hidden");


        // Screen 3 — DATE
        dateScreen?.classList.add("hidden");
        dateScreen?.classList.remove("show-screen");


        // Original hidden screens
        hiddenScreens.forEach(screen => {

            screen.classList.add("hidden");
            screen.classList.remove("show-screen");

        });


        // Screen 5
        validationScreen.classList.add("hidden");
        validationScreen.classList.remove(
            "show-screen"
        );
    }


    /* =========================================
       SHOW SCREEN
    ========================================= */

    function showScreen(screen) {

        hideAllScreens();

        if (!screen) return;

        screen.classList.remove("hidden");

        void screen.offsetWidth;

        screen.classList.add("show-screen");
    }


    /* =========================================
       INITIAL SCREEN
    ========================================= */

    hideAllScreens();

    imageSection.classList.remove("hidden");
    mainQuestion.classList.remove("hidden");
    yesNoContainer.classList.remove("hidden");


    /* =========================================
       YES
       SCREEN 1 → SCREEN 2
    ========================================= */

    yesBtn?.addEventListener("click", () => {

        showScreen(yesScreen);

    });


    /* =========================================
       NO BUTTON
    ========================================= */

    let noAttempts = 0;

    noBtn?.addEventListener("click", event => {

        event.preventDefault();

        noAttempts++;

        createNoRain();


        const rect =
            noBtn.getBoundingClientRect();


        noBtn.style.position = "fixed";

        noBtn.style.left =
            `${rect.left}px`;

        noBtn.style.top =
            `${rect.top}px`;

        noBtn.style.right = "auto";
        noBtn.style.bottom = "auto";
        noBtn.style.zIndex = "99999";


        const movement =
            150 + Math.random() * 180;


        let moveX =
            (Math.random() * 2 - 1) *
            movement;

        let moveY =
            (Math.random() * 2 - 1) *
            movement;


        if (Math.random() < 0.5) {
            moveY *= 0.35;
        } else {
            moveX *= 0.35;
        }


        const margin = 15;


        const maxX =
            Math.max(
                margin,
                window.innerWidth -
                rect.width -
                margin
            );


        const maxY =
            Math.max(
                margin,
                window.innerHeight -
                rect.height -
                margin
            );


        let finalX =
            Math.max(
                margin,
                Math.min(
                    rect.left + moveX,
                    maxX
                )
            );


        let finalY =
            Math.max(
                margin,
                Math.min(
                    rect.top + moveY,
                    maxY
                )
            );


        const translateX =
            finalX - rect.left;

        const translateY =
            finalY - rect.top;


        const animation =
            noBtn.animate(
                [
                    {
                        transform:
                            "translate(0,0) rotate(0deg)"
                    },
                    {
                        transform:
                            `translate(${translateX}px,${translateY}px)
                             rotate(${Math.random() * 20 - 10}deg)
                             scale(1.08)`
                    }
                ],
                {
                    duration: 450,
                    easing:
                        "cubic-bezier(.2,.8,.2,1)",
                    fill: "forwards"
                }
            );


        animation.finished.then(() => {

            noBtn.style.left =
                `${finalX}px`;

            noBtn.style.top =
                `${finalY}px`;

            noBtn.style.transform =
                "none";

        });


        /* After 5 NOs */

        if (noAttempts >= 5) {

            setTimeout(() => {

                mainQuestion.textContent =
                    "You have to say YES 😂❤️";

                mainQuestion.classList.remove(
                    "hidden"
                );

                noBtn.style.display =
                    "none";


                yesNoContainer.classList.remove(
                    "hidden"
                );


                yesNoContainer.innerHTML = `
                    <button
                        id="yesbtn"
                        type="button"
                    >
                        YES ❤️
                    </button>
                `;


                document
                    .getElementById("yesbtn")
                    ?.addEventListener(
                        "click",
                        () => {

                            showScreen(
                                yesScreen
                            );

                        }
                    );

            }, 500);
        }

    });


    /* =========================================
       NO RAIN
    ========================================= */

    function createNoRain() {

        const symbols = [
            "NO",
            "NO!",
            "NO 😭",
            "😭",
            "💔",
            "🙅",
            "NO 😂"
        ];


        const amount =
            Math.min(
                35 + noAttempts * 10,
                80
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const drop =
                document.createElement("div");


            drop.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            drop.style.position =
                "fixed";

            drop.style.left =
                `${Math.random() * 100}vw`;

            drop.style.top =
                "-70px";

            drop.style.zIndex =
                "99998";

            drop.style.pointerEvents =
                "none";

            drop.style.userSelect =
                "none";

            drop.style.fontSize =
                `${18 + Math.random() * 18}px`;

            drop.style.fontWeight =
                "800";

            drop.style.color =
                "#9e3f63";


            document.body.appendChild(drop);


            const animation =
                drop.animate(
                    [
                        {
                            transform:
                                "translateY(0) rotate(-10deg)",
                            opacity: 1
                        },
                        {
                            transform:
                                `translateY(${window.innerHeight + 150}px)
                                 rotate(180deg)`,
                            opacity: 0.1
                        }
                    ],
                    {
                        duration:
                            1200 +
                            Math.random() * 1800,
                        easing:
                            "cubic-bezier(.2,.7,.4,1)"
                    }
                );


            animation.onfinish = () => {
                drop.remove();
            };

        }

    }


    /* =========================================
       SCREEN 2 → SCREEN 3
       OK
    ========================================= */

    okBtn?.addEventListener("click", () => {

        showScreen(dateScreen);

    });


    /* =========================================
       SCREEN 3 → SCREEN 4
       FIX MEETING
    ========================================= */

    fixBtn?.addEventListener("click", () => {

        if (!dateInput.value) {

            dateInput.focus();
            shake(dateInput);

            return;
        }


        if (!timeInput.value) {

            timeInput.focus();
            shake(timeInput);

            return;
        }


        showScreen(foodScreen);

    });


    /* =========================================
       INPUT SHAKE
    ========================================= */

    function shake(element) {

        element.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 300
            }
        );

    }


    /* =========================================
       FOOD → SCREEN 5
    ========================================= */

    function selectFood(foodName) {

        selectedFoodText.textContent =
            `You chose ${foodName}. Are you sure?`;

        validationScreen.dataset.food =
            foodName;

        showScreen(
            validationScreen
        );

    }


    /* =========================================
       SCREEN 5 → SCREEN 6
    ========================================= */

    confirmFood.addEventListener(
        "click",
        () => {

            const foodName =
                validationScreen.dataset.food ||
                "food";


            const heading =
                finalScreen.querySelector("h1");

            const paragraph =
                finalScreen.querySelector("p");


            if (heading) {

                heading.textContent =
                    "It's confirmed! ❤️";

            }


            if (paragraph) {

                paragraph.textContent =
                    `I'll go there for ${foodName}! 😋❤️`;

            }


            showScreen(
                finalScreen
            );

        }
    );


    /* =========================================
       CHANGE FOOD
    ========================================= */

    changeFood.addEventListener(
        "click",
        () => {

            showScreen(
                foodScreen
            );

        }
    );


    /* =========================================
       FOOD BUTTONS
    ========================================= */

    document
        .getElementById("pizza")
        ?.addEventListener(
            "click",
            () => selectFood("Pizza")
        );


    document
        .getElementById("burger")
        ?.addEventListener(
            "click",
            () => selectFood("Burger")
        );


    document
        .getElementById("pasta")
        ?.addEventListener(
            "click",
            () => selectFood("Pasta")
        );


    document
        .getElementById("sushi")
        ?.addEventListener(
            "click",
            () => selectFood("Sushi")
        );

});