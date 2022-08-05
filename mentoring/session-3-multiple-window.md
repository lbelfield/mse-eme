Multiple Window Strategy

Users flip between DCI and DAI streams

There are two manifests:
- DCI 
    - single-period DASH
- DAI 
    - multi-period DASH

DAI is a subset of DCI

DCI manifest is going to be bigger in terms of timeDuration, but it has less stuff in the periods and markers.
DAI manifest is going to be smaller in terms of timeDuration, but has more stuff in the periods and markers.

If on Live edge...
DAI manifest only covers the last 30s of the scrub bar. 
DCI manifest cover everything else.

If you read a DAI manifest, it'll only give you 30s
Put them on a 30s stream but make it look like a 6hr stream - it's an illusion!

Issue: we need to how long the DCI stream is. 
- We first tell the player to load the DCI stream.
- Then we know how long the stream is by extracting metadata.
- Then we tear the player that regional stream.
- We then tell the player to load the DAI stream, and play the video.

Definition - TimeShiftBufferDepth (DASH Stream) = DVR Window (how long the scrub bar is). How far back can you request segments.



X-Link - 
HLS manifests are more performant than DASH manifests because DASH manifests are bloated.
HLS have a master manifest - YAGNI and many sub-manifests
- Bloated - eg for bitrates, a user doesn't need to load everything, eg why have bitrates, codecs, resolutions (480p, 720p, 1080p). DASH loads all, HLS only takes what it needs, meaning more performant.
X-Link is DASH's answer to implementing YAGNI.
X-Link is more dynamic. It stores the reference of the file which is much more performant rather than the file itself (see screenshot)
