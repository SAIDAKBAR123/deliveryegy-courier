<template>
<div>
    <v-card height="220" color="blue lighten-2" flat tile style="width: 100vw">
      <v-row  class="mx-0 my-0" justify="space-between" align="center">
        <v-col cols="auto">
          <span class="display-1 font-weight-bold">My orders</span>
          <p>{{ $store.state.user.name }}</p>
        </v-col>
        <v-col cols="auto">
            <v-switch @change="setVisibility" v-model="itemVisible" inset color="orange darken-2"></v-switch>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" style="margin: 0.4px 0px">
        <v-col cols="12">
          <v-tabs
          :ripple="false"
            background-color="#efeff4"
            v-model="tab"
            hide-slider
            slider-color="green"
            fixed-tabs
            class="tab_card"
          >
            <v-tab key="orders" active-class="colorDone"
>
              <v-badge color="green" :content="orders.length"> Orders </v-badge>
            </v-tab>
            <v-tab key="restaurant" active-class="colorDone">In restaurant</v-tab>
            <v-tab key="on-way" active-class="colorDone">On way</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4" flat tile color="transparent" v-if="!itemVisible">
      <v-tabs-items v-model="tab" background-color="transparent" >
            <v-tab-item active-class="colorDone" style="background-color: #E5E5E5 !important">
                 <template
                 v-if="!$store.state.user"
                    >
                   <v-skeleton-loader
                   v-for="i in 3" :key="i"
                    class="mx-auto"
                    type="card"
                  ></v-skeleton-loader>
                 </template>
                <v-card color="transparent"  v-else tile flat>
                  <New :orders="orders" :openDialog="openDialog" :dialog="dialog"/>
                </v-card>
            </v-tab-item>
            <v-tab-item style="background-color: #E5E5E5 !important">
                <Process :orders="restaurantOrders" :updateStatus="updateStatus"/>
            </v-tab-item>
            <v-tab-item style="background-color: #E5E5E5 !important">
                <Finish :orders="onWayOrders" :updateStatus="updateStatus"/>
            </v-tab-item>
            <!-- <v-tab-item style="background-color: #E5E5E5 !important">
                <Finish />
            </v-tab-item> -->
          </v-tabs-items>
    </v-card>
    <v-footer height="120">
      <v-row justify="center" align="center">
        <v-col cols="auto">
          <v-btn elevation="0" class="px-0" to="/my-orders">My orders</v-btn>
        </v-col>
        <v-col cols="auto" class="px-0">
          <v-btn elevation="0" color="red" dark rounded @click="leave">Leave</v-btn>
        </v-col>
      </v-row>
    </v-footer>
    <Dialog :openDialog="openDialog" :dialog="dialog"/>
  </div>
</template>

<script>
import Finish from './finishedOrder'
import New from './newOrder'
import Process from './processOrder'
import Dialog from './components/Dialog.vue'
import Courier from '../../services/courier'
export default {
  data () {
    return {
      tab: 0,
      itemVisible: localStorage.getItem('visibily') === 'true',
      orders: [],
      onWayOrders: [],
      restaurantOrders: [],
      dialog: {
        dialog: false
      }
    }
  },
  methods: {
    setVisibility (element) {
      this.itemVisible = element
      localStorage.setItem('visibily', element)
    },
    updateStatus (element, status) {
      console.log(element, status)
      Courier.updateOrderStatus({
        guid: element.guid,
        courier_id: this.$store.state.user.guid,
        status
      }).then(res => {
        console.log(res)
        alert('updated successfully')
        window.location.reload()
      })
    },
    getTakenOrders (guid) {
      Courier.getCourierOrders(guid).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getOrders () {
      Courier.getCourierOrders(this.$store.state.user.guid).then(res => {
        console.log(res)
        this.restaurantOrders = res.orders.filter(el => el.status === 'courier-accepted')
        this.onWayOrders = res.orders.filter(el => el.status === 'courier-on-way')
      }).catch(err => {
        console.log(err)
      })
      Courier.getOrders().then(res => {
        this.orders = res.orders.filter(el => el.status === 'restaurant-ready')
      }).catch(err => {
        console.log(err)
      })
    },
    openDialog (value, item) {
      this.dialog = {
        ...this.dialog,
        ...item
      }
      console.log(this.dialog)

      this.dialog.dialog = value
    },
    takeToTab (status) {
      switch (status) {
        case 'orders':
          return 0
        case 'restaurant':
          return 1
        case 'on-way':
          return 2
        default:
          return 0
      }
    },
    leave () {
      localStorage.removeItem('user')
      this.$store.commit('REMOVE')
      window.location.reload()
    }

  },
  watch: {

    tab (value) {
      console.log(this.$route.query)

      switch (value) {
        case 0:
          this.$router.replace({
            query: {
              status: 'orders'
            }
          }).catch(er => {})
          break
        case 1:
          this.$router.replace({
            query: {
              status: 'restaurant'
            }
          }).catch(er => {})
          break
        case 2:
          this.$router.replace({
            query: {
              status: 'on-way'
            }
          }).catch(er => {})
          break

        default:
          break
      }
    }
  },
  components: { Finish, New, Process, Dialog },
  created () {
    this.getTakenOrders(this.$store.state.user.guid)
    this.getOrders()
    this.tab = this.$route.query.status ? this.takeToTab(this.$route.query.status) : 'orders'
  }
}
</script>

<style lang="scss" scoped>
.tab_card {
  border-radius: 12px !important;
  height: 56px;
  background: #efeff4 !important;
  padding: 5px;
}
.colorDone {
  background: rgb(231, 241, 245) !important;
  border-bottom: 12px !important;
  border-radius: 3px solid green;
}
</style>
