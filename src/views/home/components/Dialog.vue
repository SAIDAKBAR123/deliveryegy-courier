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
          <v-toolbar-title>Заказ №13</v-toolbar-title>
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
                <strong class="title">Адрес:</strong>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-timeline align-top dense>
            <v-timeline-item small color="grey lighten-2"
              ><strong>Япона мама (Максимгоркий)</strong></v-timeline-item
            >
            <v-timeline-item small color="#22B573">
              ул. Ислом Каримов, 14-д.
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
                  160 000 сум
                </span>
              </v-col>
              <v-col cols="auto">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col cols="auto">
                <span>
                  <v-icon left size="24" color="green">mdi-bike</v-icon> 4 000
                  сум
                </span>
              </v-col>
              <v-col cols="auto">
                <v-divider vertical></v-divider>
              </v-col>
              <v-col cols="auto">
                <span>
                  <v-icon size="30" color="green">mdi-cash</v-icon> Нал.
                </span>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-title class="text-h5 pa-2">
            <v-row justify="space-between" align="center">
              <v-col cols="auto">
                <strong class="title">Комментария:</strong>
              </v-col>
            </v-row>
          </v-card-title>
          <v-row justify="center">
            <v-col cols="11" class="">
                <p>Дом посередине, шлагбаум открывает охрана. Дом посередине, шлагбаум открывает охрана</p>
            </v-col>
          </v-row>
        </v-card>
      </v-card>
      <v-footer fixed>
        <!-- <v-btn elevation="0" block class="rounded-lg my-2" large color="#F3F3F0"
          >Пропустить</v-btn
        > -->
        <v-btn elevation="0" @click="$router.push('/info/234')" block dark class="rounded-lg mb-2" large color="#22B573"
          >Принять</v-btn
        >
      </v-footer>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ['dialog', 'openDialog'],
  data () {
    return {
      text: 'Дом посередине, шлагбаум открывает охрана. Дом посередине, шлагбаум открывает охрана'
    }
  },
  methods: {}
}
</script>
