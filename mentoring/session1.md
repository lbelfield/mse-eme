Manifest = instructions to play video - hardcodedManifest.js (formerly data.js). Don't require this when hardcoded because hardcodedManifest.js already has all the instructions of where to find the segments.

https://www.brendanlong.com/the-structure-of-an-mpeg-dash-mpd.html#example

octo-dev-videos>dash>number - FABRiC video files.
- stream.mpd and stream_multi_period.mpd

(see octo-dev-videos>dash>number>stream.mpd annotations)
* periods = bunch of content/ads
    * segmentTemplate - 
    * initialisation = init.mp4. 
    * media=placeholderThatIteratesOverArray(0-155).
    * timescale="12800" (ticks in a second)
        * segments - t=start ,d=durationOfSegment , r=endofArray(repeat)
        * d/timescale = 1.92
        * 156*24576=

MPEGDASH spec - PDF on DASH Manifest - Manifest - Mercury Teams Chat > Tab at the top


Homework - create a manifest file (.mpd). package to parse the manifest.