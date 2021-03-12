<template>
  <div id="app" class="is-family-monospace">
    <section class="hero is-small">
      <div class="hero-body">
        <p class="title">
          Varint.com
        </p>
        <p class="subtitle">
          https://developers.google.com/protocol-buffers/docs/encoding
        </p>
      </div>
    </section>
    <section class="section">
      <b-field label="int">
        <b-input v-model="inputInt" placeholder="55301" custom-class="is-family-monospace" />
      </b-field>
      <div class="block">
        <b-radio v-model="encoding" name="encoding" native-value="varuint32">varuint32</b-radio>
        <b-radio v-model="encoding" name="encoding" native-value="varuint64">varuint64</b-radio>
        <b-radio v-model="encoding" name="encoding" native-value="varint32">varint32</b-radio>
        <b-radio v-model="encoding" name="encoding" native-value="varint64">varint64</b-radio>
      </div>
    </section>
    <section class="section">
      <b-field label="hex">
        <b-input v-model="hex" readonly="true" custom-class="is-family-monospace" />
      </b-field>
      <b-field label="Java">
        <b-input v-model="java" readonly="true" custom-class="is-family-monospace" />
      </b-field>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  encoding = "varuint32";
  inputInt = "";
  hex = "";
  java = "";
}
</script>

<style>
</style>
