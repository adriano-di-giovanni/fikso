# Fikso

[![NPM Version](https://img.shields.io/npm/v/fikso.svg?style=flat)](https://www.npmjs.com/package/fikso)
[![David](https://img.shields.io/david/adriano-di-giovanni/fikso.svg?maxAge=2592000)]()
[![David](https://img.shields.io/david/dev/adriano-di-giovanni/fikso.svg?maxAge=2592000)]()
[![Build Status](https://travis-ci.org/adriano-di-giovanni/fikso.svg?branch=master)](https://travis-ci.org/adriano-di-giovanni/fikso)
[![codecov](https://codecov.io/gh/adriano-di-giovanni/fikso/branch/master/graph/badge.svg)](https://codecov.io/gh/adriano-di-giovanni/fikso)
[![Twitter Follow](https://img.shields.io/twitter/follow/codecreativity.svg?style=social&label=Follow&maxAge=2592000)]()

`Fikso` means `setting` in esperanto.

Fikso is a minimalistic configuration library for Node.js.

It's tested. It works. Beware, it's in alpha.

## Installation

```bash
npm install fikso --save
```

## Usage

### Example

```javascript
import fikso from 'fikso'

// declare settings in the global scope
fikso.set({
  companyWebsiteUrl: 'http://adrianodigiovanni.com'
})

// declare settings in a nested scope
fikso
  .scope('production')
  .scope('mysql')
  .set({
    user: 'root',
    password: 'root'
  })

// declare settings in a deeply nested
fikso
  .scope('production')
  .scope('mysql')
  .scope('master')
  .set({
    host: 'localhost'
  })

const settings = fikso
  .scope('production')
  .scope('mysql')
  .scope('master')
  .get()

console.log(settings) // { companyWebsiteUrl: 'http://adrianodigiovanni.com', user: 'root', password: 'root', host: 'localhost' }
```

### Scopes

You define and address nested scopes by chaining calls to `scope`.

Scopes are arbitrary. The example above shows you scopes pertaining to
* environment (`production`)
* service (`mysql`)
* instance (`master`)

### Define settings in a scope

You can define settings in a scope by calling `set`.

If you call `set` or `get` on `fikso`, you define or access settings in the global scope.

It is not permitted to override settings for a scope.

```javascript
fikso.set({ isGlobal: true }) // it's ok
fikso.set({ isGlobal: true }) // will throw
```

### Retrieve settings

You can retrieve settings in a scope by calling `get`.

### Caching scopes

```javascript
const scope = fikso
  .scope('production')
  .scope('mysql')
  .scope('master')

scope.set({
  host: 'localhost'
})

console.log(scope.get()) // { host: 'localhost' }
```

## License

The project is licensed under the MIT license.
