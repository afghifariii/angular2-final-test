import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ToDoListService } from "./to-do-list.service";

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
  @Output() noteItem = new EventEmitter();

  noteItems = [];
  note = '';
  paramsSubscription;

  constructor(
    private toDoListService: ToDoListService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.getAll(this.note);
      console.log("initList");
    })
    this.toDoListService.subject.subscribe(() => {
      this.getAll(this.note);
    })
  }

  getAll(note) {
    this.note = note;
    this.toDoListService.get(note).subscribe((noteItems) => {
      this.noteItems = noteItems
    });
  }

  onDelete(noteItem) {
    this.toDoListService.remove(noteItem)
      .subscribe(() => {
        this.getAll(this.note)
      });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
