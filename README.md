## Why

With little good learning material out there, video engineers are hard to find. 
The sector is historically between a rock (academia) and hard place (established giants with no intention of sharing IP or knowledge to competitors), so blog posts, tutorials, decent OSS are rare.

This is my futile attempt at building a player.

No tests... I know...
## History:

HTML 5 did a good job of replacing Flash, but didn't consider streaming. MSE considers streaming. It's an extension to the video element.
It allows you to store segments into a buffer and stitch them into a video. This allows you to stream the video rather than download the whole thing. Have both video and audio buffer. A buffer being an binary array of video.

MSE purpose:
- Adaptive streaming, which is another way of saying adapting to device capabilities and network conditions
- Adaptive splicing, such as ad insertion
- Time shifting
- Control of performance and download size

DASH/HLS/SS: A standard for Manifests

Mercury - read the manifest file, action the content, whilst understanding the current state of the player

The big boys have moved away from MSE. Eg Disney. Native players, make it the responsibility of TV Manufacturer to put app on their device: https://medium.com/disney-streaming/introducing-the-disney-application-development-kit-adk-ad85ca139073

## Requirements:

- Starting with a basic video element and build a UI that reacts to the events and calls the APIs.
- then go into MSE/EME

- Build a basic player first that just loads mp4 files (has to be "big buck bunny" as per tradition) 

- `<video src="/path/to/file.mp4">`

- then extend it with MSE and try loading video and audio segments into it
- Read them off disk to begin with (Don't need a manifest)
- Have a play with ffmpeg too
to cut your big mp4 video into audio and video chunks, at different bitrates

## Bitrate Switcher Requirements:

- Abstract out segments into a manifest
- Parse that manifest
- Then have different bitrate profiles

- Build an ABR player
requirements; toggle it based on bandwidth.

## Patrick Requirements:
- have you added audio yet?
- Bitrate switcher with a UI sounds like a great idea (above)

- i'm guessing right now you're just appending everything in one go into the source buffer?
- another thing you could experiment with is a "rolling buffer"
- whereby you only append X seconds in front of the "playhead" as you play through it
- and then delete content X seconds behind the playhead
- which is a bit more like how a real ABR player would work
- you can then integrate fetch so that it downloads the segments on demand as needed

- if you're using the fabric content off octo-dev: `dazn aws exec -p dazn-octo-dev aws s3 sync s3://fabric-test-media/ ./public-dir/`
- then you'll find audio and video segments there for all bitrates

- then you can get into bandwidth estimation on the fly
- and replacing your bitrate switcher with that

- ~300 segments x 10 representations or so
- 150 audio + 150 video (2s each) = 5 minutes of content
- that's why we have manifests
- as a data structure to represent all of that

- but its up to you in terms of what you want to load
- assuming you don't want to write a manifest parser yet
- you can just create some in memory javascript structure
- that holds your bitrates/segments
- from x seconds to y seconds
- some kind of tree
- the number/time stuff relates to types of dash manifests, and the way the segments are labelled
- i would stick with number - it's more human readable

- One last thing. the test videos are 5 minutes long. maybe you could just start with the first 10s or 1 minute
just to reduce the amount of data you need to work with

## Running:
`npm start`

webpack is on port 3000 - `npm run start:webpack`

Express is on port 8080 - `npm run start:app`
