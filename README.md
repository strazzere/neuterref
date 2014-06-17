Google Chrome Extension to neuter referrer information that might be leaking

-------------

This extension simply checks if the domain is currently gmail, if so it will attempt to kill any outbound
links that are no to gmail using a "noreferrer" tag. A second mode of this is the "sensitive domains" which
will neuter out bound links for these domains.

The attempt it to stop leaking meta data from the browser of where you are coming from. While this is
_extremely_ not a fool proof method and it should already be done/set other ways - this is a "safety" net
for when the other methods fail... Which they do... And which this one might fail as well.

To install you should enable developer tools and load the unpacked extension, test it - add the sensitive
domains you want, test it again. Then you can pack it yourself. There is no packed extension since that
would encourage people to not properly add domains.