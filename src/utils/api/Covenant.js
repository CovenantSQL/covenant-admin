import _fetch from './_fetch'

export default {
  ApplyToken: {
    post ({ account, email }) {
      return _fetch({
        method: 'POST',
        api: {
          version: 'v1'
        },
        path: '/apply_token',
        query: { account, email }
      })
    }
  },
  AccountBalance: {
    get ({ account }) {
      return _fetch({
        method: 'GET',
        api: {
          version: 'v1'
        },
        query: { account },
        path: '/account_balance'
      })
    }
  },
  DbBlance: {
    get ({ account, db }) {
      return _fetch({
        method: 'GET',
        api: {
          version: 'v1'
        },
        query: { account, db },
        path: '/db_balance'
      })
    }
  },
  CreateDB: {
    post ({ account }) {
      return _fetch({
        method: 'POST',
        api: {
          version: 'v1'
        },
        query: { account },
        path: '/create_database'
      })
    }
  },
  Privatize: {
    post ({ account, db }) {
      return _fetch({
        method: 'POST',
        api: {
          version: 'v1'
        },
        query: { account, db },
        path: '/privatize'
      })
    }
  },
  WaitTx: {
    post ({ tx }) {
      return _fetch({
        method: 'POST',
        api: {
          version: 'v1'
        },
        query: { tx },
        path: '/wait_tx'
      })
    }
  }
}
