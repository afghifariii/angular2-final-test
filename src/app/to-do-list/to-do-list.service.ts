import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';



@Injectable()
export class ToDoListService {
  constructor(private http: Http) { }


  get(note) {
    let searchParams = new URLSearchParams();
    searchParams.append('note', note);
    return this.http.get('noteitems', { search: searchParams })
      .map(response => {
        return response.json().noteItems;
      });
  }

  add(noteItem) {
    return this.http.post('noteitems', noteItem)
      .map(response => { });
  }

  remove(noteItem) {
    return this.http.delete(`noteitems/${noteItem.id}`)
      .map(response => { });
  }

  noteItems = [
    {
      id: 1,
      content: "Angkat Jemuran",
      priority: "Normal",
      isHover: false
    },
    {
      id: 2,
      content: "Beli Gula",
      priority: "Low",
      isHover: false
    },
    {
      id: 1,
      content: "Beli Paket Internet",
      priority: "High",
      isHover: false
    }
  ];
}