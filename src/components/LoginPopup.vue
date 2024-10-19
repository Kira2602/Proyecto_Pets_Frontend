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
      showPassword: false
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
    async login() {
      try {
        const response = await axios.post('http://127.0.0.1:5000/usuario/login', {
          email: this.email,
          contrasenia: this.password  
        });

        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Has iniciado sesión correctamente',
          showConfirmButton: false,
          timer: 1500  // La alerta se cerrará automáticamente después de 1.5 segundos
          });
          this.closePopup(); 
        }
      } catch (error) {
        console.error('Error en el login:', error.response ? error.response.data : error.message);
        this.closePopup();
        Swal.fire({
        icon: 'error',
        title: 'Login fallido',
        text: 'Verifica tus credenciales e intenta nuevamente',
        showConfirmButton: true
        });
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
  width: 800px; /* Ajuste para pantallas más grandes */
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
  width: 100%; /* Asegura que la imagen ocupe su contenedor */
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
  font-size: 2.4rem;
}

.login-form label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 2px;
}

.login-form input {
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
  width: 73%;
  padding-right: 40px;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 65px;
  transform: translateY(-50%);
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
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  width: 80%;
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
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 80%;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.2);
}

.btn-register:hover {
  background-color: #c2ccc4;
}

.no-account-text {
  font-size: 14px;
  color: #9d9189;
  margin-top: 20px;
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
    font-size: 2rem;
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
