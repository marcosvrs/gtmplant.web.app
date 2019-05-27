<template>
  <div class="import-container">
    <h1 class="import-container__header">Import the exported GTM Container JSON file</h1>
    <form @submit.prevent="onSubmit" ref="form">
      <div class="import-container__form-group">
        <label class="import-container__form-label" for="file">Import Container</label>
        <input
          class="import-container__form-input"
          id="file"
          name="file"
          type="file"
          @change="onChange"
        >
      </div>
      <div class="import-container__form-group">
        <label class="import-container__form-label" for="result">Result</label>
        <textarea class="import-container__form-input" id="result" name="result" v-html="result"></textarea>
      </div>
      <div class="import-container__form-group">
        <button>Submit</button>
      </div>
    </form>
    <div class="import-container__message" v-html="message"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ImportContainer extends Vue {
  @Prop() private message!: string;
  @Prop() private result!: string;

  protected onChange(): void {
    this.onSubmit();
  }

  protected onSubmit(): void {
    const formData = new FormData(this.$refs.form as HTMLFormElement);
    const request: XMLHttpRequest = new XMLHttpRequest();
    request.open('POST', '/api');
    request.onerror = this.onError.bind(this, request);
    request.onload = this.onSucess.bind(this, request);
    request.send(formData);
  }

  protected onError(request: XMLHttpRequest): void {
    this.message = `Fails with status ${request.status} error: ${
      request.responseText
    }`;
  }

  protected onSucess(request: XMLHttpRequest, ev: ProgressEvent): void {
    if (request.status !== 200) {
      this.onError(request);
      return;
    }
    this.message = '';
    this.result = request.response;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.import-container {
  $root: &;
  &__header {
    margin: 40px 0 0;
  }
  &__form-group {
    clear: both;
    #{$root}__form-label {
      clear: both;
    }
    #{$root}__form-input {
      clear: both;
    }
  }
  &__message {
    clear: both;
  }
}
</style>
