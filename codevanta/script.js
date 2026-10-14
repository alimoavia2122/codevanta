/* CodeVanta website interactions. Configure contact details before publishing. */
"use strict";

const CONTACT_EMAIL = "hello@yourdomain.com"; // Replace with your real inquiry email.
const WHATSAPP_NUMBER = ""; // International digits only, e.g. 923001234567. Do not include + or spaces.

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

document.querySelectorAll("[data-email-link]").forEach((link) => {
  link.href = `mailto:${CONTACT_EMAIL}`;
  link.textContent = CONTACT_EMAIL;
});
document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  if (/^[0-9]{8,15}$/.test(WHATSAPP_NUMBER)) {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Chat on WhatsApp";
  } else {
    link.href = "#contact";
    link.textContent = "Configure WhatsApp number";
  }
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
if (form && status) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.className = "form-status";
    if (!form.reportValidity()) {
      status.classList.add("error");
      status.textContent = "Please check the required fields and enter a valid email address.";
      return;
    }
    const data = new FormData(form);
    if (String(data.get("website") || "").trim() !== "") {
      status.classList.add("error");
      status.textContent = "The inquiry could not be prepared. Please try again.";
      return;
    }
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const service = String(data.get("service") || "").trim();
    const budget = String(data.get("budget") || "").trim() || "Not specified";
    const details = String(data.get("details") || "").trim();
    if (name.length < 2 || name.length > 100 || email.length > 254 || details.length < 10 || details.length > 3000) {
      status.classList.add("error");
      status.textContent = "Please check your details. Name, email, or project description is outside the allowed length.";
      return;
    }
    // This frontend-only version does not claim server submission. It opens the visitor's email app.
    const subject = encodeURIComponent(`CodeVanta project inquiry — ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\nProject details:\n${details}`);
    status.classList.add("success");
    status.textContent = "Your email app should open with the inquiry prepared. The message is not sent until you press Send in that app.";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });
}
