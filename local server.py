import http.server
import socketserver
import webbrowser

class WebServer:
        def start(self, PORT):
                try:
                        #Create a web server and define the handler to manage the
                        #incoming request    

                        myHandler = http.server.SimpleHTTPRequestHandler
                        
                        httpd = socketserver.TCPServer(("", PORT), myHandler)
                        print("Started Server on PORT: ", PORT)
                        
                        #Wait forever for incoming http requests
                        httpd.serve_forever()

                except KeyboardInterrupt:
                        print('^C received, shutting down the web server')
                        httpd.socket.close()

        def __init__(self):
                print('*'* 30)
                print("\nWelcome to your Web Server\n")
                print("-" * 30)
                print("\nThis is a Locally Hosted Server\n")
                print("-" * 30)
                count = 0
                while True:
                        user = input("Press S to Start >").lower()
                        if user == 's':
                                while True:
                                        try:
                                                PORT = int(input("Select the port you want the Server >"))
                                                if len(str(PORT)) != 4 or PORT == 8080:
                                                        PORT = 8080
                                                        print("Port Has to be 4 numbers other than 8080")
                                                elif len(str(PORT)) == 4 and PORT != 8080:
                                                        PORT = PORT
                                                        webbrowser.open("http://localhost:"+str(PORT)+"/")
                                                        self.start(PORT)
                                                        return None
                                        except ValueError or TypeError:
                                                print("Sorry Thats not a port value")
                                                continue

                        elif user != 's':
                                print("Sorry Not a Valid Choice !!!")
                                raise
                


