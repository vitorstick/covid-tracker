import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { UserDetails } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';
import { NewEntry } from '../models/temperature.interface';
import { Type } from '../models/type.enum';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-temperature-page',
  templateUrl: './temperature-page.component.html',
  styleUrls: ['./temperature-page.component.scss']
})
export class TemperaturePageComponent implements OnInit {
  public userDetail: UserDetails;

  private type = Type;

  public temperatureDetails: NewEntry[] = [];
  public cardiacRithmDetails: NewEntry[] = [];
  public oxigenDetails: NewEntry[] = [];
  public arterialTensionDetails: NewEntry[] = [];
  public glicemicDetails: NewEntry[] = [];
  public respiratoryCapacityDetails: NewEntry[] = [];
  public headthroatpainDetails: NewEntry[] = [];

  public temperatureForm = this.fb.group({
    temperature: ['', Validators.required]
  });
  public cardiacForm = this.fb.group({
    cardiac: ['', Validators.required]
  });
  public oxigenForm = this.fb.group({
    oxigen: ['', Validators.required]
  });
  public arterialTensionForm = this.fb.group({
    arterialTension: ['', Validators.required]
  });
  public glicemicForm = this.fb.group({
    glicemic: ['', Validators.required]
  });
  public respiratoryCapacityForm = this.fb.group({
    nailsLipsBlue: [''],
    cough: ['']
  });
  public headthroatpainForm = this.fb.group({
    throatpain: [''],
    headpain: ['']
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userService.userDetailsSubject.subscribe(uDetail => {
      this.userDetail = uDetail;
      console.log('this.userDetail', this.userDetail);
      if (this.userDetail && this.userDetail.uid) {
        this.getData();
      }
    });
  }

  public submitDetails() {
    moment.locale('pt');
    const date = moment().format('DD/MM/YYYY HH:mm:ss');
    if (this.temperatureForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.temperature,
        value: this.temperatureForm.get('temperature').value
      };
      // console.log('temperature newEntry', newEntry);
      this.submitTemperature(newEntry);
    }
    if (this.cardiacForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.cardiacrithm,
        value: this.cardiacForm.get('cardiac').value
      };
      // console.log('cardiac newEntry', newEntry);
      this.submitCardiacRithm(newEntry);
    }
    if (this.oxigenForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.oxigen,
        value: this.oxigenForm.get('oxigen').value
      };
      // console.log('oxigen newEntry', newEntry);
      this.submitOxigen(newEntry);
    }
    if (this.arterialTensionForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.arterialTension,
        value: this.arterialTensionForm.get('arterialTension').value
      };
      // console.log('arterialTensionForm newEntry', newEntry);
      this.submitArterialTension(newEntry);
    }
    if (this.glicemicForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.glicemic,
        value: this.glicemicForm.get('oxigen').value
      };
      // console.log('glicemicForm newEntry', newEntry);
      this.submitGlicemic(newEntry);
    }
    if (this.respiratoryCapacityForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.respiratoryCapacity,
        nailsLipsBlue: this.respiratoryCapacityForm.get('nailsLipsBlue').value,
        cough: this.respiratoryCapacityForm.get('cough').value
      };
      // console.log('respiratoryCapacityForm newEntry', newEntry);
      this.submitRespiratoryCapacity(newEntry);
    }
    if (this.headthroatpainForm.valid) {
      const newEntry: NewEntry = {
        date: date,
        userid: this.userDetail.uid,
        type: this.type.headthroatpain,
        throatpain: this.headthroatpainForm.get('throatpain').value,
        headpain: this.headthroatpainForm.get('headpain').value
      };
      // console.log('headthroatpainForm newEntry', newEntry);
      this.submitPain(newEntry);
    }
  }

  private submitTemperature(newEntry: NewEntry) {
    this.registerService.addTemperature(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.temperatureForm.reset();
    });
  }

  private submitCardiacRithm(newEntry: NewEntry) {
    this.registerService.addCardiacRithm(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.cardiacForm.reset();
    });
  }

  private submitOxigen(newEntry: NewEntry) {
    this.registerService.addOxigen(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.oxigenForm.reset();
    });
  }

  private submitArterialTension(newEntry: NewEntry) {
    this.registerService.addArterialTension(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.arterialTensionForm.reset();
    });
  }

  private submitGlicemic(newEntry: NewEntry) {
    this.registerService.addGlicemic(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.glicemicForm.reset();
    });
  }

  private submitRespiratoryCapacity(newEntry: NewEntry) {
    this.registerService.addRespiratoryCapacity(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.respiratoryCapacityForm.reset();
    });
  }

  private submitPain(newEntry: NewEntry) {
    this.registerService.addHeadthroatpain(newEntry).then(entry => {
      this._snackBar.open('Registo inserido com sucesso', 'Ok', {
        duration: 5000,
        panelClass: ['snackbar-success']
      });
      this.headthroatpainForm.reset();
    });
  }

  private getData() {
    this.registerService
      .getTemperatureDetails(this.userDetail.uid)
      .subscribe(details => {
        console.log('details', details);
        if (details.length > 0) {
          this.temperatureDetails = details;
        }
      });

    this.registerService
      .getCardiacRithmDetails(this.userDetail.uid)
      .subscribe(details => {
        console.log('details', details);
        if (details.length > 0) {
          this.cardiacRithmDetails = details;
        }
      });

    this.registerService
      .getOxigenDetails(this.userDetail.uid)
      .subscribe(details => {
        // console.log('details', details);
        if (details.length > 0) {
          this.oxigenDetails = details;
        }
      });

    this.registerService
      .getArterialTension(this.userDetail.uid)
      .subscribe(details => {
        // console.log('details', details);
        if (details.length > 0) {
          this.arterialTensionDetails = details;
        }
      });

    this.registerService.getGlicemic(this.userDetail.uid).subscribe(details => {
      // console.log('details', details);
      if (details.length > 0) {
        this.glicemicDetails = details;
      }
    });

    this.registerService
      .getRespiratoryCapacity(this.userDetail.uid)
      .subscribe(details => {
        // console.log('details', details);
        if (details.length > 0) {
          this.respiratoryCapacityDetails = details;
        }
      });

    this.registerService
      .getHeadthroatpain(this.userDetail.uid)
      .subscribe(details => {
        // console.log('details', details);
        if (details.length > 0) {
          this.headthroatpainDetails = details;
        }
      });
  }
}
