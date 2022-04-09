<template>
  <div>
    <v-card flat color="white" class="pa-2" tile >
      <v-row align="center">
        <v-col cols="auto" class="py-0">
          <v-btn fab text @click="$router.go(-1)"><v-icon>mdi-chevron-left</v-icon></v-btn>
        </v-col>
        <v-col cols="auto" class="py-0 ml-1" dark>
          <v-card-title dark>Order №134231</v-card-title>
        </v-col>
      </v-row>
    </v-card>
    <!-- Courier list -->
    <v-card height="72" class="my-2 px-4" tile flat>
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <label class="title font-weight-bold">Япона мама (Максимгоркий)</label>
          <p>Ул. Бешкайрагоч, 12</p>
        </v-col>
      </v-row>
    </v-card>
        <!-- All list -->
    <v-card class="my-2 px-4" tile flat>
      <v-card-title class="my-0 py-1">Оплата</v-card-title>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="chat in payment" :key="chat.title">
          <v-list-item-content>
            <v-list-item-title v-text="chat.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
           <span>{{ chat.price }}</span>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
          <v-row justify="space-between" >
              <v-col cols="auto"><span class="body font-weight-bold">Общая сумма:</span></v-col>
              <v-col cols="auto"><span class="body font-weight-bold">65 000 сум</span></v-col>
          </v-row>
      </v-card-actions>
    </v-card>
    <!-- Product list -->
    <v-card class="my-2 px-4" tile flat>
      <v-card-title class="my-0 py-1">Продукты</v-card-title>
      <v-divider></v-divider>
      <v-list >
        <v-list-item v-for="chat in recent" :key="chat.title">
          <v-list-item-content>
            <v-list-item-title v-text="chat.title"></v-list-item-title>
            <v-list-item-subtitle class="text--gray" v-text="chat.des"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-icon>
           <span>{{ chat.price }}</span>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
          <v-row justify="space-between" >
              <v-col cols="auto"><span class="body font-weight-bold">Общая сумма:</span></v-col>
              <v-col cols="auto"><span class="body font-weight-bold">57 000 сум</span></v-col>
          </v-row>
      </v-card-actions>
    </v-card>
    <!-- Product comment -->
    <v-card class="my-2 px-4" tile flat>
      <v-card-title class="pa-2 font-weight-bold">Комментария к заказу</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle>Пожалуйста, не забудьте добавить салфетку</v-card-subtitle>
    </v-card>
    <!-- Card footer -->
    <v-footer height="72" fixed >
      <v-row justify="center">
        <v-col cols="12">
          <v-btn elevation="0" v-if="$route.query.status === 'on-way'" to="/" dark :color="statusOfOrder.color" v-text="statusOfOrder.text" block large class="text-capitalize rounded-lg">
           </v-btn>
          <v-btn elevation="0" v-else-if="$route.query.status === 'restaurant'" to="/" dark :color="statusOfOrder.color" v-text="statusOfOrder.text" block large class="text-capitalize rounded-lg">
           </v-btn>
          <v-btn elevation="0" v-else to="/" dark :color="statusOfOrder.color" v-text="statusOfOrder.text" block large class="text-capitalize rounded-lg">
           </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  props: [''],
  computed: {
    statusOfOrder () {
      switch (this.$route.query.status) {
        case 'orders':
          return { text: 'Взять заказ', color: 'green darken-1' }
        case 'restaurant':
          return { text: 'Взять restaurent', color: '#22B573' }
        case 'on-way':
          return { text: '', color: '' }
        default:
          return { text: 'Взять заказ', color: 'green darken-1' }
      }
    }
  },
  data () {
    return {
      recent: [
        {
          active: true,
          price: '15 000 сум',
          title: '1 x Гамбургер',
          des: 'без сыра'
        },
        {
          active: true,
          price: '100 000 сум',
          title: '2 x Лаваш',
          des: 'без майонеза'
        }
      ],
      payment: [
        {
          active: true,
          price: 'Наличные',
          title: 'Тип платежа'
        },
        {
          active: true,
          price: '57 000 сум',
          title: 'Заказ'
        },
        {
          active: true,
          price: '8 000 сум',
          title: 'Доставка'
        }
      ]
    }
  },
  created () {
    console.log(this.$route.query.status)
  }
}
</script>

<style>
</style>
