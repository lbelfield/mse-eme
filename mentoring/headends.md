<h1> Head-Ends </h1>

<h2> Head-End: </h2>
A headend is a piece of infrastructure that takes fully produced linear content feeds (typically video from a stadium/production facility) and processes it into a format which is then ready for streaming to client devices (phones, tablets, smart TVs, desktops, etc).

- Transcode: Making multiple codecs (HEVC)
- Transmux: Making multiple streaming protocols (DASH, HLS, MSS)
- Transrate: Making multiple bitrates (ABR)
- Transsize: Making multiple resolutions

There are a few primary functions within the headend;

<h3>Encoder </h3> Takes the incoming video feed form the GVN and transcodes that to a number of different resolutions and bitrates, making up an Adaptive Bitrate Ladder​.

<h3>Origin Server</h3>
The origin server is where the CDN will go if the content/file requested by the client's device isn’t already cached on the local edge cache, or the parent cache.

<h3>Packager</h3> A packager sits between the origin server and CDN. Putting a wrap around the encoded video so it’s ready to be streamed to different types of devices

<h3>Conditional access and DRM</h3> encrypting the content so only the desired device are able to view the content

-------
M2A, Encompass, Media Kind are all examples of Head-Ends

------- 

<h2> DSC </h2>
DSC - DAZN Support Centre - Leeds team replacing encompass (headend) who are monitoring our OTT Packager outputs. 

- DCA and DCB - M2A Outputs (cloud-based - AWS)
- DC1 and DC2 - Encompass Outputs

DSC:
- Manage reporting to errors.
- Monitoring tag servers to monitor the feeds.
