<template>
  <div>
    <header>
      <Navbar />
    </header>

    <div class="perfil-mascota-container">
      <div class="animated-border">
        <div class="mascota-card">
          <div class="mascota-details">
            <h2>{{ isEditMode ? ' ' + mascota.nombre : mascota.nombre }}</h2>
            <div class="mascota-img-container">
              <img :src="mascotaImagen" alt="Imagen de mascota" class="mascota-img" />
            </div>
          </div>

          <div class="flex-row-container">
            <div class="mascota-info">
              <!-- Mostrar input para fecha de nacimiento cuando se edita, y la edad cuando no -->
              <div class="input-group">
                <label><strong>Nombre:</strong></label>
                <input type="text" v-model="mascota.nombre" :disabled="!isEditMode" />
              </div>
              <div class="input-group">
                <label><strong>Edad:</strong></label>
                <input v-if="isEditMode" type="date" v-model="mascota.fecha_nacimiento" />
                <input
                  v-else
                  type="text"
                  :value="calcularEdad(mascota.fecha_nacimiento) + ' años'"
                  disabled
                />
              </div>

              <div class="input-group">
                <label><strong>Raza:</strong></label>
                <input type="text" v-model="mascota.raza" :disabled="!isEditMode" />
              </div>

              <div class="input-group">
                <label><strong>Peso:</strong></label>
                <input type="number" step="0.01" v-model="mascota.peso" :disabled="!isEditMode" />
              </div>

              <div class="input-group">
                <label><strong>Más detalles:</strong></label>
                <textarea v-model="mascota.descripcion" :disabled="!isEditMode"></textarea>
              </div>
            </div>

            <button class="editar-btn" @click="isEditMode ? guardarCambios() : toggleEditMode()">
              <i :class="isEditMode ? 'fas fa-save' : 'fas fa-edit'"></i>
            </button>
          </div>
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
import Swal from 'sweetalert2'
import defaultMascotaImage from '@/components/images/perfil_mascota.jpeg'

export default {
  name: 'PerfilMascota',
  components: {
    Navbar
  },
  data() {
    return {
      mascota: {},
      mascotaImagen: defaultMascotaImage,
      isEditMode: false // Agrega este estado para habilitar/deshabilitar la edición
    }
  },
  methods: {
    async obtenerPerfilMascota() {
      const mascotaId = this.$route.params.id
      try {
        const response = await axios.get(`http://127.0.0.1:5000/mascota/perfil/${mascotaId}`)
        this.mascota = response.data

        if (this.mascota.foto) {
          this.mascotaImagen = this.mascota.foto
        }
      } catch (error) {
        console.error('Error al obtener el perfil de la mascota:', error)
      }
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
    },
    calcularEdad(fechaNacimiento) {
      if (!fechaNacimiento) return 'Desconocida'

      const nacimiento = new Date(fechaNacimiento)
      const diferenciaMs = Date.now() - nacimiento.getTime()
      const edadDt = new Date(diferenciaMs)

      return Math.abs(edadDt.getUTCFullYear() - 1970)
    },
    async guardarCambios() {
      try {
        const mascotaId = this.mascota.id_mascota
        await axios.put(`http://127.0.0.1:5000/mascota/update/${mascotaId}`, this.mascota)

        this.isEditMode = false // Desactivar modo de edición tras guardar

        // Alerta de éxito con SweetAlert2
        Swal.fire({
          title: 'Cambios guardados',
          text: 'La información de la mascota ha sido actualizada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#9d8189'
        })
      } catch (error) {
        console.error('Error al actualizar la mascota:', error)

        // Alerta de error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al actualizar la mascota. Por favor, inténtalo nuevamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#db7f67'
        })
      }
    }
  },
  mounted() {
    this.obtenerPerfilMascota()
  }
}
</script>

<style scoped>
/* Estilos conservados */
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffcad4;
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.mascota-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 60px 50px 60px;
}

.mascota-img-container {
  flex-shrink: 0;
}

.mascota-img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 6px 10px -6px black;
}

h2 {
  color: #964b09;
  font-size: 2.8rem;
  margin: 16px 0px 10px 0px;
}

.flex-row-container {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
}

.mascota-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.mascota-info label {
  font-size: 1.4rem;
  font-weight: bold;
  color: #964b09;
}

.mascota-info .input-group {
  display: flex;
  flex-direction: column;
}

.mascota-info input,
.mascota-info textarea {
  width: 70%;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid #db7f67;
  font-size: 1.2rem;
  margin-top: 5px;
  color: #7a5169;
  background-color: #ffe5d9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #9d8189;
  box-shadow: 0 0 5px rgba(157, 129, 137, 0.8);
}

textarea {
  height: 80px;
}

.editar-btn {
  background-color: #ffe5d9;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 30px;
  right: 30px;
}

.editar-btn i {
  font-size: 24px;
  color: #9d8189;
}

.editar-btn:hover {
  background-color: #f4a4a4;
  color: white;
}

.footer {
  background-color: #9d8189;
  padding: 20px;
  text-align: center;
  color: white;
}

.footer-content {
  font-size: 14px;
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
</style>
