from .app import Clarity

EXTENSION_NAME = "clarity"

def _jupyter_server_extension_paths():
    return [{"module": EXTENSION_NAME}]

load_jupyter_server_extension = Clarity.load_jupyter_server_extension