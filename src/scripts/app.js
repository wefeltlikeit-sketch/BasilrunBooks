const filters = document.querySelector(".filters");
if (filters) {
  filters.hidden = false;
  const buttons = [...filters.querySelectorAll("button")];
  const items = [...document.querySelectorAll(".library .book-item")];
  function filter(world) {
    buttons.forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.filter === world)),
    );
    items.forEach(
      (i) => (i.hidden = world !== "all" && i.dataset.world !== world),
    );
    const count = items.filter((i) => !i.hidden).length;
    document.querySelector("#filter-status").textContent =
      `${count} ${count === 1 ? "story" : "stories"} shown.`;
  }
  buttons.forEach((b) =>
    b.addEventListener("click", () => filter(b.dataset.filter)),
  );
  document
    .querySelectorAll("[data-filter-link]")
    .forEach((a) =>
      a.addEventListener("click", () => filter(a.dataset.filterLink)),
    );
}
const star = document.querySelector(".firefly");
star?.addEventListener("click", () => {
  const note = document.querySelector(".magic-note");
  note.hidden = !note.hidden;
  star.setAttribute("aria-expanded", String(!note.hidden));
});
