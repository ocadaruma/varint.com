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
        <b-radio v-model="encoding" name="encoding" native-value="varuint64">varuint64</b-radio>
        <b-radio v-model="encoding" name="encoding" native-value="varint64">varint64 (ZigZag encoding)</b-radio>
      </div>
    </section>
    <section class="section">
      <b-field label="hex">
        <b-input :value="binaryHex" readonly="true" custom-class="is-family-monospace" />
      </b-field>
      <b-field label="Java">
        <b-input :value="javaByteArray" readonly="true" custom-class="is-family-monospace" />
      </b-field>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { encodeAsVarUInt64, encodeAsVarInt64 } from './varint'

const INT64_MIN = -(1n << 63n)
const INT64_MAX = (1n << 63n) - 1n
const UINT64_MIN = 0n
const UINT64_MAX = (1n << 64n) - 1n

@Component
export default class App extends Vue {
  encoding: "varuint64" | "varint64" = "varuint64"
  inputInt = ""

  get binaryHex(): string {
    const result = new Array<string>()
    this.tryConvert(this.inputInt)?.forEach(n => {
      result.push(this.printHex(n))
    })
    return result.join(" ")
  }
  get javaByteArray(): string {
    const result = new Array<string>()
    this.tryConvert(this.inputInt)?.forEach(n => {
      result.push("0x" + this.printHex(n))
    })
    if (result.length === 0) {
      return ""
    }
    return `new byte[]{${result.join(", ")}}`
  }

  tryConvert(inputInt: string): Uint8Array | undefined {
    if (inputInt.trim() === "") {
      return undefined
    }

    try {
      const num = BigInt(inputInt)
      switch (this.encoding) {
        case "varuint64":
          if (num < UINT64_MIN || num > UINT64_MAX) {
            return undefined
          }
          return encodeAsVarUInt64(num)
        case "varint64":
          if (num < INT64_MIN || num > INT64_MAX) {
            return undefined
          }
          return encodeAsVarInt64(num)
      }
    } catch (e) {
      // ignore syntax error
      if (!(e instanceof SyntaxError)) {
        throw e
      }
    }
    return undefined
  }

  printHex(n: number): string {
    const str = n.toString(16)
    let zeros = ""
    for (let i = 0; i < 2 - str.length; i++) {
      zeros += "0"
    }
    return zeros + str
  }
}
</script>

<style>
</style>
