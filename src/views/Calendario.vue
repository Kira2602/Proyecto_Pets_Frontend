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

    <!-- Modal para detalles -->
    <div v-if="eventoSeleccionado" class="modal-overlay" @click.self="cerrarModal">
      <div class="modal">
        <h3><strong>Descripción:</strong> {{ eventoSeleccionado.name }}</h3>
        <p><strong>Actividad:</strong> {{ eventoSeleccionado.description }}</p>
        <p><strong>Fecha:</strong> {{ formatoFecha(eventoSeleccionado.date) }}</p>

        <button class="modal-close" @click="cerrarModal">Cerrar</button>
      </div>
    </div>

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
import 'evo-calendar'
import 'evo-calendar/evo-calendar/css/evo-calendar.css'
import axios from 'axios'

export default {
  name: 'Calendario',
  components: {
    Navbar
  },
  data() {
    return {
      eventoSeleccionado: null // Almacena el evento seleccionado para mostrar en el modal
    }
  },
  mounted() {
    this.cargarEventosCalendario()
  },
  methods: {
    async cargarEventosCalendario() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/actividad/actividades_calendario')
        const eventos = response.data.map((evento) => {
          return {
            ...evento,
            // Asegúrate de que las fechas estén en el formato correcto
            date: new Date(evento.date).toISOString().split('T')[0] // Asegura formato YYYY-MM-DD
          }
        })

        console.log('Eventos ajustados para el calendario:', eventos)

        $('#calendar').evoCalendar({
          theme: 'Midnight Blue',
          calendarEvents: eventos
        })

        $('#calendar').on('selectEvent', (event, activeEvent) => {
          console.log('Evento seleccionado:', activeEvent)
          this.abrirModal(activeEvent)
        })
      } catch (error) {
        console.error('Error al cargar los eventos del calendario:', error)
      }
    },

    abrirModal(evento) {
      console.log('Evento recibido:', evento) // Log adicional
      this.eventoSeleccionado = evento // Asigna directamente el evento
    },

    cerrarModal() {
      this.eventoSeleccionado = null // Cierra el modal
    },

    formatoFecha(fecha) {
      console.log('Fecha recibida:', fecha)
      if (!fecha || typeof fecha !== 'string') {
        return 'Fecha no disponible'
      }

      // Convierte la fecha a un objeto Date para manejo seguro
      const date = new Date(fecha)

      if (isNaN(date)) {
        return 'Fecha inválida'
      }

      // Devuelve la fecha en formato deseado (por ejemplo, YYYY-MM-DD)
      return date.toISOString().split('T')[0]
    }
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

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal h3 {
  margin-bottom: 15px;
}

.modal p {
  margin: 10px 0;
}

.modal-close {
  background: #9d8189;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

.modal-close:hover {
  background: #7a6652;
}
</style>
