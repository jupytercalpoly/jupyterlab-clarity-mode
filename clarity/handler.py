from jupyter_server.extension.handler import ExtensionHandler

class MyExtHandler(ExtensionHandler):
    
    def get_template(self,name):
        return self.settings['clarity_jinja2_env'].get_template(name)

    def get(self):
        # Can get base url with self.settings.get('base_url').
        html = self.render_template("index.html")
        self.write(html)


class PathHandler(ExtensionHandler):
    
    def get_template(self,name):
        return self.settings['clarity_jinja2_env'].get_template(name)

    def get(self, path):
        # Pass input text (path) to the html file.
        html = self.render_template("path.html", path=path)
        self.write(html)

class ErrorHandler(ExtensionHandler):
    
    def get_template(self,name):
        return self.settings['clarity_jinja2_env'].get_template(name)

    def get(self, path):
        html = self.render_template("error.html")
        self.write(html)