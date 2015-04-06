# Youtube Antiadblock
Unbock ads on certain Youtube channels to support the youtubers!
This addon works with AdbockPlus as adbocker. It uses the Firefox SDK.

# How to use it
Just install the addon together with Adbock Plus/Edge.
If you want to unblock a channel, right-click on the channels Thumbnail and a option 
"Adblock Plus: Add channel to whitelist" should appear. To remove a channel form the whitelist,
just click the corresponding "Adblock Plus: Remove Channel from whitelist" option.

# How it works
When you load a video on Youtube, the script scans the HTML content and adds a "&channel=" argument with
the channel-id to the adress. When you add a channel to the whitlist, a filter is added to your AdbockPlus filters, 
which uses the "&channel=" id. To avoid loading the site twice, a module to fix links to videos on youtube was added. 
If you don't like the links you youtube to be modified, you can turn that of in the option menu (about:addons -> 
youtube-antiadblock -> opitions -> uncheck Automatically fix links on Youtube).
