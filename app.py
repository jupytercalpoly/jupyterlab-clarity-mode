from jupyter_server.extensionapp import ExtensionApp
from .extension import load_jupyter_server_extension

class Clarity(ExtensionApp):
  name = 'clarity'
  description = 'Clarity server extension as a Jupyter app.'
  load_jupyter_server_extension = staticmethod(load_jupyter_server_extension)

  def init_server_extensions(self):
    super().init_server_extensions()
    if not self.nbserver_extensions.get('simplest_notebook', False):
      load_jupyter_server_extension(self)
