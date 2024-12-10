<template>
  <div v-if="isVisible" class="popup-overlay" @click.self="closePopup">
    <div class="popup">
      <button class="close-btn" @click="closePopup">×</button>
      <div class="popup-content">
        <div class="popup-image">
          <img src="@/components/images/candado.png" alt="Login Image" />
        </div>
        <div class="popup-form">
          <h2>Cambiar Contraseña</h2>
          <form @submit.prevent="changePassword">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" placeholder="Email" />
            <label for="new-password">Nueva Contraseña</label>
            <input
              type="password"
              v-model="newPassword"
              id="new-password"
              placeholder="Nueva Contraseña"
            />
            <button type="submit" class="btn-login">Cambiar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'ChangePasswordPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: '',
      newPassword: ''
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    async changePassword() {
      // Validar campos antes de enviar la solicitud
      if (!this.email || !this.newPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Campos incompletos',
          text: 'Por favor, complete todos los campos.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-swal-button'
          }
        })
        return
      }

      try {
        // URL de tu API para el cambio de contraseña
        const apiUrl = 'http://127.0.0.1:5000/usuario/cambiar'

        // Datos a enviar
        const data = {
          email: this.email,
          nueva_contrasenia: this.newPassword // Coincide con lo que espera tu backend
        }

        // Enviar solicitud POST sin almacenar la respuesta
        await axios.put(apiUrl, data)

        // Alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Cambio exitoso',
          text: 'Tu contraseña ha sido actualizada correctamente.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-swal-button'
          }
        })

        this.closePopup() // Cierra el popup después de un cambio exitoso
      } catch (error) {
        console.error(
          'Error al cambiar la contraseña:',
          error.response ? error.response.data : error.message
        )

        // Manejo de errores con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error en el cambio de contraseña',
          text:
            error.response?.data?.message ||
            'Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-swal-button'
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup {
  background-color: white;
  border-radius: 20px;
  width: 600px;
  max-width: 90%;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.popup-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; /* Responsive para pantallas más pequeñas */
}

.popup-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px; /* Separación con el formulario */
}

.popup-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
}

.popup-form {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup-form h2 {
  font-size: 28px;
  color: #af8a8a;
  margin-bottom: 20px;
}

.popup-form label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.popup-form input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn-login {
  background-color: #ffe5d9;
  color: #9d9189;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #e3a5a0;
}

@media screen and (max-width: 768px) {
  .popup-content {
    flex-direction: column;
    align-items: center;
  }

  .popup-image {
    margin-right: 0;
    margin-bottom: 20px; /* Espacio entre imagen y formulario */
  }

  .popup-form {
    width: 100%;
    text-align: center;
  }
}
</style>
