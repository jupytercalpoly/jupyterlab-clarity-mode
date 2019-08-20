import $ from 'jquery';

import {
  NotebookPanel,
  NotebookWidgetFactory,
  NotebookModelFactory,
} from '@jupyterlab/notebook';

import { editorServices } from '@jupyterlab/codemirror';

import { ServiceManager } from '@jupyterlab/services';

import { DocumentManager } from '@jupyterlab/docmanager';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { 
  Widget,
  Panel,
  BoxLayout,
} from "@phosphor/widgets";

import {
  RenderMimeRegistry,
  IRenderMimeRegistry,
  standardRendererFactories as initialFactories
} from '@jupyterlab/rendermime';

import { ClarityWidget } from './widget';
import { ClarityHeader } from './header';


function main(): void {
  let manager = new ServiceManager();
  manager.ready.then(() => {
    let rendermime = new RenderMimeRegistry({
      initialFactories: initialFactories
    })
    let opener = {
      open: (widget: Widget) => {
        widget;
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
    docRegistry.addModelFactory(mFactory)
    docRegistry.addWidgetFactory(wFactory);
    let docManager = new DocumentManager({
      registry: docRegistry,
      manager: manager,
      opener
    });
    var notebookPath = $('body').attr('id')
    let nbpanel = docManager.open(notebookPath) as NotebookPanel;
    let clarityWidget = new ClarityWidget(nbpanel);
    let commands = clarityWidget.getCommands();
    let parent = new Widget();
    let layout = (parent.layout = new BoxLayout());
    let header = new ClarityHeader(nbpanel, commands);
    layout.addWidget(header);
    layout.addWidget(clarityWidget);
    let panel = new Panel();
    panel.addWidget(parent);
    Widget.attach(panel, document.body);
    window.addEventListener('resize', () => {
      panel.update();
    });
    header.node.style.minHeight="200px";
  });
}

window.addEventListener('load', main);