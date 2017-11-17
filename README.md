# POC: Webpack Proxy for developing bundles for external pages

Run Demo

```shell
yarn install
yarn dev
```

Visit `localhost:8765`

Visit `localhost:8080`

## What it does ?!

Serve static site on `localhost:8765`.

Runs webpack-dev-server on  `localhost:8080` hat proxies `localhost:8765`.

Replaces marked `<script>` tags with the webpack-dev-server urls.


## Why do you do thizz ?!

Two seperate projects.

Need some proper way to test widgets that live on some page that you do not own... 

Tell the project owners to mark the `<script>` tags !!!111

Profit 🎉
