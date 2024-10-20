<template>
    <div class="profile-popup">
      <div class="popup-wrapper">
        <div class="popup-content">
          <div class="color-bar"></div>
          <button class="close-btn" @click="closePopup">×</button>
          <h2>Registrar a tu mascota!</h2>
          
          <div class="profile-image-container">
          <div ref="lottieContainer" class="lottie-animation"></div>
        </div>
  
          <!-- Primer paso-->
          <div v-if="step === 1">
            <form @submit.prevent="goToStep2">
              <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input class="static-data" type="text" id="nombre" v-model="petData.nombre" required />
              </div>
              <div class="form-group">
                <label for="birthdate">Fecha de nacimiento:</label>
                <input class="static-data" type="date" id="birthdate" v-model="petData.fecha_nacimiento" required />
              </div>
              <div class="form-group">
                <label for="especie">Especie:</label>
                <select class="static-data" id="especie" v-model="petData.especie_id_especie" required>
                  <option disabled value="">Selecciona una especie</option>
                  <option v-for="especie in especies" :key="especie.id_especie" :value="especie.id_especie">
                    {{ especie.especie }}
                  </option>
                </select>
              </div>
            <div class="form-group sexo-group">
              <div class="sexo-options">
                <label class="sexo-label">
                  <input type="radio" v-model="petData.sexo" value="Hembra" required />
                  Hembra
                </label>
                <label class="sexo-label">
                  <input type="radio" v-model="petData.sexo" value="Macho" required />
                  Macho
                </label>
              </div>
            </div>
              <div class="button-group">
              <button class="btn-edit" type="submit">Siguiente</button>
              </div>
            </form>
          </div>
  
          <!-- Segundo paso-->
          <div v-else-if="step === 2">
            <form @submit.prevent="submitRegistration">
              <div class="form-group">
                <label for="raza">Raza:</label>
                <input class="static-data" type="text" id="raza" v-model="petData.raza" required />
              </div>
              <div class="form-group">
                <label for="color">Color:</label>
                <input class="static-data" type="text" id="color" v-model="petData.color" required />
              </div>
              <div class="form-group">
                <label for="peso">Peso (kg):</label>
                <input class="static-data" type="number" id="peso" v-model="petData.peso" required />
              </div>
              <div class="form-group">
                <label for="descripcion">Información Adicional:</label>
                <textarea class="static-data" id="descripcion" v-model="petData.descripcion"></textarea>
              </div>
              <div class="button-group2">
                <button  class="btn-edit" @click="goBack">Atrás</button>
              <button class="btn-edit" type="submit">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import lottie from 'lottie-web';
  import axios from 'axios';
  



  export default {
    data() {
      return {
        step: 1,  
        
        petData: {
          nombre: '',
          fecha_nacimiento: '',
          sexo: '',
          raza: '',
          color: '',
          peso: '',
          descripcion: '',
          especie_id_especie: '',
          Usuario_id_usuario: '' 

        },
        especies: [] 
      };
      
    },
    methods: {
      goToStep2() {
        if (this.petData.nombre && this.petData.fecha_nacimiento) {
          this.step = 2;
        } else {
          alert('Por favor completa todos los campos.');
        }
      },
      goBack() {
        this.step = 1;
      },
      submitRegistration() {
  console.log("Datos enviados:", this.petData); 
  axios.post('http://127.0.0.1:5000/mascota/create', this.petData)
    .then(response => {
      console.log('Registro completado', response.data);
      this.closePopup();
      alert('Mascota registrada correctamente');
    })
    .catch(error => {
      if (error.response) {
        console.error('Error en el servidor:', error.response.data);
        alert(`Error al registrar la mascota: ${error.response.data.error || 'Datos incorrectos'}`);
      } else {
        console.error('Error al registrar la mascota:', error.message);
        alert('No se pudo conectar con el servidor.');
      }
    });
},


      closePopup() {
        this.$emit('close'); 
      },
      async fetchEspecies() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/especie/get')
        this.especies = response.data
        console.log('Especies obtenidas:', this.especies) 
      } catch (error) {
        console.error('Error al obtener las especies:', error)
      }
    }
    },
    mounted() {
      const usuarioId = localStorage.getItem('Usuario_id_usuario');
    if (usuarioId) {
      this.petData.Usuario_id_usuario = usuarioId; 
    } else {
      console.error('No se pudo obtener el ID del usuario. Debes iniciar sesión.');
      alert('Debes iniciar sesión para registrar una mascota.');
      this.closePopup();
    }
    this.fetchEspecies()
    // contenedor de lottiefile
    if (this.$refs.lottieContainer) {
      lottie.loadAnimation({
        container: this.$refs.lottieContainer,  
        renderer: 'svg',
        loop: true,  
        autoplay: true,  
        path: 'https://lottie.host/e60600b2-d9f9-4897-b833-b2421e006479/1GyuOFS2W5.json' 
      });
    } else {
      console.error("El contenedor de Lottie no se ha montado correctamente.");
    }
  }
};
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
    /* overflow: hidden; */
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

  .sexo-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.sexo-options {
  display: flex;
  justify-content: space-between;
  width: 60%;
}

.sexo-label {
  font-size: 16px;
  color: #af8a8a;
  margin: 0 10px;
  display: flex;
  align-items: center;
}

.sexo-label input {
  margin-right: 5px;
}

.lottie-animation {
  width: 250px;
  height: 250px;
  margin: 0 auto 10px;
}
  </style>
  