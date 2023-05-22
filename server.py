import http.server
import socketserver

port = 3000

handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", port), handler) as server:
    print(f"http://localhost:{port}")
    server.serve_forever()
