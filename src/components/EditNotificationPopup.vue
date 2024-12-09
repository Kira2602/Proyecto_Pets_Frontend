<template>
    <div class="notification-edit-popup">
      <div class="popup-wrapper">
        <button class="close-btn" @click="closePopup">×</button>
  
        <h2>Editar Notificación</h2>
  
        <div class="popup-content">
          <!-- Campo para mensaje -->
          <div class="form-group">
            <label>Mensaje:</label>
            <input
              type="text"
              v-model="notificacion.mensaje"
              class="styled-input"
              placeholder="Ej. Revisar estado de la mascota"
            />
          </div>
  
          <!-- Campo para estado -->
          <div class="form-group">
            <label>Estado:</label>
            <select v-model="notificacion.estado" class="styled-select">
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
  
          <!-- Campo para fecha de inicio -->
          <div class="form-group">
            <label>Fecha de inicio:</label>
            <input
              type="datetime-local"
              v-model="notificacion.fecha_inicio"
              class="styled-input"
            />
          </div>
  
          <!-- Campo para fecha de fin -->
          <div class="form-group">
            <label>Fecha de fin:</label>
            <input
              type="datetime-local"
              v-model="notificacion.fecha_fin"
              class="styled-input"
            />
          </div>
  
          <!-- Campo para frecuencia -->
          <div class="form-group">
            <label>Frecuencia (repetir cada):</label>
            <input
              type="number"
              v-model="notificacion.frecuencia"
              class="styled-input"
              min="1"
              placeholder="Intervalo en días, semanas, etc."
            />
          </div>
  
          <div class="form-group">
            <label>Unidad de frecuencia:</label>
            <select v-model="notificacion.unidad" class="styled-select">
              <option value="minutos">Minutos</option>
              <option value="horas">Horas</option>
              <option value="días">Días</option>
              <option value="semanas">Semanas</option>
              <option value="meses">Meses</option>
            </select>
          </div>
        </div>
  
        <!-- Botones de acción -->
        <div class="action-buttons">
          <button class="save-btn" @click="saveChanges">Guardar</button>
          <button class="cancel-btn" @click="closePopup">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      notificacion: {
        type: Object,
        required: true, // Recibe la notificación como prop
      },
    },
    methods: {
      saveChanges() {
        this.$emit("save", this.notificacion); // Emitir el evento con la notificación actualizada
      },
      closePopup() {
        this.$emit("close"); // Cerrar el popup
      },
    },
  };
  </script>
  
  <style scoped>
  .notification-edit-popup {
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
    color: #000;
  }
  
  h2 {
    color: #9d8189;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .form-group label {
    font-size: 14px;
    color: #9d8189;
    display: block;
    margin-bottom: 5px;
  }
  
  .styled-input,
  .styled-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #d3a8a8;
    border-radius: 8px;
    font-size: 14px;
    color: #4e3b47;
    background-color: #fff;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .styled-input:hover,
  .styled-select:hover {
    border-color: #9d8189;
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .save-btn {
    background: #9d8189;
    color: #fff;
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .save-btn:hover {
    background-color: #7d6567;
  }
  
  .cancel-btn {
    background: #d8e2dc;
    color: #9d8189;
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cancel-btn:hover {
    background-color: #af8a8a;
    color: #fff;
  }
  </style>
  