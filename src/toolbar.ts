import { Widget, BoxLayout } from '@phosphor/widgets';

export class ClarityToolbar extends Widget {
  constructor() {
    super();
    this.layout = new BoxLayout({direction:"top-to-bottom"});
    this.addClass("jp-Toolbar");
    this.addClass("clarity-toolbar");
  }

  insertItem(widget: Widget) {
    widget.addClass("jp-ToolbarButtonComponent");
    widget.addClass("clarity-toolbar-item");
    widget.addClass("jp-Toolbar-item");
    let layout = this.layout as BoxLayout;
    layout.addWidget(widget);
  }
}