<template>
    <div>
      <header>
        <Navbar />
      </header>
  
      <div class="historial-notificaciones">
        <h2>HISTORIAL DE NOTIFICACIONES</h2>
  
        <!-- Filtros -->
        <div class="filtros">
          <!-- Filtro por estado -->
          <div class="filtro">
            <label>Estado:</label>
            <select v-model="selectedStatus" class="custom-select">
              <option value="">Todos</option>
              <option v-for="estado in estados" :key="estado" :value="estado">
                {{ estado }}
              </option>
            </select>
          </div>
  
          <!-- Filtro por fecha de inicio -->
          <div class="filtro fecha">
            <label>Fecha inicio:</label>
            <input type="date" v-model="selectedStartDate" class="custom-input" />
          </div>
  
          <!-- Filtro por fecha de fin -->
          <div class="filtro fecha">
            <label>Fecha fin:</label>
            <input type="date" v-model="selectedEndDate" class="custom-input" />
          </div>
        </div>
  
        <!-- Lista de notificaciones -->
        <div class="notificaciones-container">
          <div
            v-for="notificacion in filteredNotifications"
            :key="notificacion.id"
            class="notificacion-card"
          >
            <h3>{{ notificacion.mensaje }}</h3>
            <p><strong>Fecha inicio:</strong> {{ formatearFecha(notificacion.fecha_inicio) }}</p>
            <p><strong>Fecha fin:</strong> {{ formatearFecha(notificacion.fecha_fin) }}</p>
            <p><strong>Se repite cada:</strong> {{ notificacion.frecuencia }}</p>
            <button class="edit-btn" @click="openEditPopup(notificacion)">
            Editar Notificación
          </button>
          </div>
        </div>
      </div>

    <!-- Popup para editar notificaciones -->
    <NotificationPopup
      v-if="selectedNotification"
      :notificacion="selectedNotification"
      @close="selectedNotification = null"
      @save="updateNotification"
    />
  
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
  import axios from 'axios'
  import NotificationPopup from '@/components/NotificationPopup.vue' // Asegúrate de tener este componente importado

  
  export default {
    name: 'HistorialNotificaciones',
    components: {
      Navbar,
      NotificationPopup,

    },
    data() {
      return {
        selectedStatus: '',
        selectedStartDate: '',
        selectedEndDate: '',
        estados: ['Activa', 'Inactiva', 'Pendiente'], // Estados posibles
        notificaciones: [
            //ejemplo
            {
          id: 1,
          mensaje: 'Vacunación programada',
          estado: 'Activa',
          fecha_inicio: '2024-12-01T08:00',
          fecha_fin: '2024-12-10T18:00',
          frecuencia: '1 día',
          unidad: 'días',
        },
        {
          id: 2,
          mensaje: 'Control médico periódico',
          estado: 'Pendiente',
          fecha_inicio: '2024-11-25T09:00',
          fecha_fin: '2024-12-05T17:00',
          frecuencia: '2 días',
          unidad: 'días',
        },
        ], // Datos de notificaciones
        selectedNotification: null, // Notificación seleccionada para editar
      }

    },
    computed: {
      // Filtra las notificaciones según los filtros seleccionados
      filteredNotifications() {
        return this.notificaciones.filter((notificacion) => {
          const matchStatus =
            this.selectedStatus === '' || notificacion.estado === this.selectedStatus
          const matchStartDate =
            !this.selectedStartDate || new Date(notificacion.fecha_inicio) >= new Date(this.selectedStartDate)
          const matchEndDate =
            !this.selectedEndDate || new Date(notificacion.fecha_fin) <= new Date(this.selectedEndDate)
  
          return matchStatus && matchStartDate && matchEndDate
        })
      }
    },
    methods: {
      formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO)
        const dia = String(fecha.getDate()).padStart(2, '0')
        const mes = String(fecha.getMonth() + 1).padStart(2, '0')
        const año = fecha.getFullYear()
        return `${dia}/${mes}/${año}`
      },
      async cargarNotificaciones() {
        try {
          const response = await axios.get('http://127.0.0.1:5000/notificaciones')
          this.notificaciones = response.data
        } catch (error) {
          console.error('Error al cargar notificaciones:', error)
        }
      },
      openEditPopup(notificacion) {
      this.selectedNotification = { ...notificacion } // Clonar la notificación seleccionada
    },
    async updateNotification(updatedNotificacion) {
      try {
        // Realizar la actualización en el backend
        await axios.put(`http://127.0.0.1:5000/notificaciones/${updatedNotificacion.id}`, updatedNotificacion)
        // Actualizar la notificación localmente
        const index = this.notificaciones.findIndex((n) => n.id === updatedNotificacion.id)
        if (index !== -1) {
          this.$set(this.notificaciones, index, updatedNotificacion)
        }
        this.selectedNotification = null // Cerrar el popup
      } catch (error) {
        console.error('Error al actualizar la notificación:', error)
      }
    }
    },
    mounted() {
      this.cargarNotificaciones()
    }
  }
  </script>
  
  <style scoped>
  .historial-notificaciones {
    font-family: 'Poppins', sans-serif;
    background-color: #ffe5d9;
    padding: 20px;
    border-radius: 15px;
    max-width: 900px;
    margin: 0 auto;
  }
  
  h2 {
    color: #9d8189;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .filtros {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    background-color: #ffcad4;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .filtro {
    display: flex;
    flex-direction: column;
  }
  
  .filtro label {
    font-weight: bold;
    color: #af8a8a;
    margin-bottom: 5px;
  }
  
  .custom-select,
  .custom-input {
    padding: 8px;
    border: 2px solid #d3a8a8;
    border-radius: 8px;
    background-color: #ffffff;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #4e3b47;
    transition: border-color 0.3s;
  }
  
  .custom-select:hover,
  .custom-input:hover {
    border-color: #9d8189;
  }
  
  .notificaciones-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .notificacion-card {
    background-color: #ffffff;
    padding: 15px;
    border: 2px solid #d3a8a8;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: calc(50% - 20px); /* Dos columnas */
  }
  
  .notificacion-card h3 {
    margin: 0 0 10px 0;
    color: #9d8189;
  }
  
  .notificacion-card p {
    margin: 5px 0;
    color: #4e3b47;
  }
  
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
  .edit-btn {
  background: #d8e2dc;
  color: #9d8189;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover {
  background-color: #af8a8a;
  color: #ffffff;
}
  </style>
  