import { encodeAsVarUInt64, encodeAsVarInt64 } from '@/varint'

test("encodeAsVarUInt64", () => {
  expect(encodeAsVarUInt64(0n)).toEqual(new Uint8Array([0x0]))
  expect(encodeAsVarUInt64(1n)).toEqual(new Uint8Array([0x1]))
  expect(encodeAsVarUInt64(300n)).toEqual(new Uint8Array([0xac, 0x2]))
})

test("encodeAsVarInt64", () => {
  expect(encodeAsVarInt64(0n)).toEqual(new Uint8Array([0x0]))
  expect(encodeAsVarInt64(-1n)).toEqual(new Uint8Array([0x1]))
  expect(encodeAsVarInt64(1n)).toEqual(new Uint8Array([0x2]))
  expect(encodeAsVarInt64(2147483647n)).toEqual(new Uint8Array([0xfe, 0xff, 0xff, 0xff, 0xf]))
  expect(encodeAsVarInt64(-2147483648n)).toEqual(new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xf]))
})
