<template>
  <div class="profile-popup">
    <div class="popup-wrapper">
      <div class="popup-content">
        <div class="color-bar"></div>
        <button class="close-btn" @click="closePopup">×</button>
        <h2>Editar Perfil</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="user.name" />
          </div>

          <div class="form-group">
            <label for="email">Correo:</label>
            <input type="email" id="email" v-model="user.email" />
          </div>

          <div class="form-group">
            <label for="phone">Teléfono:</label>
            <input type="text" id="phone" v-model="user.phone" />
          </div>

          <div class="button-group">
            <button class="btn-save" type="submit">Guardar</button>
            <button class="btn-cancel" type="button" @click="closePopup">Cancelar</button>
          </div>
        </form>
        <div class="footer-image">
          <img src="@/components/images/paws_icon.png" alt="Cat paws" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProfilePopup',
  data() {
    return {
      user: {
        name: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit('close')
    },
    saveProfile() {
      console.log('Perfil guardado:', this.user)
      this.closePopup()
    }
  },
  mounted() {
    this.user.name = 'Nombre Ejemplo'
    this.user.email = 'correo@ejemplo.com'
    this.user.phone = '123-456-7890'
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
}

.popup-content {
  background: #fff7f7;
  padding: 0px 0px;
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
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
  margin-bottom: 20px;
  margin-top: 30px;
}

.form-group {
  align-items: center;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 80%;
  margin: 0px auto;
}

.form-group label {
  display: block;
  margin: 8px 0px 4px 0px;
  font-size: 14px;
  color: #af8a8a;
}

input {
  width: 90%;
  padding: 10px;
  border: 2px solid #d3a8a8;
  border-radius: 10px;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #af8a8a;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

button.btn-save {
  background-color: #f3cdc0;
  color: #fff;
}

button.btn-save:hover {
  background-color: #d2a5a5;
}

button.btn-cancel {
  background-color: #c5d9c9;
  color: #fff;
}

button.btn-cancel:hover {
  background-color: #a9c2a8;
}

.footer-image {
  text-align: center;
  margin-top: 20px;
}

.footer-image img {
  width: 100%;
  max-width: 450px;
}
</style>
