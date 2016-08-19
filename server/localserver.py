from http.server import BaseHTTPRequestHandler, HTTPServer
import socketserver
import webbrowser
import os
from os import curdir, sep
from pathlib import Path

#This class will handles any incoming request from
#the browser 
Handler = BaseHTTPRequestHandler
class myHandler(Handler):
     Error_Page = """\
       <html>
        <body>
          <h1>Error accessing {path}</h1>
          <p>{msg}</p>
        <body>
       </html>
     """
               
     def handle_file(self, full_path):
          try:    
               with open(full_path, 'rb') as reader:
                    content = reader.read()
               self.send_content(content)
          except IOError as msg:
               msg = "'{}' cannot be read: {}".format(self.path, msg)
               self.handle_error(msg)
               
     def handle_error(self, msg):
          content = self.Error_Page.format(path=self.path, msg=msg)
          self.send_content(content,status=404)

     def send_content(self, content, status=200):
          self.send_response(status)               
          self.send_header('Content-type','text/html')
          self.send_header('Content-Length', str(len(content)))
          self.end_headers()
          self.wfile.write(content)
                    
     #Handler for the GET requests
     def do_GET(self):            
          try:
##               if self.path.endswith(".html"):
##                    contentType = 'text/html'
##               if self.path.endswith(".jpg"):
##                    contentType = 'image/jpg'
##               if self.path.endswith(".gif"):
##                    contentType = 'image/gif'
##               if self.path.endswith(".js"):
##                    contentType = 'application/javascript'
##               if self.path.endswith(".css"):
##                    contentType = 'text/css'
##               if self.path.endswith(".png"):
##                    contentType = 'image/png'
               ##Get the requested element
               full_path = str(Path(os.getcwd()).parent) + "\index.html"

               # It doesn't exist
               if not os.path.exists(full_path):
                   raise ServerException("'{0}' not found".format(self.path))

               # file exist
               elif os.path.isfile(full_path):
                   self.handle_file(full_path)

               else:
                   raise ServerException("Unknown Object '{0}'".format(self.path))
               
          except Exception as msg:
               self.handle_error(msg)
               
     #Handler for the POST requests
     def do_POST(self):
          self.send_content(content="Not Defined Yet")

     def do_HEAD(self):
          self.send_response(200)
          self.send_header('Content-type','text/html')
          self.end_headers()

          
def run_server(PORT_NUMBER):
     try:
          #Create a web server and define the handler to manage the
          #incoming request
          address = ('', PORT_NUMBER)
          httpd = HTTPServer(address, myHandler)
          print ('Started httpserver on port ' , PORT_NUMBER)
          webbrowser.open("http://localhost:"+str(PORT_NUMBER)+"/")
          #Wait forever for incoming htto requests
          httpd.serve_forever()

     except KeyboardInterrupt:
             print('^C received, shutting down the web server')
             httpd.socket.close()     

def start():
      print('*'* 30)
      print("\nWelcome to your Python Based Web Server\n")
      print("-" * 30)
      print("\nThis is a Locally Hosted Server\n")
      print("-" * 30)
      count = 0
      while True:
           try:
                user = str(input("Press S to Start >").lower())
                if user == 's':
                     PORT_NUMBER = int(input("\nSelect the port you want the Server >"))
                     if len(str(PORT_NUMBER)) != 4 or PORT_NUMBER == 8080:
                          print("Port Has to be 4 numbers other than 8080")
                          continue
                     elif len(str(PORT_NUMBER)) == 4 and PORT_NUMBER != 8080:                                                                         
                          run_server(PORT_NUMBER)
                          return None
                     elif user != 's':
                          print("Sorry Not a Valid Choice !!!")
                          continue
           except ValueError:
               print("Sorry Thats not a port value")
               continue

if __name__ == "__main__":
     start()
