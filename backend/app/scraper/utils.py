from enum import Enum
from urllib.parse import urlencode, urlunsplit

class Base(str, Enum):
    URL = "https://wellfound.com"

    def __str__(self):
        return str(self.value)

class Header(str, Enum):
    PAYLOAD = {"Content-Type": "text/html; charset=UTF-8"}

    def __str__(self):
        return str(self.value)