#!/usr/bin/env python3
import http.server
import socketserver
import os
import webbrowser
import sys

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching during development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom log format for Pronto Airways theme
        print(f"✈️  Pronto Airways Server: {format % args}")

def start_server():
    # Change to the script's directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print("🚨" * 30)
            print("✈️  PRONTO AIRWAYS DEVELOPMENT SERVER ✈️")
            print("🚨" * 30)
            print(f"🛫 Server starting on http://localhost:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print("🌐 GitHub Pages compatible structure!")
            print("💰 Additional server fees may apply!")
            print("👑 All requests are PRIORITY requests!")
            print("🚨" * 30)
            print("📋 GitHub Pages Deployment Ready!")
            print("   1. Push to GitHub repository")
            print("   2. Enable GitHub Pages in repo settings")
            print("   3. Select 'main' branch and '/ (root)' folder")
            print("   4. Your site will be live! (Deployment fee: $99.99)")
            print("🚨" * 30)
            print("Press Ctrl+C to stop the server (Stopping fee: $5.99)")
            print()
            
            # Try to open browser automatically
            try:
                webbrowser.open(f'http://localhost:{PORT}')
                print("🌐 Browser opened automatically (Browser opening fee: $2.99)")
            except:
                print(f"🌐 Please open http://localhost:{PORT} in your browser")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n💸 Thank you for using Pronto Airways Server!")
        print("📧 You will be charged $5.99 for server shutdown services.")
        print("🚀 Ready for GitHub Pages deployment!")
        print("✈️ Have a priority day!")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print("💡 Try stopping other servers or change the PORT variable")
            print("🔧 Port change fee: $15.99")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    start_server()
