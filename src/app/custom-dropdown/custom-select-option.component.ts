import { Component, forwardRef, HostBinding, HostListener, Input } from '@angular/core';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectComponent } from './custom-select.component';

@Component({
  selector: 'custom-select-option',
  template: '<hello *ngIf="!hidden" [name]="value"></hello>',
  styleUrls: ['./_custom-select-option.scss']
})
export class CustomSelectOptionComponent {

  @Input()
  public key: string;

  @Input()
  public value: string;

  @Input()
  public mode: string;

  @HostBinding('class.selected')
  public get selected(): boolean {
    return this.select.selectedOption === this;
  }

  private select: CustomSelectComponent;

  constructor(private dropdownService: CustomDropdownService) {
    this.select = this.dropdownService.getSelect();
  }

 

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent) {
    event.preventDefault();
    event.stopPropagation();
  
    if(!this.mode){
    this.select.selectOption(this);
    }
    else{
      this.select.reopenOption();
    }
   
  }
}
