import { Widget, BoxLayout } from '@phosphor/widgets';

import { Message, MessageLoop } from '@phosphor/messaging';

const TOOLBAR_ITEM_CLASS = "jp-Toolbar-item";

export class ClaritySidePanel extends Widget {
  constructor() {
    super();
    const layout = (this.layout = new BoxLayout({direction:"top-to-bottom"}));
    let toolbar = (this.toolbar = new ClarityToolbar());
    let spacer = new Spacer();
    layout.addWidget(toolbar);
    layout.addWidget(spacer);
    BoxLayout.setStretch(toolbar, 0);
    BoxLayout.setStretch(spacer, 1);
  }

  public toolbar:ClarityToolbar;
  //private spacer:Spacer;
}

export class ClarityToolbar extends Widget {
  constructor() {
    super();
    this.layout = new ToolbarLayout();
    this.addClass("jp-Toolbar");
    this.addClass("clarity-toolbar");
  }

  insertItem(widget: Widget) {
    console.log(widget.node.classList);
    widget.addClass("jp-ToolbarButtonComponent");
    widget.addClass("clarity-toolbar-item");
    widget.addClass(TOOLBAR_ITEM_CLASS);
    let layout = this.layout as ToolbarLayout;
    layout.addWidget(widget);
  }
}

class ToolbarLayout extends BoxLayout {

  constructor() {
    super();
    this.direction = "top-to-bottom";
  }

  protected onFitRequest(msg: Message): void {
    super.onFitRequest(msg);
    if (this.parent!.isAttached) {
      this.parent!.node.style.minHeight = '260px';
      this.parent!.node.style.minWidth = '30px';
    }
    if (this.parent!.parent) {
      MessageLoop.sendMessage(this.parent!.parent!, Widget.Msg.FitRequest);
    }
  }

  protected onBeforeAttach(msg: Message): void {
    super.onBeforeAttach(msg);
    this.parent!.fit();
  }

  protected attachWidget(index: number, widget: Widget): void {
    super.attachWidget(index, widget);
    this.parent!.fit();
  }
}

export class Spacer extends Widget {
  constructor() {
    super();
    this.addClass("spacer");
  }
}