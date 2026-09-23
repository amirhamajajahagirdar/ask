document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MAIN ELEMENTS
    ========================================= */

    const imageSection =
        document.querySelector(".img");

    const mainQuestion =
        document.querySelector(".card-container > h1");

    const yesNoContainer =
        document.querySelector(".scontainer");

    const yesBtn =
        document.getElementById("yesbtn");

    const noBtn =
        document.getElementById("nobtn");

    const okBtn =
        document.getElementById("okbtn");


    /* =========================================
       DATE ELEMENTS
    ========================================= */

    const dateScreen =
        document.querySelector(".date");

    const dateInput =
        document.getElementById("dateInput");

    const timeInput =
        document.getElementById("timeInput");

    const fixBtn =
        document.getElementById("fix");


    /* =========================================
       SCREEN STRUCTURE

       hiddenScreens[0] = YES confirmation
       hiddenScreens[1] = FOOD
       hiddenScreens[2] = FINAL
    ========================================= */

    const hiddenScreens =
        document.querySelectorAll(
            ".card-container > .hidden"
        );

    const yesScreen =
        hiddenScreens[0];

    const foodScreen =
        hiddenScreens[1];

    const finalScreen =
        hiddenScreens[2];


    /* =========================================
       SCREEN MANAGEMENT
    ========================================= */

    function hideAllScreens() {

        if (imageSection) {
            imageSection.classList.add("hidden");
        }

        if (mainQuestion) {
            mainQuestion.classList.add("hidden");
        }

        if (yesNoContainer) {
            yesNoContainer.classList.add("hidden");
        }

        if (dateScreen) {
            dateScreen.classList.add("hidden");
        }

        hiddenScreens.forEach(screen => {

            screen.classList.add("hidden");

            screen.classList.remove(
                "show-screen"
            );

        });
    }


    function showScreen(screen) {

        hideAllScreens();

        if (!screen) return;

        screen.classList.remove("hidden");

        void screen.offsetWidth;

        screen.classList.add(
            "show-screen"
        );
    }


    /* =========================================
       INITIAL STATE
    ========================================= */

    if (dateScreen) {
        dateScreen.classList.add("hidden");
    }

    hiddenScreens.forEach(screen => {
        screen.classList.add("hidden");
    });


    /* =========================================
       YES BUTTON
    ========================================= */

    if (yesBtn) {

        yesBtn.addEventListener(
            "click",
            () => {

                showScreen(yesScreen);

            }
        );

    }


    /* =========================================
       NO BUTTON
    ========================================= */

    let noAttempts = 0;

    if (noBtn) {

        noBtn.addEventListener(
            "click",
            event => {

                event.preventDefault();

                noAttempts++;

                createNoRain();


                /* ---------------------------------
                   CURRENT POSITION
                --------------------------------- */

                const rect =
                    noBtn.getBoundingClientRect();


                /* ---------------------------------
                   FIXED POSITION
                --------------------------------- */

                noBtn.style.position =
                    "fixed";

                noBtn.style.left =
                    `${rect.left}px`;

                noBtn.style.top =
                    `${rect.top}px`;

                noBtn.style.right =
                    "auto";

                noBtn.style.bottom =
                    "auto";

                noBtn.style.zIndex =
                    "99999";


                /* ---------------------------------
                   RANDOM X / Y MOVEMENT
                --------------------------------- */

                const movement =
                    150 +
                    Math.random() * 180;


                let moveX =
                    (Math.random() * 2 - 1) *
                    movement;

                let moveY =
                    (Math.random() * 2 - 1) *
                    movement;


                /* Sometimes mostly horizontal,
                   sometimes mostly vertical */

                if (Math.random() < 0.5) {

                    moveY *= 0.35;

                } else {

                    moveX *= 0.35;

                }


                /* ---------------------------------
                   KEEP INSIDE SCREEN
                --------------------------------- */

                const margin = 15;

                const maxX =
                    window.innerWidth -
                    rect.width -
                    margin;

                const maxY =
                    window.innerHeight -
                    rect.height -
                    margin;


                let finalX =
                    rect.left + moveX;

                let finalY =
                    rect.top + moveY;


                finalX =
                    Math.max(
                        margin,
                        Math.min(
                            finalX,
                            maxX
                        )
                    );


                finalY =
                    Math.max(
                        margin,
                        Math.min(
                            finalY,
                            maxY
                        )
                    );


                const translateX =
                    finalX - rect.left;

                const translateY =
                    finalY - rect.top;


                /* ---------------------------------
                   RUNNING ANIMATION
                --------------------------------- */

                const animation =
                    noBtn.animate(
                        [
                            {
                                transform:
                                    "translate(0,0) rotate(0deg) scale(1)"
                            },

                            {
                                transform:
                                    `translate(${translateX}px,${translateY}px) rotate(${Math.random() * 20 - 10}deg) scale(1.08)`
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


                /* =================================
                   AFTER 5 NO CLICKS
                ================================= */

                if (noAttempts >= 5) {

                    setTimeout(() => {

                        if (mainQuestion) {

                            mainQuestion.textContent =
                                "You have to say YES 😂❤️";

                            mainQuestion.classList.remove(
                                "hidden"
                            );

                        }


                        noBtn.style.display =
                            "none";


                        if (yesNoContainer) {

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


                            const newYesBtn =
                                document.getElementById(
                                    "yesbtn"
                                );


                            newYesBtn.addEventListener(
                                "click",
                                () => {

                                    showScreen(
                                        yesScreen
                                    );

                                }
                            );

                        }

                    }, 500);

                }

            }
        );

    }


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


            document.body.appendChild(
                drop
            );


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
                                `translateY(${window.innerHeight + 150}px) rotate(180deg)`,

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
       OK BUTTON

       YES SCREEN
       ↓
       DATE SCREEN
    ========================================= */

    if (okBtn) {

        okBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    dateScreen
                );

            }
        );

    }


    /* =========================================
       FIX MEETING

       DATE SCREEN
       ↓
       FOOD SCREEN
    ========================================= */

    if (fixBtn) {

        fixBtn.addEventListener(
            "click",
            () => {

                /* Check date */

                if (!dateInput.value) {

                    dateInput.focus();

                    shake(dateInput);

                    return;

                }


                /* Check time */

                if (!timeInput.value) {

                    timeInput.focus();

                    shake(timeInput);

                    return;

                }


                /* ---------------------------------
                   DATE IS VALID

                   Show FOOD screen
                --------------------------------- */

                showScreen(
                    foodScreen
                );

            }
        );

    }


    /* =========================================
       INPUT SHAKE
    ========================================= */

    function shake(element) {

        if (!element) return;

        element.animate(
            [
                {
                    transform:
                        "translateX(0)"
                },

                {
                    transform:
                        "translateX(-6px)"
                },

                {
                    transform:
                        "translateX(6px)"
                },

                {
                    transform:
                        "translateX(-4px)"
                },

                {
                    transform:
                        "translateX(4px)"
                },

                {
                    transform:
                        "translateX(0)"
                }
            ],
            {
                duration: 300
            }
        );

    }


    /* =========================================
       FOOD SELECTION

       FOOD
       ↓
       VALIDATION
       ↓
       FINAL MESSAGE
    ========================================= */

    function selectFood(foodName) {

        if (!foodScreen) return;


        /* ---------------------------------
           Remove old validation if one exists
        --------------------------------- */

        const oldValidation =
            foodScreen.querySelector(
                ".food-validation"
            );

        if (oldValidation) {
            oldValidation.remove();
        }


        /* ---------------------------------
           Create validation box
        --------------------------------- */

        const validation =
            document.createElement("div");

        validation.className =
            "food-validation";


        validation.innerHTML = `
            <h2>Are you sure? ❤️</h2>

            <p>
                You chose
                <strong>${foodName}</strong>.
            </p>

            <div class="validation-buttons">

                <button
                    type="button"
                    id="confirmFood"
                >
                    Yes, confirm ❤️
                </button>

                <button
                    type="button"
                    id="changeFood"
                >
                    Change
                </button>

            </div>
        `;


        foodScreen.appendChild(
            validation
        );


        /* ---------------------------------
           CONFIRM FOOD
        --------------------------------- */

        const confirmFood =
            validation.querySelector(
                "#confirmFood"
            );


        confirmFood.addEventListener(
            "click",
            () => {

                showFinalMessage(
                    foodName
                );

            }
        );


        /* ---------------------------------
           CHANGE FOOD
        --------------------------------- */

        const changeFood =
            validation.querySelector(
                "#changeFood"
            );


        changeFood.addEventListener(
            "click",
            () => {

                validation.remove();

            }
        );


        /* ---------------------------------
           Small entrance animation
        --------------------------------- */

        validation.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(15px) scale(.95)"
                },

                {
                    opacity: 1,
                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration: 350,
                easing: "ease-out",
                fill: "forwards"
            }
        );

    }


    /* =========================================
       FINAL MESSAGE

       After validation:
       "I'll go there ❤️"
    ========================================= */

    function showFinalMessage(foodName) {

        if (!finalScreen) return;


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


        finalScreen.classList.add(
            "final-screen-active"
        );


        showScreen(
            finalScreen
        );

    }


    /* =========================================
       FOOD BUTTONS
    ========================================= */

    const pizza =
        document.getElementById("pizza");

    const burger =
        document.getElementById("burger");

    const pasta =
        document.getElementById("pasta");

    const sushi =
        document.getElementById("sushi");


    if (pizza) {

        pizza.addEventListener(
            "click",
            () => {

                selectFood("Pizza");

            }
        );

    }


    if (burger) {

        burger.addEventListener(
            "click",
            () => {

                selectFood("Burger");

            }
        );

    }


    if (pasta) {

        pasta.addEventListener(
            "click",
            () => {

                selectFood("Pasta");

            }
        );

    }


    if (sushi) {

        sushi.addEventListener(
            "click",
            () => {

                selectFood("Sushi");

            }
        );

    }

});