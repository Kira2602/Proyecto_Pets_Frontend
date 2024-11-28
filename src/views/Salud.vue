<template>
  <div>
    <header>
      <Navbar />
    </header>
    <section class="hero">
      <div class="hero-content">
        <h1>SALUD</h1>
        <p class="hero-description">
          Cuida de tus mascotas con nuestras herramientas para un seguimiento completo de su salud y
          bienestar.
        </p>
      </div>
      <div class="lottie-container1 hero-lottie">
        <div ref="lottieAnimation1" class="lottie-animation1"></div>
      </div>
    </section>
    <div class="button">
      <button class="hero-button" @click="openRegisterSaludPopup">Nuevo Registro</button>
    </div>

    <section>
      <ul class="shop-pets" id="funcionalidades">
        <li class="card-large card-light" id="sup-dog">
          <h2 class="card-title1">Exámenes Médicos</h2>
          <div class="lottie-container2">
            <div class="lottie-animation2" ref="lottieAnimation2"></div>
          </div>
          <p class="card-description1">
            Organiza y gestiona las citas médicas y los calendarios de vacunación de tus mascotas.
          </p>
        </li>
        <li class="card-large card-dark" id="sup-cat">
          <h2 class="card-title">Tratamientos</h2>
          <div class="lottie-container3">
            <div class="lottie-animation3" ref="lottieAnimation3"></div>
          </div>
          <p class="card-description">
            Planifica las actividades diarias de tu mascota, como paseos, tiempo de juego y horarios
            de alimentación.
          </p>
        </li>
        <li class="card-large card-dark" id="sup-bird">
          <h2 class="card-title1">Vacunas</h2>
          <div class="lottie-container4">
            <div class="lottie-animation4" ref="lottieAnimation4"></div>
          </div>
          <p class="card-description1">
            Lleva un registro completo de las actividades pasadas de tu mascota, incluyendo paseos,
            citas médicas y vacunaciones.
          </p>
        </li>
        <li class="card-large card-light" id="sup-fish">
          <h2 class="card-title">Cirugías</h2>
          <div class="lottie-container5">
            <div class="lottie-animation5" ref="lottieAnimation5"></div>
          </div>
          <p class="card-description">
            Recibe alertas y recordatorios automáticos sobre las próximas actividades, citas y
            tareas importantes de cuidado.
          </p>
        </li>
      </ul>
    </section>

    <div class="historial-actividades">
      <div class="contenedor-principal">
        <!-- Filtros -->
        <div class="filtros">
          <div class="filtro">
            <label>Buscar:</label>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por nombre de mascota u observación"
              class="custom-input"
            />
          </div>
          <div class="filtro">
            <label>Ver registro de:</label>
            <select v-model="selectedPet" class="custom-select">
              <option value="">Todas mis mascotas</option>
              <option v-for="mascota in mascotas" :key="mascota.id_mascota" :value="mascota.nombre">
                {{ mascota.nombre }}
              </option>
            </select>
          </div>
          <div class="filtro">
            <label>Agrupar por:</label>
            <select v-model="selectedCategory" class="custom-select">
              <option value="">Todas las categorías</option>
              <option v-for="categoria in categorias" :key="categoria">{{ categoria }}</option>
            </select>
          </div>
          <div class="filtro">
            <label>Filtrar por Mes:</label>
            <select v-model="selectedMonth" class="custom-select">
              <option value="">Todos los meses</option>
              <option v-for="(month, index) in months" :key="index" :value="index + 1">
                {{ month }}
              </option>
            </select>
          </div>
          <div class="filtro">
            <label>Filtrar por Año:</label>
            <input
              type="number"
              v-model="selectedYear"
              placeholder="2024"
              min="2000"
              class="custom-input"
            />
          </div>

          <!-- Animación de Lottie -->
          <div class="lottie-container">
            <div ref="lottieAnimation" class="lottie-animation"></div>
          </div>
        </div>

        <!-- Tabla de actividades -->
        <div class="tabla-actividades">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Mascota</th>
                <th>Fecha</th>
                <th>Observación</th>
                <th>Archivo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="actividad in paginatedActivities" :key="actividad.id_salud">
                <td>{{ actividad.id_salud }}</td>
                <td>{{ actividad.mascota }}</td>
                <td>{{ actividad.fecha }}</td>
                <td>{{ actividad.observacion }}</td>
                <td>
                  <a
                    v-if="actividad.archivo"
                    :href="`http://127.0.0.1:5000/uploads/${actividad.archivo}`"
                    :download="actividad.archivo"
                    class="link-descarga"
                  >
                    Descargar
                  </a>
                  <span v-else>No disponible</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Paginación fuera del contenedor principal -->
      <div class="pagination-container">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: currentPage === 1 }"
            @click="changePage(currentPage - 1)"
          >
            <a class="page-link page-prev">«</a>
          </li>
          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
            @click="changePage(page)"
          >
            <a class="page-link">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
            @click="changePage(currentPage + 1)"
          >
            <a class="page-link page-next">»</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Registrar Nuevo registro salud -->
    <RegisterSaludPopUp
      v-if="isRegisterSaludPopupVisible"
      @close="isRegisterSaludPopupVisible = false"
      @registroCreado="agregarRegistroLocal"
    />

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
import RegisterSaludPopUp from '@/components/RegisterSaludPopUp.vue'
import lottie from 'lottie-web'
import axios from 'axios'

export default {
  name: 'Salud',
  components: {
    Navbar,
    RegisterSaludPopUp
  },
  data() {
    return {
      isRegisterSaludPopupVisible: false,
      searchQuery: '',
      selectedPet: '',
      selectedMonth: '',
      months: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      selectedCategory: '',
      selectedYear: new Date().getFullYear(),
      filterDate: { dia: false, mes: false, año: true },
      mascotas: [],
      categorias: [],
      actividades: [],
      currentPage: 1,
      itemsPerPage: 9
    }
  },
  computed: {
    filteredActivities() {
      return this.actividades.filter((actividad) => {
        // Verifica que los campos necesarios existen
        if (!actividad.mascota || !actividad.fecha || !actividad.tipo) {
          console.warn('Actividad incompleta:', actividad)
          return false
        }

        const matchPet = this.selectedPet === '' || actividad.mascota === this.selectedPet
        const matchCategory =
          this.selectedCategory === '' || actividad.tipo === this.selectedCategory
        const matchYear =
          !this.selectedYear || actividad.fecha.startsWith(this.selectedYear.toString())

        const matchMonth =
          !this.selectedMonth ||
          new Date(actividad.fecha).getMonth() + 1 === parseInt(this.selectedMonth)

        // Nuevo: Filtrar por búsqueda en nombre de mascota y observación
        const matchSearch =
          this.searchQuery === '' ||
          actividad.mascota.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          actividad.observacion.toLowerCase().includes(this.searchQuery.toLowerCase())

        return matchPet && matchCategory && matchYear && matchMonth && matchSearch
      })
    },
    paginatedActivities() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return this.filteredActivities.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.filteredActivities.length / this.itemsPerPage)
    }
  },
  methods: {
    openRegisterSaludPopup() {
      this.isRegisterSaludPopupVisible = true
    },
    async agregarSalud() {
      await this.fetchRegistrosSalud()
    },
    agregarRegistroLocal(nuevoRegistro) {
      console.log('Registro agregado localmente:', nuevoRegistro)
      this.actividades.unshift(nuevoRegistro) // Añadir el nuevo registro al inicio
      this.isRegisterSaludPopupVisible = false // Cerrar el popup
    },
    async fetchRegistrosSalud() {
      try {
        const usuarioId = localStorage.getItem('Usuario_id_usuario')
        const response = await axios.get(
          `http://127.0.0.1:5000/salud/mis-registros?Usuario_id_usuario=${usuarioId}`
        )
        this.actividades = response.data
        console.log('Datos cargados:', this.actividades) // Verifica aquí los datos
      } catch (error) {
        console.error('Error al obtener los registros de salud:', error)
        alert('No se pudieron cargar los registros. Intenta nuevamente.')
      }
    },

    async fetchMascotas() {
      try {
        const usuarioId = localStorage.getItem('Usuario_id_usuario')
        const response = await axios.get(
          `http://127.0.0.1:5000/mascota/mis-mascotas?Usuario_id_usuario=${usuarioId}`
        )
        this.mascotas = response.data
      } catch (error) {
        console.error('Error al cargar mascotas:', error)
        alert('No se pudieron cargar las mascotas. Intenta nuevamente.')
      }
    },
    async fetchCategorias() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/salud/categorias')
        this.categorias = response.data.map((categoria) => categoria.tipo)
      } catch (error) {
        console.error('Error al cargar categorías:', error)
        alert('No se pudieron cargar las categorías. Intenta nuevamente.')
      }
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber
      }
    }
  },
  mounted() {
    this.fetchRegistrosSalud()
    this.fetchMascotas()
    this.fetchCategorias()

    // Cargar animación de Lottie
    this.lottieInstance = lottie.loadAnimation({
      container: this.$refs.lottieAnimation,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/bbe4a91e-9c31-4fdd-8301-caa3157bfbdc/cfJDnTQZVc.json'
    })
    // Configurar animaciones de Lottie para cada sección
    this.lottieAnimation1 = lottie.loadAnimation({
      container: this.$refs.lottieAnimation1,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/89082f36-9443-46e4-bfd9-0759694d6e2d/q1RhBWQJAa.json'
    })
    this.lottieAnimation2 = lottie.loadAnimation({
      container: this.$refs.lottieAnimation2,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/dfc23635-cf2b-4bce-b3ad-a8a329091692/5mQV5NWv2m.json'
    })
    this.lottieAnimation3 = lottie.loadAnimation({
      container: this.$refs.lottieAnimation3,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/eed66812-82f1-466a-b5ef-ea009d585226/SXSJTy9600.json'
    })
    this.lottieAnimation4 = lottie.loadAnimation({
      container: this.$refs.lottieAnimation4,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/f6832ea5-1246-4c89-8c19-71fcef31f871/CDfiYyZEVE.json'
    })
    this.lottieAnimation5 = lottie.loadAnimation({
      container: this.$refs.lottieAnimation5,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/80089dc0-3cca-42de-a87e-10300bdb17f2/Du8fp3tJaY.json'
    })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
}

.historial-actividades {
  background-color: #ffe5d9;
  padding: 20px;
  border-radius: 15px;
  max-width: 1200px;
  margin: 0 auto;
}
.contenedor-principal {
  display: flex;
}

h2 {
  color: #9d8189;
  text-align: center;
  margin-bottom: 20px;
}

.filtros {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #ffcad4;
  padding: 15px;
  border-radius: 10px;
  margin-right: 20px;
}

.fecha-opciones {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.filtro {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.filtro label {
  font-weight: bold;
  color: #af8a8a;
  margin-bottom: 5px;
}

.custom-select,
.custom-input {
  padding: 8px;
  border: 2px solid #d3a8a8;
  border-radius: 8px;
  background-color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  color: #4e3b47;
  transition: border-color 0.3s;
}
.custom-select:hover,
.custom-input:hover {
  border-color: #9d8189;
}

/* Estilo personalizado para los checkboxes */
.custom-checkbox {
  appearance: none;
  background-color: #ffe5e5;
  border: 2px solid #d3a8a8;
  border-radius: 4px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  position: relative;
  outline: none;
}

.custom-checkbox:checked {
  background-color: #f28b82;
  border-color: #f28b82;
}

.custom-checkbox:checked::before {
  content: '✓';
  color: white;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1px;
  left: 1px;
  width: 100%;
  height: 100%;
}

.lottie-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.lottie-animation {
  margin-top: -30px;
  margin-bottom: -70px;
  width: 300px;
  height: 300px;
}
.lottie-container1 {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.lottie-animation1 {
  width: 450px;
  height: 450px;
  margin-top: -80px;
  margin-bottom: -90px;
  margin-right: 100px;
}
.lottie-container2 {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.lottie-animation2 {
  width: 200px;
  height: 200px;
  margin-top: -20px;
  margin-bottom: -20px;
}
.lottie-containe3 {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.lottie-animation3 {
  width: 270px;
  height: 270px;
  margin-top: -20px;
  margin-bottom: -50px;
}
.lottie-container4 {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.lottie-animation4 {
  width: 250px;
  height: 250px;
  margin-top: -45px;
  margin-bottom: -50px;
}
.lottie-container5 {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.lottie-animation5 {
  width: 150px;
  height: 150px;
  margin-top: 0px;
  margin-bottom: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #d8e2dc;
}

th {
  background-color: #d8e2dc;
  color: #9d8189;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}

/* Footer */
.footer {
  background-color: #9d8189;
  padding: 40px 10px;
  text-align: center;
  color: white;
  margin-top: 40px;
}

.footer-content {
  font-size: 14px;
}

.hero-lottie {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
}
/* Estilos de la primera sección */
.hero {
  display: flex;
  align-items: center;
  background-color: #d8e2dc;
  padding: 40px;
  margin: 0 auto;
  border-radius: 15px;
  margin-left: 20px;
  margin-right: 20px;
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 100px;
}

.hero h1 {
  font-size: 4.5rem;
  color: #7a6652;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  margin: 0;
}

.hero-button {
  padding: 15px 40px;
  background-color: #d8e2dc;
  color: #9d8189;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  margin-left: 120px;
}

.hero-button:hover {
  background-color: #9d8189;
  color: #d8e2dc;
}

/* Ajustes para pantallas pequeñas */
@media only screen and (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 0px;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero h1 {
    font-size: 1.5rem;
  }

  .hero-button {
    font-size: 1rem;
    padding: 10px 30px;
  }
}
.card-large {
  flex: 1;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.card-large {
  box-shadow: var(--card-shadow);
  border-radius: 12px;
  overflow: hidden;
}

.card-large:hover {
  box-shadow: var(--card-hover);
  transform: scale(1.01);
}

.card-large > ul {
  display: flex;
  flex-direction: column;
  grid-gap: 8px;
  flex: 1;
  color: var(--text-01);
  padding: 0 20px 20px;
  font-size: 28px;
  font-weight: 600;
  line-height: 1;
}

.card-large > ul > li a {
  line-height: 32px;
  font-size: 14px;
}

.card-large#sup-dog,
.card-med#sup-dog > .card-image {
  background: #f4acb7;
}

.card-large#sup-cat,
.card-med#sup-cat > .card-image {
  background: #ffe5d9;
}

.card-large#sup-bird,
.card-med#sup-bird > .card-image {
  background: #9d8189;
}

.card-large#sup-fish,
.card-med#sup-fish > .card-image {
  background: #ffcad4;
}

button {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  padding: 12px 24px;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  grid-gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.shop-pets {
  display: flex;
  flex-direction: row;
  grid-gap: 24px;
  margin-bottom: 40px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  justify-content: space-around;
}

/* Ajustes para tablets y celulares */
@media only screen and (max-width: 1024px) {
  /* Para tablets */
  .shop-pets {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;
    padding: 20px;
  }

  .card-large {
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
  }

  .card-large ul {
    font-size: 1rem;
    padding: 20px;
  }
}

@media only screen and (max-width: 768px) {
  /* Para celulares */
  .shop-pets {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-gap: 16px;
    padding: 15px;
  }

  .card-large {
    width: 95%;
    max-width: 350px;
    margin: 0 auto;
  }

  .card-large img {
    width: 50%;
    height: auto;
  }

  .card-large ul {
    font-size: 0.9rem;
    padding: 15px;
  }
  .hero {
    flex-direction: column;
    text-align: center;
  }

  .hero-content,
  .hero-lottie {
    width: 100%;
  }
}

.hero-description {
  font-size: 1.2rem;
  color: #7a6652;
  margin-top: 10px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #9d8189;
  text-align: center;
  margin-bottom: 10px;
}
.card-title1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f0eaec;
  text-align: center;
  margin-bottom: 10px;
}

.card-description {
  font-size: 1rem;
  color: #9d8189;
  text-align: center;
  margin-top: 5px;
  line-height: 1.5;
  padding: 0 10px;
}

.card-description1 {
  font-size: 1rem;
  color: #f0eaec;
  text-align: center;
  margin-top: 5px;
  line-height: 1.5;
  padding: 0 10px;
}

.tabla-actividades {
  flex: 2;
  max-height: 700px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.47);
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin-left: 700px;
  width: fit-content;
}

.pagination {
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.page-item {
  margin: 0 5px;
  cursor: pointer;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.6;
}

.page-link {
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #263d42;
  text-align: center;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.page-link:hover {
  background-color: #8e6c88 !important;
  color: white !important;
}

.page-item.active .page-link {
  background-color: #8e6c88 !important;
  color: white !important;
  border: 1px solid #8e6c88 !important;
}

.page-prev,
.page-next {
  display: inline-block;
  padding: 8px 12px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #80ced7;
  text-align: center;
  cursor: pointer;
}

.page-prev:hover,
.page-next:hover {
  background-color: #8e6c88 !important;
  color: white !important;
}

.link-descarga {
  color: #6fd297;
  text-decoration: none;
}

.link-descarga:hover {
  color: #a0522d;
  text-decoration: underline;
}
</style>
