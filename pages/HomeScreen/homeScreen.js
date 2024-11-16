document.addEventListener("DOMContentLoaded", () => {
  const viewMoreButton = document.querySelector(".home-screen-new-release-header-btn");
  const releaseList = document.querySelector(".home-screen-new-release-list");

  viewMoreButton.addEventListener("click", () => {
    // Scroll right by 300px (adjust based on container width)
    releaseList.scrollBy({
      left: 300, // Amount to scroll horizontally
      behavior: "smooth", // Smooth scrolling
    });
  });
});