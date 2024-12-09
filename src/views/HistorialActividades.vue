<template>
  <div>
    <header>
      <Navbar />
    </header>

    <div class="historial-actividades">
      <h2>HISTORIAL DE ACTIVIDADES</h2>

      <!-- Filtros -->
      <div class="filtros">
        <div class="filtro">
          <label>Ver registro de:</label>
          <select v-model="selectedPet" class="custom-select">
            <option value="">Todas mis mascotas</option>
            <option v-for="mascota in mascotas" :key="mascota.id" :value="mascota.nombre">
              {{ mascota.nombre }}
            </option>
          </select>
        </div>

        <div class="filtro fecha">
          <label>Fecha:</label>
          <input type="checkbox" v-model="filterDate.dia" class="custom-checkbox" /> Día
          <input type="checkbox" v-model="filterDate.mes" class="custom-checkbox" /> Mes
          <input type="checkbox" v-model="filterDate.año" class="custom-checkbox" /> Año
          <input
            type="number"
            v-if="filterDate.año"
            v-model="selectedYear"
            placeholder="2024"
            min="2000"
            class="custom-input"
          />


           <!-- Mes -->
    <input
    type="number"
      v-if="filterDate.mes"
      v-model="selectedMonth"
      placeholder="Mes"
      min="1"
      max="12"
      class="custom-input"
    />

    <p v-if="monthError" class="error-message">El número máximo para mes es 12.</p>


    <!-- Día -->
    <input
    type="number"
      v-if="filterDate.dia"
      v-model="selectedDay"
      placeholder="Día"
      min="1"
      max="31"
      class="custom-input"
    />
    <p v-if="dayError" class="error-message">El número máximo para día es 31.</p>
    
        </div>

        <div class="filtro">
          <label>Agrupar por:</label>
          <select v-model="selectedCategory" class="custom-select">
            <option value="">Todas las categorías</option>
            <option v-for="categoria in categorias" :key="categoria">{{ categoria }}</option>
          </select>
        </div>

        <div class="filtro">
          <label>Agrupar por:</label>
          <select v-model="selectedStatus" class="custom-select">
            <option value="">Todos los estados</option>
            <option v-for="estado in estados" :key="estado">{{ estado }}</option>
          </select>
        </div>
      </div>

      <!-- Animación de Lottie -->
      <div class="lottie-container">
        <div ref="lottieAnimation" class="lottie-animation"></div>
      </div>

      <!-- Tabla de actividades -->
      <div class="tabla-actividades">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Mascota</th>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="actividad in filteredActivities" :key="actividad.id">
              <td>{{ actividad.id }}</td>
              <td>{{ actividad.mascota }}</td>
              <td>{{ actividad.fecha }}</td>
              <td>{{ actividad.categoria }}</td>
              <td>{{ actividad.estado }}</td>
              <td>{{ actividad.descripcion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
import lottie from 'lottie-web'


import axios from 'axios'


export default {
  name: 'HistorialActividades',
  components: {
    Navbar
  },
  data() {
    return {
      selectedPet: '',
      selectedCategory: '',
      selectedStatus: '',
      selectedYear: new Date().getFullYear(),
      selectedMonth: '',
    selectedDay: '',

      filterDate: { dia: false, mes: false, año: false},
      mascotas: [
       // { id: 1, nombre: 'Coco' },
        //{ id: 2, nombre: 'Lulu' }
      ],
      categorias: ['Vacunas', 'Paseo', 'Comida', 'Otra actividad'],
      estados: ['Completado', 'Pendiente', 'Cancelado'],
      actividades: [
        /*
        {
          id: 1,
          mascota: 'Coco',
          fecha: '26/06/2024',
          categoria: 'Vacunas',
          estado: 'Completado',
          descripcion: 'octavalente.pdf'
        },
        {
          id: 2,
          mascota: 'Lulu',
          fecha: '22/09/2024',
          categoria: 'Paseo',
          estado: 'Completado',
          descripcion: 'parque'
        }/*/ 
      ]
    }
  },
  computed: {

    monthError() {
      return  this.selectedMonth > 12;
    },
    dayError() {
      return  this.selectedDay > 31;
    },
    filteredActivities() {

      return this.actividades.filter((actividad) => {
        const matchPet = this.selectedPet === '' || actividad.mascota === this.selectedPet
        const matchCategory =
          this.selectedCategory === '' || actividad.categoria === this.selectedCategory
        const matchStatus = this.selectedStatus === '' || actividad.estado === this.selectedStatus
        const matchYear = !this.filterDate.año || actividad.fecha.includes(this.selectedYear)
        const matchMonth = !this.filterDate.mes || actividad.fecha.slice(3, 5) === String(this.selectedMonth).padStart(2, '0')
      
      // Verifica si el día coincide (filtra por día)
      const matchDay = !this.filterDate.dia || actividad.fecha.slice(0, 2) === String(this.selectedDay).padStart(2, '0')

        

      

       // return matchPet && matchCategory && matchStatus && matchYear
      
       return matchPet && matchCategory && matchStatus && matchYear && matchMonth && matchDay;
 
      })

      
    }
  },




methods: {
    formatearFecha(fechaISO) {
      const fecha = new Date(fechaISO)
      const dia = String(fecha.getDate()).padStart(2, '0')
      const mes = String(fecha.getMonth() + 1).padStart(2, '0')
      const año = fecha.getFullYear()
      return `${dia}/${mes}/${año}`
    },
    transformarDatos(datosBackend) {
      return datosBackend.map((actividad) => ({
        id: actividad.id_actividad,
        mascota: actividad.mascota,
        fecha: this.formatearFecha(actividad.fecha_hora), // Convierte la fecha
        categoria: actividad.tipo_actividad, // Renombrado de "tipo_actividad"
        estado: 'Completado', // Valor fijo (puedes cambiarlo si hay más datos de estado)
        descripcion: actividad.descripcion // Renombrado directamente
      }))
    },
    async cargarActividades() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/actividad/lista')
        this.actividades = this.transformarDatos(response.data)

        

         const nombresMascotas = [...new Set(response.data.map((actividad) => actividad.mascota))];
    this.mascotas = nombresMascotas.map((nombre, index) => ({
      id: index + 1, // Generar un ID temporal
      nombre,
    }));
      } catch (error) {
        console.error('Error al cargar actividades:', error)
      }
    }
  },





///************************** */



  mounted() {
    // Cargar animación de Lottie
    this.lottieInstance = lottie.loadAnimation({
      container: this.$refs.lottieAnimation,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/7c60a5bf-6152-43db-9d80-3bed207422ad/gSKGD7G5V4.json'
    })

    //**
    this.cargarActividades()
    //*/
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.historial-actividades {
  font-family: 'Poppins', sans-serif;
  background-color: #ffe5d9;
  padding: 20px;
  border-radius: 15px;
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  color: #9d8189;
  text-align: center;
  margin-bottom: 20px;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  background-color: #ffcad4;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.filtro {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filtro label {
  font-weight: bold;
  color: #af8a8a;
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
  width: 160px;
  height: 160px;
}

.tabla-actividades {
  overflow-x: auto;
  border-radius: 10px;
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
</style>
