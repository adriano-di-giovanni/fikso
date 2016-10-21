describe('Fikso', () => {
  context('#scope', () => {
    it('should form a key path', () => {
      const fikso = (new Fikso())
        .scope('production')
        .scope('mysql')
        .scope('master')

      expect(fikso).to.be.instanceof(Fikso)
      expect(fikso.keyPath).to.equal('__global__.production.mysql.master')
    })
  })

  context('#set', () => {
    let fikso

    beforeEach(() => {
      fikso = new Fikso()
    })

    it('should declare a setting in the global scope', () => {
      const props = {
        isGlobal: true
      }

      fikso.set(props)

      expect(fikso.state['__global__']).to.deep.equal(props)
    })

    it('should declare a bunch of settings in a scope', () => {
      const props = {
        host: 'localhost',
        user: 'root',
        password: 'root'
      }

      fikso
        .scope('production')
        .scope('mysql')
        .scope('master')
        .set(props)

      expect(fikso.state['__global__.production.mysql.master']).to.deep.equal(props)
    })

    it('should throw due to overridden settings', () => {
      const props = {
        host: 'localhost',
        user: 'root',
        password: 'root'
      }

      const fn = () => {
        fikso
          .scope('production')
          .scope('mysql')
          .scope('master')
          .set(props)
      }

      fn()
      expect(fn).to.throw(Error)
    })
  })

  context('#get', () => {
    let fikso

    beforeEach(() => {
      fikso = new Fikso()
    })

    it('should return global settings', () => {
      fikso.set({ isGlobal: true })
      expect(fikso.get().isGlobal).to.be.true
    })

    it('should merge settings', () => {
      fikso.set({ isGlobal: true })
      fikso
        .scope('production')
        .set({
          isGlobal: false,
          isProduction: true
        })
      fikso
        .scope('production')
        .scope('mysql')
        .set({
          user: 'root',
          password: 'root'
        })
      fikso
        .scope('production')
        .scope('mysql')
        .scope('master')
        .set({
          host: '192.168.1.2'
        })

      const settings = fikso
        .scope('production')
        .scope('mysql')
        .scope('master')
        .get()

      expect(settings).to.deep.equal({
        isGlobal: false,
        isProduction: true,
        host: '192.168.1.2',
        user: 'root',
        password: 'root'
      })
    })
  })
})
