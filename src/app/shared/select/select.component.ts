import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() title:string="" //hya shared component donc data bech tjini mel parent donc 3inik mghamdha taamel @input
  @Input() data:any[]=[]
  @Output()selectedValue= new EventEmitter
  constructor(){}

  ngOnInit():void{

  }
  detectChanges(event: any){
    this.selectedValue.emit(event)

  }

}
