With so little good learning material out there, video engineers are hard to find. 
The sector is historically between a rock (academia) and hard place (established giants with no intention of sharing IP or knowledge to competitors), so blog posts, tutorials, decent OSS are rare.

This is my futile attempt at building a player - starting with a basic video element and build a UI that reacts to the events and calls the APIs.
then go into MSE/EME

Steps:

Build a basic player first that just loads mp4 files (has to be "big buck bunny" as per tradition) 

<video src="/path/to/file.mp4">

then extend it with MSE and try loading video and audio segments into it
Read them off disk to begin with
Don't need a manifest
Have a play with ffmpeg too
to cut your big mp4 video into audio and video chunks, at different bitrates