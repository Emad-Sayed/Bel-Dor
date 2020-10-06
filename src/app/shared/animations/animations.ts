import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';

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
export const slideBottomAnimation = 
  trigger('slideBottom', [
    state('void', style({
      transform: 'translateY(100px)',
      opacity: 0
    })),

    state('*', style({
      transform: 'translateY(0)',
      opacity: 1
    })),

    transition('void => *', animate('600ms cubic-bezier(0.55, 0.06, 0.68, 0.19)'))
  ]);

export const toastAnimation = 
trigger('flyInOut', [
  state('inactive', style({
    opacity: 0,
  })),
  transition('inactive => active', animate('400ms ease-out', keyframes([
    style({
      transform: 'translate3d(0, 100%, 0)',
      opacity: 0,
    }),
    style({
      transform: 'translate3d(0, 0, 0)',
      opacity: 1,
    })
  ]))),
  transition('active => removed', animate('400ms ease-out', keyframes([
    style({
      opacity: 1,
    }),
    style({
      transform: 'translate3d(100%, 0, 0) skewX(30deg)',
      opacity: 0,
    }),
  ]))),
]);

export const notifyAnimation = 
  trigger('notificationAnim', 
  [
    state('normal', style({
      transform: 'scale(1)'
    })),

    state('updated', style({
      transform: 'scale(2)'
    })),

    transition('normal <=> updated', animate('1000ms cubic-bezier(0.55, 0.06, 0.68, 0.19)'))
  ]);