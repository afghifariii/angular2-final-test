import { Pipe } from '@angular/core';

@Pipe({
  name: 'priorityList'
})
export class PriorityListPipe {
  transform(noteItems) {
    var priorities = [];
    noteItems.forEach(noteItem => {
      if (priorities.indexOf(noteItem.priority) <= -1) {
        priorities.push(noteItem.priority);
      }
    });
    return priorities.join(', ');
  }
}