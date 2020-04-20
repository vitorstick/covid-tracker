import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDetails } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userDetailsSubject: BehaviorSubject<UserDetails>;

  itemCollection: AngularFirestoreCollection<any>;
  userDetails: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.userDetailsSubject = new BehaviorSubject<UserDetails>(null);
  }

  public getDetails(uid: string): Observable<UserDetails[]> {
    this.itemCollection = this.afs.collection<any>('userDetails', ref => {
      // Compose a query using multiple .where() methods

      return ref.where('uid', '==', uid);
    });
    this.userDetails = this.itemCollection.valueChanges();
    return this.userDetails;
  }

  public setDetails(userDetails: UserDetails) {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('userDetails')
        .add(userDetails)
        .then(res => {
          resolve(res);
        });
    });
  }
}
