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
  BoxLayout,
} from "@phosphor/widgets";

import {
  RenderMimeRegistry,
  IRenderMimeRegistry,
  standardRendererFactories as initialFactories
} from '@jupyterlab/rendermime';

import { ClarityWidget } from './widget';
import { ClarityHeader } from './header';
import '../styles/index.css';

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
    let header = new ClarityHeader(nbpanel,commands);
    let toolbar = clarityWidget.getToolbar();

    let panel = new Widget();
    panel.addClass("clarity-container");
    let rootLayout = new BoxLayout({direction:"top-to-bottom"});
    panel.layout = rootLayout;
    BoxLayout.setStretch(header,0);
    BoxLayout.setStretch(clarityWidget,1);
    rootLayout.addWidget(header);
    rootLayout.addWidget(clarityWidget);

    Widget.attach(panel, document.body);
    Widget.attach(toolbar, clarityWidget.node);
    window.addEventListener('resize', () => {
      panel.update();
    });
  });
}

window.addEventListener('load', main);