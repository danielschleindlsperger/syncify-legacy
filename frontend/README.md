# Syncify Frontend

## FAQ

### How do I mock window.location?
Reconfigure jsdom as seen here:
```js
  jsdom.reconfigure({
    url: "https://www.example.com/"
  });
```
Always set a complete URL. The URL can contain query parameters.