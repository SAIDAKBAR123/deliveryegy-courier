<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog.dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark tile color="green">
          <v-btn icon dark @click="openDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Order №{{ dialog.guid ? dialog.guid.substring(0, 6) : ''}}</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card
          class="mb-2"
          color="white"
          style="border: 1px solid red"
          tile
          flat
        >
          <v-card-title class="text-h5 pa-2">
            <v-row justify="space-between" align="center">
              <v-col cols="auto">
                <strong class="title">Address:</strong>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-timeline align-top dense>
            <v-timeline-item small color="grey lighten-2"
              ><strong>{{ dialog.branch_address }}</strong></v-timeline-item
            >
            <v-timeline-item small color="#22B573">
              {{ dialog.address }}
            </v-timeline-item>
          </v-timeline>
          <v-divider></v-divider>
          <v-card-subtitle class="pa-2 px-1">
            <v-row align="center">
              <v-col cols="auto">
                <span
                  ><v-icon left size="24" color="green"
                    >mdi-silverware-fork-knife</v-icon
                  >
                  {{ orderPrice(dialog.products) }} uzs
                </span>
              </v-col>
              <v-col cols="auto">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col cols="auto">
                <span>
                  <v-icon left size="24" color="green">mdi-bike</v-icon> {{ dialog.delivery_price}}
                  uzs
                </span>
              </v-col>
              <v-col cols="auto">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col cols="auto">
                <span>
                  <v-icon size="30" color="green">mdi-cash</v-icon> {{ dialog.payment_type }}.
                </span>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-title class="text-h5 pa-2">
            <v-row justify="space-between" align="center">
              <v-col cols="auto">
                <strong class="title">Comment:</strong>
              </v-col>
            </v-row>
          </v-card-title>
          <v-row justify="center">
            <v-col cols="11" class="">
                <p>{{ dialog.comment }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <v-footer fixed>
        <!-- <v-btn elevation="0" block class="rounded-lg my-2" large color="#F3F3F0"
          >Пропустить</v-btn
        > -->
        <v-btn elevation="0" @click="accept" :loading="loading" block dark class="rounded-lg mb-2" large color="#22B573"
          >Accept</v-btn
        >
      </v-footer>
    </v-dialog>
  </v-row>
</template>
<script>
import Courier from '../../../services/courier'

export default {
  props: ['dialog', 'openDialog'],
  data () {
    return {
      loading: false,
      text: 'Дом посередине, шлагбаум открывает охрана. Дом посередине, шлагбаум открывает охрана'
    }
  },
  methods: {
    orderPrice (list = []) {
      return list.reduce((acc, curr) => {
        acc = acc + curr.price
        return acc
      }, 0)
    },
    accept () {
      console.log(this.$route, this.$store.state.user)
      this.loading = true
      Courier.updateOrderStatus({
        courier_id: this.$store.state.user.guid,
        guid: this.dialog.guid,
        status: 'courier-accepted'
      }).then(res => {
        console.log(res)
        this.openDialog(false, {})
        this.$router.replace({
          query: {
            status: 'restaurant'
          }
        })
        window.location.reload()
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
