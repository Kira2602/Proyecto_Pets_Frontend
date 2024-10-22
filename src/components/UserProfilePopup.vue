<template>
  <div class="profile-popup">
    <div class="popup-wrapper">
      <div class="popup-content">
        <div class="color-bar"></div>
        <button class="close-btn" @click="closePopup">×</button>

        <!-- Imagen de perfil -->
        <div class="profile-image-container">
          <img
            src="@/components/images/profile_icon.png"
            alt="Profile Picture"
            class="profile-image"
          />
        </div>

        <h2>Mi Perfil</h2>
        <form>
          <div class="form-group">
            <label for="name">Nombre:</label>
            <div class="relative">
              <p class="static-data">{{ user.name }}</p>
              <i class="fa fa-user"></i>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Correo:</label>
            <div class="relative">
              <p class="static-data">{{ user.email }}</p>
              <i class="fa fa-envelope"></i>
            </div>
          </div>
          <div v-if="user.phone" class="form-group">
            <label for="phone">Teléfono:</label>
            <div class="relative">
              <p class="static-data">{{ user.phone }}</p>
              <i class="fa fa-phone"></i>
            </div>
          </div>
        </form>

        <div class="button-group">
          <button class="btn-edit" @click="editProfile">Editar perfil</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'UserProfilePopup',
  data() {
    return {
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890'
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit('close') // Emite un evento para cerrar el popup
    },
    editProfile() {
      this.$emit('edit-profile') // Emitir evento para abrir el popup de edición
    },


   
  











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
  padding: 20px;
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
  margin-bottom: 10px;
  margin-top: 10px;
}

.profile-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
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
</style>
