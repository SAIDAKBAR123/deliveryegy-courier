<template>
  <div>
    <v-card color="blue lighten-2" height="120">
      <v-row class="mx-0 my-0" justify="space-between" align="center">
        <v-col cols="auto">
          <span class="display-1 font-weight-bold">My orders</span>
          <p>{{ $store.state.user.name }}</p>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col cols="12" v-for="item in orders" :key="item.guid">
        <Card :order="item" status="finished" />
      </v-col>
    </v-row>
    <v-footer fixed>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn elevation="0" class="px-0" to="/">Main</v-btn>
        </v-col>
        <v-col cols="auto" class="px-0">
          <v-btn elevation="0" color="red" dark rounded>Leave</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import Card from '../home/components/Card.vue'
import Courier from '../../services/courier'

export default {
  components: { Card },
  data () {
    return {
      orders: []
    }
  },
  methods: {
    getOrders () {
      Courier.getCourierOrders(this.$store.state.user.guid).then((res) => {
        this.orders = res.orders
      })
    }
  },
  created () {
    this.getOrders()
    console.log('sdas')
  }
}
</script>

<style>
</style>
