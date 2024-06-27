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

1. Download the local server script [`smplayer_opener.py`](https://github.com/RachidTagzen/Send-URL-to-SMPlayer/blob/main/smplayer_opener.py) and move it to any location you like.
Otherwise, if you don't want to download, you still have to create this smplayer_opener.py file in the location of your choice, then copy this code there :
    ```
    import sys
    import json
    import subprocess
    
    def send_to_smplayer(url, command, smplayer_path):
        if command:
            full_command = [smplayer_path, '-actions', command, url]
        else:
            full_command = [smplayer_path, url]
    
        # Execute the command and capture the output
        try:
            subprocess.run(full_command, check=True)
            send_message({'status': 'success'})
        except subprocess.CalledProcessError as e:
            send_message({'status': 'error', 'message': str(e)})
    
    def read_message():
        raw_length = sys.stdin.read(4)
        if len(raw_length) == 0:
            sys.exit(0)
        message_length = int.from_bytes(raw_length.encode('utf-8'), byteorder='little')
        message = sys.stdin.read(message_length)
        return json.loads(message)
    
    def send_message(message):
        encoded_message = json.dumps(message).encode('utf-8')
        message_length = len(encoded_message)
        if message_length > 1048576:  # Check if the message exceeds the limit
            message = {'status': 'error', 'message': 'Response too large'}
            encoded_message = json.dumps(message).encode('utf-8')
        sys.stdout.write(len(encoded_message).to_bytes(4, byteorder='little').decode('utf-8'))
        sys.stdout.write(encoded_message.decode('utf-8'))
        sys.stdout.flush()
    
    if __name__ == '__main__':
        try:
            message = read_message()
            url = message.get('url')
            command = message.get('command', '')
            smplayer_path = message.get('smplayerPath', 'smplayer')  # Default to 'smplayer' if not provided
            if url:
                send_to_smplayer(url, command, smplayer_path)
            else:
                send_message({'status': 'error', 'message': 'No URL provided'})
        except Exception as e:
            send_message({'status': 'error', 'message': str(e)})
    ```

> [!IMPORTANT]
> In linux, don't forget to allow executable permissions to the script.
> You can do that using a terminal : `chmod u+x /path/to/smplayer_opener.py`

3.  Create a native messaging host file `send_to_smplayer.json` within the appropriate directory:
    - On Linux ***(Tested)*** : `~/.mozilla/native-messaging-hosts/`
    - On Windows ***(Not Tested)*** : `C:\Users\<your-username>\AppData\Roaming\Mozilla\NativeMessagingHosts\`
3. Copy this JSON script into the `send_to_smplayer.json` file , and replace "`/path/to/smplayer_opener.py`" with the full path of `smplayer_opener.py` : 
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



