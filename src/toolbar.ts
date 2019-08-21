import { Widget, BoxLayout } from '@phosphor/widgets';

//import { Message, MessageLoop } from '@phosphor/messaging';


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

// class ToolbarLayout extends BoxLayout {

//   constructor() {
//     super();
//     this.direction = "top-to-bottom";
//   }

//   protected onFitRequest(msg: Message): void {
//     super.onFitRequest(msg);
//     if (this.parent!.isAttached) {
//       this.parent!.node.style.minHeight = '260px';
//       this.parent!.node.style.minWidth = '30px';
//     }
//     if (this.parent!.parent) {
//       MessageLoop.sendMessage(this.parent!.parent!, Widget.Msg.FitRequest);
//     }
//   }

//   protected onBeforeAttach(msg: Message): void {
//     super.onBeforeAttach(msg);
//     this.parent!.fit();
//   }

//   protected attachWidget(index: number, widget: Widget): void {
//     super.attachWidget(index, widget);
//     this.parent!.fit();
//   }
// }