import _fetch from './_fetch'

export default {
  CreateWallet: {
    post ({ password }) {
      return _fetch({
        method: 'POST',
        api: {
          version: 'v2'
        },
        path: '/keypair/apply',
        query: { password }
      })
    }
  }
}
