<h1> SCTE-35 </h1>

<h2> BASICS - WHAT: </h2>
TX press a button to insert metadata into the manifest (.mpd). In other words, they put some information into a stream at a certain time. It gets inserted at a certain time.

SCTE-35 is broader than just Ads and can be used for other things. eg, in a 12 hour boxing stream, you can use SCTE to separate the boxing fights into several VoD assets.


<h2> ADS: </h2>

https://github.com/getndazn/playback-web-player/blob/develop/docs/ads.md
https://openidconnectweb.azurewebsites.net/Cue 

TX press a button to insert the SCTE Marker. Once a SCTE marker is in the mpd, Google will finish whatever period it is and then transforms the (potentially) Single-period Manifest into a Multi-period Manifest, this makes new periods (eg Ad Period). 

<h2> Where in the Manifest </h2>

<h3> Example of a SCTE Marker in this project: </h3> 
File: `mse-eme/octo-dev-videos/dash/number/stream_multi_period_markers.mpd` - you'll see SCTE Markers in the:

`<Event>` Timeline Region is another word for `<Event>`

`<Signal>` - link to SCTE

`<Binary>` - c/p the hexadecimal into here: https://openidconnectweb.azurewebsites.net/Cue and click parse to get the object

<h3> Google</h3>

`<Event "sctemarker"/>` We send the SCTE marker to Google. The SCTE marker holds information inside it. Google stick their own events into their manifest creating a different manifest with special events. The google SDK uses a listener (reactive programming) for those `<Event />` elements to determine whether you've watched an ad or not. 

<h3> YoSpace </h3>

YoSpace don't use SCTE Markers on DAI (they do on Regional). They care about the timestamps over the `<Event />` element as they don't insert their own `<Event />` unlike Google. Two ways of doing the same thing.

<h1> Ad periods and Slates </h1>

Slates are the filler inbetween Ads so that the user gets a seamless experience.

