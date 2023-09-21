import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-odometer',
  templateUrl: './odometer.component.html',
  styleUrls: ['./odometer.component.css']
})
export class OdometerComponent {

  private static DIGITS: string = "123456789";

   reading: number = 1234;
   message: string ="";

  constructor() {
    this.setReading(this.reading);
   }

  setReading(reading: number) {
    if (!this.isAscending(reading) || this.getSize(reading) !== this.getSize(this.reading) || this.reading==0) {
      this.message="Invalid reading. Check the input.";
      return;
    }
    
    this.reading = reading;
    this.message ="";
  }

  getMsg(): string{
    return this.message;
  }

  toString(): string {
    return "(" + this.reading + ")";
  }

 
  isAscending(reading: number): boolean {
    if (reading < 10) {
      return true;
    }
    if (reading % 10 <= Math.floor((reading / 10) % 10)) {
      return false;
    }
    return this.isAscending(Math.floor(reading / 10));
  }

  incrementReading() {
    do {
      if (this.reading === this.getMaxReading(this.getSize(this.reading))) {
        this.reading = this.getMinReading(this.getSize(this.reading));
      } else {
        this.reading++;
      }
    } while (!this.isAscending(this.reading));
    this.message ="";
  }

  nextReading(): OdometerComponent {
    const temp = new OdometerComponent();
    temp.setReading(this.reading);
    temp.incrementReading();
    return temp;
  }

  decrementReading() {
    do {
      if (this.reading === this.getMinReading(this.getSize(this.reading))) {
        this.reading = this.getMaxReading(this.getSize(this.reading));
      } else {
        this.reading--;
      }
    } while (!this.isAscending(this.reading));
    this.message ="";
  }

  reset() {
    this.reading = this.getMinReading(this.getSize(this.reading));
  }

  private getMinReading(size: number): number {
    if (size <= 0) {
      return 0;
    } else if (size > OdometerComponent.DIGITS.length) {
      return parseInt(OdometerComponent.DIGITS);
    } else {
      return parseInt(OdometerComponent.DIGITS.substring(0, size));
    }
  }

  private getMaxReading(size: number): number {
    if (size <= 0) {
      return 0;
    } else if (size > OdometerComponent.DIGITS.length) {
      return parseInt(OdometerComponent.DIGITS);
    } else {
      const startIndex = OdometerComponent.DIGITS.length - size;
      return parseInt(OdometerComponent.DIGITS.substring(startIndex, OdometerComponent.DIGITS.length));
    }
  }


  private getSize(reading: number): number {
    return reading.toString().length;
  }
}
