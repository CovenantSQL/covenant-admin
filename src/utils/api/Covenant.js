import _fetch from './_fetch'

export default {
  Faucet: {
    get ({ id, address }) {
      return _fetch({
        method: 'GET',
        api: {
          version: 'v1'
        },
        query: { id, address },
        path: '/faucet'
      })
    },
    post ({ address, media_url }) {
      return _fetch({
        method: 'POST',
        content: 'FORM',
        api: {
          version: 'v1'
        },
        path: '/faucet',
        body: {
          address,
          media_url
        }
      })
    }
  }
}
