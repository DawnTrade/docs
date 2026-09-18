// On the landing page (/), Mintlify highlights the first visible top-nav tab
// (Start Here) even though no tab actually matches the URL. Strip the
// data-active attribute from tab links whenever we're on the root path.

(function () {
  function stripActiveTabs() {
    if (window.location.pathname !== "/") return;
    // Find every tab-like link in the top navbar and remove active markers.
    const candidates = document.querySelectorAll(
      'nav-tabs a, [class*="nav-tabs"] a, [class*="NavTabs"] a, header nav a'
    );
    candidates.forEach((el) => {
      el.removeAttribute("data-active");
      el.removeAttribute("data-state");
      el.removeAttribute("aria-current");
      // Also drop any active class variants
      el.classList.forEach((c) => {
        if (/active|selected|current/i.test(c)) el.classList.remove(c);
      });
    });
  }

  // Run now, on route changes, and on DOM mutations.
  stripActiveTabs();
  document.addEventListener("DOMContentLoaded", stripActiveTabs);
  window.addEventListener("popstate", stripActiveTabs);
  window.addEventListener("pushstate", stripActiveTabs);

  const observer = new MutationObserver(stripActiveTabs);
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ["data-active", "data-state", "aria-current", "class"],
  });
})();
