<template>
  <div>
    <!-- Navbar en el header -->
    <header>
      <Navbar />
    </header>

    <!-- Panel de Usuario -->
    <section class="panel-usuario">
      <h2>PANEL DE USUARIO</h2>
      <div class="icon-grid">
        <div class="icon-card">
          <img src="@/components/images/perfil_usuario.png" alt="Perfil de usuario" />
          <p>Perfil de usuario</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/agregar_mascota.png" alt="Registrar Mascotas" />
          <p>Registrar Mascotas</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/mis_mascotas.png" alt="Mis Mascotas" />
          <p>Mis Mascotas</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/perro.png" alt="Salud" />
          <p>Salud</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/collar.png" alt="Paseos" />
          <p>Paseos</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/comida.png" alt="Comida" />
          <p>Comida</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/gestion_citas_medicas_icon.png" alt="Citas médicas" />
          <p>Citas médicas</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/history.png" alt="Historial de mascotas" />
          <p>Historial de mascotas</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/reminder.png" alt="Recordatorios" />
          <p>Recordatorios</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/calendario.png" alt="Calendario" />
          <p>Calendario</p>
        </div>
        <div class="icon-card">
          <img src="@/components/images/agregar_actividad.png" alt="Otras actividades" />
          <p>Otras actividades</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 Grupo PetCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'PanelUsuario',
  components: {
    Navbar
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

/* General Styles */
body {
  font-family: 'Poppins', sans-serif;
}

/* Panel de Usuario Styles */
.panel-usuario {
  text-align: center;
  padding: 20px 10px;
  margin: 0 auto;
  max-width: 1200px;
}

.panel-usuario h2 {
  color: #9d8189;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 columnas en pantallas grandes */
  grid-gap: 35px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.icon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #9d8189;
  border-radius: 12px;
  padding: 10px;
  width: 160px;
  height: 160px;
}

.icon-card img {
  width: 110px;
  height: 110px;
}

.icon-card p {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
}

/* Media Queries for Responsiveness */
@media screen and (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas medianas */
    padding: 0 10px;
  }
}

@media screen and (max-width: 480px) {
  .icon-grid {
    grid-template-columns: repeat(1, 1fr); /* 1 columna en pantallas pequeñas */
    padding: 0 5px;
  }
}

/* Footer Styles */
.footer {
  background-color: #9d8189;
  padding: 40px 20px;
  text-align: center;
  color: white;
  margin-top: 50px;
}

.footer-content {
  font-size: 14px;
}
</style>
