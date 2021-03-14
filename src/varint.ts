export function encodeAsVarUInt64(num: bigint): Uint8Array {
  const buffer = new Array<number>()
  for (let i = 0; i < 9; i++) {
    let byte = num & 0x7Fn
    if (num > 0x7Fn) {
      byte |= 0x80n
    }
    buffer.push(Number(byte))

    num >>= 7n
    if (num === 0n) {
      return new Uint8Array(buffer)
    }
  }

  return new Uint8Array(buffer)
}

export function encodeAsVarInt64(num: bigint): Uint8Array {
  return encodeAsVarUInt64((num << 1n) ^ (num >> 63n))
}
