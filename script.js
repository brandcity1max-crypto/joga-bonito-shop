// Ersetze diese Nummer durch die echte WhatsApp-Nummer im internationalen Format.
const whatsappNumber = "4917666655580";

function whatsappUrl(product = "") {
  const message = product
    ? `Hallo Joga Bonito, ich interessiere mich für „${product}“. Welche Größen sind noch verfügbar? Ich möchte gerne wissen, ob Standard für 31,99 € oder mit Wunschname und Wunschnummer für 39,99 € möglich ist.`
    : "Hallo Joga Bonito, ich habe eine Frage zu euren Fußballtrikots.";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = whatsappUrl();
  link.target = "_blank";
  link.rel = "noopener";
});

document.querySelectorAll(".quick-request").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(whatsappUrl(button.dataset.product), "_blank", "noopener");
  });
});

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");

    document.querySelectorAll(".product-card").forEach((card) => {
      card.classList.toggle(
        "hidden",
        button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter,
      );
    });
  });
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
