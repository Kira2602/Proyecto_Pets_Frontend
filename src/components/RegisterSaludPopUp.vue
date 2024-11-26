<template>
    <div class="profile-popup">
      <div class="popup-wrapper">
        <div class="popup-content">
          <div class="color-bar"></div>
          <button class="close-btn" @click="closePopup">×</button>
          <h2>Crea un nuevo registro </h2>
          <!-- Primer paso-->
          <div v-if="step === 1">
        <form @submit.prevent="goToStep2">
          <div class="form-group centered-form">
            <label for="mascota">Elige una mascota:</label>
            <select class="static-data small-select" id="mascota">
              <option value=""></option>
              <option>Lulu</option>
            </select>
          </div>
          <div class="form-group centered-form">
            <label for="categoria">Elige una categoría:</label>
            <select class="static-data small-select" id="categoria">
              <option value=""></option>
              <option>Vacunas</option>
            </select>
          </div>

          <div class="bottom-controls">
            <div ref="lottieContainer" class="lottie-animation"></div>
            <button class="btn-edit" type="submit">Siguiente</button>
          </div>
        </form>
      </div>
  
          <!-- Segundo paso-->
          <div v-else-if="step === 2">
  <form @submit.prevent="submitRegistration">
    <div class="form-group">
      <label for="descripcion">Descripción:</label>
      <input class="static-data" type="text" id="descripcion" v-model="petData.raza" required />
    </div>

    <!-- Campo de fecha -->
    <div class="form-group">
      <label for="fecha">Fecha:</label>
      <input class="static-data" type="date" id="fecha" v-model="petData.fecha" required />
    </div>

    <!-- Campo de archivo -->
    <div class="form-group">
      <label for="archivo">Subir archivo (opcional)</label>
      <input
        type="file"
        id="archivo"
        class="static-data"
        accept=".png, .jpg, .pdf"
        @change="handleFileUpload"
      />
      <small>Sólo se permiten archivos .png, .jpg, o .pdf</small>
    </div>

    <div class="button-group2">
      <button class="btn-edit" @click="goBack">Atrás</button>
      <button class="btn-edit" type="submit">Registrar</button>
    </div>
  </form>
</div>

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import lottie from 'lottie-web'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  
  export default {
    data() {
      return {
        step: 1,
        petData: {
         
        },
        especies: [],
        errors: {
         
        }
      }
    },
    methods: {
  // Métodos existentes
        handleFileUpload(event) {
          const file = event.target.files[0];
          if (file) {
            this.petData.archivo = file; // Almacena el archivo en el modelo de datos
          }
      },
      goToStep2() {
          this.step = 2 
      },
      goBack() {
    this.step = 1;
    this.$nextTick(() => {
      this.initializeLottie(); // Asegura que se reinicie después de renderizar el DOM
    });
  },
      initializeLottie() {
    if (this.$refs.lottieContainer) {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/19efdac4-1329-48dc-a189-856c1b72a4f2/ckhr9qwiGy.json'
      });
    } else {
      console.error('El contenedor de Lottie no se ha montado correctamente.');
    }
      },
      
      closePopup() {
        this.$emit('close')
      },
      
    },
    mounted() {
      this.initializeLottie(); // Inicializa Lottie al montar el componente

      const usuarioId = localStorage.getItem('Usuario_id_usuario')
      if (usuarioId) {
        this.petData.Usuario_id_usuario = usuarioId
      } else {
        console.error('No se pudo obtener el ID del usuario. Debes iniciar sesión.')
        Swal.fire({
          icon: 'warning',
          title: 'Debes iniciar sesión',
          text: 'Debes iniciar sesión para registrar una mascota.',
          confirmButtonColor: '#9d8189'
        });
        this.closePopup()
      }
    }
  }
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
  
  * {
    font-family: 'Poppins', sans-serif;
  }
  
  .profile-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .popup-wrapper {
    position: relative;
    width: 500px;
    max-height: 90vh;
  }
  
  .popup-content {
    background: #fff7f7;
    padding: 20px;
    border-radius: 20px;
    width: 100%;
    max-height: 90vh;
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow-y: auto;
  }
  
  /* Estilos del scrollbar */
  .popup-content::-webkit-scrollbar {
    width: 12px;
  }
  
  .popup-content::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 10px;
  }
  
  .popup-content::-webkit-scrollbar-thumb {
    background-color: #d3a8a8;
    border-radius: 10px;
    border: 2px solid #f0f0f0;
  }
  
  .color-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: #d3a8a8;
    border-radius: 5px 5px 0 0;
  }
  
  .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 30px;
    cursor: pointer;
  }
  
  h2 {
    color: #af8a8a;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  
  .profile-image-container {
    display: flex;
    justify-content: center;
    margin-bottom: -40px;
    margin-top: -40px;
  }
  
  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #d3a8a8;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0px auto 20px;
  }
  
  .form-group label {
    font-size: 14px;
    color: #af8a8a;
    margin-bottom: 5px;
  }
  
  .relative {
    position: relative;
  }
  
  .relative i {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #444;
  }
  
  .static-data {
    
    font-size: 16px;
    padding: 10px;
    border: 2px solid #d3a8a8;
    border-radius: 10px;
    background-color: #f0f0f0;
    width: 100%;
    box-sizing: border-box;
  }
  
  .error-border {
    border-color: red;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .button-group2 {
    display: flex;
    justify-content: space-between;
  }
  
  button.btn-edit {
    background-color: #d8e2dc;
    color: #9d8189;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button.btn-edit:hover {
    background-color: #d2a5a5;
    color: #fff;
  }
  
  
  .form-group.centered-form {
  width: 60%;
  text-align: center;
  margin: 10px auto;
}
.small-select {
  width: 80%;
  margin: 0 auto;
}

.bottom-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 50px;
  margin-right: 70px;

}

.lottie-animation {
  width: 280px;
  height: 280px;
  margin-left: -90px;
  margin-right: 30px;
  margin-top:-40px;

}
  </style>
  