from setuptools import setup

setup(
    name='clarity',
    version='0.1',
    data_files=[
        ('etc/jupyter/jupyter_server_config.d', ['etc/jupyter/jupyter_server_config.d./clarity.json']),
    ],
    entry_points= {
        'console_scripts': [
             'jupyter-clarity = clarity.app:main'
        ]
    },
)