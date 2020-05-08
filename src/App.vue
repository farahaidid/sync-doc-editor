<template>
  <seditor :defaultDocument="defaultDocument" />
</template>

<script>
import seditor from "./components/Editor"
window.vm = seditor
export default {
  components:{
    seditor
  },
  props: ["defaultDocument"],
}
</script>

<style>

</style>