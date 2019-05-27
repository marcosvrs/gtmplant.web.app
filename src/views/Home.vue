<template>
  <div class="home">
    <ImportContainer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImportContainer from '@/components/ImportContainer.vue'; // @ is an alias to /src

@Component({
  components: {
    ImportContainer,
  },
})
export default class Home extends Vue {}
</script>
