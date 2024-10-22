<template>
  <div>
    <header>
      <Navbar />
    </header>

    <!-- Primera sección (Encabezado con gato y texto) -->
    <section class="hero">
      <div class="hero-content">
        <h1 id="typing-effect"></h1>

        <!-- Botón Registra tu mascota -->
        <button class="hero-button" @click="handleRedirection">Registra tu mascota</button>
      </div>
      <div class="hero-image">
        <img src="@/components/images/logo_encabezado.png" alt="Cute Cat" />
      </div>
    </section>

    <!-- Segunda sección (Nuestras funcionalidades principales) -->
    <section>
      <h2>Nuestras funcionalidades principales</h2>
      <ul class="shop-pets" id="funcionalidades">
        <li class="card-large card-light" id="sup-dog">
          <div class="card-image">
            <img src="@/components/images/gestion_citas_medicas_icon.png" />
          </div>
          <ul>
            Gestión de citas médicas y recordatorios
            <li>
              <a href="#"
                >Organiza y gestiona las citas médicas y los calendarios de vacunación de tus
                mascotas. Recibe recordatorios automáticos para que nunca olvides una revisión
                médica o una fecha importante de vacunación.</a
              >
            </li>
            <button class="btn btn-outline" @click="handleRedirection">Ir</button>
          </ul>
        </li>

        <li class="card-large card-dark" id="sup-cat">
          <div class="card-image">
            <img src="@/components/images/collar.png" />
          </div>
          <ul>
            Planificación de actividades diarias
            <li>
              <a href="#"
                >Planifica las actividades diarias de tu mascota, como paseos, tiempo de juego y
                horarios de alimentación. Este módulo te ayuda a mantener una rutina equilibrada
                para que tu mascota reciba el cuidado y la atención que necesita durante el día.</a
              >
            </li>
            <button class="btn btn-outline" @click="handleRedirection">Ir</button>
          </ul>
        </li>

        <li class="card-large card-dark" id="sup-bird">
          <div class="card-image">
            <img src="@/components/images/history.png" />
          </div>
          <ul>
            Historial de actividades diarias
            <li>
              <a href="#"
                >Lleva un registro completo de las actividades pasadas de tu mascota, incluyendo
                paseos, citas médicas y vacunaciones. Este módulo te permite consultar un historial
                detallado de todos los eventos relacionados con el cuidado de tu mascota.</a
              >
            </li>
            <button class="btn btn-outline" @click="handleRedirection">Ir</button>
          </ul>
        </li>
        <li class="card-large card-light" id="sup-fish">
          <div class="card-image">
            <img src="@/components/images/reminder.png" />
          </div>
          <ul>
            Notificaciones automáticas
            <li>
              <a href="#"
                >Recibe alertas y recordatorios automáticos sobre las próximas actividades, citas y
                tareas importantes de cuidado. Este módulo te ayuda a estar al tanto de las
                necesidades de tu mascota mediante notificaciones puntuales para todo, desde paseos
                diarios hasta revisiones médicas.</a
              >
            </li>
            <button class="btn btn-outline" @click="handleRedirection">Ir</button>
          </ul>
        </li>
      </ul>
    </section>

    <!-- Sección de Redes Sociales -->
    <section class="social-media" id="redes">
      <h2>Visita nuestras redes sociales</h2>
      <div class="social-icons">
        <a href="#"><img src="@/components/images/facebook_icon.png" alt="Facebook" /></a>
        <a href="#"><img src="@/components/images/youtube_icon.png" alt="YouTube" /></a>
        <a href="#"><img src="@/components/images/instagram_icon.png" alt="Instagram" /></a>
      </div>
    </section>

    <!-- Tercera sección (Footer) -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 Grupo PetCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Swal from 'sweetalert2'

export default {
  name: 'inicio',
  components: {
    Navbar
  },
  data() {
    return {
      isLoginPopupVisible: false // Controla la visibilidad del popup de login
    }
  },
  mounted() {
    const text = `Organización total para el\n bienestar de tus mascotas!`
    this.typeEffect(text, 'typing-effect', 100)
  },
  methods: {
    typeEffect(text, elementId, speed) {
      const element = document.getElementById(elementId)
      let index = 0
      const typingInterval = setInterval(() => {
        element.innerHTML += text.charAt(index) === '\n' ? '<br/>' : text.charAt(index)
        index++
        if (index === text.length) {
          clearInterval(typingInterval)
        }
      }, speed)
    },
    handleRedirection() {
      const usuarioId = localStorage.getItem('Usuario_id_usuario')
      if (usuarioId) {
        // Usuario logueado, redirigir al panel de usuario
        this.$router.push({ name: 'panel-usuario' })
      } else {
        // Usuario no logueado, mostrar alerta de que debe iniciar sesión
        Swal.fire({
          icon: 'warning',
          title: 'Inicia sesión',
          text: 'Debes iniciar sesión para acceder a esta funcionalidad.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#db7f67'
        })
      }
    }
  }
}
</script>

<style scoped>
:root {
  --text-01: #9d8189;
  --light-01: #f9f9f9;
  --light-02: #ffffff;
  --brand-01: #db7f67;
  --brand-02: #ffcad4;
  --card-hover: 0px 4px 24px rgba(0, 0, 0, 0.15);
  --card-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  --hover-timing: all 0.2s ease;
  --nav-card-size: 240px;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  transition: var(--hover-timing);
  background: var(--light-01);
  width: 100vw;
}

#typing-text {
  font-size: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #7a6652;
  white-space: pre-line;
  overflow: hidden;
  border-right: 0.15em solid #7a6652;
  letter-spacing: 0.15em;
  animation:
    typing 3.5s steps(40, end),
    blink-caret 0.75s step-end infinite;
}

/* Animación del typing */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Parpadeo del cursor */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #7a6652;
  }
}

/* Estilos de la primera sección */
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffcad4;
  padding: 40px;
  margin: 10px 0;
  position: relative;
  min-height: 30vh;
}

.hero-content {
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero h1 {
  font-size: 3.5rem;
  color: #7a6652;
  margin-bottom: 20px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
}

.hero-button {
  padding: 15px 40px;
  background-color: #9d8189;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.hero-button:hover {
  background-color: #ffe5d9;
  color: #0a0909;
}

.hero-image {
  position: absolute;
  right: 290px;
  bottom: 0;
  width: 300px;
}

.hero-image img {
  width: 500px;
  height: auto;
}

/* Ajustes para pantallas pequeñas */
@media only screen and (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero h1 {
    font-size: 1.5rem;
  }

  .hero-button {
    font-size: 1rem;
    padding: 10px 30px;
  }

  .hero-image {
    position: static;
    width: 100%;
    padding: 0px;
    overflow: hidden;
  }
}

/* Estilos de la sección de redes sociales */
.social-media {
  background-color: #ffcad4;
  padding: 40px 0;
  text-align: center;
  margin-bottom: 0;
}

.social-media h2 {
  font-size: 1.8rem;
  color: #7a6652;
  margin-bottom: 20px;
}

.social-icons {
  display: flex table-column;
  justify-content: center;
  gap: 100px;
}

.social-icons a img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 15%;
  transition: transform 0.3s ease;
}

.social-icons a img:hover {
  transform: scale(1.1);
}

/* Footer */
.footer {
  background-color: #9d8189;
  padding: 40px 20px;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin-top: 0;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1rem;
  gap: 10px;
}

.footer-content p {
  margin: 5px 0;
}

.card-large {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: var(--hover-timing);
  cursor: pointer;
}

.card-large {
  box-shadow: var(--card-shadow);
  border-radius: 12px;
  overflow: hidden;
}

.card-large:hover {
  box-shadow: var(--card-hover);
  transform: scale(1.01);
}

.card-image {
  transform: scale(1.01);
}

.card-image {
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--hover-timing);
}

.card-large > .card-image {
  aspect-ratio: 3/2;
}

.card-image > img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: contain;
}

.card-large a {
  text-decoration: none;
  font-weight: 600;
}

.card-large > .card-image > a {
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  font-size: 24px;
  line-height: 1.2;
}

.card-large > ul {
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  flex: 1;
  color: var(--text-01);
  padding: 0 40px 40px;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.5;
}

.card-large > ul > li a {
  line-height: 32px;
  font-size: 14px;
}

.card-large#sup-dog,
.card-med#sup-dog > .card-image {
  background: #9d8189;
}

.card-large#sup-cat,
.card-med#sup-cat > .card-image {
  background: #ffcad4;
}

.card-large#sup-bird,
.card-med#sup-bird > .card-image {
  background: #ffe5d9;
}

.card-large#sup-fish,
.card-med#sup-fish > .card-image {
  background: #d8e2dc;
}

.card-large.card-dark a,
.card-large.card-dark > ul {
  color: var(--text-01);
}

.card-large.card-light a,
.card-large.card-light > ul {
  color: var(--light-01);
}

button {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  padding: 12px 24px;
  border-radius: 48px;
  display: flex;
  flex-direction: row;
  grid-gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

footer {
  position: relative;
  width: 100%;
  padding: 0 var(--pg-margin);
}

.btn-group {
  display: flex;
  flex-direction: row;
  grid-gap: 16px;
}

section h2 {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  color: #9d8189;
  margin-bottom: 32px;
}

.card-image img {
  width: 80%;
  height: 80%;
}

.card-large > ul > li:last-of-type {
  margin-bottom: 40px;
}

.card-large button {
  margin-top: auto;
}

.btn-group {
  display: flex;
  flex-direction: row;
  grid-gap: 16px;
}

footer {
  background: var(--text-01);
  padding: 80px 80px 0px;
  margin-top: 80px;
  display: flex;
}

.btn {
  padding: 10px 0px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.btn-outline {
  background-color: #ffffff;
  color: #9d8189;
}

.btn-outline:hover {
  background-color: #f4acb7;
  color: white;
}

@media only screen and (min-width: 1200px) {
  :root {
    --pg-margin: 80px;
  }

  section.hero h1 {
    --hero-text: 56px;
  }

  section.hero {
    aspect-ratio: 3/1;
    background-size: 30%;
    background-position: 90% 60%;
  }

  .shop-pets {
    display: flex;
    flex-direction: row;
    grid-gap: 24px;
    margin-bottom: 40px;
    margin-left: 20px;
    margin-right: 20px;
    justify-content: space-between;
  }

  footer {
    flex-direction: row;
    text-align: left;
  }
}

/* Ajustes para tablets y celulares */
@media only screen and (max-width: 1024px) {
  /* Para tablets */
  .shop-pets {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;
    padding: 20px;
  }

  .card-large {
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
  }

  .card-large img {
    width: 60%;
    height: auto;
  }

  .card-large ul {
    font-size: 1rem;
    padding: 20px;
  }
}

@media only screen and (max-width: 768px) {
  /* Para celulares */
  .shop-pets {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;
    padding: 15px;
  }

  .card-large {
    width: 95%;
    max-width: 350px;
    margin: 0 auto;
  }

  .card-large img {
    width: 50%;
    height: auto;
  }

  .card-large ul {
    font-size: 0.9rem;
    padding: 15px;
  }
}
</style>
