"""Tiny static server: picks the next free port if 8000 is busy."""
import http.server
import socketserver

port = 8000
while True:
    try:
        server = socketserver.TCPServer(("", port), http.server.SimpleHTTPRequestHandler)
        break
    except OSError:
        port += 1

print(f"Serving at http://localhost:{port}")
with server:
    server.serve_forever()
