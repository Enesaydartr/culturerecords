import base64
import sys

def write_from_file(target, b64_file):
    with open(b64_file, 'r', encoding='utf-8') as src:
        b64_str = src.read().replace('\n', '').replace('\r', '').strip()
    with open(target, 'wb') as dst:
        dst.write(base64.b64decode(b64_str))
    print(f'Wrote {target} from {b64_file} successfully!')

if __name__ == '__main__':
    write_from_file(sys.argv[1], sys.argv[2])
