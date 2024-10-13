<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/components/images/nav_bar_logo.png" alt="Logo" class="logo-img" />
    </div>
    <div class="menu-buttons">
      <ul class="menu">
        <a href="#" class="menu-link">Inicio</a>
        <a href="#" class="menu-link">Funcionalidades</a>
        <a href="#" class="menu-link">Redes Sociales</a>
      </ul>
      <div class="buttons">
        <button class="btn btn-outline" @click="showLoginPopup">Iniciar Sesión</button>
        <button class="btn btn-filled">Registrarse</button>
      </div>
    </div>

    <LoginPopup :isVisible="showPopup" @close="closeLoginPopup" />
  </nav>
</template>

<script>
import LoginPopup from '@/components/LoginPopup.vue'

export default {
  name: 'Navbar',
  components: {
    LoginPopup
  },
  data() {
    return {
      showPopup: false
    }
  },
  methods: {
    showLoginPopup() {
      this.showPopup = true
      console.log('Popup Visible:', this.showPopup) // Verifica el valor
    },

    closeLoginPopup() {
      this.showPopup = false
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.logo-img {
  width: 50px;
  height: 50px;
}

.menu-buttons {
  display: flex;
  align-items: center;
}

.menu {
  display: flex;
  gap: 20px;
  margin-right: 40px;
}

.menu-link {
  text-decoration: none;
  font-size: 16px;
  color: #45413e;
  font-weight: 500;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: #db7f67;
}

/* Estilo de los botones */
.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.btn-outline {
  background-color: transparent;
  color: #db7f67;
  border: 2px solid #db7f67;
}

.btn-outline:hover {
  background-color: #db7f67;
  color: white;
}

.btn-filled {
  background-color: #db7f67;
  color: white;
}

.btn-filled:hover {
  background-color: #f4cfc6;
  color: #db7f67;
}
</style>
