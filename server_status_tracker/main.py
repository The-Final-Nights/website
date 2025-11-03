import socket, struct

def query(querystring):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    if querystring[0] != "?":
        querystring = "?" + querystring
    query = b"\x00\x83" + struct.pack('>H', len(querystring) + 6) + b"\x00\x00\x00\x00\x00" + querystring.encode() + b"\x00"
    sock.connect(("SERVER IP", 1234)) #2 arguments: server ip in quotes, server port as a number
    sock.sendall(query)
    data = sock.recv(16384)
    sock.close()
    return(data[5:-1].decode())

data = query("?status&format=json")
jf = open("/shared/data.json", "w")
jf.write(data)
jf.close()
