<h1> Manifest </h1> 

<h2>Manifest Definition:</h2>
Manifest - Instructions to play video. Broken into single-period and multi-period manifests. An .mpd file.

An example of this would be my hardcodedManifest.js (formerly data.js). Don't require a manifest if you hardcoded all the assets, because hardcodedManifest.js already orchestrates all the instructions of where to find the segments.

https://www.brendanlong.com/the-structure-of-an-mpeg-dash-mpd.html#example

<h2> Manifest Breakdown </h2>
File: 
octo-dev-videos>dash>number -> FABRiC video files from AWS

Two best files are:
- stream.mpd (single-period)
- stream_multi_period.mpd (multi-period)

(see octo-dev-videos>dash>number>stream.mpd annotations)
- `<Period>` = bunch of content/ads
    * `<AdaptationSet>` - Is contentType video or audio? If video, what are dimensions of the player, framerate, par (pixel aspect ratio)? If audio, language?
        * `<SegmentTemplate>` - 
        * timescale="12800" (ticks in a second)
        * initialisation = path to init.mp4. 
        * media=placeholderThatIteratesOverArray(0-155).
            * `<SegmentTimeline>`
                * `<S>`
                * t=start 
                * d=durationOfSegment 
                * r=endofArray(repeat)
                * d/timescale = 1.92 (eg if d=1152, timescale=600, then 1.92secs)
                * usually two `<S>`. One for the full 1.92s, one for the final segment to make up the remaining. Eg if 2 segments, could be r=1(d=1.92s)+r=1(d=0.08s). Total SegmentTimeline = 2s.
                * 156*24576=

MPEGDASH spec - PDF on DASH Manifest - Manifest - Mercury Teams Chat > Tab at the top


Homework - create a manifest file (.mpd). package to parse the manifest.