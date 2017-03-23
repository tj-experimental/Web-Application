from __future__ import print_function

import os
import webbrowser
import sys

if sys.version_info <= (2, 7):
    import SimpleHTTPServer as HTTPServer
    from SimpleHTTPServer import SimpleHTTPRequestHandler as BaseHTTPRequestHandler
else:
    """Using python 3"""
    from http.server import BaseHTTPRequestHandler, HTTPServer

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# This class will handles any incoming request from
# the browser


class TestHandler(BaseHTTPRequestHandler):
    Error_Page = """\
       <html>
        <body>
          <h1>Error accessing {path}</h1>
          <p>{msg}</p>
        <body>
       </html>
     """

    def __init__(self, request, client_address, server, *args, **kwargs):
        super(TestHandler, self).__init__(request, client_address, server)

    def handle_file(self, full_path, contentType):
        try:
            with open(full_path, 'rb') as reader:
                content = reader.read()
            self.send_content(content, contentType)
        except IOError as msg:
            msg = "'{}' cannot be read: {}".format(full_path, msg)
            self.handle_error(msg, contentType)

    def handle_error(self, msg, contentType):
        content = self.Error_Page.format(path=self.path, msg=msg)
        self.send_content(content, status=404, content_type=contentType)

    def send_content(self, content, content_type, status=200):
        self.send_response(status)
        self.send_header('Content-type', content_type)
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        self.wfile.write(content)

    @staticmethod
    def _content_type(path):
        content_type = 'text/html'
        if path.endswith(".html"):
            content_type = 'text/html'
        if path.endswith(".woff"):
            content_type = 'application/x-font-woff'
        if path.endswith(".jpg"):
            content_type = 'image/jpg'
        if path.endswith(".gif"):
            content_type = 'image/gif'
        if path.endswith(".js"):
            content_type = 'application/javascript'
        if path.endswith(".css"):
            content_type = 'text/css'
        if path.endswith(".png"):
            content_type = 'image/png'
        return content_type

    # Handler for the GET requests
    def do_GET(self):
        if self.path == '/':
            self.path += 'index.html'

        contentType = self._content_type(self.path)

        try:
            # Get the requested element
            # full_path = str(Path(os.getcwd()).parent) + "\index.html"
            full_path = BASE_DIR + self.path  # It doesn't exist
            print(BASE_DIR)
            print(full_path)
            print(self.path)
            if not os.path.exists(full_path):
                raise Exception("'{0}' not found".format(full_path))

            # file exist
            elif os.path.isfile(full_path):
                self.handle_file(full_path, contentType)
            else:
                raise Exception("Unknown Object '{0}'".format(self.path))
        except Exception as msg:
            self.handle_error(msg, contentType)  # Handler for the POST requests

    def do_POST(self):
        contentType = self._content_type(self.path)
        full_path = BASE_DIR + '/purchase/buy.html'
        self.handle_file(full_path, contentType)

    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()


def run(port=None, server_class=HTTPServer, handler_class=TestHandler):
    port = port or 8000
    server_address = ('127.0.0.1', port)
    httpd = server_class(server_address, handler_class)

    return httpd


def run_server(port_number):
    httpd = run(port=port_number)
    try:
        # Create a web server and define the handler to manage the
        # incoming request
        print('Started httpserver on port ', port_number)
        webbrowser.open('http://127.0.0.1:{}'.format(port_number))
        # Wait forever for incoming http requests
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('^C received, shutting down the web server')
        httpd.socket.close()
        raise


def start():
    print('*' * 30)
    print("\nWelcome to your Python Based Web Server\n")
    print("-" * 30)
    print("\nThis is a Locally Hosted Server\n")
    print("-" * 30)
    while True:
        if not len(sys.argv) > 1:
            try:
                user = str(input("Press S to Start >").lower())
                if user == 's':
                    port_number = int(
                        input("\nSelect the port you want the Server >"))
                    if len(str(port_number)) != 4 or port_number == 8080:
                        print("Port Has to be 4 numbers other than 8080")
                        continue
                    elif len(str(port_number)) == 4 and port_number != 8080:
                        run_server(port_number)
                        return None
                    elif user != 's':
                        print("Sorry Not a Valid Choice !!!")
                        continue
            except ValueError:
                print("Sorry that's not a port value")
                continue
            except KeyboardInterrupt:
                break
        # elif '--reload' in sys.argv or '-r' in sys.argv:
        #
        else:
            try:
                port = [arg for arg in sys.argv if '-p' in arg or '--port' in arg]
                if port and len(port) == 1:
                    port_number = int(str(port[0]).split('=')[1])
                elif sys.argv[1:2]:
                    port_number = int(sys.argv[1:2][0])
                else:
                    raise Exception('Port number must be prefixed with '
                                    '-p= or --port=')
                run_server(port_number)
                return None
            except ValueError:
                print("Sorry that's not a port value")
                continue
            except KeyboardInterrupt:
                break

if __name__ == "__main__":
    start()
