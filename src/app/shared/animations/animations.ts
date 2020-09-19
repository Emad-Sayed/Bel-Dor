import { trigger, transition, style, animate, state } from '@angular/animations';

export const ticketAnimation = 
  trigger('ticketAnim', [
    state('void', style({right: '-40vw', bottom: '-40vh'})),
    state('*', style({right: '-100px', bottom: '-50px'})),
    transition('void => *', [
      animate('600ms 500ms cubic-bezier(0.55, 0.06, 0.68, 0.19)')
    ])
  ]);

export const contentAnimation = 
  trigger('animateContent', [
    state('void', style({
      transform: 'scaleY(0)',
      opacity: 0
    })),

    state('*', style({
      transform: 'scaleY(1)',
      opacity: 1
    })),

    transition('void => *', animate('600ms cubic-bezier(0.55, 0.06, 0.68, 0.19)'))
  ]);
