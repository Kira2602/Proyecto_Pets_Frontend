<template>
  <div class="walk-popup">
    <div class="popup-wrapper">
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
              <option v-for="mascota in mascotas" :key="mascota.id" :value="mascota.nombre">
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

          <button type="submit" class="register-btn">Registrar</button>
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

export default {
  components: {
    NotificationPopup
  },
  data() {
    return {
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
      mascotas: [
        { id: 1, nombre: 'Lulu' },
        { id: 2, nombre: 'Max' },
        { id: 3, nombre: 'Bella' }
      ]
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
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
    validateAllFields() {
      this.validateField('mascota')
      this.validateField('descripcion')
      this.validateField('fecha_hora')

      return !this.errors.mascota && !this.errors.descripcion && !this.errors.fecha_hora
    },
    openNotificationPopup() {
      this.isNotificationPopupVisible = true
    },
    closeNotificationPopup() {
      this.isNotificationPopupVisible = false
    },
    handleSaveNotification(notificationData) {
      this.notificationData = notificationData
      console.log('Datos de notificación guardados:', notificationData)
      this.closeNotificationPopup()
    },
    registerWalk() {
      if (this.validateAllFields()) {
        console.log('Datos del paseo:', this.walkData)
        this.closePopup()
      } else {
        console.error('Error en los datos del formulario')
      }
    }
  },
  mounted() {
    if (this.$refs.lottieContainer) {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/d8a49d66-645e-46c5-b2a7-d10e394dd9b7/dhVJsZLDrH.json'
      })
    } else {
      console.error('El contenedor de Lottie no se ha montado correctamente.')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

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
  z-index: 9999;
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
