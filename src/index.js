import { cloneDeep, merge } from 'lodash'

const KEY_GLOBAL = '__global__'

class Fikso {
  constructor (state = {}, keyPath = KEY_GLOBAL) {
    this.state = state
    this.keyPath = keyPath
  }

  scope (key) {
    const { state, keyPath } = this
    return new Fikso(state, `${keyPath}.${key}`)
  }

  set (props) {
    const { state, keyPath } = this
    if (state[keyPath]) {
      throw new Error(`Can't override settings at key path ${keyPath}`)
    }
    state[keyPath] = cloneDeep(props)
  }

  get () {
    const { state, keyPath } = this
    const sources = []

    keyPath
      .split('.')
      .reduce(
        (previousKeyPath, key) => {
          const currentKeyPath = previousKeyPath
            ? `${previousKeyPath}.${key}`
            : key

          sources.push(state[currentKeyPath])
          return currentKeyPath
        },
        ''
      )

    return merge({}, ...sources)
  }
}

export { Fikso }
export default new Fikso()
