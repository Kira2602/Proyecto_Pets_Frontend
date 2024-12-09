<template>
  <div>
    <header>
      <Navbar :nombre="nombreUsuario" />
    </header>

    <!-- Panel de Usuario -->
    <section class="panel-usuario">
      <h2>PANEL DE USUARIO</h2>
      <div class="icon-grid">
        <div class="icon-card" @click="openProfilePopup">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/perfil_usuario.png" alt="Perfil de usuario" />
              <p>Perfil de usuario</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="openRegisterPetPopup">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/agregar_mascota.png" alt="Registrar Mascotas" />
              <p>Registrar Mascotas</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="redirectToMisMascotas">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/mis_mascotas.png" alt="Mis Mascotas" />
              <p>Mis Mascotas</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="redirectToSalud">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/perro.png" alt="Salud" />
              <p>Salud</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="openWalkPopup">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/collar.png" alt="Paseos" />
              <p>Paseos</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="openFoodPopup">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/comida.png" alt="Comida" />
              <p>Comida</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="openMedicalAppointmentPopup">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/gestion_citas_medicas_icon.png" alt="Citas médicas" />
              <p>Citas médicas</p>
            </div>
          </div>
        </div>

        <div class="icon-card" @click="redirectToHistorialActividades">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/history.png" alt="Historial de mascotas" />
              <p>Historial de actividades mascotas</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="redirectToNotificaciones">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/reminder.png" alt="Recordatorios" />
              <p>Recordatorios</p>
            </div>
          </div>
        </div>
        <div class="icon-card">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/calendario.png" alt="Calendario" />
              <p>Calendario</p>
            </div>
          </div>
        </div>
        <div class="icon-card" @click="openOtherActivityPopup">
          <div class="animated-border">
            <div class="inner-card">
              <img src="@/components/images/agregar_actividad.png" alt="Otras actividades" />
              <p>Otras actividades</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 Grupo PetCare. Todos los derechos reservados.</p>
      </div>
    </footer>

    <!-- Popup de perfil de usuario -->
    <UserProfilePopup
      v-if="isProfilePopupVisible"
      @close="isProfilePopupVisible = false"
      @edit-profile="openEditProfilePopup"
    />

    <!-- Popup de edición de perfil -->
    <EditProfilePopup
      v-if="isEditProfilePopupVisible"
      @close="isEditProfilePopupVisible = false"
      @perfilActualizado="actualizarNombreUsuario"
    />
    <!-- Popup de registrar mascota -->
    <RegisterPetPopup v-if="isRegisterPetPopupVisible" @close="isRegisterPetPopupVisible = false" />

    <!-- Popup de registrar cita medica -->
    <RegisterMedicalAppointmentPopup
      v-if="isMedicalAppointmentPopupVisible"
      :actividad-id="actividadSeleccionada"
      @close="isMedicalAppointmentPopupVisible = false"
    />

    <!-- Popup de registrar paseo -->
    <RegisterWalkPopup 
    v-if="isWalkPopupVisible" 
    :actividad-id="actividadSeleccionada"
    @close="isWalkPopupVisible = false" />

    <!-- Popup de registrar comida -->
    <RegisterFoodPopup 
    v-if="isFoodPopupVisible" 
    :actividad-id="actividadSeleccionada"
    @close="isFoodPopupVisible = false" />

    <!-- Popup de registrar otra actividad -->
    <RegisterOtherActivityPopup
      v-if="isOtherActivityPopupVisible"
      :actividad-id="actividadSeleccionada"
      @close="isOtherActivityPopupVisible = false"
    />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import UserProfilePopup from '@/components/UserProfilePopup.vue'
import EditProfilePopup from '@/components/EditProfilePopup.vue'
import RegisterPetPopup from '@/components/RegisterPetPopup.vue'
import RegisterMedicalAppointmentPopup from '@/components/RegisterMedicalAppointmentPopup.vue'
import RegisterWalkPopup from '@/components/RegisterWalkPopup.vue'
import RegisterFoodPopup from '@/components/RegisterFoodPopup.vue'
import RegisterOtherActivityPopup from '@/components/RegisterOtherActivityPopup.vue'

export default {
  name: 'PanelUsuario',
  components: {
    Navbar,
    UserProfilePopup,
    EditProfilePopup,
    RegisterPetPopup,
    RegisterMedicalAppointmentPopup,
    RegisterWalkPopup,
    RegisterFoodPopup,
    RegisterOtherActivityPopup
  },
  data() {
    return {
      isProfilePopupVisible: false, // Controla la visibilidad del popup de perfil
      isEditProfilePopupVisible: false, // Controla la visibilidad del popup de edición
      isRegisterPetPopupVisible: false, // Controla la visibilidad del popup de perfil
      isMedicalAppointmentPopupVisible: false,
      isWalkPopupVisible: false,
      isFoodPopupVisible: false,
      isOtherActivityPopupVisible: false,
      usuarioId: null, // ID del usuario almacenado
      nombreUsuario: localStorage.getItem('nombre') || '', // Inicializar con el nombre almacenado
      actividadSeleccionada: null // ID de la actividad seleccionada

    }
  },
  methods: {
    openProfilePopup() {
      this.isProfilePopupVisible = true // Abre el popup de perfil
    },
    openEditProfilePopup() {
      this.isProfilePopupVisible = false // Cierra el popup de perfil
      this.isEditProfilePopupVisible = true // Abre el popup de edición de perfil
    },
    openRegisterPetPopup() {
      this.isRegisterPetPopupVisible = true // Abre el popup de perfil
      this.usuarioId = localStorage.getItem('Usuario_id_usuario')
      if (this.usuarioId) {
        this.isRegisterPetPopupVisible = true
      } else {
        alert('Debes iniciar sesión para registrar una mascota.')
      }
    },
    openMedicalAppointmentPopup() {
      this.actividadSeleccionada = 1;
      console.log("Actividad seleccionada:", this.actividadSeleccionada);

      this.isMedicalAppointmentPopupVisible = true
    },
    openWalkPopup() {
      this.actividadSeleccionada = 2; // ID de actividad para "Paseo"
      console.log("Actividad seleccionada:", this.actividadSeleccionada);

      this.isWalkPopupVisible = true
    },
    openFoodPopup() {
      this.actividadSeleccionada = 3; // ID de actividad para "Comida"
      console.log("Actividad seleccionada:", this.actividadSeleccionada);

      this.isFoodPopupVisible = true
    },
    openOtherActivityPopup() {
      this.actividadSeleccionada = 4; // ID de actividad para "Otras actividades"
      console.log("Actividad seleccionada:", this.actividadSeleccionada);

      this.isOtherActivityPopupVisible = true
    },
    redirectToMisMascotas() {
      this.$router.push({ name: 'mis-mascotas' })
    },
    redirectToSalud() {
      this.$router.push({ name: 'salud' })
    },
    redirectToHistorialActividades() {
      this.$router.push({ name: 'historial-actividades' })
    },
    actualizarNombreUsuario(datos) {
      this.nombreUsuario = datos.nombre // Actualizar el nombre del usuario después de editarlo
    },
    redirectToCalendario() {
      this.$router.push({ name: 'calendario' })
    },
    redirectToNotificaciones() {
      this.$router.push({ name: 'Notificaciones' })
    },
  },
  mounted() {
    this.usuarioId = localStorage.getItem('Usuario_id_usuario')
    if (!this.usuarioId) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

.panel-usuario {
  text-align: center;
  padding: 20px 10px;
  margin: 0 auto;
  max-width: 1200px;
}

.panel-usuario h2 {
  color: #9d8189;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.animated-border {
  position: relative;
  padding: 6px;
  background: transparent;
  border-radius: 12px;
  display: inline-block;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.animated-border:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
}

.animated-border:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  padding: 3px;
  background: linear-gradient(45deg, #f4acb7, #d8e2dc, #9d8189, #ffe5d9, #ffcad4);
  background-size: 400%;
  z-index: -1;
  animation: steam 20s linear infinite;
}

.inner-card {
  background-color: #faf7f8;
  border-radius: 8px;
  padding: 10px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-card img {
  width: 110px;
  height: 110px;
}

.icon-card p {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #4e3b47;
}

@keyframes steam {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

@media screen and (max-width: 768px) {
  .icon-grid {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 10px;
  }
}

@media screen and (max-width: 480px) {
  .icon-grid {
    grid-template-columns: repeat(1, 1fr);
    padding: 0 5px;
  }
}

.footer {
  background-color: #9d8189;
  padding: 40px 20px;
  text-align: center;
  color: white;
  margin-top: 50px;
}

.footer-content {
  font-size: 14px;
}
</style>
