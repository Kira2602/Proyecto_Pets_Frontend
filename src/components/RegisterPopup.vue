<template>
  <div v-if="isVisible" class="register-popup-overlay" @click.self="closePopup">
    <div class="register-popup">
      <button class="close-btn" @click="closePopup">×</button>
      <div class="register-content">
        <div class="register-image">
          <img src="@/components/images/registro_image.jpeg" alt="Register Image" />
        </div>
        <div class="register-form">
          <h2>Registrarse</h2>
          <form @submit.prevent="register">
            <label for="name">Nombre</label>
            <input
              type="text"
              v-model="nombre"
              id="name"
              placeholder="Nombre"
              @blur="validateField('nombre')"
              :class="{ 'error-border': errors.nombre }"
            />
            <span v-if="errors.nombre" class="error-message">{{ errors.nombre }}</span>

            <label for="phone">Teléfono</label>
            <input
              type="text"
              v-model="telefono"
              id="phone"
              placeholder="Teléfono"
              @blur="validateField('telefono')"
              :class="{ 'error-border': errors.telefono }"
            />
            <span v-if="errors.telefono" class="error-message">{{ errors.telefono }}</span>

            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              id="email"
              placeholder="Email"
              @blur="validateField('email')"
              :class="{ 'error-border': errors.email }"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>

            <label for="password">Contraseña</label>
            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="contrasenia"
                id="password"
                placeholder="Contraseña"
                @blur="validateField('contrasenia')"
                :class="{ 'error-border': errors.contrasenia }"
              />
              <span class="toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </span>
            </div>
            <span v-if="errors.contrasenia" class="error-message">{{ errors.contrasenia }}</span>

            <button type="submit" class="btn-register">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'RegisterPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      nombre: '',
      telefono: '',
      email: '',
      contrasenia: '',
      showPassword: false,
      errors: {
        nombre: '',
        telefono: '',
        email: '',
        contrasenia: ''
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit('close') // Emitiendo el evento 'close' para que el popup se cierre
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    validateField(field) {
      this.errors[field] = ''

      // Validaciones específicas para cada campo
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!this.email || !emailRegex.test(this.email)) {
          this.errors.email = 'Introduce un correo electrónico válido'
        }
      } else if (field === 'telefono') {
        const phoneRegex = /^[0-9]+$/
        if (!this.telefono || !phoneRegex.test(this.telefono)) {
          this.errors.telefono = 'Introduce un número de teléfono válido'
        }
      } else if (field === 'contrasenia') {
        if (this.contrasenia.length < 6) {
          this.errors.contrasenia = 'La contraseña debe tener al menos 6 caracteres'
        }
      } else {
        if (!this[field]) {
          this.errors[field] = `El campo ${field} no puede estar vacío`
        }
      }
    },
    validateForm() {
      // Validar todos los campos
      this.validateField('nombre')
      this.validateField('telefono')
      this.validateField('email')
      this.validateField('contrasenia')

      return (
        !this.errors.nombre &&
        !this.errors.telefono &&
        !this.errors.email &&
        !this.errors.contrasenia
      )
    },
    async register() {
      if (!this.validateForm()) {
        return
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/usuario/create', {
          nombre: this.nombre,
          telefono: this.telefono,
          email: this.email,
          contrasenia: this.contrasenia
        })
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario creado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.closePopup() // Cerrando el popup después de un registro exitoso
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: 'No se pudo crear el usuario. Verifica los datos e intenta nuevamente',
          showConfirmButton: true
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

.register-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.register-popup {
  background-color: white;
  border-radius: 30px;
  width: 800px;
  height: 520px;
  padding: 20px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.register-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.register-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-image img {
  width: 100%;
  max-width: 360px;
  height: auto;
  border-radius: 30px;
}

.register-form {
  flex: 1;
  padding-left: 30px;
}

.register-form h2 {
  color: #af8a8a;
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
}

.register-form label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 2px;
  font-weight: bold;
}

.register-form input {
  width: 80%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 80%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 80px;
  transform: translateY(-70%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #af8a8a;
}

.error-border {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.btn-register {
  background-color: #d8e2dc;
  color: #9d8189;
  padding: 8px 10px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 70%;
  margin-top: 10px;
  font-size: 1.2rem;
  margin-left: 15px;
  font-weight: bold;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-register:hover {
  background-color: #c2ccc4;
}

/* Ajustes responsivos */
@media screen and (max-width: 768px) {
  .register-popup {
    width: 90%;
    height: auto;
    border-radius: 15px;
  }

  .register-content {
    flex-direction: column;
    align-items: center;
  }

  .register-image img {
    width: 50%;
    margin: 10px 0;
  }

  .register-form {
    padding-left: 0;
    width: 100%;
    text-align: center;
  }

  .register-form h2 {
    font-size: 2rem;
  }

  .register-form input {
    width: 90%;
  }

  .password-wrapper input {
    width: 85%;
  }

  .toggle-password {
    right: 20px;
  }

  .btn-register {
    width: 90%;
  }
}

@media screen and (max-width: 480px) {
  .register-image img {
    width: 45%;
  }

  .register-form h2 {
    font-size: 1.8rem;
  }

  .btn-register {
    font-size: 1rem;
  }
}
</style>
