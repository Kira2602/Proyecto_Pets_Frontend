<template>
  <div class="walk-popup">
    <div class="popup-wrapper" v-if="isPopupVisible">
      <button class="close-btn" @click="closePopup">×</button>
      <div class="popup-content">
        <h2>Nuevo Paseo</h2>

        <div class="icon-container">
          <!-- Contenedor para la animación de Lottie -->
          <div ref="lottieContainer" class="lottie-animation"></div>
        </div>

        <form @submit.prevent="registerWalk">
          <div class="form-group">
            <label>Elige una mascota:</label>
            <select
              v-model="walkData.mascota"
              @blur="validateField('mascota')"
              :class="{ 'error-border': errors.mascota }"
              required
            >
              <option disabled value="">Selecciona una mascota</option>
              <option
                v-for="mascota in mascotas"
                :key="mascota.id_mascota"
                :value="mascota.id_mascota"
              >
                {{ mascota.nombre }}
              </option>
            </select>
            <span v-if="errors.mascota" class="error-message">{{ errors.mascota }}</span>
          </div>

          <div class="form-group">
            <label>Descripción</label>
            <textarea
              v-model="walkData.descripcion"
              @blur="validateField('descripcion')"
              :class="{ 'error-border': errors.descripcion }"
              placeholder="Descripción"
            ></textarea>
            <span v-if="errors.descripcion" class="error-message">{{ errors.descripcion }}</span>
          </div>

          <div class="form-group">
            <label>Fecha y hora</label>
            <div class="input-with-icon">
              <input
                type="datetime-local"
                v-model="walkData.fecha_hora"
                :min="minDate"
                @change="validateFechaHora"
                @blur="validateField('fecha_hora')"
                :class="{ 'error-border': errors.fecha_hora }"
                required
              />
              <span class="calendar-icon">📅</span>
            </div>
            <span v-if="errors.fecha_hora" class="error-message">{{ errors.fecha_hora }}</span>
          </div>

          <div class="form-group notification-group">
            <label>Agregar notificación:</label>
            <button type="button" class="notification-btn" @click="openNotificationPopup">
              🔔
            </button>
          </div>

          <button type="submit" class="register-btn">Registrar Paseo</button>
        </form>
      </div>
    </div>

    <!-- Componente de Notificación -->
    <NotificationPopup
      v-if="isNotificationPopupVisible"
      @close="closeNotificationPopup"
      @saveNotification="handleSaveNotification"
    />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import NotificationPopup from '@/components/NotificationPopup.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  components: {
    NotificationPopup
  },
  data() {
    return {
      isPopupVisible: Boolean, // Controla la visibilidad del popup
      isNotificationPopupVisible: false,
      walkData: {
        mascota: '',
        descripcion: '',
        fecha_hora: ''
      },
      notificationData: {},
      errors: {
        mascota: '',
        descripcion: '',
        fecha_hora: ''
      },
      mascotas: [],
      minDate: `${new Date().toISOString().split('T')[0]}T00:00`
    }
  },
  methods: {
    async fetchMascotas() {
      const usuarioId = localStorage.getItem('Usuario_id_usuario')
      if (!usuarioId) {
        this.$router.push('/login')
        return
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/mascota/mis-mascotas?Usuario_id_usuario=${usuarioId}`
        )
        this.mascotas = response.data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener las mascotas',
          confirmButtonColor: '#9d8189'
        })
      }
    },
    validateFechaHora() {
      const now = new Date()
      const selectedDate = new Date(this.walkData.fecha_hora)

      if (selectedDate < now) {
        this.errors.fecha_hora = 'No puedes seleccionar una fecha y hora pasada'
        this.walkData.fecha_hora = '' // Limpia el campo
        Swal.fire({
          icon: 'warning',
          title: 'Fecha inválida',
          text: 'Por favor selecciona una fecha y hora actual o futura.',
          confirmButtonColor: '#9d8189'
        })
      } else {
        this.errors.fecha_hora = ''
      }
    },
    // Método para registrar el paseo
    async registerWalk() {
      if (this.validateAllFields()) {
        try {
          const response = await axios.post('http://127.0.0.1:5000/actividad/paseo', {
            Mascota_id_mascota: this.walkData.mascota,
            descripcion: this.walkData.descripcion,
            fecha_hora: this.walkData.fecha_hora
          })

          if (response.status === 201) {
            console.log('Paseo registrado:', response.data)
            Swal.fire({
              icon: 'success',
              title: 'Registro Exitoso',
              text: 'El paseo ha sido registrado correctamente.',
              confirmButtonColor: '#9d8189',
              customClass: {
                popup: 'swal-popup'
              }
            }).then(() => {
              this.closePopup() // Cierra el popup después de mostrar la alerta
            })
          }
        } catch (error) {
          console.error('Error al registrar el paseo:', error)
          alert('Error al registrar el paseo')
        }
      } else {
        console.error('Error en los datos del formulario')
      }
    },
    // Método para abrir el popup
    openPopup() {
      this.isPopupVisible = true
      console.log('Popup abierto:', this.isPopupVisible)
    },

    // Método para cerrar el popup
    closePopup() {
      this.$emit('close')
      console.log('Popup cerrado:', this.isPopupVisible)
    },

    // Método para validar los campos
    validateField(field) {
      this.errors[field] = ''
      if (field === 'mascota' && !this.walkData.mascota) {
        this.errors.mascota = 'Por favor selecciona una mascota'
      }
      if (field === 'descripcion' && this.walkData.descripcion.length < 10) {
        this.errors.descripcion = 'La descripción debe tener al menos 10 caracteres'
      }
      if (field === 'fecha_hora' && !this.walkData.fecha_hora) {
        this.errors.fecha_hora = 'Por favor selecciona una fecha y hora'
      }
    },

    // Validar todos los campos
    validateAllFields() {
      this.validateField('mascota')
      this.validateField('descripcion')
      this.validateField('fecha_hora')

      return !this.errors.mascota && !this.errors.descripcion && !this.errors.fecha_hora
    },

    // Método para abrir el popup de notificación
    openNotificationPopup() {
      this.isNotificationPopupVisible = true
    },

    // Método para cerrar el popup de notificación
    closeNotificationPopup() {
      this.isNotificationPopupVisible = false
    },

    // Manejar la notificación guardada
    handleSaveNotification(notificationData) {
      this.notificationData = notificationData
      console.log('Datos de notificación guardados:', notificationData)
      this.closeNotificationPopup()
    }
  },
  mounted() {
    this.fetchMascotas()
    // Cargar la animación de Lottie en el contenedor
    lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/d8a49d66-645e-46c5-b2a7-d10e394dd9b7/dhVJsZLDrH.json' // URL de la animación Lottie para Paseo
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.swal-popup {
  z-index: 2000 !important; /* Asegúrate de que sea más alto que el de tu modal */
}

.walk-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-family: 'Poppins', sans-serif;
}

.popup-wrapper {
  position: relative;
  width: 400px;
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.popup-content {
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

h2 {
  color: #af8a8a;
  font-size: 24px;
  margin-bottom: 20px;
}

.icon-container {
  margin-bottom: 15px;
}

/* Estilo para la animación de Lottie */
.lottie-animation {
  width: 170px;
  height: 170px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  font-size: 14px;
  color: #af8a8a;
  display: block;
  margin-bottom: 5px;
}

select,
textarea,
input[type='datetime-local'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #d3a8a8;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

textarea {
  resize: none;
  height: 60px;
}

.input-with-icon {
  position: relative;
}

.calendar-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #af8a8a;
}

.notification-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.notification-btn {
  background: #ffe5d9;
  color: #af8a8a;
  border: none;
  padding: 10px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
}

.register-btn {
  background-color: #d8e2dc;
  color: #9d8189;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.register-btn:hover {
  background-color: #d2a5a5;
  color: #fff;
}

.error-border {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}
</style>
