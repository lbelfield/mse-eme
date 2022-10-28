
<h2> History </h2>
Apple - from the itunes days. Built on that from .m3u8 file.

<h3>HLS Manifest</h3>

Master manifest with urls of sub-manifests. Broken up at a variant level (or bitrates)

(X-Link breaks the sub-manifests by period. Whereas HLS breaks the sub-manifest by variants (or bitrates))
Interstitials in HLS is when it takes the period-equivalent out of a manifest, like X-Link
https://developer.apple.com/streaming/GettingStartedWithHLSInterstitials.pdf

master -> child manifest -> segments


The video player is bundled into Safari so we can't see the internals of how it works.
Instead of attaching event listeners to Mercury, we attach listeners to the raw video element in safari. We are restricted by what Safari gives us.
PWP - Configure everything as a Target profile. Then the target profile maps to the correct solution (fun fact, DRM type, AdManager).

RunTime vs BuildTime. 
- BuildTime is when you decide before hand (eg PS4)
- RunTime is when you decide on the fly (eg Safari)

TS files are Transport Streams - another type of container.