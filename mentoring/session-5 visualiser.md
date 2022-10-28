Visualizer - Mercury looks at both buffer behind and ahead.

Variant: Variant = ABR = Property on the Adaption Set
Mbps - bitrates - ABR
Which variant to choose

Variant and Bandwidth have a strong correlation - bandwidth drops, variant drops...

Mercury estimates your Bandwidth. 

1.2x speed blows through your buffer, which triggers a drop in bitrate(variant)/resolution

HTTP requests - Manifest and segment requests. Each block is a mp4 or mpd.
Parralilise blocks. 
Yellow line, blue block. Factor in latency (it may take a second for data to come through). Mercury overlaps them 

Memory Heap - JS does the GC - no control, just having a look. If memory leak is introduced, then clear as no dumping of memory. Generation 2, mark, sweep, clean, etc