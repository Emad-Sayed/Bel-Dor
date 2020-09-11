import { trigger, transition, style, animate, state } from '@angular/animations';

export const ticketAnimation = 
  trigger('ticketAnim', [
    state('void', style({right: '-40vw', bottom: '-40vh'})),
    state('*', style({right: '-150px', bottom: '-40px'})),
    transition('void => *', [
      animate('600ms 500ms cubic-bezier(0.55, 0.06, 0.68, 0.19)')
    ])
  ]);