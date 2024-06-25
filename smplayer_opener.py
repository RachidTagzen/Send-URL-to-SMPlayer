#!/usr/bin/env python3
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
