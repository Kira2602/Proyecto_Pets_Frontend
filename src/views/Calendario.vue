<template>
  <div>
    <!-- Navbar -->
    <header>
      <Navbar />
    </header>

    <!-- Calendario -->
    <section class="hero">
      <div id="calendar"></div>
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
import $ from 'jquery'
import 'evo-calendar' // Importa el plugin
import 'evo-calendar/evo-calendar/css/evo-calendar.css' // Importa los estilos del calendario

export default {
  name: 'Calendario',
  components: {
    Navbar
  },
  mounted() {
    // Inicializa el calendario en el DOM
    $('#calendar').evoCalendar({
      theme: 'Midnight Blue', // Aplica un tema (opcional)
      calendarEvents: [
        {
          id: 'mmnnn',
          name: 'New Year',
          date: 'January/1/2020',
          type: 'holiday',
          everyYear: true
        },
        {
          id: '0908',
          name: "Valentine's Day",
          date: 'February/14/2020',
          type: 'holiday',
          everyYear: true
        }
      ]
    })
  }
}
</script>

<style scoped>
/* Estilos existentes */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.hero {
  width: 100%;
  height: 100%;
  background: none; /* Elimina el fondo */
  display: grid;
}

#calendar {
  width: 90%;
  margin: 40px auto;
  background: none;
}

/* Estilo del footer */
.footer {
  background-color: #9d8189;
  padding: 40px 10px;
  text-align: center;
  color: white;
  margin-top: 40px;
}

.footer-content {
  font-size: 14px;
}
</style>
