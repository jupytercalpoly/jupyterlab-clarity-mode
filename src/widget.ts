import '@jupyterlab/application/style/index.css';
import '@jupyterlab/theme-light-extension/style/index.css';
import '@jupyterlab/notebook/style/index.css';
import '@jupyterlab/notebook/style/base.css';
import '../styles/notebook.css';
import '../styles/index.css';

import {
  NotebookPanel,
  NotebookActions,
  Notebook
} from '@jupyterlab/notebook';

import { CommandRegistry } from '@phosphor/commands';

import { 
  Widget,
  BoxLayout
} from "@phosphor/widgets";

import { Toolbar } from '@jupyterlab/apputils';

export class ClarityWidget extends Widget {

  constructor(nbWidget:NotebookPanel) {
    super();
    this.commands = new CommandRegistry();
    this.nbWidget = nbWidget;
    this.addCommands();
    this.addShortcuts(); 
    this.layout = new BoxLayout({spacing:0, direction:"top-to-bottom"});
    this.setup();
    this._content;
    this._toolbar;
  }

  setup = () => {
    let layout = this.layout as BoxLayout;
    this.addClass("notebook-super-container"); 
    this.addClass("jp-MainAreaWidget");
    this.addClass("jp-Document");
    this.addClass("jp-NotebookPanel");  
    let children = this.nbWidget.children();
    const toolbar = (this._toolbar = children.next() as Toolbar);    
    //let toolChild = tools.children();
    //let tool = toolChild.next();
    // while (!tool.node.className.includes("jp-KernelName")) {
    //   tool = toolChild.next();
    // } 
    const content = (this._content = children.next() as Notebook);
    BoxLayout.setStretch(toolbar, 0);
    BoxLayout.setStretch(content, 1);
    layout.addWidget(toolbar);
    layout.addWidget(content);
    window.setTimeout(function () {
      content.node.focus();
      content.activeCell.node.focus();
    }, 0);
    document.addEventListener(
      'keydown',
      event => {
        this.commands.processKeydownEvent(event);
      },
      true
    );
  }
  
  addShortcuts = () =>{
    let commands = this.commands;
    const completerActive = '.jp-mod-completer-active';
    const editModeWithCompleter =
      '.jp-Notebook.jp-mod-editMode .jp-mod-completer-enabled';
    const all = '.jp-Notebook';
    const commandMode = '.jp-Notebook.jp-mod-commandMode:focus';
    const editMode = '.jp-Notebook.jp-mod-editMode';
    let bindings = [
      // Tab / code completor shortcuts
      {
        selector: editModeWithCompleter,
        keys: ['Tab'],
        command: CmdIds.invokeNotebook
      },
      {
        selector: completerActive,
        keys: ['Enter'],
        command: CmdIds.selectNotebook
      },
      // General shortcut available at all times
      { selector: all, keys: ['Shift Enter'], command: CmdIds.runAndAdvance },
    ];
    const editModeShortcuts = [
      // Shortcuts available in edit mode
      { keys: ['Ctrl Shift -'], command: CmdIds.split },
      { keys: ['Escape'], command: CmdIds.commandMode }
    ];
  
    const commandModeShortcuts = [
      // Kernel related shortcuts
      { keys: ['I', 'I'], command: CmdIds.interrupt },
      { keys: ['0', '0'], command: CmdIds.restart },
      // Cell operation shortcuts
      { keys: ['Enter'], command: CmdIds.editMode },
      { keys: ['Shift M'], command: CmdIds.merge },
      { keys: ['Shift K'], command: CmdIds.extendAbove },
      { keys: ['Shift J'], command: CmdIds.extendBelow },
      { keys: ['A'], command: CmdIds.insertAbove },
      { keys: ['B'], command: CmdIds.insertBelow },
      { keys: ['R', 'R'], command: CmdIds.restartAndRunAll },
      { keys: ['D', 'D'], command: CmdIds.deleteCell },
      // Cell movement shortcuts
      { keys: ['J'], command: CmdIds.selectBelow },
      { keys: ['ArrowDown'], command: CmdIds.selectBelow },
      { keys: ['K'], command: CmdIds.selectAbove },
      { keys: ['ArrowUp'], command: CmdIds.selectAbove },
      // Other shortcuts
      { keys: ['Z'], command: CmdIds.undo },
      { keys: ['Y'], command: CmdIds.redo }
    ];
    commandModeShortcuts.map(binding =>
      commands.addKeyBinding({ selector: commandMode, ...binding })
    );
    editModeShortcuts.map(binding =>
      commands.addKeyBinding({ selector: editMode, ...binding })
    );
    bindings.map(binding => commands.addKeyBinding(binding));
    return commands;
  }

  addCommands = () => {
    let commands = this.commands;
    let nbWidget = this.nbWidget;
    commands.addCommand(CmdIds.invokeNotebook, {
      label: 'Invoke Notebook',
      execute: () => {
        if (nbWidget.content.activeCell.model.type === 'code') {
          return commands.execute(CmdIds.invoke);
        }
      }
    });
    commands.addCommand(CmdIds.selectNotebook, {
      label: 'Select Notebook',
      execute: () => {
        if (nbWidget.content.activeCell.model.type === 'code') {
          return commands.execute(CmdIds.select);
        }
      }
    });
    commands.addCommand(CmdIds.save, {
      label: 'Save',
      execute: () => nbWidget.context.save()
    });
    commands.addCommand(CmdIds.interrupt, {
      label: 'Interrupt',
      execute: () => {
        if (nbWidget.context.session.kernel) {
          nbWidget.context.session.kernel.interrupt();
        }
      }
    });
    commands.addCommand(CmdIds.restart, {
      label: 'Restart Kernel',
      execute: () => nbWidget.context.session.restart()
    });
    commands.addCommand(CmdIds.switchKernel, {
      label: 'Switch Kernel',
      execute: () => nbWidget.context.session.selectKernel()
    });
    commands.addCommand(CmdIds.runAndAdvance, {
      label: 'Run and Advance',
      execute: () => {
        NotebookActions.runAndAdvance(
          nbWidget.content,
          nbWidget.context.session
        );
      }
    });
    commands.addCommand(CmdIds.restartAndRunAll, {
      label: 'Restart Kernel & Run All Cells',
      execute: () => {
        nbWidget.context.session.restart().then(() => {
          NotebookActions.runAll(nbWidget.content, nbWidget.context.session);
        });
      }
    });
    commands.addCommand(CmdIds.editMode, {
      label: 'Edit Mode',
      execute: () => {
        nbWidget.content.mode = 'edit';
      }
    });
    commands.addCommand(CmdIds.commandMode, {
      label: 'Command Mode',
      execute: () => {
        nbWidget.content.mode = 'command';
      }
    });
    commands.addCommand(CmdIds.selectBelow, {
      label: 'Select Below',
      execute: () => NotebookActions.selectBelow(nbWidget.content)
    });
    commands.addCommand(CmdIds.selectAbove, {
      label: 'Select Above',
      execute: () => NotebookActions.selectAbove(nbWidget.content)
    });
    commands.addCommand(CmdIds.extendAbove, {
      label: 'Extend Above',
      execute: () => NotebookActions.extendSelectionAbove(nbWidget.content)
    });
    commands.addCommand(CmdIds.extendBelow, {
      label: 'Extend Below',
      execute: () => NotebookActions.extendSelectionBelow(nbWidget.content)
    });
    commands.addCommand(CmdIds.insertAbove, {
      label: 'Insert Above',
      execute: () => NotebookActions.insertAbove(nbWidget.content)
    });
    commands.addCommand(CmdIds.insertBelow, {
      label: 'Insert Below',
      execute: () => NotebookActions.insertBelow(nbWidget.content)
    });
    commands.addCommand(CmdIds.split, {
      label: 'Split Cell',
      execute: () => NotebookActions.splitCell(nbWidget.content)
    });
    commands.addCommand(CmdIds.undo, {
      label: 'Undo',
      execute: () => NotebookActions.undo(nbWidget.content)
    });
    commands.addCommand(CmdIds.redo, {
      label: 'Redo',
      execute: () => NotebookActions.redo(nbWidget.content)
    });
    commands.addCommand(CmdIds.deleteCell, {
      label: 'Delete Cell',
      execute: () => NotebookActions.deleteCells(nbWidget.content)
    });
    return commands;
  }

  private commands: CommandRegistry;
  private nbWidget: NotebookPanel;
  private _toolbar: Toolbar;
  private _content: Notebook;
}

const CmdIds = {
  invoke: 'completer:invoke',
  select: 'completer:select',
  invokeNotebook: 'completer:invoke-notebook',
  selectNotebook: 'completer:select-notebook',
  save: 'notebook:save',
  download: 'notebook:download',
  interrupt: 'notebook:interrupt-kernel',
  restart: 'notebook:restart-kernel',
  switchKernel: 'notebook:switch-kernel',
  runAndAdvance: 'notebook-cells:run-and-advance',
  restartAndRunAll: 'notebook:restart-and-run-all',
  deleteCell: 'notebook-cells:delete',
  selectAbove: 'notebook-cells:select-above',
  selectBelow: 'notebook-cells:select-below',
  extendAbove: 'notebook-cells:extend-above',
  extendBelow: 'notebook-cells:extend-below',
  insertAbove: 'notebook-cells:insert-above',
  insertBelow: 'notebook-cells:insert-below',
  editMode: 'notebook:edit-mode',
  merge: 'notebook-cells:merge',
  split: 'notebook-cells:split',
  commandMode: 'notebook:command-mode',
  undo: 'notebook-cells:undo',
  redo: 'notebook-cells:redo'
};