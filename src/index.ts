import '@jupyterlab/application/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';
import '@jupyterlab/notebook/style/index.css';
import '../styles/notebook.css';
import '../styles/index.css';
//import '@jupyterlab/ui-components/style/index.css';

import '@jupyterlab/notebook/style/base.css';

import {
  NotebookPanel,
  NotebookWidgetFactory,
  NotebookModelFactory,
  // NotebookActions
} from '@jupyterlab/notebook';

import { editorServices } from '@jupyterlab/codemirror';

import { ServiceManager } from '@jupyterlab/services';

import { DocumentManager } from '@jupyterlab/docmanager';

import { DocumentRegistry } from '@jupyterlab/docregistry';

//import { CommandRegistry } from '@phosphor/commands';

// import { MathJaxTypesetter } from '@jupyterlab/mathjax2';

// import { PageConfig } from '@jupyterlab/coreutils';

import { 
  Widget,
  Panel,
  //PanelLayout 
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
    docRegistry.addModelFactory(mFactory);
    docRegistry.addWidgetFactory(wFactory);
    let docManager = new DocumentManager({
      registry: docRegistry,
      manager: manager,
      opener
    });
    //let commands = new CommandRegistry();
    let widg = docManager.open("Untitled1.ipynb") as NotebookPanel;
    //let widg = new NbWidget(nbpanel);
    //commands = addCommands(commands, widg,manager);
    //commands = addShortcuts(commands);
    let sup = new Panel();
    sup.addClass("notebook-super-container");
    sup.addWidget(widg);
    Widget.attach(sup, document.body);
  });
}

// function addCommands(commands: CommandRegistry, nbWidget: NotebookPanel, serviceManager: ServiceManager) {

//   // Add commands.
//   commands.addCommand(CmdIds.invokeNotebook, {
//     label: 'Invoke Notebook',
//     execute: () => {
//       if (nbWidget.content.activeCell.model.type === 'code') {
//         return commands.execute(CmdIds.invoke);
//       }
//     }
//   });
//   commands.addCommand(CmdIds.selectNotebook, {
//     label: 'Select Notebook',
//     execute: () => {
//       if (nbWidget.content.activeCell.model.type === 'code') {
//         return commands.execute(CmdIds.select);
//       }
//     }
//   });
//   commands.addCommand(CmdIds.save, {
//     label: 'Save',
//     execute: () => nbWidget.context.save()
//   });
//   commands.addCommand(CmdIds.interrupt, {
//     label: 'Interrupt',
//     execute: () => {
//       if (nbWidget.context.session.kernel) {
//         nbWidget.context.session.kernel.interrupt();
//       }
//     }
//   });
//   commands.addCommand(CmdIds.restart, {
//     label: 'Restart Kernel',
//     execute: () => nbWidget.context.session.restart()
//   });
//   commands.addCommand(CmdIds.switchKernel, {
//     label: 'Switch Kernel',
//     execute: () => nbWidget.context.session.selectKernel()
//   });
//   commands.addCommand(CmdIds.runAndAdvance, {
//     label: 'Run and Advance',
//     execute: () => {
//       NotebookActions.runAndAdvance(
//         nbWidget.content,
//         nbWidget.context.session
//       );
//     }
//   });
//   commands.addCommand(CmdIds.restartAndRunAll, {
//     label: 'Restart Kernel & Run All Cells',
//     execute: () => {
//       nbWidget.context.session.restart().then(() => {
//         NotebookActions.runAll(nbWidget.content, nbWidget.context.session);
//       });
//     }
//   });
//   commands.addCommand(CmdIds.editMode, {
//     label: 'Edit Mode',
//     execute: () => {
//       nbWidget.content.mode = 'edit';
//     }
//   });
//   commands.addCommand(CmdIds.commandMode, {
//     label: 'Command Mode',
//     execute: () => {
//       nbWidget.content.mode = 'command';
//     }
//   });
//   commands.addCommand(CmdIds.selectBelow, {
//     label: 'Select Below',
//     execute: () => NotebookActions.selectBelow(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.selectAbove, {
//     label: 'Select Above',
//     execute: () => NotebookActions.selectAbove(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.extendAbove, {
//     label: 'Extend Above',
//     execute: () => NotebookActions.extendSelectionAbove(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.extendBelow, {
//     label: 'Extend Below',
//     execute: () => NotebookActions.extendSelectionBelow(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.insertAbove, {
//     label: 'Insert Above',
//     execute: () => NotebookActions.insertAbove(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.insertBelow, {
//     label: 'Insert Below',
//     execute: () => NotebookActions.insertBelow(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.split, {
//     label: 'Split Cell',
//     execute: () => NotebookActions.splitCell(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.undo, {
//     label: 'Undo',
//     execute: () => NotebookActions.undo(nbWidget.content)
//   });
//   commands.addCommand(CmdIds.redo, {
//     label: 'Redo',
//     execute: () => NotebookActions.redo(nbWidget.content)
//   });
//   commands.addCommand('notebook:download', {
//     label: 'Download Notebook',
//     execute: () => {
//       serviceManager.contents
//         .getDownloadUrl("Untitled1.ipynb")
//         .then((url:any) => {
//           window.open(url, '_blank');
//         });
//     }
//   });
//   return commands;
// };

// const CmdIds = {
//   invoke: 'completer:invoke',
//   select: 'completer:select',
//   invokeNotebook: 'completer:invoke-notebook',
//   selectNotebook: 'completer:select-notebook',
//   save: 'notebook:save',
//   download: 'notebook:download',
//   interrupt: 'notebook:interrupt-kernel',
//   restart: 'notebook:restart-kernel',
//   switchKernel: 'notebook:switch-kernel',
//   runAndAdvance: 'notebook-cells:run-and-advance',
//   restartAndRunAll: 'notebook:restart-and-run-all',
//   deleteCell: 'notebook-cells:delete',
//   selectAbove: 'notebook-cells:select-above',
//   selectBelow: 'notebook-cells:select-below',
//   extendAbove: 'notebook-cells:extend-above',
//   extendBelow: 'notebook-cells:extend-below',
//   insertAbove: 'notebook-cells:insert-above',
//   insertBelow: 'notebook-cells:insert-below',
//   editMode: 'notebook:edit-mode',
//   merge: 'notebook-cells:merge',
//   split: 'notebook-cells:split',
//   commandMode: 'notebook:command-mode',
//   undo: 'notebook-cells:undo',
//   redo: 'notebook-cells:redo'
// };

// function addShortcuts(commands: CommandRegistry) {
//   const completerActive = '.jp-mod-completer-active';
//   const editModeWithCompleter =
//     '.jp-Notebook.jp-mod-editMode .jp-mod-completer-enabled';
//   const all = '.jp-Notebook';
//   const commandMode = '.jp-Notebook.jp-mod-commandMode:focus';
//   const editMode = '.jp-Notebook.jp-mod-editMode';
//   let bindings = [
//     // Tab / code completor shortcuts
//     {
//       selector: editModeWithCompleter,
//       keys: ['Tab'],
//       command: CmdIds.invokeNotebook
//     },
//     {
//       selector: completerActive,
//       keys: ['Enter'],
//       command: CmdIds.selectNotebook
//     },
//     // General shortcut available at all times
//     { selector: all, keys: ['Shift Enter'], command: CmdIds.runAndAdvance },
//     { selector: all, keys: ['Accel S'], command: CmdIds.save }
//   ];
//   const editModeShortcuts = [
//     // Shortcuts available in edit mode
//     { keys: ['Ctrl Shift -'], command: CmdIds.split },
//     { keys: ['Escape'], command: CmdIds.commandMode }
//   ];

//   const commandModeShortcuts = [
//     // Kernel related shortcuts
//     { keys: ['I', 'I'], command: CmdIds.interrupt },
//     { keys: ['0', '0'], command: CmdIds.restart },
//     // Cell operation shortcuts
//     { keys: ['Enter'], command: CmdIds.editMode },
//     { keys: ['Shift M'], command: CmdIds.merge },
//     { keys: ['Shift K'], command: CmdIds.extendAbove },
//     { keys: ['Shift J'], command: CmdIds.extendBelow },
//     { keys: ['A'], command: CmdIds.insertAbove },
//     { keys: ['B'], command: CmdIds.insertBelow },
//     { keys: ['R', 'R'], command: CmdIds.restartAndRunAll },
//     // Cell movement shortcuts
//     { keys: ['J'], command: CmdIds.selectBelow },
//     { keys: ['ArrowDown'], command: CmdIds.selectBelow },
//     { keys: ['K'], command: CmdIds.selectAbove },
//     { keys: ['ArrowUp'], command: CmdIds.selectAbove },
//     // Other shortcuts
//     { keys: ['Z'], command: CmdIds.undo },
//     { keys: ['Y'], command: CmdIds.redo }
//   ];
//   commandModeShortcuts.map(binding =>
//     commands.addKeyBinding({ selector: commandMode, ...binding })
//   );
//   editModeShortcuts.map(binding =>
//     commands.addKeyBinding({ selector: editMode, ...binding })
//   );
//   bindings.map(binding => commands.addKeyBinding(binding));
//   return commands;
// };

window.addEventListener('load', main);