import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore, private db: AngularFireDatabase) { 
    
  }
  createDoc(data: any, path:string, id:string){

    const collectiion = this.database.collection(path);
    collectiion.doc(id).set(data);

  }
  deletDoc(path:string, id:string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();

  }
  updatetDoc(data: any, path:string, id:string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);

  }
  getId(){
    return this.database.createId();
  }

  getCollection<tipo>(path:string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();

  }
  
}

