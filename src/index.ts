import '@jupyterlab/application/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';
import '@jupyterlab/notebook/style/index.css';
import '@jupyterlab/ui-components/style/index.css';
// @import url('~@phosphor/widgets/style/index.css');
// @import url('~@jupyterlab/apputils/style/index.css');
// @import url('~@phosphor/dragdrop/style/index.css');
// @import url('~@jupyterlab/codeeditor/style/index.css');
// @import url('~@jupyterlab/statusbar/style/index.css');
// @import url('~@jupyterlab/rendermime/style/index.css');
// @import url('~@jupyterlab/cells/style/index.css');
// @import url('~@jupyterlab/docregistry/style/index.css');

import '@jupyterlab/notebook/style/base.css';

import {
  NotebookPanel,
  NotebookWidgetFactory,
  NotebookModelFactory
} from '@jupyterlab/notebook';

import { editorServices } from '@jupyterlab/codemirror';

import { ServiceManager } from '@jupyterlab/services';

import { DocumentManager } from '@jupyterlab/docmanager';

import { DocumentRegistry } from '@jupyterlab/docregistry';

// import { MathJaxTypesetter } from '@jupyterlab/mathjax2';

// import { PageConfig } from '@jupyterlab/coreutils';

import { 
  Widget,
  // Panel,
  // PanelLayout 
} from "@phosphor/widgets";

import {
  RenderMimeRegistry,
  IRenderMimeRegistry,
  standardRendererFactories as initialFactories
} from '@jupyterlab/rendermime';

// export class NbWidget extends Widget{
//   constructor(panel:NotebookPanel) {
//     super();
//     this._content = new Panel();
//     let summary = document.createElement('p');
//     this._content.node.appendChild(summary);
//     summary.innerText="? <3";

//     let layout = new PanelLayout();
//     this.layout = layout;
//     layout.addWidget(this._content);
//   }

//   private _content: Panel;

// }

function main(): void {
  let manager = new ServiceManager();
  manager.ready.then(() => {
    let rendermime = new RenderMimeRegistry({
      initialFactories: initialFactories
      // latexTypesetter: new MathJaxTypesetter({
      //   url: PageConfig.getOption('mathjaxUrl'),
      //   config: PageConfig.getOption('mathjaxConfig')
      // })
    })
    let opener = {
      open: (widget: Widget) => {
        console.log(widget);
      }
    };
    let docRegistry = new DocumentRegistry();
    let mFactory = new NotebookModelFactory({});
    let editorFactory = editorServices.factoryService.newInlineEditor;
    let contentFactory = new NotebookPanel.ContentFactory({ editorFactory });
  
    let wFactory = new NotebookWidgetFactory({
      name: 'Notebook',
      modelName: 'notebook',
      fileTypes: ['notebook'],
      defaultFor: ['notebook'],
      preferKernel: true,
      canStartKernel: true,
      rendermime: rendermime as IRenderMimeRegistry,
      contentFactory: contentFactory,
      mimeTypeService: editorServices.mimeTypeService
    });
    docRegistry.addModelFactory(mFactory);
    docRegistry.addWidgetFactory(wFactory);
    let docManager = new DocumentManager({
      registry: docRegistry,
      manager: manager,
      opener
    });
  
    let widg = docManager.open("Untitled1.ipynb") as NotebookPanel;
    //let widg = new NbWidget(nbpanel);
    console.log(widg);
    Widget.attach(widg, document.body);
  });
}

window.addEventListener('load', main);