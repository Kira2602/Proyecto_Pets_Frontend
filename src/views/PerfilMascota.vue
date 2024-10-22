<template>
  <div>
    <header>
      <Navbar />
    </header>

    <div class="perfil-mascota-container">
      <div class="animated-border">
        <div class="mascota-card">
          <div class="mascota-img-container">
            <img :src="mascotaImagen" alt="Imagen de mascota" class="mascota-img" />
          </div>

          <div class="mascota-info">
            <h2>{{ mascota.nombre }}</h2>
            <p><strong>Edad:</strong> {{ mascota.edad }}</p>
            <p><strong>Raza:</strong> {{ mascota.raza }}</p>
            <p><strong>Peso:</strong> {{ mascota.peso }} kg</p>
            <p><strong>Más detalles:</strong> {{ mascota.detalles }}</p>
          </div>

          <button class="editar-btn" @click="editarMascota">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 Grupo PetCare. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import axios from 'axios'
import defaultMascotaImage from '@/components/images/perfil_mascota.jpeg'

export default {
  name: 'PerfilMascota',
  components: {
    Navbar
  },
  data() {
    return {
      mascota: {},
      mascotaImagen: defaultMascotaImage
    }
  },
  methods: {
    async obtenerPerfilMascota() {
      const mascotaId = this.$route.params.id
      try {
        const response = await axios.get(`http://127.0.0.1:5000/mascota/perfil/${mascotaId}`)
        this.mascota = response.data

        if (this.mascota.imagen) {
          this.mascotaImagen = this.mascota.imagen
        }
      } catch (error) {
        console.error('Error al obtener el perfil de la mascota:', error)
      }
    },
    editarMascota() {
      this.$router.push({ name: 'editar-mascota', params: { id: this.mascota.id_mascota } })
    }
  },
  mounted() {
    this.obtenerPerfilMascota()
  }
}
</script>

<style scoped>
/* Contenedor de la tarjeta */
.perfil-mascota-container {
  display: flex;
  justify-content: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
}

.animated-border {
  position: relative;
  padding: 10px;
  border-radius: 20px;
  background: linear-gradient(45deg, #f4acb7, #d8e2dc, #9d8189, #ffe5d9, #ffcad4);
  background-size: 400%;
  animation: steam 20s linear infinite;
  max-width: 1000px;
  width: 100%;
  box-sizing: border-box;
}

.mascota-card {
  display: flex;
  align-items: center;
  background-color: #ffcad4;
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  position: relative;
  gap: 30px;
  box-sizing: border-box;
}

.mascota-img-container {
  flex-shrink: 0;
}

.mascota-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.mascota-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 20px;
}

.mascota-info h2 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #9d8189;
  margin-bottom: 10px;
}

.mascota-info p {
  background-color: #ffe5d9;
  border-radius: 20px;
  padding: 10px 15px;
  font-size: 18px;
  color: #7a5169;
}

.editar-btn {
  background-color: #ffe5d9;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.editar-btn i {
  font-size: 24px;
  color: #9d8189;
}

.editar-btn:hover {
  background-color: #f4a4a4;
  color: white;
}

/* Animación del borde */
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

/* Footer */
.footer {
  background-color: #9d8189;
  padding: 20px;
  text-align: center;
  color: white;
}

.footer-content {
  font-size: 14px;
}
</style>
