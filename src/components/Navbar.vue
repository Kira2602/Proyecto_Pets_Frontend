<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/components/images/nav_bar_logo.png" alt="Logo" class="logo-img" />
    </div>

    <!-- Botón hamburguesa para móviles -->
    <div class="hamburger-menu" @click="toggleMobileMenu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>

    <!-- Menú de navegación normal, pero con la clase para móviles -->
    <div :class="['menu-buttons', mobileMenuVisible ? 'menu-mobile-visible' : '']">
      <ul class="menu">
        <a href="#encabezado" class="menu-link" @click="closeMobileMenu">Inicio</a>
        <a href="#funcionalidades" class="menu-link" @click="closeMobileMenu">Funcionalidades</a>
        <a href="#redes" class="menu-link" @click="closeMobileMenu">Redes Sociales</a>
      </ul>
      <div class="buttons">
        <button class="btn btn-outline" @click="showLoginPopup">Iniciar Sesión</button>
        <button class="btn btn-filled" @click="showRegisterPopup">Registrarse</button>
      </div>
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
      showLoginPopupVisible: false, // Controla el popup de login
      showRegisterPopupVisible: false, // Controla el popup de registro
      mobileMenuVisible: false // Controla la visibilidad del menú móvil
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
    // Cerrar el popup de registro
    closeRegisterPopup() {
      this.showRegisterPopupVisible = false
    },
    // Cambiar de login a registro
    switchToRegister() {
      this.showLoginPopupVisible = false
      this.showRegisterPopupVisible = true
    },
    // Alternar el menú móvil
    toggleMobileMenu() {
      this.mobileMenuVisible = !this.mobileMenuVisible
    },
    // Cerrar el menú móvil al hacer clic en un enlace
    closeMobileMenu() {
      this.mobileMenuVisible = false
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
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  position: relative;
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

/* Estilos del menú hamburguesa */
.hamburger-menu {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.hamburger-menu .bar {
  height: 3px;
  width: 100%;
  background-color: #333;
  border-radius: 10px;
}

.menu-mobile-visible {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Media Queries para móviles */
@media screen and (max-width: 768px) {
  /* Ocultar el menú normal en pantallas pequeñas */
  .menu-buttons {
    display: none;
  }

  .hamburger-menu {
    display: flex;
  }

  .menu-mobile-visible {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 10;
  }

  .menu-mobile-visible .menu {
    flex-direction: column;
    gap: 15px;
  }

  .menu-mobile-visible .buttons {
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
  }

  .menu-mobile-visible .btn {
    width: 100%;
  }
}
</style>
