<template>
  <div>
    <div>
      <status-card v-for="item in orders" :key="item.guid" :order="item" :query="$route.query" :updateStatus="updateStatus" status="process"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['orders', 'updateStatus']
}
</script>

<style>
</style>
