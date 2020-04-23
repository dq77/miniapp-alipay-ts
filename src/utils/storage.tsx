import Taro from "@tarojs/taro"

export function getStorage(name: string) {
  return Taro.getStorageSync(name)
}

export function setStorage(name: string, value: any) {
  return Taro.setStorageSync(name, value)
}

export function removeStorage(name: string) {
  return Taro.removeStorageSync(name)
}

export function clearStorage() {
  return Taro.clearStorageSync()
}
