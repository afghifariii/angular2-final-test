import { Request, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

export class MockXHRBackend {
  constructor() {
  }

  createConnection(request: Request) {
    var response = new Observable((responseObserver: Observer<Response>) => {
      var responseData;
      var responseOptions;
      switch (request.method) {
        case RequestMethod.Get:
          if (request.url.indexOf('noteitems?note=') >= 0 || request.url === 'noteitems') {
            var note;
            if (request.url.indexOf('?') >= 0) {
              note = request.url.split('=')[1];
              if (note === 'undefined') note = '';
            }
            var noteItems;
            if (note) {
              noteItems = this._noteItems.filter(noteItem => noteItem.content === note);
            } else {
              noteItems = this._noteItems;
            }
            responseOptions = new ResponseOptions({
              body: { noteItems: JSON.parse(JSON.stringify(noteItems)) },
              status: 200
            });
          } else {
            var id = parseInt(request.url.split('/')[1]);
            noteItems = this._noteItems.filter(mediaItem => mediaItem.id === id);
            responseOptions = new ResponseOptions({
              body: JSON.parse(JSON.stringify(noteItems[0])),
              status: 200
            });
          }
          break;
        case RequestMethod.Post:
          var noteItem = JSON.parse(request.text().toString());
          noteItem.id = this.getNewId();
          this._noteItems.push(noteItem);
          responseOptions = new ResponseOptions({ status: 201 });
          break;
        case RequestMethod.Delete:
          var id = parseInt(request.url.split('/')[1]);
          this.deleteNoteItem(id);
          responseOptions = new ResponseOptions({ status: 200 });
      }

      var responseObject = new Response(responseOptions);
      responseObserver.next(responseObject);
      responseObserver.complete();
      return () => { };
    });
    return { response };
  }

  deleteNoteItem(id) {
    var noteItem = this._noteItems.find(noteItem => noteItem.id === id);
    var index = this._noteItems.indexOf(noteItem);
    if (index >= 0) {
      this._noteItems.splice(index, 1);
    }
  }

  getNewId() {
    if (this._noteItems.length > 0) {
      return Math.max.apply(Math, this._noteItems.map(noteItem => noteItem.id)) + 1;
    }
  }

  _noteItems = [
    {
      id: 1,
      content: "Angkat Jemuran",
      priority: "Normal"
    },
    {
      id: 2,
      content: "Beli Gula",
      priority: "Low"
    },
    {
      id: 1,
      content: "Beli Paket Internet",
      priority: "High"
    }
  ];
}