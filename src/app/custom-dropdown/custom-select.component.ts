import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  QueryList,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomDropdownService } from './custom-dropdown.service';
import { CustomSelectOptionComponent } from './custom-select-option.component';
import { DropdownComponent } from './dropdown.component';

@Component({
  selector: 'custom-select',
  templateUrl: './custom-select.html',
  styleUrls: ['./_custom-select.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true
    },
    CustomDropdownService
  ]
})
export class CustomSelectComponent implements AfterViewInit, ControlValueAccessor {

  
  @Input()
  public placeholder: string;

  @Input()
  public selected: string;


  @ViewChild('input')
  public input: ElementRef;

  @ViewChild(DropdownComponent)
  public dropdown: DropdownComponent;

  @ContentChildren(CustomSelectOptionComponent)
  public options: QueryList<CustomSelectOptionComponent>;

  public selectedOption: CustomSelectOptionComponent;

  public displayText: string;
  
  constructor(private dropdownService: CustomDropdownService) {
    this.dropdownService.register(this);
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.selectedOption = this.options.toArray().find(option => option.key === this.selected);
      this.displayText = this.selectedOption ? this.selectedOption.value : '';
     
    });
  }

  public showDropdown() {
    this.dropdown.show();
  }

  public hideDropdown() {
    this.dropdown.hide();
  }

  public onDropMenuIconClick(event: UIEvent) {
    event.stopPropagation();
    this.showDropdown()
   
  }

  public selectOption(option: CustomSelectOptionComponent) {
  
    this.selected = option.key;
    this.selectedOption = option;
    this.displayText = this.selectedOption ? this.selectedOption.value : '';
     this.hideDropdown();
  }
  public reopenOption() {
      this.showDropdown();
  }
 public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(obj: any): void {
    this.selected = obj;
  }

  public onTouched() {
    this.onTouchedFn();
  }

  public onChange() {
    this.onChangeFn(this.selected);
  }

}
