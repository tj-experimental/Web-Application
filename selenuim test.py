
from localserver import WebServer


def test():
        chromedriver = "./driver/chromedriver"
        browser = webdriver.Chrome(chromedriver)
        WebServer()
        browser.get("https://localhost:1111")
        assert 'Web App' in browser.title
        
        browser.quit()
        print("PASSED!!")
test()
