<template>
<div>
    <v-card color="white" flat tile style="width: 100vw">
      <v-row  class="mx-0 my-0" justify="space-between" align="center">
        <v-col cols="auto">
          <span class="display-1 font-weight-bold">Мои заказы</span>
        </v-col>
        <v-col cols="auto">
            <v-switch inset color="#22B573"></v-switch>
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
              <v-badge color="green" content="3"> Заказы </v-badge>
            </v-tab>
            <v-tab key="restaurant" active-class="colorDone">У ресторана</v-tab>
            <v-tab key="on-way" active-class="colorDone">В пути</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-4" flat tile color="transparent">
      <v-tabs-items v-model="tab" background-color="transparent" >
            <v-tab-item active-class="colorDone" style="background-color: #E5E5E5 !important">
                <New :openDialog="openDialog" :dialog="dialog"/>
            </v-tab-item>
            <v-tab-item style="background-color: #E5E5E5 !important">
                <Process />
            </v-tab-item>
            <v-tab-item style="background-color: #E5E5E5 !important">
                <Finish />
            </v-tab-item>
            <v-tab-item style="background-color: #E5E5E5 !important">
                <Finish />
            </v-tab-item>
          </v-tabs-items>
    </v-card>
    <Dialog :openDialog="openDialog" :dialog="dialog"/>
  </div>
</template>

<script>
import Finish from './finishedOrder'
import New from './newOrder'
import Process from './processOrder'
import Dialog from './components/Dialog.vue'
export default {
  data () {
    return {
      tab: 'newOrder',
      dialog: {
        dialog: false
      }
    }
  },
  methods: {
    openDialog (value) {
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
