<template>
  <div>
    <v-card @click="query.id ? $router.push({
      path: '/info/' + order.guid ? order.guid : '',
      query
    }) : null" class="mb-2" color="white" style="border: 1px solid red" tile flat>
      <v-card-title class="text-h5 pa-2">
            <v-row justify="space-between" align="center">
                <v-col cols="auto">
                    <strong class="title">Заказ <strong>№{{ order.guid ? order.guid.substring(0, 6): '' }}</strong></strong>
                </v-col>
                <v-col cols="auto">
                    <v-btn icon color="#22B573"><v-icon size="30">mdi-cash</v-icon></v-btn>
                </v-col>
            </v-row>
        </v-card-title>
      <v-divider></v-divider>
      <v-timeline align-top
        dense>
        <v-timeline-item small color="grey lighten-2"><strong>{{ order.branch_address }}</strong></v-timeline-item>
        <v-timeline-item small color="#22B573">
          {{ order.address }}
        </v-timeline-item>
        </v-timeline>
      <v-card-subtitle class="pa-2 px-1">
        <v-row>
          <v-col cols="auto">
            <v-btn text class="text-capitalize">
              <v-icon left size="24" color="green">mdi-silverware-fork-knife</v-icon> {{ order.price }} сум
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-divider vertical></v-divider>
          </v-col>
          <v-col cols="auto">
            <v-btn text>
              <v-icon left size="24" color="green">mdi-bike</v-icon> {{ order.comission }} %
            </v-btn>
          </v-col>
          <v-col cols="12">
            <v-btn  v-if="$route.query.status == 'orders'" @click="openDialog(true)" elevation="0" large dark class="text-capitalize rounded-lg" block color="#22B573">
              Принять
            </v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['status', 'query', 'openDialog', 'order'],
  created () {
  }
}
</script>

<style>
</style>
