<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity="0.3"
      max-width="390"
    >
      <v-card>
        <v-card-title class="text-h6">
        Verify yourself to 🔓 <strong>Unlock</strong>
        </v-card-title>
        <v-card-text>
            <v-text-field color="green darken-1" v-model="user.login" label="Login"></v-text-field>
            <v-text-field color="green darken-1" @keypress.enter="login" v-model="user.password" label="Password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            outlined
            color="green darken-1"
            text
            @click="login"
            :loading="loading"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Courier from '../../services/courier'
export default {
  data () {
    return {
      dialog: true,
      loading: false,
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      Courier.loginCourier({
        ...this.user
      }).then(res => {
        if (res.exist) {
          this.$store.commit('SET_LOGIN', {
            name: res.name ? res.name : 'default',
            ...res
          })
          this.dialog = false
          window.location.reload()
        } else {
          alert('Wrong login or password')
          this.user = {}
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.dialog = !this.$store.state.user
  }
}
</script>
