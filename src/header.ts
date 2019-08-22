import { 
  Widget, 
  PanelLayout, 
  Menu,
  MenuBar,
  BoxLayout
} from '@phosphor/widgets';

import { 
  NotebookPanel,
  ToolbarItems
 } from '@jupyterlab/notebook';

import { CommandRegistry } from '@phosphor/commands';


export class ClarityHeader extends Widget {
  constructor(nbWidget:NotebookPanel, commands: CommandRegistry) {
    super();
    const layout = (this.layout = new PanelLayout());
    this.addClass("clarity-header");
    this.nbWidget = nbWidget;
    this.addTitle();
    this.addRunAll(commands);
    this.addKernelStatus();
    let menu = new ClarityMenu(nbWidget, commands);
    layout.addWidget(menu);
  }

  addTitle = () => {
    let title:string=this.nbWidget.title.label;
    this.node.innerText = title;
  }

  addRunAll = (commands:CommandRegistry) => {
    let layout = this.layout as PanelLayout;
    let runAll = new RunAll(commands);
    layout.addWidget(runAll);
  }

  addKernelStatus = () => {
    let kernelWidg = new Widget();
    kernelWidg.addClass("clarity-kernel-wid");
    let klayout = (kernelWidg.layout = new BoxLayout({direction:"left-to-right"}));
    let layout = this.layout as PanelLayout;
    let items = ToolbarItems.getDefaultItems(this.nbWidget);
    let ignore = ['kernelName','kernelStatus']
    items.forEach(({ name, widget: item }) => {
      if (ignore.indexOf(name) >= 0) {
        if ("kernelStatus".indexOf(name) >=0) {
          item.addClass("clarity-kernel");
        }
        klayout.addWidget(item);
      }
    });
    layout.addWidget(kernelWidg);
  }

  private nbWidget:NotebookPanel;
}

export class ClarityMenu extends Widget {
  constructor(nbWidget: NotebookPanel, commands: CommandRegistry) {
    super();
    nbWidget;
    this.commands = commands;
    this.addClass("mainmenu");
    const layout = (this.layout = new PanelLayout());
    const menu = this.activate();
    layout.addWidget(menu);
  }

  activate = () => {
    let menu = new MenuBar();
    menu.addClass('clarity-menu');
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
    const filemenu = new Menu({ commands: this.commands });
    filemenu.title.label = "File";
    filemenu.addItem({command: "notebook:save"});
    menu.addMenu(filemenu);
    const editmenu = new Menu({ commands: this.commands });
    editmenu.title.label = "Edit";
    editmenu.addItem({command: "notebook-cells:undo"});
    editmenu.addItem({command: "notebook-cells:redo"});
    menu.addMenu(editmenu);
    const settingsmenu = new Menu({ commands: this.commands });
    settingsmenu.title.label = "Settings";
    menu.addMenu(settingsmenu);
    const helpmenu = new Menu({ commands: this.commands });
    helpmenu.title.label = "Help";
    menu.addMenu(helpmenu);

    return menu;
  }

  //private nbWidget: NotebookPanel;
  private commands: CommandRegistry;
}

export class RunAll extends Widget {
  constructor(commands:CommandRegistry){
    super();
    this.commands = commands;
    this.addClass("clarity-runall");
    this.node.innerText = "run all cells";
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
}
