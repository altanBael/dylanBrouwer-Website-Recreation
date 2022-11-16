////////////////////////////////////////////////////////////////////////////
// Left and Right slider navigation animation
let activeIndex = 0;
const articles = document.getElementsByTagName("article");

const rightClick = () => {
  // Get articles index
  const nextIndex =
    activeIndex + 1 <= articles.length - 1 ? activeIndex + 1 : 0;
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

const leftClick = () => {
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
};

////////////////////////////////////////////////////////////////////////////////////////////////
//toggle menu
const nav = document.getElementsByTagName("nav");
const toggleMenu = () => {
  nav[0].dataset.transitionable = "true";
  nav[0].dataset.toggled = nav[0].dataset.toggled === "true" ? "false" : "true";
};

window.matchMedia("(max-width: 910px)").onchange = (e) => {
  nav[0].dataset.transitionable = "false";
  nav[0].dataset.toggled = "false";
};
////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
  const mouseTrailer = document.getElementById("mouse--trailer");

  const stickyMouse = (
    e,
    interacting,
    socialLinksInteraction,
    showProjectInteraction
  ) => {
    // Capture mouse position
    const x = e.clientX - mouseTrailer.offsetWidth / 2,
      y = e.clientY - mouseTrailer.offsetHeight / 2;

    // Reveal the mouse trailer
    mouseTrailer.style.opacity = "1";

    // Cursor lagging begind
    const keyframes = {
      transform: `translate(${x}px,${y}px) scale(${interacting ? 4 : 1})`,
    };
    mouseTrailer.animate(keyframes, {
      duration: 800,
      fill: "forwards",
    });

    // Social nav hover interaction
    mouseTrailer.style.opacity = socialLinksInteraction ? 0 : 1;

    // Article Title hover interaction
    mouseTrailer.style.background = showProjectInteraction
      ? "rgb(19, 20, 21) url(/img/logo.svg) no-repeat center center"
      : "";
    mouseTrailer.style.backgroundSize = showProjectInteraction ? "40%" : "";
  };

  window.onmousemove = (e) => {
    // Boolean = TRUE if cursor close to css selector target
    const interactable = e.target.closest(
        "#nav--links a, .article--nav, #nav--contact a, #nav--logo a, .article--title"
      ),
      interacting = interactable !== null;

    const socialLinks = e.target.closest("#nav--social a"),
      socialLinksInteraction = socialLinks !== null;

    const showProject = e.target.closest(".article--title"),
      showProjectInteraction = showProject !== null;

    stickyMouse(e, interacting, socialLinksInteraction, showProjectInteraction);
  };

  ////////////////////////////////////////////////////////////////
  // Ramdomized stars
  let indexStar = 0,
    intervalStar = 1000;

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

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
});
