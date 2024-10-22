<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo">
      <img src="@/components/images/nav_bar_logo.png" alt="Logo" class="logo-img" />
    </div>

    <!-- Mostrar botón "Volver", notificaciones, y perfil en "mis-mascotas" -->
    <div v-if="isOnMisMascotas || isOnPerfilMascota" class="menu-desktop">
      <button class="btn btn-outline" @click="goBack">Volver</button>

      <!-- Notificaciones y Perfil del Usuario -->
      <div class="user-info">
        <i class="fas fa-bell"></i>
        <div class="user-profile" @click="toggleDropdown">
          <i class="fas fa-user-circle"></i>
          <span>{{ nombreUsuario }}</span>
          <!-- Nombre dinámico -->
        </div>

        <!-- Menú desplegable para cerrar sesión -->
        <div v-if="dropdownOpen" class="dropdown-menu">
          <ul>
            <li @click="confirmLogout">Cerrar sesión</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Menú para cuando el usuario NO ha iniciado sesión -->
    <div v-else-if="!isAuthenticated" class="menu-desktop">
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

    <!-- Menú para cuando el usuario ha iniciado sesión -->
    <div v-else class="menu-desktop">
      <ul class="menu">
        <!-- Mostrar menú para usuarios logueados -->
        <li><a @click.prevent="redirectToInicio" class="menu-link">Inicio</a></li>
        <li v-if="isOnInicio"><a href="#funcionalidades" class="menu-link">Funcionalidades</a></li>
        <li v-if="isOnInicio"><a href="#redes" class="menu-link">Redes Sociales</a></li>
        <!-- Siempre mostrar "Panel de Usuario" si el usuario está logueado -->
        <li><a @click.prevent="redirectToPanel" class="menu-link">Panel de Usuario</a></li>
      </ul>
      <div class="user-info">
        <i class="fas fa-bell"></i>
        <div class="user-profile" @click="toggleDropdown">
          <i class="fas fa-user-circle"></i>
          <span>{{ nombreUsuario }}</span>
          <!-- Nombre dinámico del usuario -->
        </div>

        <!-- Menú desplegable para cerrar sesión -->
        <div v-if="dropdownOpen" class="dropdown-menu">
          <ul>
            <li @click="confirmLogout">Cerrar sesión</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Menú hamburguesa para móviles/tablets -->
    <div class="menuToggle">
      <input type="checkbox" />
      <span></span>
      <span></span>
      <span></span>
      <ul class="menuItem">
        <li><a @click.prevent="redirectToInicio" class="menu-link">Inicio</a></li>
        <li v-if="isOnInicio"><a href="#funcionalidades" class="menu-link">Funcionalidades</a></li>
        <li v-if="isOnInicio"><a href="#redes" class="menu-link">Redes Sociales</a></li>
        <li><a @click.prevent="redirectToPanel" class="menu-link">Panel de Usuario</a></li>
        <li v-if="!isAuthenticated">
          <button class="btn btn-outline" @click="showLoginPopup">Iniciar Sesión</button>
        </li>
        <li v-if="!isAuthenticated">
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
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  components: {
    LoginPopup,
    RegisterPopup
  },
  props: {
    nombre: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isAuthenticated: false,
      nombreUsuario: this.nombre, // Nombre dinámico inicializado desde props
      showLoginPopupVisible: false,
      showRegisterPopupVisible: false,
      dropdownOpen: false,
      isOnInicio: false,
      isOnMisMascotas: false
    }
  },
  mounted() {
    this.checkAuthentication()
    this.checkRoute()
  },
  watch: {
    '$route.name'() {
      this.checkAuthentication()
      this.checkRoute()
    },
    nombre(newNombre) {
      this.nombreUsuario = newNombre // Actualiza el nombre dinámico al cambiar la prop
    }
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('authToken')
      if (token) {
        this.isAuthenticated = true
        this.nombreUsuario = localStorage.getItem('nombre') || this.nombreUsuario
      } else {
        this.isAuthenticated = false
        this.nombreUsuario = ''
      }
    },
    checkRoute() {
      // Actualizar isOnInicio dependiendo de la ruta
      this.isOnInicio = this.$route.name === 'inicio'
      this.isOnMisMascotas = this.$route.name === 'mis-mascotas'
      this.isOnPerfilMascota = this.$route.name === 'perfil-mascota'
    },
    showLoginPopup() {
      this.showLoginPopupVisible = true
      this.showRegisterPopupVisible = false
    },
    closeLoginPopup() {
      this.showLoginPopupVisible = false
    },
    showRegisterPopup() {
      this.showRegisterPopupVisible = true
      this.showLoginPopupVisible = false
    },
    closeRegisterPopup() {
      this.showRegisterPopupVisible = false
    },
    switchToRegister() {
      this.showLoginPopupVisible = false
      this.showRegisterPopupVisible = true
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    confirmLogout() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#9d8189',
        cancelButtonColor: '#ffcad4',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'my-confirm-button',
          cancelButton: 'my-cancel-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.logout()
        }
      })
    },
    logout() {
      // Eliminar todos los datos del localStorage relacionados con la sesión del usuario
      localStorage.removeItem('authToken')
      localStorage.removeItem('Usuario_id_usuario')
      localStorage.removeItem('nombre')

      this.isAuthenticated = false
      this.$router.push('/')
      Swal.fire({
        title: 'Sesión cerrada',
        text: 'Has cerrado sesión correctamente.',
        icon: 'success',
        confirmButtonColor: '#9d8189'
      })
    },
    redirectToInicio() {
      this.$router.push({ name: 'inicio' })
    },
    redirectToPanel() {
      this.$router.push({ name: 'panel-usuario' })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
@import '@fortawesome/fontawesome-free/css/all.css';

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
  margin-right: 20px;
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

/* Estilos de usuario */
.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #9d8189;
  position: relative;
}

.user-info i {
  font-size: 1.5rem;
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.user-profile i {
  font-size: 2rem;
}

.user-profile span {
  font-size: 1rem;
  font-weight: 600;
  color: #45413e;
}

/* Estilos del menú desplegable */
.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 999;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f4f4f4;
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

/* Estilos personalizados para botones de SweetAlert */
.my-confirm-button {
  background-color: #9d8189 !important;
  color: white !important;
}

.my-cancel-button {
  background-color: #ffcad4 !important;
  color: white !important;
}

.my-confirm-button:hover {
  background-color: #7a6652 !important;
}

.my-cancel-button:hover {
  background-color: #f4acb7 !important;
}
</style>
