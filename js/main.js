// Module import
import "https://rawcdn.githack.com/flackr/scroll-timeline/3063e156535f3ab1ffc8a4000ffdd3290232c121/dist/scroll-timeline.js";

// If page is about.html
if (document.getElementById("about--body") !== null) {
  // Left and Right animation AboupPage exp section
  let activeIndexAboutExp = 0;
  const aboutExpItem = document.getElementsByClassName("about-exp-item"),
    aboutExpContainer = document.getElementById("about-exp-item-container");

  const aboutExpButtonRight = document.querySelector(".about-exp-button-right"),
    aboutExpButtonLeft = document.querySelector(".about-exp-button-left");

  const aboutExpRight = (e) => {
    activeIndexAboutExp =
      0 || activeIndexAboutExp % 1 != 0
        ? Math.ceil(activeIndexAboutExp)
        : activeIndexAboutExp < aboutExpItem.length - 1
        ? activeIndexAboutExp + 1
        : activeIndexAboutExp;
    aboutExpContainer.style.transform = `translate(calc(-1*(${aboutExpItem[1].offsetWidth}px + 4rem)*${activeIndexAboutExp}), 0px)`;
    aboutExpContainer.dataset.spacingX =
      -1 *
      (aboutExpItem[1].offsetWidth +
        parseFloat(getComputedStyle(aboutExpItem[1]).marginRight)) *
      activeIndexAboutExp;
    aboutExpButtonRight.setPointerCapture(e.pointerId);
  };
  aboutExpButtonRight.onpointerdown = aboutExpRight;
  aboutExpButtonRight.onpointerup = (e) => {
    aboutExpButtonRight.releasePointerCapture(e.pointerId);
  };

  const aboutExpLeft = (e) => {
    activeIndexAboutExp =
      0 || activeIndexAboutExp % 1 != 0
        ? Math.floor(activeIndexAboutExp)
        : activeIndexAboutExp > 0
        ? activeIndexAboutExp - 1
        : activeIndexAboutExp;
    aboutExpContainer.style.transform = `translate(calc(-1*(${aboutExpItem[1].offsetWidth}px + 4rem)*${activeIndexAboutExp}), 0px)`;
    aboutExpContainer.dataset.spacingX =
      -1 *
      (aboutExpItem[1].offsetWidth +
        parseFloat(getComputedStyle(aboutExpItem[1]).marginRight)) *
      activeIndexAboutExp;
    aboutExpButtonLeft.setPointerCapture(e.pointerId);
  };
  aboutExpButtonLeft.onpointerdown = aboutExpLeft;
  aboutExpButtonLeft.onpointerup = (e) => {
    aboutExpButtonRight.releasePointerCapture(e.pointerId);
  };

  // AboutPage Exp Drag and Drop scroll
  const activeIndexAboutExpUpdater = () => {
    activeIndexAboutExp =
      -1 *
      (aboutExpContainer.dataset.spacingX /
        (aboutExpItem[1].offsetWidth +
          parseFloat(getComputedStyle(aboutExpItem[1]).marginRight)));
  };
  const maxDelta =
    -1 *
    (aboutExpItem[1].offsetWidth +
      parseFloat(getComputedStyle(aboutExpItem[1]).marginRight)) *
    (aboutExpItem.length - 1);

  const aboutExpSlidingOn = (e) => {
    aboutExpContainer.dataset.pointerDown = e.clientX;
    aboutExpContainer.onpointermove = slide;
    aboutExpContainer.setPointerCapture(e.pointerId);
  };
  const aboutExpSlidingOff = (e) => {
    aboutExpContainer.dataset.spacingX = Math.max(
      Math.min(
        parseFloat(aboutExpContainer.dataset.spacingX) +
          (e.clientX - parseFloat(aboutExpContainer.dataset.pointerDown)) * 2,
        0
      ),
      maxDelta
    );
    activeIndexAboutExpUpdater();
    aboutExpContainer.style.transition = "transform 300ms ease-in-out";
    aboutExpContainer.onpointermove = null;
    aboutExpContainer.releasePointerCapture(e.pointerId);
  };
  const slide = (e) => {
    aboutExpContainer.style.transition = "transform 300ms ease-out";
    aboutExpContainer.style.transform = `translateX(${Math.max(
      Math.min(
        parseFloat(aboutExpContainer.dataset.spacingX) +
          (e.clientX - parseFloat(aboutExpContainer.dataset.pointerDown)) * 2,
        0
      ),
      maxDelta
    )}px)`;
  };
  document.getElementById("about-exp-body").onpointerdown = aboutExpSlidingOn;
  document.getElementById("about-exp-body").onpointerup = aboutExpSlidingOff;

  // Scroll Animation
  const scrollContainer = document.getElementById("about--main");

  const scrollTracker = document.querySelector(".scroll-tracker");

  const aboutTitleScroll = document.getElementById("about-tools-title-scroll"),
    aboutTitleScrollHeight = aboutTitleScroll.offsetHeight,
    aboutTitleScrollTop = aboutTitleScroll.offsetTop;

  const scrollTrackingTimeline = new ScrollTimeline({
    source: scrollContainer,
    scrollSource: scrollContainer, // For legacy implementations
    orientation: "block",
    scrollOffsets: [CSS.percent(0), CSS.percent(100)],
  });
  scrollTracker.animate(
    {
      transform: ["scaleX(0)", "scaleX(1)"],
    },
    {
      duration: 1,
      fill: "both",
      timeline: scrollTrackingTimeline,
    }
  );

  const scrollaboutTitle = new ScrollTimeline({
    source: scrollContainer,
    scrollSource: scrollContainer, // For legacy implementations
    scrollOffsets: [
      // CSS.px(aboutTitleScrollTop + aboutTitleScrollHeight - window.innerHeight),
      // CSS.px(aboutTitleScrollTop),
      { target: aboutTitleScroll, edge: "end", threshold: "0" },
      { target: aboutTitleScroll, edge: "start", threshold: "1" },
    ],
  });
  aboutTitleScroll.animate(
    {
      transform: ["translateX(100%)", "translateX(-25%)"],
    },
    {
      duration: 1,
      fill: "both",
      timeline: scrollaboutTitle,
    }
  );
}

if (document.querySelector("#work--body") !== null) {
  // Left and Right slider navigation animation
  let activeIndex = 0,
    nextIndex = 0;
  const articles = document.getElementsByTagName("article");
  const workRightButton = document.querySelectorAll(".article--nav--right"),
    workLeftButton = document.querySelectorAll(".article--nav--left");

  const rightClickDown = (e) => {
    workRightButton[activeIndex].setPointerCapture(e.pointerId);
    // Get articles index
    nextIndex = activeIndex + 1 <= articles.length - 1 ? activeIndex + 1 : 0;
    const currentArticle = document.querySelector(
      `article[data-index='${activeIndex}']`
    );
    const nextArticle = document.querySelector(
      `article[data-index='${nextIndex}']`
    );
    // Exit-right of the active article
    currentArticle.dataset.status = "pre--active";
    nextArticle.dataset.status = "post--inactive";

    setTimeout(() => {
      // Update articles to active
      nextArticle.dataset.status = "active";
      activeIndex = nextIndex;
    });
  };
  const rightClickUp = (e) => {
    workRightButton[activeIndex].releasePointerCapture(e.pointerId);
  };
  for (var i = 0; i < workRightButton.length; i++) {
    workRightButton[i].onpointerdown = rightClickDown;
    workRightButton[i].onpointerup = rightClickUp;
  }

  const leftClickDown = (e) => {
    // Get articles index
    const nextIndex =
      activeIndex - 1 >= 0 ? activeIndex - 1 : articles.length - 1;
    const currentArticle = document.querySelector(
      `article[data-index='${activeIndex}']`
    );
    const nextArticle = document.querySelector(
      `article[data-index='${nextIndex}']`
    );
    // Update articles to inactive
    currentArticle.dataset.status = "post--active";
    nextArticle.dataset.status = "pre--inactive";

    setTimeout(() => {
      // Update articles to active
      nextArticle.dataset.status = "active";
      activeIndex = nextIndex;
    });
    workLeftButton[activeIndex].setPointerCapture(e.pointerId);
  };
  const leftClickUp = (e) => {
    workLeftButton[activeIndex].releasePointerCapture(e.pointerId);
  };
  for (var i = 0; i < workRightButton.length; i++) {
    workLeftButton[i].onpointerdown = leftClickDown;
    workLeftButton[i].onpointerup = leftClickUp;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
//toggle menu
const nav = document.getElementsByTagName("nav");
const mobilMenu = document.querySelector("#nav--button--menu");
const toggleMenu = (e) => {
  nav[0].dataset.transitionable = "true";
  nav[0].dataset.toggled = nav[0].dataset.toggled === "true" ? "false" : "true";
  mobilMenu.setPointerCapture(e.pointerId);
};

window.matchMedia("(max-width: 910px)").onchange = (e) => {
  nav[0].dataset.transitionable = "false";
  nav[0].dataset.toggled = "false";
};
mobilMenu.onpointerdown = toggleMenu;
mobilMenu.onpointerup = (e) => {
  mobilMenu.releasePointerCapture(e.pointerId);
};
////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  // Eye tracking cursor on desktop about page ///////////////////////////
  const eyeMovement = (e) => {
    const aboutEye = document.getElementById("about-logo-goldenEye"),
      x =
        (e.clientX * aboutEye.getBBox().width) / window.innerWidth -
        aboutEye.getBBox().width / 2,
      y =
        (e.clientY * aboutEye.getBBox().height) / window.innerHeight -
        aboutEye.getBBox().width / 2,
      aboutBody = this.getElementById("about--body");

    aboutEye.style.transform = `translate(${x}px,${y}px)`;
    aboutBody.onpointerleave = () => {
      setTimeout(() => {
        aboutEye.style.transform = `translate(0px,0px)`;
      }, 500);
    };
  };

  //Mouse Tracker //////////////////////////////////
  const mouseTrailer = document.getElementById("mouse--trailer");
  const stickyMouse = (
    e,
    interactingMain,
    interactingNav,
    socialLinksInteraction,
    showProjectInteraction,
    homeContactHover,
    homeWorkHover
  ) => {
    // Capture mouse position
    const x = e.clientX - mouseTrailer.offsetWidth / 2,
      y = e.clientY - mouseTrailer.offsetHeight / 2;
    // Reveal the mouse trailer
    mouseTrailer.style.opacity = "1";
    // Cursor lagging behind
    const keyframes = {
      transform: `translate(${x}px,${y}px) scale(${
        interactingMain ? 6 : interactingNav ? 3 : 1
      })`,
    };
    mouseTrailer.animate(keyframes, {
      duration: 100,
      fill: "forwards",
    });
    // Overlay-backdropBlur on home page mainInteraction
    mouseTrailer.style.backdropFilter = `blur(${interactingMain ? 1 : 0}px)`;
    mouseTrailer.style.mixBlendMode = interactingMain ? "initial" : "";
    mouseTrailer.style.backgroundColor = interactingMain
      ? "var(--Light-French-Beige-20)"
      : "rgb(240, 230, 210)";
    // Social nav hover interaction
    mouseTrailer.style.opacity = socialLinksInteraction ? 0 : 1;
    // Store :root element
    const rootContent = document.querySelector(":root");
    // Set mouseTrailer content appropriately
    rootContent.style.setProperty(
      "--content-before",
      showProjectInteraction
        ? "'About'"
        : homeContactHover
        ? "'Contact'"
        : homeWorkHover
        ? "'Work'"
        : ""
    );
    // Scale mouseTrailer content
    rootContent.style.setProperty(
      "--mouseContentScale",
      interactingMain ? 1 : 0
    );
  };

  window.onmousemove = (e) => {
    // Boolean = TRUE if cursor close to css selector target
    const interactableNav = e.target.closest(
        "#nav--links a, #nav--contact a, #nav--logo a, .article--title, .article--nav"
      ),
      interactingNav = interactableNav !== null;

    const interactableMain = e.target.closest(
        ".home-work-button, .home-contact, .home-about"
      ),
      interactingMain = interactableMain !== null;

    const socialLinks = e.target.closest("#nav--social a"),
      socialLinksInteraction = socialLinks !== null;

    const showProject = e.target.closest(".home-about"),
      showProjectInteraction = showProject !== null;
    const homeContact = e.target.closest(".home-contact"),
      homeContactHover = homeContact !== null;
    const homeWork = e.target.closest(".home-work-button"),
      homeWorkHover = homeWork !== null;

    stickyMouse(
      e,
      interactingMain,
      interactingNav,
      socialLinksInteraction,
      showProjectInteraction,
      homeContactHover,
      homeWorkHover
    );
    if (document.getElementById("about--body") !== null) {
      eyeMovement(e);
    }
  };

  if (document.getElementById("contact--body") !== null) {
    // Ramdomized stars
    let indexStar = 0,
      intervalStar = 1000;

    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const animateStar = (star) => {
      star.style.setProperty("--top--star", `${rand(-5, 90)}%`);
      star.style.setProperty("--left--star", `${rand(-5, 100)}%`);

      star.style.animation = "none";
      star.offsetHeight;
      star.style.animation = "";
    };

    for (const stars of document.getElementsByClassName("star--wrapper")) {
      setTimeout(() => {
        animateStar(stars);

        setInterval(() => {
          animateStar(stars);
        }, 1000);
      }, indexStar++ * (intervalStar / document.getElementsByClassName("star--wrapper").length));
    }
  }
});
