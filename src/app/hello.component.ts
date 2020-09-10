import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<p style="width:80%;"> <em style="color:red;">custom component</em> {{name}}!</p>`
})
export class HelloComponent  {
  @Input() name: string;
}
