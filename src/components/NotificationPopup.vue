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
          <div class="summary-row">
            <label>Cada:</label>
            <input
              type="number"
              v-model="notification.interval"
              :class="{ 'error-border': errors.interval }"
              min="1"
              class="styled-input"
            />
            <select v-model="notification.unit" class="styled-select">
              <option value="hours">Horas</option>
              <option value="days">Días</option>
            </select>
            <span v-if="errors.interval" class="error-message">{{ errors.interval }}</span>
          </div>

          <div class="summary-row">
            <label>Fecha y hora de inicio:</label>
            <input
              type="datetime-local"
              v-model="notification.startDateTime"
              :class="{ 'error-border': errors.startDateTime }"
              class="styled-input"
            />
            <span v-if="errors.startDateTime" class="error-message">{{
              errors.startDateTime
            }}</span>
          </div>

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
        </div>
        <button class="continue-btn" @click="validateStep1">Continuar</button>
      </div>

      <div class="popup-content" v-if="step === 2">
        <!-- Fase 2: Configuración de Recordatorio -->
        <h2>Recordarme</h2>
        <div ref="lottieCatIcon2" class="icon lottie-animation"></div>

        <div class="radio-group">
          <label><input type="radio" v-model="reminder.type" value="onTime" /> En la hora</label>
          <label><input type="radio" v-model="reminder.type" value="before" /> Antes de</label>
        </div>

        <div class="config-container">
          <div class="summary-row">
            <label>Un:</label>
            <input
              type="number"
              v-model="reminder.amount"
              :class="{ 'error-border': errors.amount }"
              min="1"
              class="styled-input"
            />
            <select v-model="reminder.unit" class="styled-select">
              <option value="hour">Hora</option>
              <option value="day">Día</option>
            </select>
            <span v-if="errors.amount" class="error-message">{{ errors.amount }}</span>
          </div>

          <div class="summary-row">
            <label>Hora:</label>
            <input
              type="time"
              v-model="reminder.time"
              :class="{ 'error-border': errors.time }"
              class="styled-input"
            />
            <span v-if="errors.time" class="error-message">{{ errors.time }}</span>
          </div>
        </div>
        <button class="continue-btn" @click="validateStep2">Continuar</button>
      </div>

      <div class="popup-content" v-if="step === 3">
        <!-- Fase 3: Resumen -->
        <h2>Resumen</h2>
        <div class="summary-container">
          <div class="summary-row">
            <label>Cita médica para:</label>
            <input type="text" v-model="notification.type" class="styled-input" disabled />
          </div>

          <div class="summary-row">
            <label>Tu cita médica:</label>
            <input type="text" v-model="notification.description" class="styled-input" />
          </div>

          <div class="summary-row">
            <label>Recordar:</label>
            <input type="text" :value="notification.startDateTime" class="styled-input" disabled />
          </div>

          <div class="summary-row">
            <label>Se repetirá cada:</label>
            <input
              type="text"
              :value="`cada ${notification.interval} ${notification.unit}`"
              class="styled-input"
              disabled
            />
          </div>

          <div class="summary-row">
            <label>Se recuerda:</label>
            <input
              type="text"
              :value="`${reminder.amount} ${reminder.unit} antes`"
              class="styled-input"
              disabled
            />
          </div>

          <div class="summary-row">
            <label>Hora del recordatorio:</label>
            <input type="time" v-model="reminder.time" class="styled-input" disabled />
          </div>
        </div>
        <button class="save-btn" @click="saveNotification">Guardar</button>
      </div>
    </div>
  </div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  data() {
    return {
      step: 1,
      notification: {
        type: 'once',
        interval: 1,
        unit: 'hours',
        startDateTime: '',
        endDateTime: '',
        description: 'Llevar a revisar su patita'
      },
      reminder: {
        type: 'onTime',
        amount: 1,
        unit: 'day',
        time: '12:00'
      },
      errors: {
        interval: '',
        startDateTime: '',
        endDateTime: '',
        amount: '',
        time: ''
      }
    }
  },
  mounted() {
    this.loadLottieAnimation(
      this.$refs.lottieCatIcon1,
      'https://lottie.host/ef30f82a-2bfb-4486-8455-de47a22a7083/1BJHTUXIld.json'
    )
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    validateStep1() {
      this.errors = { interval: '', startDateTime: '', endDateTime: '' }

      if (!this.notification.interval) {
        this.errors.interval = 'Este campo es obligatorio'
      }
      if (!this.notification.startDateTime) {
        this.errors.startDateTime = 'Este campo es obligatorio'
      }
      if (!this.notification.endDateTime) {
        this.errors.endDateTime = 'Este campo es obligatorio'
      }

      if (!this.errors.interval && !this.errors.startDateTime && !this.errors.endDateTime) {
        this.step++
        setTimeout(() => {
          this.loadLottieAnimation(
            this.$refs.lottieCatIcon2,
            'https://lottie.host/83c0af8f-8bdf-4dcb-8d7b-86c9a655e316/KhQBfssaOD.json'
          )
        }, 100)
      }
    },
    validateStep2() {
      this.errors = { amount: '', time: '' }

      if (!this.reminder.amount) {
        this.errors.amount = 'Este campo es obligatorio'
      }
      if (!this.reminder.time) {
        this.errors.time = 'Este campo es obligatorio'
      }

      if (!this.errors.amount && !this.errors.time) {
        this.step++
      }
    },
    saveNotification() {
      const notificationData = { ...this.notification, ...this.reminder }
      this.$emit('saveNotification', notificationData)
      this.closePopup()
    },
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
