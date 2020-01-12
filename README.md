# twitch-commercial-information

System to display preroll free time left as an overlay within OBS or your selected broadcasting software. The admin page must be used to run the commerical or the overlay will not receive the message that an ad was run.

There is a small server based element which is a dotnet core 3.1 signalR server. If you do not want to use the admin page there are options to just send a message to the signalR server. 

## Future plans

1.  API so instead of sending message via signalR it can be done RESTfully. This has the advatange of being able to integrate into more systems as signalR is not everywhere
1. Better admin interface
1. Streamdeck integration
1. Warning audio cue 1 minute before pre-roll end

