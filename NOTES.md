# Notes

What if a scope doesn't exist?

```javascript
fikso.scope('typo').get()
```

What if fikso can handle regular expressions for scopes?

```javascript
fikso.scope(/(development|production)/)
```

How do I manage regular expressions if a call to `set` is chained after?
