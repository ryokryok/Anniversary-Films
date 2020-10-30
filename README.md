# anniversary films

This is my project app, search anniversary films by date.

[App Page(Japanese)](https://blissful-ramanujan-31cbd0.netlify.app/)

## Getting Started

### First

This app uses [TMDb API](https://developers.themoviedb.org/3/getting-started/introduction), if you will build app, you need to get API KEY.

And, set up `.env.local` file.

```bash
mv .env.sample .env.local
```

```env
NEXT_PUBLIC_TMDB_API_KEY=<input your api key>
```


### Dev server

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

[http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Static Export

This app is client side only, dose not need server side app.
if you build this app to deploy static html server, execute this command.

```bash
# execute "yarn build && yarn next export"
yarn export
```

static app is exported to `out` directory.

## LICENSE

MIT
