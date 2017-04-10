import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {
  @Input() noteItem;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.noteItem);
  }

}
