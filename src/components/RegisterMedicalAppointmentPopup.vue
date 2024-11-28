<template>
  <div class="medical-popup">
    <div class="popup-wrapper">
      <button class="close-btn" @click="closePopup">×</button>
      <div class="popup-content">
        <h2>Nueva cita médica</h2>

        <div class="icon-container">
          <div ref="lottieContainer" class="lottie-animation"></div>
        </div>

        <form @submit.prevent="registerAppointment">
          <div class="form-group">
            <label>Elige una mascota:</label>
            <select
              v-model="appointmentData.mascota"
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
              v-model="appointmentData.descripcion"
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
                v-model="appointmentData.fecha_hora"
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
            <button type="button" class="notification-btn" @click="handleNotificationClick">
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
  :mascota-id="appointmentData.mascota"
  :actividad-id="actividadId" 
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
  props: {
    actividadId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isNotificationPopupVisible: false,
      actividadId: null,
      //usuario_id: 1, // Cambia esto por el ID real del usuario
      appointmentData: {
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
      mascotas: [] // Inicialmente vacío
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
        console.error('Error al obtener mascotas:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener las mascotas',
          confirmButtonColor: '#9d8189'
        })
      }
    },
    async registerAppointment() {
      if (this.validateAllFields()) {
        try {
          const response = await axios.post('http://127.0.0.1:5000/actividad/citas', {
            Mascota_id_mascota: this.appointmentData.mascota,
            descripcion: this.appointmentData.descripcion,
            fecha_hora: this.appointmentData.fecha_hora
          })

          if (response.status === 201) {
            console.log('Cita médica registrada:', response.data)
            Swal.fire({
              icon: 'success',
              title: 'Cita Registrada',
              text: 'La cita médica ha sido registrada correctamente.',
              confirmButtonColor: '#9d8189',
              customClass: {
                popup: 'swal-popup'
              }
            }),
              this.closePopup()
          }
        } catch (error) {
          console.error('Error al registrar la cita:', error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar la cita médica',
            confirmButtonColor: '#9d8189'
          })
        }
      } else {
        console.error('Error en los datos del formulario')
      }
    },
    validateField(field) {
      this.errors[field] = ''

      if (field === 'mascota' && !this.appointmentData.mascota) {
        this.errors.mascota = 'Por favor selecciona una mascota'
      }
      if (field === 'descripcion' && this.appointmentData.descripcion.length < 10) {
        this.errors.descripcion = 'La descripción debe tener al menos 10 caracteres'
      }
      if (field === 'fecha_hora' && !this.appointmentData.fecha_hora) {
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
      this.isNotificationPopupVisible = true;
    },
  async handleNotificationClick() {
    const result = await Swal.fire({
      title: "¿Desea registrar la actividad y agregar una notificación?",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      confirmButtonColor: "#9d8189"
    });

    if (result.isConfirmed) {
      this.registerAndOpenNotification();
    }
  },
  async registerAndOpenNotification() {
    if (this.validateAllFields()) {
      try {
        // Registrar la actividad
        const response = await axios.post("http://127.0.0.1:5000/actividad/citas", {
          Mascota_id_mascota: this.appointmentData.mascota,
          descripcion: this.appointmentData.descripcion,
          fecha_hora: this.appointmentData.fecha_hora
        });

        if (response.status === 201) {
          console.log("Cita médica registrada:", response.data);
          this.actividadId = response.data.id_actividad; // Actualizar actividadId correctamente

          Swal.fire({
            icon: "success",
            title: "Actividad Registrada",
            text: "La actividad ha sido registrada correctamente.",
            confirmButtonColor: "#9d8189"
          });
          this.isNotificationPopupVisible = true;

        }
      } catch (error) {
        console.error("Error al registrar la actividad:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al registrar la actividad. Inténtalo de nuevo.",
          confirmButtonColor: "#9d8189"
        });
      }
    } else {
      console.error("Error en los datos del formulario");
    }
  },


      handleSaveNotification(notificationData) {
  notificationData.Actividad_id_actividad = this.actividadId; // Prop recibida
  notificationData.mascota_id_mascota = this.appointmentData.mascota; // Mascota seleccionada
  console.log("Datos de notificación guardados:", notificationData);
  this.notificationData = notificationData;
  this.closeNotificationPopup();
},
    closeNotificationPopup() {
      this.isNotificationPopupVisible = false;
    },
    closePopup() {
      this.$emit('close')
    },
  },
  mounted() {
    this.fetchMascotas() // Llama a fetchMascotas cuando el componente se monta

    if (this.$refs.lottieContainer) {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/c50345ea-078e-4d3b-8bce-4b1090f6de17/MM3I8bGMIc.json'
      })
    } else {
      console.error('El contenedor de Lottie no se ha montado correctamente.')
    }
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.medical-popup {
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
  font-size: 30px;
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

.lottie-animation {
  width: 150px;
  height: 150px;
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

.swal-popup {
  z-index: 10000 !important;
}
</style>
