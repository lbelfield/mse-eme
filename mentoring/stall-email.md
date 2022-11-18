
TL;DR - The Highlight

We’ve added a new stall recovery strategy “drop and cap bitrate” to the Mercury player to improve our stall recovery rate and playback KPIs on web platforms (Chrome, Firefox, Edge). We’ve been in Production with the new strategy for just over a week now and results are in:
 
Stall recovery success rate up from 70% to 95%

Unrecoverable stalls (resulting in a CDN rotation) now occurring between 60% to 90% less frequently
16% reduction in week-on-week connection induced rebuffering ratio
No impact on HD rate + minimal impact on average bitrate 
 
Too complicated, don't worry, I got you covered...
 
What is an Unexpected Stall?
Please note the term freezes and stalls are interchangeable.
 
One of player's main aims is to ensure the user has a smooth playback experience; i.e. I can enjoy watching Man Utd beating Man City uninterrupted. Sometimes despite our best efforts the video freezes and the buffering spinner is shown to the user. Most the time, Mercury understands why the video freezes and we can respond appropriately. Some examples include:
 
The user has seeked to a different time in the video (the user needs different video segments, so we drop what we’ve got and re-buffer)
The user has a poor internet connection and has no video segments left in the buffer 
Mercury is currently awaiting the response of a DRM request
 
Occasionally, the video will freeze unexpectedly, with a healthy buffer and a valid DRM license. This is what Mercury refers to as an Unexpected Stall. Each Mercury target is configured to execute several stall recovery strategies in this scenario that may help to recover playback without triggering a CDN rotation. We track how effectively each platform recovers from stalls and use this to improve our strategy selection over time. Unexpected Stalls happen on every player, but most do nothing to combat or report on them. Having bespoke recovery strategies for Mercury is part our secret sauce which helps it out-perform other players.
 

 
Mercury's Past Strategy for Unexpected Stalls

For web platforms we previously had one strategy "seek forward", where Mercury would jump the content forward by a small period to wake the video. This strategy was successful around 70% of the time on web, resulting in an unrecoverable stall rate of between 3 per 100 sessions and 19 per 100 sessions (a distinctly worse performance than TV platforms that hover around 1.5). Note: An Unexpected Stall could happen multiple times in a single session (once for each CDN) so our value of 3-19 per 100 sessions is DIFFERENT to 3%-19% of sessions. A common pattern we previously saw on web platform is that a user will stall many times, so our 3-19 per 100 sessions value will typically translate to less users with a worse experience overall. Having many unexpected stalls is bad news for us and our users - it increases CDN rotations, our overall rebuffering ratios and fatal errors.


 
The theory behind the “drop and cap bitrate” strategy
As we said earlier, we use Production data to inform future strategies, so what does the data tell us to inform the “drop and cap bitrate” strategy? 
High Unexpected Stall rates are a much worse problem on Desktop web browsers than TVs
Unexpected Stalls will typically occur multiple times in the same session
Stalls are not seen during testing or regular playback with our beefy work machines
Almost 100% of Unexpected Stalls have reported video frames being dropped from the buffer (creating a content gap)

 
What can we infer from these trends?
Unlike TVs, Desktop browsers are kept up-to-date and are easier to support – an MSE/EME issue is an unlikely culprit
The issue is not consistently reproducible, meaning those that must have specific issues with their setup
Desktop devices are perhaps the only we support where there exists uncontrollable external pressure on machine resources – think many open tabs, anti-virus scans, viruses themselves!
The presence of dropped frames in almost every Unexpected Stall indicates an inability to decode content fast enough, likely due to a lack of performance
 
Can’t decode video fast enough - let's cap their bitrate!
If the “seek forward” strategy fails, we now execute the “drop and cap bitrate” strategy as a follow-up. If the user stalls, Mercury is now saying :
Drop the video content I’ve already got. 
Get me content from the variant just below this.
For the duration of this session, do not play any variant with a bitrate as high or higher than the one we stalled on. 
SIDE NOTE: never cap the bitrate below 720p, to ensure the user can still watch in HD, and to ensure we reach our HD rate targets. 
 
So, to summarise our strategies on web platforms:
Old world: if the “seek forward” strategy doesn’t work, then CDN Rotation.
New world: if the “seek forward” strategy doesn’t work, and the “drop and cap bitrate” strategy doesn’t work, then CDN Rotation. 
 
The results (Web only, for now!)
 
We’ve gone from ~70% stall recovery to ~95% stall recovery. 
Logo

 
 
We’ve seen a drastic reduction on Unexpected Stalls per 100 sessions
Yes, you’re reading this graph correctly, the red line represents post Drop/Cap Bitrate change:
Chart


 
 
From the next graph, we drill further into unique sessions and users.
Previously 8% of users would see an average of 3 stalls per sessions. Now 1% of users are seeing 1 stall per session
Issue previously affected up-to 8% of unique sessions on web – now 1% 
Were previously 3x as many stalls as unique sessions – now, it’s almost 1-2-1 (which we can see as the purple and light blue lines are pretty much completely overlapping)
Chart, line chart

 
 
We’ve seen a 16% improvement in our Connection Induced Rebuffering Ratio on Mercury Browsers (in a week where stats are generally down)
A picture containing chart


We’ve seen a 5% improvement in our Connection Induced Rebuffering Ratio on Panasonic (in a week where stats are generally down)