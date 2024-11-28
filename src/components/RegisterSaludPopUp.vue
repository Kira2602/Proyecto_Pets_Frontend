<template>
  <div class="profile-popup">
    <div class="popup-wrapper">
      <div class="popup-content">
        <div class="color-bar"></div>
        <button class="close-btn" @click="closePopup">×</button>
        <h2>Crea un nuevo registro</h2>

        <!-- Primer paso -->
        <div v-if="step === 1">
          <form @submit.prevent="goToStep2">
            <div class="form-group centered-form">
              <label for="mascota">Elige una mascota:</label>
              <select
                class="static-data small-select"
                id="mascota"
                v-model="formData.mascotaId"
                :class="{ 'error-border': errors.mascotaId }"
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
              <span v-if="errors.mascotaId" class="error-message">{{ errors.mascotaId }}</span>
            </div>

            <div class="form-group centered-form">
              <label for="tipoSalud">Elige un tipo de salud:</label>
              <select
                class="static-data small-select"
                id="tipoSalud"
                v-model="formData.id_tipoSalud"
                :class="{ 'error-border': errors.id_tipoSalud }"
                required
              >
                <option disabled value="">Selecciona un tipo de salud</option>
                <option v-for="tipo in tiposSalud" :key="tipo.id" :value="tipo.id">
                  {{ tipo.tipo }}
                </option>
              </select>
              <span v-if="errors.id_tipoSalud" class="error-message">{{
                errors.id_tipoSalud
              }}</span>
            </div>

            <div class="bottom-controls">
              <div ref="lottieContainer" class="lottie-animation"></div>
              <button class="btn-edit" type="submit">Siguiente</button>
            </div>
          </form>
        </div>

        <!-- Segundo paso -->
        <div v-else-if="step === 2">
          <form @submit.prevent="submitRegistration">
            <div class="form-group">
              <label for="descripcion">Descripción:</label>
              <textarea
                class="static-data"
                id="descripcion"
                v-model="formData.descripcion"
                :class="{ 'error-border': errors.descripcion }"
                required
              ></textarea>
              <span v-if="errors.descripcion" class="error-message">{{ errors.descripcion }}</span>
            </div>

            <div class="form-group">
              <label for="fecha">Fecha:</label>
              <input
                class="static-data"
                type="date"
                id="fecha"
                v-model="formData.fecha"
                :min="minDate"
                @change="validateFecha"
                :class="{ 'error-border': errors.fecha }"
                required
              />
              <span v-if="errors.fecha" class="error-message">{{ errors.fecha }}</span>
            </div>

            <div class="form-group">
              <label for="archivo">Subir archivo (opcional):</label>
              <input
                type="file"
                id="archivo"
                class="static-data"
                accept=".png, .jpg, .pdf"
                @change="handleFileUpload"
              />
              <small>Sólo se permiten archivos .png, .jpg, o .pdf</small>
            </div>

            <div class="button-group2">
              <button class="btn-edit" @click="goBack">Atrás</button>
              <button class="btn-edit" type="submit">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      step: 1,
      mascotas: [],
      minDate: new Date().toISOString().split('T')[0],
      tiposSalud: [],
      formData: {
        mascotaId: '',
        id_tipoSalud: '',
        descripcion: '',
        fecha: '',
        archivo: null
      },
      errors: {
        mascotaId: '',
        id_tipoSalud: '',
        descripcion: '',
        fecha: ''
      }
    }
  },
  methods: {
    async fetchMascotas() {
      const usuarioId = localStorage.getItem('Usuario_id_usuario')
      if (!usuarioId) {
        Swal.fire({
          icon: 'warning',
          title: 'Inicia sesión',
          text: 'Debes iniciar sesión para ver tus mascotas.',
          confirmButtonColor: '#9d8189'
        })
        this.closePopup()
        return
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/mascota/mis-mascotas?Usuario_id_usuario=${usuarioId}`
        )
        console.log('Mascotas cargadas:', response.data)
        this.mascotas = response.data
      } catch (error) {
        console.error('Error al cargar mascotas:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las mascotas.',
          confirmButtonColor: '#9d8189'
        })
      }
    },
    validateFecha() {
      if (!this.formData.fecha) {
        this.errors.fecha = 'Por favor selecciona una fecha'
        return
      }

      // Convertir la fecha de dd/mm/yyyy a yyyy-mm-dd
      const [day, month, year] = this.formData.fecha.split('-') // Divide por guión
      const formattedDate = new Date(`${year}-${month}-${day}`) // Convierte al formato yyyy-mm-dd

      const today = new Date() // Fecha y hora actual
      today.setHours(0, 0, 0, 0) // Elimina la hora para comparar solo fechas

      if (formattedDate < today) {
        this.errors.fecha = 'No puedes seleccionar una fecha pasada'
        this.formData.fecha = '' // Limpia el campo de fecha
        Swal.fire({
          icon: 'warning',
          title: 'Fecha inválida',
          text: 'Por favor selecciona una fecha actual o futura.',
          confirmButtonColor: '#9d8189'
        })
      } else {
        this.errors.fecha = '' // Sin errores
      }
    },

    async fetchTiposSalud() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/salud/categorias')
        console.log('Tipos de salud cargados:', response.data)
        this.tiposSalud = response.data
      } catch (error) {
        console.error('Error al cargar tipos de salud:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los tipos de salud.',
          confirmButtonColor: '#9d8189'
        })
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.formData.archivo = file
      }
    },

    goToStep2() {
      console.log('Datos del formulario:', this.formData)
      this.errors.mascotaId = this.formData.mascotaId ? '' : 'Selecciona una mascota'
      this.errors.id_tipoSalud = this.formData.id_tipoSalud ? '' : 'Selecciona un tipo de salud'

      if (!this.errors.mascotaId && !this.errors.id_tipoSalud) {
        this.step = 2
      }
    },

    goBack() {
      this.step = 1
    },

    async submitRegistration() {
      const formData = new FormData()
      formData.append('Mascota_id_mascota', this.formData.mascotaId)
      formData.append('tipo_salud_id_tipoSalud', this.formData.id_tipoSalud)
      formData.append('observacion', this.formData.descripcion)
      formData.append('fecha', this.formData.fecha)

      if (this.formData.archivo) {
        formData.append('archivo', this.formData.archivo)
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/salud/registrar', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        console.log('Registro exitoso:', response.data)

        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'El registro de salud se ha creado correctamente.',
          confirmButtonColor: '#9d8189',
          customClass: {
            popup: 'swal-popup'
          }
        }).then(() => {
          // Refrescar la página después de que el usuario cierre el mensaje
          window.location.reload()
        })
      } catch (error) {
        console.error('Error al registrar salud:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar la salud.',
          confirmButtonColor: '#9d8189'
        })
      }
    },

    closePopup() {
      this.$emit('close')
    }
  },
  async mounted() {
    await this.fetchMascotas()
    await this.fetchTiposSalud()

    lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/19efdac4-1329-48dc-a189-856c1b72a4f2/ckhr9qwiGy.json'
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.profile-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
}

/* Estilos del scrollbar */
.popup-content::-webkit-scrollbar {
  width: 12px;
}

.popup-content::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 10px;
}

.popup-content::-webkit-scrollbar-thumb {
  background-color: #d3a8a8;
  border-radius: 10px;
  border: 2px solid #f0f0f0;
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
  margin-bottom: -40px;
  margin-top: -40px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #d3a8a8;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0px auto 20px;
}

.form-group label {
  font-size: 14px;
  color: #af8a8a;
  margin-bottom: 5px;
}

.relative {
  position: relative;
}

.relative i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #444;
}

.static-data {
  font-size: 16px;
  padding: 10px;
  border: 2px solid #d3a8a8;
  border-radius: 10px;
  background-color: #f0f0f0;
  width: 100%;
  box-sizing: border-box;
}

.error-border {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-group2 {
  display: flex;
  justify-content: space-between;
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

.form-group.centered-form {
  width: 60%;
  text-align: center;
  margin: 10px auto;
}
.small-select {
  width: 80%;
  margin: 0 auto;
}

.bottom-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  margin-right: 70px;
}

.lottie-animation {
  width: 280px;
  height: 280px;
  margin-left: -90px;
  margin-right: 30px;
  margin-top: -40px;
}

.swal-popup {
  z-index: 1050 !important; /* Asegúrate de que el valor sea mayor que el z-index de tu popup */
}
</style>
