import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { ToDoListService } from "../to-do-list/to-do-list.service";
import { lookupListToken } from "../provider";


@Component({
  selector: 'to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.css']
})
export class ToDoFormComponent {
  form;

  constructor(private formBuilder: FormBuilder,
    private toDoListService: ToDoListService,
    @Inject(lookupListToken) public lookupLists,
    private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      content: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      priority: this.formBuilder.control('Normal')
    });
    console.log("onInit");
  }

  onSubmit(noteItem) {
    this.toDoListService.add(noteItem)
      .subscribe(() => {
        console.log("onSubmit");
        this.router.navigate(['/']);

      });

  }
}
