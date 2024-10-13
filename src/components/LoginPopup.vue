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
          <form>
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Email" />

            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" />

            <a href="#" class="forgot-password">Olvidé mi contraseña.</a>

            <button type="submit" class="btn-login">Ingresar</button>
          </form>

          <p class="no-account-text">¿Aún no tienes una cuenta?</p>
          <button class="btn-register">Registrarse</button>
          <!-- Botón separado -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPopup',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.login-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2); /* Fondo ligeramente oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.login-popup {
  background-color: white;
  padding: 0px;
  border-radius: 30px; /* Bordes más redondeados */
  width: 800px; /* Ancho amplio para dar espacio */
  height: 520px;
  padding: 10px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
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

.login-image img {
  width: 360px;
  margin: 5px 10px; /* Imagen más grande */
  height: auto;
  border-radius: 30px; /* Bordes redondeados */
}

.login-form {
  flex: 1;
  padding-left: 30px;
}

.login-form h2 {
  color: #af8a8a;
  margin-bottom: 5px;
  text-align: center;
  font-size: 2.4rem;
  margin-top: 10px; /* Mueve el título hacia arriba */
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
  border-radius: 10px; /* Bordes suaves para los campos */
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
  border-radius: 25px; /* Bordes más redondeados */
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
  border-radius: 25px; /* Bordes redondeados */
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
</style>
