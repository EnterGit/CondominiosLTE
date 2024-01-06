import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        // Return the date in the format you want.
        // Here it's in the format DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }
}