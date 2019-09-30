# JupyterLab Clarity Mode
Clarity mode is a single-notebook interface built with existing JupyterLab components.

To install:

1. Clone this repository
2. Ensure you have installed jupyter-server (```pip install jupyter-server```)
3. Run 
```
pip install -e .
npm install
npm run build
jupyter clarity
```
4. In the URL, enter /clarity/path + the path to a notebook, e.g. localhost:8888/clarity/path/mynotebook.ipynb 
