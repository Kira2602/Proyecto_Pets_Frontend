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
      <div class="popup-wrapper">
        <div class="popup-content">
          <div class="color-bar"></div>
          <button class="close-btn" @click="cerrarModal">×</button>
          <h2>Detalle del Evento</h2>

          <!-- Contenedor de Lottie -->
          <div class="profile-image-container">
            <div ref="lottieCalendar" class="lottie-animation"></div>
          </div>

          <!-- Información del evento -->
          <div class="event-details">
            <h3><strong>Descripción:</strong> {{ eventoSeleccionado.name }}</h3>
            <p><strong>Actividad:</strong> {{ eventoSeleccionado.description }}</p>
            <p><strong>Fecha:</strong> {{ formatoFecha(eventoSeleccionado.date) }}</p>
          </div>

          <div class="button-group">
            <button class="btn-edit" @click="cerrarModal">Cerrar</button>
          </div>
        </div>
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
import lottie from 'lottie-web'
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

        // Asegúrate de que las actividades canceladas ya no estén incluidas
        const eventos = response.data.map((evento) => ({
          ...evento,
          date: new Date(evento.date).toISOString() // ISO format with time
        }))

        console.log('Eventos ajustados para el calendario:', eventos)

        // Inicializa el calendario
        $('#calendar').evoCalendar({
          theme: 'Midnight Blue',
          calendarEvents: eventos,
          language: 'es',
          languages: {
            es: {
              days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
              daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
              months: [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre'
              ],
              monthsShort: [
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
                'Nov',
                'Dic'
              ],
              today: 'Hoy',
              noEventForToday: 'No hay eventos para hoy',
              noEventForThisDay: 'No hay eventos para este día'
            }
          }
        })

        // Escucha los eventos del calendario
        $('#calendar').on('selectEvent', (event, activeEvent) => {
          console.log('Evento seleccionado:', activeEvent)
          this.abrirModal(activeEvent)
        })
      } catch (error) {
        console.error('Error al cargar los eventos del calendario:', error)
      }
    },

    abrirModal(evento) {
      console.log('Evento recibido:', evento)
      this.eventoSeleccionado = evento

      this.$nextTick(() => {
        if (this.$refs.lottieCalendar) {
          console.log('Lottie container found:', this.$refs.lottieCalendar)
          lottie.loadAnimation({
            container: this.$refs.lottieCalendar,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/lottie/pushen.json' // Ruta local al archivo
          })
        } else {
          console.error('El contenedor de Lottie no se ha montado correctamente.')
        }
      })
    },

    cerrarModal() {
      this.eventoSeleccionado = null // Cierra el modal
    },

    formatoFecha(fecha) {
      console.log('Fecha recibida:', fecha)
      if (!fecha || typeof fecha !== 'string') {
        return 'Fecha no disponible'
      }

      const date = new Date(fecha)
      if (isNaN(date)) {
        return 'Fecha inválida'
      }

      // Devuelve solo la fecha en formato deseado
      const opciones = {
        weekday: 'long', // Día de la semana
        year: 'numeric', // Año
        month: 'long', // Nombre del mes completo
        day: 'numeric' // Día del mes
      }
      return date.toLocaleDateString('es-ES', opciones)
    }
  }
}
</script>

<style scoped>
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-wrapper {
  position: relative;
  width: 500px;
  max-height: 90vh;
}

.popup-content {
  background: #fff7f7;
  padding: 20px;
  border-radius: 20px;
  width: 100%;
  max-height: 90vh;
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow-y: auto;
  text-align: center;
}

.color-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: #d3a8a8;
  border-radius: 5px 5px 0 0;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
}

h2 {
  color: #af8a8a;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
}

.profile-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10px;
}

.lottie-animation {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
  overflow: hidden;
}

.event-details h3,
.event-details p {
  margin: 10px 0;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button.btn-edit {
  background-color: #d8e2dc;
  color: #9d8189;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.btn-edit:hover {
  background-color: #d2a5a5;
  color: #fff;
}
</style>
