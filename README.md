# Send URL to SMPlayer

***Send URL to SMPlayer*** is a Firefox extension that allows you to send the current tab URL to SMPlayer.
This extension is useful for users who frequently watch videos or listen to audio in their browser and want to easily open them in the SMPlayer media player with their preferred playback speed.
It is also useful for users who have installed SMPlayer in a non-standard location and need to set the path to the executable manually.


## Download
[<img src="./assets/firefox_addons.png">](https://addons.mozilla.org/en-US/firefox/addon/send-url-to-smplayer/)

## Features

- Send the current tab URL to SMPlayer with a single click.
- Customize the SMPlayer path or its executable name (assuming that the executable is in the system PATH)
- Customize playback speed via the extension options.
- Notifications to confirm successful URL sending.

## Usage

1. Click the extension icon in the Firefox toolbar, then the current webpage URL will be sent to SMPlayer.
2. Customize playback speed by navigating to the extension options:
    - Right-click the extension icon and select `Manage Extension`.
    - Click on the `Preferences` button, then choose your speed.
    - Click `Save` button to apply the changes.

## Setting Up Local Server Script & Native Messaging

1.Download the local server script [`smplayer_opener.py`](https://github.com/RachidTagzen/Send-URL-to-SMPlayer/blob/main/smplayer_opener.py) and copy it to any location you want.

2. Create `send_to_smplayer.json` a native messaging host file with the following content, and replace "/path/to/smplayer_opener.py" with the path of `smplayer_opener.py`:
    ```json
    {
      "name": "send_to_smplayer",
      "description": "Send URL to SMPlayer",
      "path": "/path/to/smplayer_opener.py",
      "type": "stdio",
      "allowed_extensions": [
        "af5bc4c0-4eec-4b1b-b30b-bd83d16436b9@SendUrlToSMPlayer"
      ]
    }
    ```
3. Move `send_to_smplayer.json` to the appropriate directory:
    - On Linux ***(Tested)*** : `~/.mozilla/native-messaging-hosts/`
    - On Windows ***(Not Tested)*** : `C:\Users\<your-username>\AppData\Roaming\Mozilla\NativeMessagingHosts\`

## Operating Systems

- Linux ***(Tested)***
- Windows ***(Not Tested)***

## Requirements

1. [Firefox Browser](https://www.mozilla.org)
2. [SMPlayer](https://www.smplayer.info/)
3. [Python](https://www.python.org/downloads/)


## Contributing

Contributions are welcome!
Feel free to adjust the content to match your specific needs or preferences. Happy coding!
 Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).



