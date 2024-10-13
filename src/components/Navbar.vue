<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">
      <img src="@/components/images/nav_bar_logo.png" alt="Logo" class="logo-img" />
    </div>

    <!-- Menú normal para pantallas grandes -->
    <div class="menu-desktop">
      <ul class="menu">
        <li><a href="#encabezado" class="menu-link">Inicio</a></li>
        <li><a href="#funcionalidades" class="menu-link">Funcionalidades</a></li>
        <li><a href="#redes" class="menu-link">Redes Sociales</a></li>
      </ul>
      <div class="buttons">
        <button class="btn btn-outline" @click="showLoginPopup">Iniciar Sesión</button>
        <button class="btn btn-filled" @click="showRegisterPopup">Registrarse</button>
      </div>
    </div>

    <!-- Menú hamburguesa para móviles/tablets -->
    <div class="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul class="menuItem">
        <li><a href="#encabezado" class="menu-link" @click="closeMobileMenu">Inicio</a></li>
        <li>
          <a href="#funcionalidades" class="menu-link" @click="closeMobileMenu">Funcionalidades</a>
        </li>
        <li><a href="#redes" class="menu-link" @click="closeMobileMenu">Redes Sociales</a></li>
        <li>
          <button class="btn btn-outline" @click="showLoginPopup">Iniciar Sesión</button>
        </li>
        <li>
          <button class="btn btn-filled" @click="showRegisterPopup">Registrarse</button>
        </li>
      </ul>
    </div>

    <!-- LoginPopup -->
    <LoginPopup
      :isVisible="showLoginPopupVisible"
      @close="closeLoginPopup"
      @switchToRegister="switchToRegister"
    />

    <!-- RegisterPopup -->
    <RegisterPopup :isVisible="showRegisterPopupVisible" @close="closeRegisterPopup" />
  </nav>
</template>

<script>
import LoginPopup from '@/components/LoginPopup.vue'
import RegisterPopup from '@/components/RegisterPopup.vue'

export default {
  name: 'Navbar',
  components: {
    LoginPopup,
    RegisterPopup
  },
  data() {
    return {
      showLoginPopupVisible: false,
      showRegisterPopupVisible: false
    }
  },
  methods: {
    // Mostrar el popup de login
    showLoginPopup() {
      this.showLoginPopupVisible = true
      this.showRegisterPopupVisible = false
    },
    // Cerrar el popup de login
    closeLoginPopup() {
      this.showLoginPopupVisible = false
    },
    // Mostrar el popup de registro
    showRegisterPopup() {
      this.showRegisterPopupVisible = true
      this.showLoginPopupVisible = false
    },
    // Cambiar de login a registro
    switchToRegister() {
      this.showLoginPopupVisible = false
      this.showRegisterPopupVisible = true
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 50px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  margin: 20px;
  position: relative;
}

.logo-img {
  width: 50px;
  height: 50px;
}

/* Menú para pantallas grandes (PC) */
.menu-desktop {
  display: flex;
  align-items: center;
}

.menu-desktop .menu {
  display: flex;
  gap: 20px;
  margin-right: 40px;
}

.menu-desktop .menu-link {
  text-decoration: none;
  list-style: none;
  font-size: 16px;
  color: #45413e;
  font-weight: 500;
  transition: color 0.3s ease;
}

li {
  list-style: none;
}

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

/* Estilos del menú hamburguesa para móviles/tablets */
.menuToggle {
  display: none;
  position: relative;
  z-index: 1;
  user-select: none;
}

.menuToggle input {
  display: block;
  width: 40px;
  height: 40px;
  position: absolute;
  top: -7px;
  left: 0;
  cursor: pointer;
  opacity: 0;
  z-index: 2;
}

.menuToggle span {
  display: block;
  width: 30px;
  height: 4px;
  margin-bottom: 5px;
  margin-right: 20px;
  background-color: #333;
  border-radius: 3px;
  transition: all 0.8s ease;
}

.menuToggle input:checked ~ span {
  transform: rotate(45deg);
  background-color: #db7f67;
  top: 0;
}

.menuToggle input:checked ~ span:nth-last-child(2) {
  opacity: 0;
}

.menuToggle input:checked ~ span:nth-last-child(3) {
  transform: rotate(-45deg);
  background-color: #db7f67;
  top: -20px;
}

.menuItem {
  position: absolute;
  width: 320px;
  height: 60vh;
  top: 100%;
  right: -10px;
  background-color: #fff;
  list-style: none;
  padding-top: 20px;
  padding-left: 0px;
  text-align: center;
  display: none;
  flex-direction: column;
  z-index: 10;
  border-radius: 25px;
}

.menuToggle input:checked ~ .menuItem {
  display: flex;
}

.menuItem li {
  margin: 15px 0;
}

.menu-link {
  text-decoration: none;
  font-size: 18px;
  color: #45413e;
  font-weight: 500;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: #db7f67;
}

/* Media query para aplicar el menú hamburguesa solo en móviles/tablets */
@media screen and (max-width: 768px) {
  .menu-desktop {
    display: none;
  }

  .menuToggle {
    display: block;
  }
}
</style>
