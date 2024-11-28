<template>
  <div class="notification-popup">
    <div class="popup-wrapper">
      <button class="close-btn" @click="closePopup">×</button>

      <div class="popup-content" v-if="step === 1">
        <!-- Fase 1: Programar Notificación -->
        <h2>Programar notificación</h2>
        <div ref="lottieCatIcon1" class="icon lottie-animation"></div>

        <div class="radio-group">
          <label><input type="radio" v-model="notification.type" value="once" /> Una vez</label>
          <label><input type="radio" v-model="notification.type" value="repeat" /> Repetir</label>
        </div>

        <div class="config-container">
        <!-- Campo siempre visible para la descripción -->
        <div class="summary-row">
          <label>Descripción de la notificación:</label>
          <input
            type="text"
            v-model="notification.mensaje"
            :class="{ 'error-border': errors.mensaje }"
            class="styled-input"
            placeholder="Ej. Revisar estado de la mascota"
          />
          <span v-if="errors.mensaje" class="error-message">{{ errors.description }}</span>
        </div>

        <div class="summary-row">
          <label>Fecha y hora de inicio:</label>
          <input
            type="datetime-local"
            v-model="notification.startDateTime"
            :class="{ 'error-border': errors.startDateTime }"
            class="styled-input"
          />
          <span v-if="errors.startDateTime" class="error-message">{{ errors.startDateTime }}</span>
        </div>

        <!-- Mostrar solo si es "repetir" -->
        <template v-if="notification.type === 'repeat'">
         
          <div class="summary-row">
            <label>Fecha y hora de finalización:</label>
            <input
              type="datetime-local"
              v-model="notification.endDateTime"
              :class="{ 'error-border': errors.endDateTime }"
              class="styled-input"
            />
            <span v-if="errors.endDateTime" class="error-message">{{ errors.endDateTime }}</span>
          </div>

          <div class="summary-row">
            <label>Cada:</label>
            <input
              type="number"
              v-model="notification.interval"
              :class="{ 'error-border': errors.interval }"
              :max="getMaxInterval(notification.unit)"
              min="1"
              class="styled-input"
            />
            <select v-model="notification.unit" class="styled-select">
              <option v-for="unit in maxIntervalInUnits" :key="unit" :value="unit">
                {{ unit }}
              </option>
            </select>

            <span v-if="errors.interval" class="error-message">{{ errors.interval }}</span>
          </div>

        </template>        
      </div>

        <button class="continue-btn" 
        @click="validateStep1"
        >
        Continuar</button>
      </div>

      <div class="popup-content" v-if="step === 3">
      <!-- Fase 3: Resumen -->
      <h2>Resumen</h2>
      <div class="summary-container">
        <!-- Campos comunes -->
        <div >
    </div>
        <div class="summary-row">
          <label>mensaje de la notificacion:</label>
          <input type="text" v-model="notification.mensaje" class="styled-input" disabled />
        </div>

        <div class="summary-row">
          <label>Fecha y hora de inicio:</label>
          <input type="text" :value="notification.startDateTime" class="styled-input" disabled />
        </div>

        <!-- Mostrar campos específicos si es "Repetir" -->
        <template v-if="notification.type === 'repeat'">
          <div class="summary-row">
            <label>Se repetirá cada:</label>
            <input
              type="text"
              :value="`Cada ${notification.interval} ${notification.unit}`"
              class="styled-input"
              disabled
            />
          </div>
          <div class="summary-row">
            <label>Fecha y hora de finalización:</label>
            <input type="text" :value="notification.endDateTime" class="styled-input" disabled />
          </div>
        </template>
      </div>
      <button class="save-btn" @click="saveNotification">Guardar</button>
    </div>

    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import axios from 'axios'; // Asegúrate de importar axios
import Swal from 'sweetalert2';

export default {
  props: {
    mascotaId: {
      type: Number,
      required: true, // El id_mascota debe ser obligatorio
    },
    actividadId: {
    type: Number,
    required: true // ID de la actividad seleccionada
  }
  },
  data() {
    return {
      step: 1,
      notification: {
        type: "once", // "once" o "repeat"
        mensaje: "",
        interval: null,
        unit: null,
        startDateTime: "",
        endDateTime: null, // solo si es repeat
      },
     
      errors: {
        mensaje: "",
        interval: "",
        startDateTime: "",
        endDateTime: "",
        amount: "",
        time: "",
      },
    };
  },

  mounted() {
    this.loadLottieAnimation(
      this.$refs.lottieCatIcon1,
      'https://lottie.host/ef30f82a-2bfb-4486-8455-de47a22a7083/1BJHTUXIld.json'
    )
  },


  computed: {
  maxIntervalInUnits() {
    if (!this.notification.startDateTime || !this.notification.endDateTime) {
      return []; // Si no hay fechas, no hay opciones
    }

    const start = new Date(this.notification.startDateTime);
    const end = new Date(this.notification.endDateTime);
    const maxInterval = this.calculateMaxInterval(start, end);

    // Devuelve las opciones disponibles según el intervalo máximo
    const units = ["minutos", "horas", "días", "semanas", "meses"];
    const unitMapping = { minutos: 1, horas: 60, días: 1440, semanas: 10080, meses: 43200 };
    return units.filter((unit) => {
      const unitInMinutes = unitMapping[unit];
      return unitInMinutes <= maxInterval.value * unitMapping[maxInterval.unit];
    });
  },
},

  methods: {


    getMaxInterval(unit) {
      const maxValues = {
        minutos: 59,
        horas: 23,
        días: 28,
        meses: 11,
      };
      return maxValues[unit] || Infinity; // Devuelve infinito si la unidad no está definida
    },
    calculateMaxInterval(start, end) {
      const diffInMilliseconds = end - start;
      const diffInMinutes = diffInMilliseconds / (1000 * 60);
      const diffInHours = diffInMinutes / 60;
      const diffInDays = diffInHours / 24;
      const diffInWeeks = diffInDays / 7;
      const diffInMonths = diffInDays / 30;

      if (diffInMonths >= 1) {
        return { value: Math.floor(diffInMonths), unit: "meses" };
      } else if (diffInWeeks >= 1) {
        return { value: Math.floor(diffInWeeks), unit: "semanas" };
      } else if (diffInDays >= 1) {
        return { value: Math.floor(diffInDays), unit: "días" };
      } else if (diffInHours >= 1) {
        return { value: Math.floor(diffInHours), unit: "horas" };
      } else {
        return { value: Math.floor(diffInMinutes), unit: "minutos" };
      }
    },
    closePopup() {
      this.$emit('close')
    },
    validateStep1() {
      this.errors = { mensaje: "", startDateTime: "", interval: "", endDateTime: "" };

      const now = new Date();
      const start = new Date(this.notification.startDateTime);
      const end = new Date(this.notification.endDateTime);

      if (!this.notification.mensaje) {
        this.errors.mensaje = "El mensaje es obligatorio.";
      }
      if (!this.notification.startDateTime) {
        this.errors.startDateTime = "La fecha de inicio es obligatoria.";
      } else if (start < now) {
        this.errors.startDateTime = "La fecha de inicio no puede ser anterior a la fecha actual.";
      }

      if (this.notification.type === "repeat") {
        if (!this.notification.endDateTime) {
          this.errors.endDateTime = "La fecha de finalización es obligatoria.";
        } else if (end <= start) {
          this.errors.endDateTime = "La fecha de finalización debe ser posterior a la fecha de inicio.";
        }

        const maxInterval = this.calculateMaxInterval(start, end);
        if (!this.notification.interval || this.notification.interval <= 0) {
          this.errors.interval = "El intervalo debe ser mayor a 0.";
        } else if (!this.validateInterval(this.notification.interval, this.notification.unit, maxInterval)) {
          this.errors.interval = `El intervalo máximo permitido es ${maxInterval.value} ${maxInterval.unit}.`;
        }
      }

      if (!Object.values(this.errors).some((error) => error)) {
        this.step = 3;
      }
    },
    validateInterval(value, unit, maxInterval) {
      const unitMapping = { minutos: 1, horas: 60, días: 1440, semanas: 10080, meses: 43200 };
      const intervalInMinutes = value * unitMapping[unit];
      const maxIntervalInMinutes = maxInterval.value * unitMapping[maxInterval.unit];
      return intervalInMinutes <= maxIntervalInMinutes;
    },
   async saveNotification() {
  const data = {
    mensaje: this.notification.mensaje,
    fecha_inicio: this.notification.startDateTime,
    fecha_fin: this.notification.type === "repeat" ? this.notification.endDateTime : null,
    intervalo: this.notification.type === "repeat" ? this.notification.interval : null,
    unidad_intervalo: this.notification.type === "repeat" ? this.notification.unit : null,
    Actividad_id_actividad: this.actividadId,
    Usuario_id_usuario: localStorage.getItem("Usuario_id_usuario"),
    type: this.notification.type // Asegúrate de incluir este campo
  };

  try {
    const response = await axios.post("http://127.0.0.1:5000/notificacion/postNotificacion", data);
    if (response.status === 201) {
      Swal.fire({
            icon: "success",
            title: "Notificacion Registrada",
            text: "tu notificacion ha sido registrada correctamente.",
            confirmButtonColor: "#9d8189"
          });
          this.closePopup();
    }
  } catch (error) {
    console.error("Error al registrar la notificación:", error);
    alert("Error al registrar la notificación. Por favor, intenta de nuevo.");
  }
}
,

    loadLottieAnimation(container, path) {
      lottie.destroy()
      lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: path
      })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.notification-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
}

.popup-wrapper {
  position: relative;
  width: 400px;
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #000000;
}

h2 {
  color: #af8a8a;
  font-size: 24px;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.lottie-animation {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
}

.radio-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

.radio-group label {
  font-size: 14px;
  color: #9d8189;
  font-family: 'Poppins', sans-serif;
}

.radio-group input[type='radio'] {
  accent-color: #d8a8a8;
}

.config-container,
.summary-container {
  background: #ffe5d9;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-row label {
  font-size: 14px;
  color: #9d8189;
  width: 50%;
  text-align: left;
}

.styled-input,
.styled-select {
  width: calc(50% - 5px);
  padding: 8px;
  border: 1px solid #d3a8a8;
  border-radius: 8px;
  font-size: 14px;
  color: #9d8189;
  background-color: #ffe5e5;
  outline: none;
  transition: border-color 0.3s ease;
}

.error-border {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 4px;
}

.continue-btn,
.save-btn {
  background: #d8e2dc;
  color: #9d8189;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
  font-family: 'Poppins', sans-serif;
  border: none;
}

.continue-btn:hover,
.save-btn:hover {
  background-color: #d2a5a5;
  color: #fff;
}
</style>
