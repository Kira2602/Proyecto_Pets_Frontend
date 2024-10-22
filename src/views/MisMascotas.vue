<template>
  <div>
    <header>
      <Navbar />
    </header>

    <!-- Botón fuera del contenedor rosado -->
    <div class="header-section">
      <button class="agregar-btn" @click="openRegisterPetPopup">Agregar nuevo perfil</button>
    </div>

    <!-- Contenedor rosado con el título y las mascotas -->
    <section class="mascotas-container">
      <h2>Mis Mascotas</h2>

      <div class="mascotas-grid">
        <div v-for="mascota in mascotas" :key="mascota.id_mascota" class="mascota-card">
          <div class="card-content">
            <h3>{{ mascota.nombre }}</h3>
            <img
              :src="getEspecieIcon(mascota.especie_id_especie)"
              alt="Icono de especie"
              class="mascota-icon"
            />
            <button class="ver-perfil-btn" @click="verPerfil(mascota.id_mascota)">
              Ver perfil
            </button>
          </div>
        </div>
      </div>

      <!-- Registrar Mascota Popup -->
      <RegisterPetPopup
        v-if="isRegisterPetPopupVisible"
        @close="isRegisterPetPopupVisible = false"
        @mascota-registrada="agregarMascota"
      />
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 Grupo PetCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import RegisterPetPopup from '@/components/RegisterPetPopup.vue'
import perroIcon from '@/components/images/perro_icon.png'
import gatoIcon from '@/components/images/gato_icon.png'
import pajaroIcon from '@/components/images/pajaro.png'
import conejoIcon from '@/components/images/conejo.png'
import hamsterIcon from '@/components/images/hamster.png'
import defaultIcon from '@/components/images/paw.png'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'MisMascotas',
  components: {
    Navbar,
    RegisterPetPopup
  },
  data() {
    return {
      mascotas: [],
      isRegisterPetPopupVisible: false
    }
  },
  methods: {
    // Obtener las mascotas desde el backend
    async obtenerMascotas() {
      const usuarioId = localStorage.getItem('Usuario_id_usuario')
      if (!usuarioId) {
        this.$router.push('/login')
        return
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/mascota/mis-mascotas?Usuario_id_usuario=${usuarioId}`
        )
        this.mascotas = response.data
      } catch (error) {
        console.error('Error al obtener mascotas:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener las mascotas',
          confirmButtonColor: '#9d8189'
        })
      }
    },

    // Obtener el icono de la especie según el ID
    getEspecieIcon(especieId) {
      switch (especieId) {
        case 1:
          return perroIcon
        case 2:
          return gatoIcon
        case 3:
          return pajaroIcon
        case 4:
          return conejoIcon
        case 5:
          return hamsterIcon
        default:
          return defaultIcon
      }
    },

    // Ver perfil de la mascota
    verPerfil(mascotaId) {
      this.$router.push({ name: 'perfil-mascota', params: { id: mascotaId } })
    },

    // Abrir popup para registrar nueva mascota
    openRegisterPetPopup() {
      this.isRegisterPetPopupVisible = true
    },

    // Agregar una nueva mascota a la lista cuando se registre
    agregarMascota(nuevaMascota) {
      this.mascotas.push(nuevaMascota)
      Swal.fire({
        icon: 'success',
        title: 'Mascota Registrada',
        text: 'La mascota ha sido registrada correctamente.',
        confirmButtonColor: '#9d8189'
      })
    }
  },
  mounted() {
    this.obtenerMascotas()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Contenedor rosado con el título y las tarjetas */
.mascotas-container {
  text-align: center;
  background-color: #ffcad4;
  border-radius: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.mascotas-container h2 {
  text-align: center;
  color: #9d8189;
  margin-bottom: 20px;
  font-weight: bold;
}

.mascotas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-top: 30px;
}

/* Botón fuera del contenedor rosado */
.header-section {
  display: flex;
  justify-content: flex-end;
  max-width: 800px;
  margin: 10px auto 10px; /* Ajuste del espaciado */
  padding-right: 20px;
}

.mascota-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 180px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.mascota-card:hover {
  transform: scale(1.05); /* Efecto de zoom al pasar el puntero */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Mayor sombra */
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mascota-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #9d8189;
  margin-bottom: 10px;
}

.mascota-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.ver-perfil-btn {
  padding: 8px 16px;
  background-color: #d8e2dc;
  border: none;
  border-radius: 20px;
  color: #9d8189;
  font-weight: bold;
  cursor: pointer;
}

.ver-perfil-btn:hover {
  background-color: #ffe5d9;
}

.agregar-btn {
  padding: 10px 20px;
  background-color: #d8e2dc;
  border: none;
  border-radius: 25px;
  color: #9d8189;
  cursor: pointer;
  font-weight: bold;
  margin-left: auto;
}

.agregar-btn:hover {
  background-color: #ffe5d9;
}

/* Footer */
.footer {
  background-color: #9d8189;
  padding: 40px 10px;
  text-align: center;
  color: white;
  margin-top: 60px;
}

.footer-content {
  font-size: 14px;
}

/* Responsivo para pantallas pequeñas */
@media screen and (max-width: 768px) {
  .mascotas-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .header-section {
    justify-content: center;
  }
}

@media screen and (max-width: 480px) {
  .mascotas-grid {
    grid-template-columns: 1fr;
  }

  .mascota-card {
    width: 100%;
  }
}
</style>
