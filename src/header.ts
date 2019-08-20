import {Widget, PanelLayout, Menu,MenuBar} from '@phosphor/widgets';
import {NotebookPanel} from '@jupyterlab/notebook';

//import { showDialog, Dialog } from '@jupyterlab/apputils'

//import { URLExt } from '@jupyterlab/coreutils';

//import { ServerConnection } from '@jupyterlab/services';

import { CommandRegistry } from '@phosphor/commands';


export class ClarityHeader extends Widget {
  constructor(nbWidget:NotebookPanel, commands: CommandRegistry) {
    super();
    const layout = (this.layout = new PanelLayout());
    this.addClass("clarity-header");
    this.nbWidget = nbWidget;
    let menu = new ClarityMenu(nbWidget, commands);
    layout.addWidget(menu);
    //this.generateInfo();
  }

  generateInfo = () => {
    let title:string=this.nbWidget.title.label;
    this.node.innerText = title;
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
    let logo = new Widget();
    logo.addClass('jp-MainAreaPortraitIcon');
    logo.addClass('jp-JupyterIcon');
    logo.addClass('clarity-icon');
    logo.id = 'jp-MainLogo';
    layout.addWidget(logo);
    logo.node.style.height='20px';
    logo.node.style.width='inherit';
    logo.node.style.margin='7px';
    layout.addWidget(menu);
  }

  activate = () => {
    //let commands = this.commands;
    //MenuBar
    let menu = new MenuBar();
    menu.addClass('clarity-menu');
    menu.id = 'jp-MainMenu';

    // Create the application menus.
    //this.createEditMenu(menu.editMenu);
    menu = this.createFileMenu(menu);
    // this.createKernelMenu(app, menu.kernelMenu);
    // this.createRunMenu(app, menu.runMenu);
    // this.createSettingsMenu(app, menu.settingsMenu);
    // this.createViewMenu(app, menu.viewMenu);
    return menu;
  }

  createFileMenu = (
    menu: MenuBar
  ) => {

    const filemenu = new Menu({ commands: this.commands });
    filemenu.title.label = "File";
    // let commands = this.commands as CommandRegistry;
    // commands.addCommand("docmanager:save-as", {
    //   label: 'Save as',
    //   execute: () => {
    //     console.log('test');
    //   }
    // });
    console.log(this.commands);
    filemenu.addItem({
      command: "notebook:save",
      args: {
        insertSpaces: false,
        size: 4,
        name: 'Indent with Tab'
      },
    });
    // filemenu.addGroup([
    //   {
    //     command: firstCommandID,
    //   },
    //   {
    //     command: secondCommandID,
    //   }
    // ], 40 /* rank */);
    menu.addMenu(filemenu);
    const editmenu = new Menu({ commands: this.commands });
    editmenu.title.label = "Edit";
    editmenu.addItem({
      command: "notebook-cells:undo",
      args: {
        insertSpaces: false,
        size: 4,
        name: 'Indent with Tab'
      },
    });
    menu.addMenu(editmenu);
    const viewmenu = new Menu({ commands: this.commands });
    viewmenu.title.label = "View";
    menu.addMenu(viewmenu);
  
    // Add the new group
    // const newGroup = [
    //   { type: 'submenu' as Menu.ItemType, submenu: menu.newMenu.menu },
    //   { command: 'docmanager:rename' }
    // ];

  
    // const openGroup = [{ command: 'filebrowser:open-path' }];
  
    // const newViewGroup = [
    //   { command: 'docmanager:clone' },
    //   { command: CommandIDs.createConsole }
    // ].filter(item => !!item);
  
    // // Add the close group
    // const closeGroup = [
    //   'application:close',
    //   'filemenu:close-and-cleanup',
    //   'application:close-all'
    // ].map(command => {
    //   return { command };
    // });
  
    // // Add save group.
    // const saveGroup = [
    //   'docmanager:save',
    //   'docmanager:save-as',
    //   'docmanager:save-all'
    // ].map(command => {
    //   return { command };
    // });
  
    // // Add the re group.
    // const reGroup = [
    //   'docmanager:reload',
    //   'docmanager:restore-checkpoint',
    //   'docmanager:rename'
    // ].map(command => {
    //   return { command };
    // });
    // const printGroup = [{ command: 'apputils:print' }];
  
    //menu.addGroup(newGroup, 0);
    // menu.addGroup(openGroup, 1);
    // menu.addGroup(newViewGroup, 2);
    // menu.addGroup(closeGroup, 3);
    // menu.addGroup(saveGroup, 4);
    // menu.addGroup(reGroup, 5);
    // menu.addGroup(printGroup, 98);
    return menu;
  }
  

  private commands: CommandRegistry;
  //private nbWidget: NotebookPanel;
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

  export const shutdown = 'filemenu:shutdown';

  export const logout = 'filemenu:logout';

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

  export const openTabs = 'tabsmenu:open';

  export const activateById = 'tabsmenu:activate-by-id';

  export const activatePreviouslyUsedTab =
    'tabsmenu:activate-previously-used-tab';

  export const openSettings = 'settingsmenu:open';

  export const openHelp = 'helpmenu:open';

  export const openFirst = 'mainmenu:open-first';
}
