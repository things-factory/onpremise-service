const OS = require('os')
var ip = require('ip')
var mdns = require('mdns')
var ad

process.on('bootstrap-module-middleware' as any, async app => {
  /* app에 middleware를 추가할 수 있다. */
  var servicePort = process.env.PORT
  var ipAddress = ip.address()

  ad = mdns.createAdvertisement(mdns.tcp('tfserver'), 1008, {
    name: `Things factory server - ${OS.hostname()}`,
    txtRecord: {
      address: `${ipAddress}:${servicePort}`
    }
  })

  ad.start()
})

process.on('exit' as any, code => {
  if (ad) ad.stop()
})
