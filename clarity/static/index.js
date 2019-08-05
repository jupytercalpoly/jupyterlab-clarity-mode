"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@jupyterlab/application/style/index.css");
require("@jupyterlab/theme-light-extension/style/index.css");
require("@jupyterlab/notebook/style/index.css");
require("@jupyterlab/ui-components/style/index.css");
// @import url('~@phosphor/widgets/style/index.css');
// @import url('~@jupyterlab/apputils/style/index.css');
// @import url('~@phosphor/dragdrop/style/index.css');
// @import url('~@jupyterlab/codeeditor/style/index.css');
// @import url('~@jupyterlab/statusbar/style/index.css');
// @import url('~@jupyterlab/rendermime/style/index.css');
// @import url('~@jupyterlab/cells/style/index.css');
// @import url('~@jupyterlab/docregistry/style/index.css');
require("@jupyterlab/notebook/style/base.css");
const notebook_1 = require("@jupyterlab/notebook");
const codemirror_1 = require("@jupyterlab/codemirror");
const services_1 = require("@jupyterlab/services");
const docmanager_1 = require("@jupyterlab/docmanager");
const docregistry_1 = require("@jupyterlab/docregistry");
// import { MathJaxTypesetter } from '@jupyterlab/mathjax2';
// import { PageConfig } from '@jupyterlab/coreutils';
const widgets_1 = require("@phosphor/widgets");
const rendermime_1 = require("@jupyterlab/rendermime");
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
function main() {
    let manager = new services_1.ServiceManager();
    manager.ready.then(() => {
        let rendermime = new rendermime_1.RenderMimeRegistry({
            initialFactories: rendermime_1.standardRendererFactories
            // latexTypesetter: new MathJaxTypesetter({
            //   url: PageConfig.getOption('mathjaxUrl'),
            //   config: PageConfig.getOption('mathjaxConfig')
            // })
        });
        let opener = {
            open: (widget) => {
                console.log(widget);
            }
        };
        let docRegistry = new docregistry_1.DocumentRegistry();
        let mFactory = new notebook_1.NotebookModelFactory({});
        let editorFactory = codemirror_1.editorServices.factoryService.newInlineEditor;
        let contentFactory = new notebook_1.NotebookPanel.ContentFactory({ editorFactory });
        let wFactory = new notebook_1.NotebookWidgetFactory({
            name: 'Notebook',
            modelName: 'notebook',
            fileTypes: ['notebook'],
            defaultFor: ['notebook'],
            preferKernel: true,
            canStartKernel: true,
            rendermime: rendermime,
            contentFactory: contentFactory,
            mimeTypeService: codemirror_1.editorServices.mimeTypeService
        });
        docRegistry.addModelFactory(mFactory);
        docRegistry.addWidgetFactory(wFactory);
        let docManager = new docmanager_1.DocumentManager({
            registry: docRegistry,
            manager: manager,
            opener
        });
        let widg = docManager.open("Untitled1.ipynb");
        //let widg = new NbWidget(nbpanel);
        console.log(widg);
        widgets_1.Widget.attach(widg, document.body);
    });
}
window.addEventListener('load', main);
