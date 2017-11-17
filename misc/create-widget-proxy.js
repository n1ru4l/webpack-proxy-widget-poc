;`use strict`

const jsdom = require(`jsdom`)

const transformScriptTags = html => {
  const dom = new jsdom.JSDOM(html)
  const scriptTags = dom.window.document.querySelectorAll(`script[data-widget]`)

  Array.from(scriptTags).forEach(tag => {
    const scriptName = tag.getAttribute(`data-widget`)
    tag.src = `/__dist/${scriptName}.bundle.js`
  })
  return dom.serialize()
}

exports.createWidgetProxy = ({ target }) => ({
  '*': {
    target,
    bypass: (req, res, proxyOptions) => {
      if (req.path.includes(`/__dist`)) {
        return req.path
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      if (
        !proxyRes.headers ||
        !proxyRes.headers[`content-type`] ||
        !proxyRes.headers[`content-type`].includes(`text/html`)
      ) {
        return
      }
      const end = res.end
      const writeHead = res.writeHead
      let writeHeadArgs
      let buffer = undefined
      let body = ``

      // Defer write and writeHead
      res.write = () => {}
      res.writeHead = (...args) => {
        writeHeadArgs = args
      }

      // Concat response
      proxyRes
        .on(`data`, chunk => {
          if (!buffer) {
            buffer = Buffer.from(chunk)
          } else {
            buffer = Buffer.concat([buffer, chunk])
          }
        })
        .on(`end`, () => {
          if (buffer) {
            body = buffer.toString(`utf8`)
          }
        })

      res.end = () => {
        const output = transformScriptTags(body)

        res.setHeader(`content-length`, output.length + 4) //@TODO: Figure out the necessity of the '+ 4'
        res.setHeader(`content-encoding`, ``)
        writeHead.apply(res, writeHeadArgs)

        end.apply(res, [output])
      }
    },
  },
})
