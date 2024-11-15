<template>
  <div class="profile-popup">
    <div class="popup-wrapper">
      <div class="popup-content">
        <div class="color-bar"></div>
        <button class="close-btn" @click="closePopup">×</button>
        <h2>Editar Perfil</h2>
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="user.name" />
            <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
          </div>

          <div class="form-group">
            <label for="email">Correo:</label>
            <input type="email" id="email" v-model="user.email" disabled />
          </div>

          <div class="form-group">
            <label for="phone">Teléfono:</label>
            <input type="text" id="phone" v-model="user.phone" />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>
          <div class="button-group">
            <button class="btn-save" type="submit">Guardar</button>
            <button class="btn-cancel" type="button" @click="closePopup">Cancelar</button>
          </div>
        </form>

        <div class="footer-image">
          <img src="@/components/images/paws_icon.png" alt="Cat paws" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditProfilePopup',

  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      user: {
        name: '',
        email: '',
        phone: ''
      },
      errors: {
        name: '',
        phone: ''
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },

    validateForm() {
      this.errors.name = ''
      this.errors.phone = ''
      let isValid = true

      if (!this.user.name) {
        this.errors.name = 'El nombre no puede estar vacío'
        isValid = false
      }

      if (!this.user.phone) {
        this.errors.phone = 'El teléfono no puede estar vacío'
        isValid = false
      }

      return isValid
    },

    async fetchUserData() {
      try {
        const userId = localStorage.getItem('Usuario_id_usuario')

        const response = await axios.get(`http://127.0.0.1:5000/usuario/${userId}`)
        this.user = {
          name: response.data.nombre,
          email: response.data.email,
          phone: response.data.telefono || 'No disponible'
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error)
      }
    },

    async updateUser() {
      if (!this.validateForm()) {
        return
      }

      try {
        const userId = localStorage.getItem('Usuario_id_usuario')

        const response = await axios.put(`http://127.0.0.1:5000/usuario/${userId}`, {
          nombre: this.user.name,
          telefono: this.user.phone
        })

        localStorage.setItem('nombre', this.user.name)
        localStorage.setItem('telefono', this.user.phone)

        this.$emit('perfilActualizado', { nombre: this.user.name })

        Swal.fire({
          icon: 'success',
          title: 'Usuario actualizado',
          text: 'El usuario ha sido actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })

        this.closePopup()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: 'No se pudo actualizar el usuario. Verifica los datos e intenta nuevamente',
          showConfirmButton: true
        })
      }
    }
  },
  mounted() {
    this.fetchUserData()
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
  z-index: 9999;
}

.popup-wrapper {
  position: relative;
  width: 500px;
}

.popup-content {
  background: #fff7f7;
  padding: 0px 0px;
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
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
  margin-bottom: 20px;
  margin-top: 30px;
}

.form-group {
  align-items: center;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  margin: 0px auto;
}

.form-group label {
  display: block;
  margin: 8px 0px 4px 0px;
  font-size: 14px;
  color: #af8a8a;
}

input {
  width: 90%;
  padding: 10px;
  border: 2px solid #d3a8a8;
  border-radius: 10px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #af8a8a;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

button.btn-save {
  background-color: #f3cdc0;
  color: #fff;
}

button.btn-save:hover {
  background-color: #d2a5a5;
}

button.btn-cancel {
  background-color: #c5d9c9;
  color: #fff;
}

button.btn-cancel:hover {
  background-color: #a9c2a8;
}

.footer-image {
  text-align: center;
  margin-top: 20px;
}

.footer-image img {
  width: 100%;
  max-width: 450px;
}
</style>
