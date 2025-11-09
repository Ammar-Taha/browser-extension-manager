import "./index.css";
import iconMoon from "../assets/images/icon-moon.svg";
import iconSun from "../assets/images/icon-sun.svg";
import extensionsData from "./data.js";

// ---------------------------------------------------------------------------
// Application state
// ---------------------------------------------------------------------------

const state = {
  extensions: structuredClone(extensionsData),
  theme: getInitialTheme(),
};

// ---------------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------------

const elements = {
  filtersGroup: document.querySelector(".extensions-header__actions"),
  filterAll: document.getElementById("filter-all"),
  filterActive: document.getElementById("filter-active"),
  filterInactive: document.getElementById("filter-inactive"),
  grid: document.querySelector(".extensions-grid"),
  themeToggle: document.querySelector(".light-dark-toggle"),
  themeToggleIcon: document.querySelector(".light-dark-toggle img"),
};

// ---------------------------------------------------------------------------
// Filter manager (get + apply combined)
// ---------------------------------------------------------------------------

const filterManager = {
  current: "all",

  get(filter = this.current) {
    switch (filter) {
      case "active":
        return state.extensions.filter(({ isActive }) => isActive);
      case "inactive":
        return state.extensions.filter(({ isActive }) => !isActive);
      default:
        return state.extensions;
    }
  },

  apply(filter = this.current) {
    if (!elements.grid) return;

    this.current = filter;
    renderExtensions(this.get(filter), elements.grid);
  },
};

// ---------------------------------------------------------------------------
// Event binding
// ---------------------------------------------------------------------------

bindFilterToggleState(); // highlight active filter button
bindFilterActions(); // filter click handlers
bindGridInteractions(); // toggle + remove actions inside cards
bindThemeToggle(); // theme switcher

applyTheme(state.theme); // initial theme
filterManager.apply(); // initial render

// ---------------------------------------------------------------------------
// Event helpers
// ---------------------------------------------------------------------------

function bindFilterToggleState() {
  if (!elements.filtersGroup) return;

  elements.filtersGroup.addEventListener("click", (event) => {
    const target = event.target.closest("button");
    if (!target) return;

    elements.filtersGroup
      .querySelectorAll("button")
      .forEach((button) =>
        button.classList.toggle("button--active", button === target)
      );
  });
}

function bindFilterActions() {
  elements.filterAll?.addEventListener("click", () =>
    filterManager.apply("all")
  );

  elements.filterActive?.addEventListener("click", () =>
    filterManager.apply("active")
  );

  elements.filterInactive?.addEventListener("click", () =>
    filterManager.apply("inactive")
  );
}

function bindGridInteractions() {
  if (!elements.grid) return;

  elements.grid.addEventListener("change", updateExtensionCard);
  elements.grid.addEventListener("click", removeExtensionCard);
}

function bindThemeToggle() {
  if (!elements.themeToggle) return;

  elements.themeToggle.addEventListener("click", () => {
    const nextTheme = state.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

// ---------------------------------------------------------------------------
// Rendering utilities
// ---------------------------------------------------------------------------

function renderExtensions(extensionsList, container) {
  if (!container) return;

  container.innerHTML = "";
  extensionsList.forEach((card) => {
    container.appendChild(createExtensionCard(card));
  });
}

function createExtensionCard(card) {
  const article = document.createElement("article");
  article.classList.add("extension-card", "flex");

  article.innerHTML = `
    <header class="extension-card__header flex">
      <figure class="extension-card__figure">
        <img src="${card.logo}" alt="${card.name} logo" />
      </figure>
      <div class="extension-card__content">
        <h3 class="extension-card__title">${card.name}</h3>
        <p class="extension-card__description">${card.description}</p>
      </div>
    </header>
    <footer class="extension-card__footer flex flex--between-center">
      <button class="button button--remove" type="button">Remove</button>
      <label class="toggle" aria-label="Toggle extension">
        <input class="toggle__input" type="checkbox" ${
          card.isActive ? "checked" : ""
        }>
        <span class="toggle__track" aria-hidden="true"></span>
      </label>
    </footer>
  `;

  if (card.isActive) {
    article.setAttribute("data-active", "");
  }

  return article;
}

// ---------------------------------------------------------------------------
// Grid actions
// ---------------------------------------------------------------------------

function removeExtensionCard(event) {
  const removeBtn = event.target.closest(".button--remove");
  const extensionCard = removeBtn?.closest(".extension-card");
  if (!extensionCard) return;

  extensionCard.remove();
}

function updateExtensionCard(event) {
  const input = event.target.closest('input[type="checkbox"]');
  const extensionCard = input?.closest(".extension-card");
  if (!extensionCard) return;

  input.toggleAttribute("checked", input.checked);
  extensionCard.toggleAttribute("data-active", input.checked);

  const cardTitle = extensionCard.querySelector(".extension-card__title");
  if (!cardTitle) return;

  const extension = state.extensions.find(
    (item) => item.name === cardTitle.textContent
  );

  if (extension) {
    console.log("[Extensions] toggle before:", {
      name: extension.name,
      isActive: extension.isActive,
    });
    extension.isActive = input.checked;
    console.log("[Extensions] toggle after:", {
      name: extension.name,
      isActive: extension.isActive,
    });

    filterManager.apply();
  }
}

// ---------------------------------------------------------------------------
// Theme helpers
// ---------------------------------------------------------------------------

function applyTheme(theme) {
  state.theme = theme;

  temporarilyDisableThemeTransitions();
  document.body.dataset.theme = theme;

  const iconSrc = theme === "dark" ? iconSun : iconMoon;
  const iconAlt =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  elements.themeToggleIcon?.setAttribute("src", iconSrc);
  elements.themeToggleIcon?.setAttribute("alt", iconAlt);
  elements.themeToggle?.setAttribute(
    "aria-pressed",
    theme === "dark" ? "true" : "false"
  );

  try {
    localStorage.setItem("bem-theme", theme);
  } catch {
    // ignore storage errors (e.g., private mode)
  }
}

function getInitialTheme() {
  try {
    const stored = localStorage.getItem("bem-theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch {
    // ignore storage errors
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}

function temporarilyDisableThemeTransitions() {
  document.body.classList.add("disable-theme-transitions");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove("disable-theme-transitions");
    });
  });
}

// ---------------------------------------------------------------------------
// Module documentation
// ---------------------------------------------------------------------------

/**
 * Browser Extension Manager
 * -------------------------
 * Data Source
 *   - `extensionsData` → cloned into `state.extensions` for safe mutations.
 *
 * DOM References
 *   - Grouped under `elements` (filters, buttons, grid container).
 *
 * Filter Flow
 *   - `filterManager.apply(filter)` renders `filterManager.get(filter)` into the grid.
 *   - Filter buttons call `filterManager.apply()` with their respective key.
 *   - `current` filter state is persisted so updates can refresh the active view.
 *
 * Rendering
 *   - `renderExtensions` clears and repopulates the grid with cards created by `createExtensionCard`.
 *
 * Grid Interactions
 *   - `removeExtensionCard` handles remove button clicks (DOM removal only).
 *   - `updateExtensionCard` syncs toggle state with `state.extensions` and re-applies current filter.
 *
 * Theming
 *   - `state.theme` stores the active theme (`light` | `dark`).
 *   - `applyTheme` updates `body[data-theme]`, swaps toggle icon, and persists choice to `localStorage`.
 *   - User preference falls back to `prefers-color-scheme` when no saved theme exists.
 *
 * Extensibility
 *   - Centralized state & helpers allow new filters, sorting, or persistence without restructuring.
 */
