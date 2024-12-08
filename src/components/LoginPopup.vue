<template>
  <div v-if="isVisible" class="login-popup-overlay" @click.self="closePopup">
    <div class="login-popup">
      <button class="close-btn" @click="closePopup">×</button>
      <div class="login-content">
        <div class="login-image">
          <img src="@/components/images/login_image.jpeg" alt="Login Image" />
        </div>
        <div class="login-form">
          <h2>Iniciar Sesión</h2>
          <form @submit.prevent="login">
            <label for="email">Email</label>
            <input type="email" v-model="email" id="email" placeholder="Email" />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>

            <label for="password">Contraseña</label>
            <div class="password-wrapper">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                id="password"
                placeholder="Contraseña"
              />
              <span class="toggle-password" @click="togglePasswordVisibility">
                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </span>
            </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>

            <a href="#" class="forgot-password">Olvidé mi contraseña.</a>

            <button type="submit" class="btn-login">Ingresar</button>
          </form>

          <p class="no-account-text">¿Aún no tienes una cuenta?</p>
          <button class="btn-register" @click="$emit('switchToRegister')">Registrarse</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'LoginPopup',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      errors: {
        email: '',
        password: ''
      }
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    validateForm() {
      this.errors.email = ''
      this.errors.password = ''
      let isValid = true

      // Validar que el correo no esté vacío y tenga un formato válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.email) {
        this.errors.email = 'El email no puede estar vacío'
        isValid = false
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = 'El formato del email no es válido'
        isValid = false
      }

      // Validar que la contraseña no esté vacía
      if (!this.password) {
        this.errors.password = 'La contraseña no puede estar vacía'
        isValid = false
      }

      return isValid
    },
    async login() {
      if (!this.validateForm()) {
        return
      }

      try {
        const response = await axios.post('http://127.0.0.1:5000/usuario/login', {
          email: this.email,
          contrasenia: this.password
        })
        console.log('Respuesta de login:', response.data)

        if (response.data.id_usuario) {
          localStorage.setItem('Usuario_id_usuario', response.data.id_usuario)
        } else {
          console.error('No se recibió id_usuario en la respuesta')
          alert('No se pudo obtener el ID del usuario.')
          return
        }

        if (response.data.token && response.data.nombre) {
          localStorage.setItem('authToken', response.data.token)
          localStorage.setItem('nombre', response.data.nombre)

          Swal.fire({
            icon: 'success',
            title: 'Login exitoso',
            text: 'Has iniciado sesión correctamente',
            confirmButtonText: 'OK',
            customClass: {
              confirmButton: 'my-swal-button'
            }
          })

          this.closePopup()
          this.$router.push('/panel-usuario')
        }
      } catch (error) {
        console.error('Error en el login:', error.response ? error.response.data : error.message)

        Swal.fire({
          icon: 'error',
          title: 'Login fallido',
          text: 'Verifica tus credenciales e intenta nuevamente',
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

.login-popup-overlay {
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

.login-popup {
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

.login-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-image img {
  width: 100%;
  max-width: 360px;
  height: auto;
  border-radius: 30px;
}

.login-form {
  flex: 1;
  padding-left: 30px;
}

.login-form h2 {
  color: #af8a8a;
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
}

.login-form label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 2px;
}

.login-form input {
  width: 90%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
  display: block;
}

.password-wrapper {
  position: relative;
  width: 100%;
}

.password-wrapper input {
  width: 90%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 50px;
  transform: translateY(-70%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #af8a8a;
}

.forgot-password {
  font-size: 14px;
  color: #af8a8a;
  margin-bottom: 20px;
  display: block;
  text-align: left;
}

.btn-login {
  background-color: #ffe5d9;
  color: #9d9189;
  padding: 8px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-left: 60px;
  font-weight: bold;
  width: 60%;
  margin-bottom: 10px;
  font-size: 1.2rem;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-login:hover {
  background-color: #e3a5a0;
}

.btn-register {
  background-color: #d8e2dc;
  color: #9d9189;
  padding: 8px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 60%;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
  margin-left: 60px;
}

.btn-register:hover {
  background-color: #c2ccc4;
}

.no-account-text {
  font-size: 14px;
  color: #9d9189;
  margin-top: 20px;
}

.my-swal-button {
  background-color: #ffcad4 !important;
  color: white !important;
  border: none !important;
  border-radius: 5px !important;
  padding: 10px 20px !important;
  font-size: 16px !important;
}

.my-swal-button:hover {
  background-color: #f4a8a9 !important;
  color: white !important;
}

/* Ajustes responsivos */
@media screen and (max-width: 768px) {
  .login-popup {
    width: 90%;
    height: auto;
    border-radius: 15px;
  }

  .login-content {
    flex-direction: column;
    align-items: center;
  }

  .login-image img {
    width: 50%;
    margin: 10px 0;
  }

  .login-form {
    padding-left: 0;
    width: 100%;
    text-align: center;
  }

  .login-form h2 {
    font-size: 1rem;
  }

  .login-form input {
    width: 90%;
  }

  .password-wrapper input {
    width: 85%;
  }

  .toggle-password {
    right: 20px;
  }

  .btn-login,
  .btn-register {
    width: 90%;
  }
}

@media screen and (max-width: 480px) {
  .login-image img {
    width: 45%;
  }

  .login-form h2 {
    font-size: 1.8rem;
  }

  .btn-login,
  .btn-register {
    font-size: 1rem;
  }
}
</style>
