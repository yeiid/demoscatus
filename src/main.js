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

// ===== Interactive WhatsApp Sales Modal & Flow =====
const WA_PHONE = '573176119013'

function injectWhatsAppModal() {
  if (document.getElementById('whatsappSalesModal')) return

  const modalHtml = `
    <div id="whatsappSalesModal" class="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-300">
      <div class="glass max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-emerald-500/40 relative transform scale-95 transition-transform duration-300 shadow-2xl shadow-emerald-500/10">
        <button id="closeWaModal" class="absolute top-5 right-5 text-white/60 hover:text-white text-2xl font-bold leading-none cursor-pointer">&times;</button>
        
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xl font-bold">
            🌵
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">¡Solicita tu Fibra Óptica!</h3>
            <p class="text-xs text-emerald-400 font-semibold">CactusNet — Atención Inmediata en La Guajira</p>
          </div>
        </div>

        <p class="text-white/60 text-sm mb-6 leading-relaxed">
          Déjanos tus datos y te conectaremos con un asesor local para coordinar la instalación en 24-48 horas.
        </p>

        <form id="waLeadForm" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">Tu Nombre Completo</label>
            <input type="text" id="waName" required placeholder="Ej: Carlos Gómez" class="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition">
          </div>

          <div>
            <label class="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">Barrio, Municipio o Vereda</label>
            <input type="text" id="waLocation" required placeholder="Ej: Hatonuevo, El Cerro, Guamachito..." class="w-full bg-slate-950/80 border border-slate-700/80 focus:border-emerald-500 text-white rounded-xl px-4 py-3 text-sm outline-none transition">
          </div>

          <div>
            <label class="block text-xs font-bold text-white/80 uppercase tracking-wider mb-1.5">Plan o Producto Seleccionado</label>
            <input type="text" id="waPlan" readonly class="w-full bg-slate-900/60 border border-emerald-500/30 text-emerald-300 font-semibold rounded-xl px-4 py-3 text-sm outline-none">
          </div>

          <div class="pt-2">
            <button type="submit" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer text-sm">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.413 1.096 3.359l-.712 2.613 2.69-.696c.801.463 1.725.728 2.711.728 3.181 0 5.767-2.586 5.767-5.767.001-3.181-2.585-5.771-5.785-5.704zm3.931 8.216c-.158.441-.795.807-1.125.859-.311.05-.71.011-1.314-.149-1.921-.511-3.415-2.288-3.415-3.697 0-.741.429-.861.429-.861l.512-.045s.16-.011.231.111c.071.121.241.6.241.6s.031.081.011.161c-.021.081-.05.14-.111.211-.06.07-.12.16-.18.23s-.11.11-.11.11.08.15.24.28c.16.13.43.33.86.53.53.25.96.42 1.34.46.38.04.58-.02.78-.21.2-.19.86-1.001.86-1.001s.08-.131.23-.08c.15.05.952.451.952.451s.14.07.18.21c.04.14.04.81-.11 1.25zM12.061 4c-4.42 0-8 3.58-8 8 0 1.48.401 2.871 1.1 4.07l-1.16 4.3 4.41-1.14c1.11.59 2.37.93 3.71.93 4.42 0 8-3.58 8-8s-3.64-8-8.06-8z"/></svg>
              <span>Continuar en WhatsApp</span>
            </button>
          </div>
        </form>

        <p class="text-center text-white/30 text-xs mt-4">
          📍 Punto de atención: Barrio 20 de Julio, Hatonuevo | Aliado MINTIC
        </p>
      </div>
    </div>

    <!-- Floating WhatsApp Button -->
    <a href="#" id="floatingWaBtn" class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/40 transition-transform duration-300 hover:scale-110" title="Contactar por WhatsApp">
      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.258.405 2.413 1.096 3.359l-.712 2.613 2.69-.696c.801.463 1.725.728 2.711.728 3.181 0 5.767-2.586 5.767-5.767.001-3.181-2.585-5.771-5.785-5.704zm3.931 8.216c-.158.441-.795.807-1.125.859-.311.05-.71.011-1.314-.149-1.921-.511-3.415-2.288-3.415-3.697 0-.741.429-.861.429-.861l.512-.045s.16-.011.231.111c.071.121.241.6.241.6s.031.081.011.161c-.021.081-.05.14-.111.211-.06.07-.12.16-.18.23s-.11.11-.11.11.08.15.24.28c.16.13.43.33.86.53.53.25.96.42 1.34.46.38.04.58-.02.78-.21.2-.19.86-1.001.86-1.001s.08-.131.23-.08c.15.05.952.451.952.451s.14.07.18.21c.04.14.04.81-.11 1.25zM12.061 4c-4.42 0-8 3.58-8 8 0 1.48.401 2.871 1.1 4.07l-1.16 4.3 4.41-1.14c1.11.59 2.37.93 3.71.93 4.42 0 8-3.58 8-8s-3.64-8-8.06-8z"/></svg>
    </a>
  `

  document.body.insertAdjacentHTML('beforeend', modalHtml)

  const modal = document.getElementById('whatsappSalesModal')
  const closeBtn = document.getElementById('closeWaModal')
  const form = document.getElementById('waLeadForm')
  const planInput = document.getElementById('waPlan')
  const nameInput = document.getElementById('waName')
  const locInput = document.getElementById('waLocation')
  const floatingBtn = document.getElementById('floatingWaBtn')

  const openModal = (planName = 'Plan 150 Megas Familiar') => {
    planInput.value = planName
    modal.classList.remove('opacity-0', 'pointer-events-none')
    modal.querySelector('.glass').classList.remove('scale-95')
    modal.querySelector('.glass').classList.add('scale-100')
    nameInput.focus()
  }

  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none')
    modal.querySelector('.glass').classList.remove('scale-100')
    modal.querySelector('.glass').classList.add('scale-95')
  }

  closeBtn?.addEventListener('click', closeModal)
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })

  floatingBtn?.addEventListener('click', (e) => {
    e.preventDefault()
    openModal('Información General de Planes')
  })

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameInput.value.trim()
    const location = locInput.value.trim()
    const plan = planInput.value.trim()
    const text = `¡Hola CactusNet! Mi nombre es ${name} y vivo en ${location}. Quisiera contratar o recibir información detallada sobre el producto: ${plan}.`
    const url = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    closeModal()
    form.reset()
  })

  // Global trigger listener
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-whatsapp], [data-plan-cta], .btn-plan-select')
    if (trigger) {
      e.preventDefault()
      const planName = trigger.getAttribute('data-plan-cta') || 
                       trigger.getAttribute('data-whatsapp') || 
                       trigger.closest('[data-plan-card]')?.querySelector('h3, .plan-name')?.textContent || 
                       'Plan Fibra Óptica CactusNet'
      openModal(planName)
    }
  })
}

// Auto-inject on page ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectWhatsAppModal)
} else {
  injectWhatsAppModal()
}

