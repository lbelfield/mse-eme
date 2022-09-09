<h1>EME</h1>

<h2>What is EME </h2>
An API to Encrypt/Decrypt content for DRM

</br><h3>Key Systems:</h3>

- Widevine
- FairPlay
- PlayReady

</br><h3>CENC:</h3>
Common ENCryption - Encrypt it once, then you can decrypt all of Widevine, FairPlay, and PlayReady rather than having to encrypt it three times. Hence the word Common.

</br><h3>Secretive:</h3>
Black box that Google/Apple/Microsoft (widevine/FairPlay/PlayReady) don't really want us to know because more we know, easier to hack.

</br><h3> DRM Process:</h3>

1. You tell the browser to play content. 
2. Browser panics and says woah, encrypted.
3. Then browser requests you to get a license (see in network tab)
4. Get the licence from our DAZN's DRM service (eg drm.gateway.indazn.com/widevine/v1/license)
5. Mercury uses the EME API for that license to decrypt the content and use the key system

</br><h3>Live Incidents with DRM </h3>

- Self-DDoS - can bring down the DAZN DRM Service with too many requests, auto-scaling is in place there to prevent. 
- eg: If a CDN goes down, everyone CDN rotates. This means many users hit the DAZN DRM Service, which essentially DDoS the DAZN DRM Service hahaha! 
- Also if the Catalog forces a refresh, then everyone re-requests the video meaning DDoS. 


</br><h3>Example:</h3>

Use this file: stream_cenc.mpd

`<AdaptationSet>`</br>
`<cenc:pssh xmlns:cenc="urn:mpeg:cenc:2013">AAAARHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACQSEM+14rc77088h48lq4anRR8iEM+14rc77088h48lq4anRR8=</cenc:pssh>`

https://dashif.org/identifiers/content_protection/ This file has unique IDs called `schemeIdUri` which tells us which Key System we are using, eg:  `EDEF8BA9-79D6-4ACE-A3C8-27DCD51D21ED` is Widevine.

      `<ContentProtection schemeIdUri="urn:uuid:EDEF8BA9-79D6-4ACE-A3C8-27DCD51D21ED">`


Each period has a license in it, in this case: `AAAARHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACQSEM+14rc77088h48lq4anRR8iEM+14rc77088h48lq4anRR8=`

`pssh box` (base64 decoder) = encoded key. Also in the init segment. Either use init segment or manifest.


</br><h3>Examples to play with:</h3>
Encoder: https://tools.axinom.com/generators/PsshBox
- Widevine `(EDEF...)`, 3,  00000000-0000-0000-0000-000000000000, base64, generate

Decoder for our license: https://tools.axinom.com/decoders/PsshBox
- AAAARHBzc2gAAAAA7e+LqXnWSs6jyCfc1R0h7QAAACQSEM+14rc77088h48lq4anRR8iEM+14rc77088h48lq4anRR8=

