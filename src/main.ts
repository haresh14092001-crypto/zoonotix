import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (app) {
  app.innerHTML = `
    <main class="app-shell">
      <section class="hero">
        <p class="eyebrow">ZoonotiX</p>
        <h1>Veterinary zoonotic disease knowledge, prepared for modern study.</h1>
        <p>
          This repository is being hardened for maintainable, collaborative, and open-source-ready development.
        </p>
      </section>
    </main>
  `;
}
