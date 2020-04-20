import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NewEntry } from '../models/temperature.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  itemCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {}

  public addTemperature(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('temperature')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public addCardiacRithm(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('cardiac')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public addOxigen(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('oxigen')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public addArterialTension(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('arterialTension')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public addGlicemic(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('glicemic')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public addRespiratoryCapacity(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('respiratoryCapacity')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public addHeadthroatpain(newEntry: NewEntry): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      return this.afs
        .collection('headthroatpain')
        .add(newEntry)
        .then(res => {
          resolve(res);
        });
    });
  }

  public getTemperatureDetails(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>('temperature', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('userid', '==', userid);
    });
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }

  public getCardiacRithmDetails(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>('cardiac', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('userid', '==', userid);
    });
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }

  public getOxigenDetails(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>('oxigen', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('userid', '==', userid);
    });
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }

  public getArterialTension(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>('arterialTension', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('userid', '==', userid);
    });
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }

  public getGlicemic(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>('glicemic', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('userid', '==', userid);
    });
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }

  public getRespiratoryCapacity(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>(
      'respiratoryCapacity',
      ref => {
        // Compose a query using multiple .where() methods
        return ref.where('userid', '==', userid);
      }
    );
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }

  public getHeadthroatpain(userid: string): Observable<NewEntry[]> {
    this.itemCollection = this.afs.collection<any>('headthroatpain', ref => {
      // Compose a query using multiple .where() methods
      return ref.where('userid', '==', userid);
    });
    const temperatureDetails = this.itemCollection.valueChanges();
    return temperatureDetails;
  }
}
