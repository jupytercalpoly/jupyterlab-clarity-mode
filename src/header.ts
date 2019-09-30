import { 
  Widget, 
  PanelLayout, 
  Menu,
  MenuBar,
} from '@phosphor/widgets';

import { 
  NotebookPanel,
  ToolbarItems
 } from '@jupyterlab/notebook';

import { CommandRegistry } from '@phosphor/commands';

import { DocumentManager } from '@jupyterlab/docmanager';

export class ClarityHeader extends Widget {
  constructor(nbWidget:NotebookPanel, commands: CommandRegistry, docManager: DocumentManager) {
    super();
    this.addClass("clarity-header");
    this.nbWidget = nbWidget;
    let run = this.addRunAll(commands);
    let div1 = document.createElement("div")
    div1.appendChild(run.node);
    let items = ToolbarItems.getDefaultItems(this.nbWidget);
    let ignore = ['kernelName','kernelStatus']
    let div2 = document.createElement("div");
    let title = this.addTitle();
    let menu = new ClarityMenu(nbWidget, commands, docManager);
    div2.appendChild(title);
    this.node.appendChild(div2);
    this.node.appendChild(div1);
    const layout = (this.layout = new PanelLayout());
    layout.addWidget(menu);
    items.forEach(({ name, widget: item }) => {
      if (ignore.indexOf(name) >= 0) {
        if ("kernelStatus".indexOf(name) >=0) {
          item.addClass("clarity-kernel");
        } else {
          item.addClass("kernel-2");
        }
        layout.addWidget(item);
      }
    });
  }

  addTitle = () => {
    let title:string=this.nbWidget.title.label;
    let text = document.createElement('p');
    text.className = "my-header";
    let node = document.createTextNode(title);
    text.appendChild(node);
    return text;
  }

  addRunAll = (commands:CommandRegistry) => {
    let runAll = new RunAll(commands);
    return runAll;
  }

  addKernelStatus = () => {
    let items = ToolbarItems.getDefaultItems(this.nbWidget);
    let ignore = ['kernelName','kernelStatus']
    items.forEach(({ name, widget: item }) => {
      if (ignore.indexOf(name) >= 0) {
        if ("kernelStatus".indexOf(name) >=0) {
          item.addClass("clarity-kernel");
          return item;
        }
      }
    });
  }

  private nbWidget:NotebookPanel;
}

export class ClarityMenu extends Widget {
  constructor(nbWidget: NotebookPanel, commands: CommandRegistry, docManager: DocumentManager) {
    super();
    this.nbWidget = nbWidget;
    this.commands = commands;
    this.docManager = docManager;
    const layout = (this.layout = new PanelLayout());
    const menu = this.activate();
    layout.addWidget(menu);
  }

  activate = () => {
    let menu = new MenuBar();
    menu.id = 'jp-MainMenu';
    menu = this.createMenus(menu);
    return menu;
  }

  addLogo = () => {
    let layout = this.layout as PanelLayout;
    let logo = new Widget();
    logo.addClass('jp-MainAreaPortraitIcon');
    logo.addClass('jp-JupyterIcon');
    logo.addClass('clarity-icon');
    logo.id = 'jp-MainLogo';
    layout.addWidget(logo);
  }

  createMenus = (menu: MenuBar) => {
    let commands = this.commands as CommandRegistry;
    commands.addCommand('docmanager:rename', {
      label: 'Rename',
      mnemonic: 0,
      execute: () => {
        this.docManager;
        this.nbWidget.context.path;
        // const oldPath = PathExt.join(this._model.path, original);
        // const newPath = PathExt.join(this._model.path, newName);
        // this.docManager.rename(oldPath, newPath);
      }
    });
    const filemenu = new Menu({ commands: this.commands });
    filemenu.title.label = "File";
    filemenu.addItem({command: "notebook:save"});
    filemenu.addItem({command:'docmanager:rename'});
    menu.addMenu(filemenu);
    const editmenu = new Menu({ commands: this.commands });
    editmenu.title.label = "Edit";
    editmenu.addItem({command: "notebook-cells:undo"});
    editmenu.addItem({command: "notebook-cells:redo"});
    editmenu.addItem({command: "notebook:copy-cell"});
    editmenu.addItem({command: "notebook:paste-cell-below"});
    editmenu.addItem({command: "notebook:find"});
    menu.addMenu(editmenu);


    return menu;
  }

  private nbWidget: NotebookPanel;
  private docManager: DocumentManager;
  private commands: CommandRegistry;
}

export class RunAll extends Widget {
  constructor(commands:CommandRegistry){
    super();
    this.commands = commands;
    this.addClass("clarity-runall");
    this.node.innerText = "▶ Run All Cells";
    this.node.addEventListener('mousedown', this.onClick, true);
  }

  onClick = ()=> {
    this.commands.execute("notebook:run-all-cells");
  }

  private commands:CommandRegistry;
}


export namespace CommandIDs {
  export const openEdit = 'editmenu:open';

  export const undo = 'editmenu:undo';

  export const redo = 'editmenu:redo';

  export const clearCurrent = 'editmenu:clear-current';

  export const clearAll = 'editmenu:clear-all';

  export const find = 'editmenu:find';

  export const goToLine = 'editmenu:go-to-line';

  export const openFile = 'filemenu:open';

  export const closeAndCleanup = 'filemenu:close-and-cleanup';

  export const createConsole = 'filemenu:create-console';

  export const openKernel = 'kernelmenu:open';

  export const interruptKernel = 'kernelmenu:interrupt';

  export const restartKernel = 'kernelmenu:restart';

  export const restartKernelAndClear = 'kernelmenu:restart-and-clear';

  export const changeKernel = 'kernelmenu:change';

  export const shutdownKernel = 'kernelmenu:shutdown';

  export const shutdownAllKernels = 'kernelmenu:shutdownAll';

  export const openView = 'viewmenu:open';

  export const wordWrap = 'viewmenu:word-wrap';

  export const lineNumbering = 'viewmenu:line-numbering';

  export const matchBrackets = 'viewmenu:match-brackets';

  export const openRun = 'runmenu:open';

  export const run = 'runmenu:run';

  export const runAll = 'runmenu:run-all';

  export const restartAndRunAll = 'runmenu:restart-and-run-all';

  export const runAbove = 'runmenu:run-above';

  export const runBelow = 'runmenu:run-below';

  export const openSettings = 'settingsmenu:open';

  export const openHelp = 'helpmenu:open';

  export const openFirst = 'mainmenu:open-first';

  export const rename = 'docmanager:rename';
}
