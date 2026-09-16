import './style.css'
import { renderLangWidget, openGlossary } from './i18n.js'

// Initialize Language Switcher & Glossary
document.addEventListener('DOMContentLoaded', () => {
  renderLangWidget()

  document.querySelectorAll('[data-open-glossary]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault()
      openGlossary()
    })
  })
})

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 80)
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el))

// ===== Counter Animation =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    const el = entry.target
    const target = parseInt(el.dataset.count)
    const suffix = el.dataset.suffix || ''
    let current = 0
    const step = Math.max(1, Math.floor(target / 35))
    const timer = setInterval(() => {
      current = Math.min(current + step, target)
      el.textContent = current.toLocaleString() + suffix
      if (current >= target) clearInterval(timer)
    }, 25)
    counterObserver.unobserve(el)
  })
}, { threshold: 0.5 })

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el))

// ===== 3D Tilt Cards =====
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${y * -6}deg) translateY(-4px)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
  })
})

// ===== FAQ Accordion =====
document.querySelectorAll('[data-faq-trigger]').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('[data-faq-item]')
    const isOpen = item.classList.contains('is-open')
    // Close all siblings
    item.parentElement.querySelectorAll('[data-faq-item]').forEach(i => i.classList.remove('is-open'))
    if (!isOpen) item.classList.add('is-open')
  })
})

// ===== Mobile Nav =====
const menuBtn = document.getElementById('menuBtn')
const mobileNav = document.getElementById('mobileNav')
const navOverlay = document.getElementById('navOverlay')
if (menuBtn && mobileNav) {
  const toggle = () => {
    mobileNav.classList.toggle('translate-x-full')
    navOverlay?.classList.toggle('opacity-0')
    navOverlay?.classList.toggle('pointer-events-none')
    document.body.classList.toggle('overflow-hidden')
  }
  menuBtn.addEventListener('click', toggle)
  navOverlay?.addEventListener('click', toggle)
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', toggle))
}

// ===== Navbar scroll =====
const nav = document.getElementById('mainNav')
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow-lg', window.scrollY > 40)
    nav.classList.toggle('py-3', window.scrollY > 40)
    nav.classList.toggle('py-5', window.scrollY <= 40)
  })
}

