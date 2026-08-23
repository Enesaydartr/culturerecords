import base64
import sys

def decode(b64_file, out_file):
    with open(b64_file, 'r', encoding='utf-8') as f:
        data = f.read().replace('\n', '').strip()
    with open(out_file, 'wb') as f:
        f.write(base64.b64decode(data))
    print(f'Successfully wrote {out_file}')

if __name__ == '__main__':
    decode(sys.argv[1], sys.argv[2])
