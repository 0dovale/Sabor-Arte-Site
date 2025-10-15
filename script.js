// Scroll Reveal Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed")
    }
  })
}, observerOptions)

document.addEventListener("DOMContentLoaded", () => {
  // Observe all scroll-reveal elements
  const revealElements = document.querySelectorAll(".scroll-reveal")
  revealElements.forEach((el) => observer.observe(el))

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const navMenu = document.getElementById("nav-menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Settings Panel
  const settingsBtn = document.getElementById("settings-btn")
  const settingsPanel = document.getElementById("settings-panel")
  const settingsClose = document.getElementById("settings-close")

  if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
      settingsPanel.classList.add("active")
    })
  }

  if (settingsClose) {
    settingsClose.addEventListener("click", () => {
      settingsPanel.classList.remove("active")
    })
  }

  // Theme Switcher
  const themeBtns = document.querySelectorAll(".theme-btn")
  themeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme
      document.body.setAttribute("data-theme", theme)

      themeBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      localStorage.setItem("theme", theme)
    })
  })

  // Load saved theme
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    document.body.setAttribute("data-theme", savedTheme)
    themeBtns.forEach((btn) => {
      if (btn.dataset.theme === savedTheme) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })
  }

  // Accessibility - Increase Font
  const increaseFontBtn = document.getElementById("increase-font")
  let fontIncreased = false

  if (increaseFontBtn) {
    increaseFontBtn.addEventListener("click", () => {
      fontIncreased = !fontIncreased
      if (fontIncreased) {
        document.body.classList.add("font-large")
        increaseFontBtn.textContent = "Diminuir Fonte"
      } else {
        document.body.classList.remove("font-large")
        increaseFontBtn.textContent = "Aumentar Fonte"
      }
    })
  }

  // Accessibility - High Contrast
  const highContrastBtn = document.getElementById("high-contrast")
  let highContrast = false

  if (highContrastBtn) {
    highContrastBtn.addEventListener("click", () => {
      highContrast = !highContrast
      if (highContrast) {
        document.body.classList.add("high-contrast")
        highContrastBtn.textContent = "Contraste Normal"
      } else {
        document.body.classList.remove("high-contrast")
        highContrastBtn.textContent = "Alto Contraste"
      }
    })
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterMessage = document.getElementById("newsletter-message")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = newsletterForm.querySelector('input[type="email"]').value

      // Simulate API call
      setTimeout(() => {
        newsletterMessage.textContent = "Inscrição realizada com sucesso!"
        newsletterMessage.style.color = "var(--accent-gold)"
        newsletterForm.reset()

        setTimeout(() => {
          newsletterMessage.textContent = ""
        }, 3000)
      }, 500)
    })
  }

  // Menu Filters (Cardapio Page)
  const filterBtns = document.querySelectorAll(".filter-btn")
  const dietaryBtns = document.querySelectorAll(".dietary-btn")
  const menuCards = document.querySelectorAll(".menu-card")

  let activeCategory = "all"
  let activeDietary = []

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      activeCategory = btn.dataset.category
      filterMenuItems()
    })
  })

  dietaryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter

      if (activeDietary.includes(filter)) {
        activeDietary = activeDietary.filter((f) => f !== filter)
        btn.classList.remove("active")
      } else {
        activeDietary.push(filter)
        btn.classList.add("active")
      }

      filterMenuItems()
    })
  })

  function filterMenuItems() {
    menuCards.forEach((card) => {
      const category = card.dataset.category
      const dietary = card.dataset.dietary || ""

      const showCategory = activeCategory === "all" || category === activeCategory
      const showDietary = activeDietary.length === 0 || activeDietary.some((filter) => dietary.includes(filter))

      if (showCategory && showDietary) {
        card.classList.remove("hidden")
        card.style.animation = "fadeIn 0.5s ease-out"
      } else {
        card.classList.add("hidden")
      }
    })
  }

  // Menu Card Details Modal
  const modal = document.getElementById("dish-modal")
  const viewDetailsBtns = document.querySelectorAll(".btn-view-details")
  const modalClose = document.querySelector(".modal-close")
  const modalBackdrop = document.querySelector(".modal-backdrop")

  viewDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const card = btn.closest(".menu-card")
      const title = card.querySelector("h3").textContent
      const description = card.querySelector(".menu-description").textContent
      const image = card.querySelector("img").src

      if (modal) {
        document.getElementById("modal-title").textContent = title
        document.getElementById("modal-description").textContent = description
        document.getElementById("modal-image").src = image

        modal.classList.add("active")
        document.body.style.overflow = "hidden"
      }
    })
  })

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      modal.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", () => {
      modal.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  // Reservation Form
  const reservationForm = document.getElementById("reservation-form")
  const reservationSuccess = document.getElementById("reservation-success")

  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate API call
      setTimeout(() => {
        reservationForm.style.display = "none"
        reservationSuccess.style.display = "block"
        reservationSuccess.style.animation = "fadeIn 0.5s ease-out"
      }, 500)
    })
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Navbar Background on Scroll
  const navbar = document.querySelector(".navbar")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      navbar.style.backgroundColor = "var(--bg-secondary)"
      navbar.style.boxShadow = "0 2px 10px var(--shadow)"
    } else {
      navbar.style.backgroundColor = "var(--bg-secondary)"
      navbar.style.boxShadow = "none"
    }

    lastScroll = currentScroll
  })

  // Language Selector
  const languageSelector = document.getElementById("language-selector")
  if (languageSelector) {
    languageSelector.addEventListener("change", (e) => {
      const language = e.target.value
      console.log("[v0] Language changed to:", language)
      // In a real application, this would trigger translation
      alert(`Idioma alterado para: ${language === "pt" ? "Português" : "English"}`)
    })
  }

  // Harmonize Button (Wine Pairing)
  const harmonizeBtns = document.querySelectorAll(".btn-harmonize")
  harmonizeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const card = btn.closest(".menu-card")
      const dishName = card.querySelector("h3").textContent

      alert(
        `Harmonização sugerida para ${dishName}:\n\nVinho Tinto Malbec ou Cabernet Sauvignon\n\nNosso sommelier pode ajudá-lo a escolher a melhor opção!`,
      )
    })
  })

  // Set minimum date for reservation (today)
  const dateInput = document.getElementById("date")
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0]
    dateInput.setAttribute("min", today)
  }
})
