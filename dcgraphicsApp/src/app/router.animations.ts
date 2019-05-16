import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';



// export const routerTransition = trigger('routerTransition',[
//     transition('* => *', [

//       query(':enter' , style({opacity: 0}),{optional: true}),

//       query(':enter', stagger('300ms', [
//         animate('1s ease-in', keyframes([
//           style({opacity: 0, transform:'translateY(-75px)', offset: 0}),
//           style({opacity: 0.5, transform:'translateY(35px)', offset: 0.3}),
//           style({opacity: 1, transform:'translateY(0px)', offset: 1}),
//         ]))
//       ]))
//     ])
//   ])

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    query('.block', style({ opacity: 0 })
      , { optional: true }),
   
    query(':enter .block', stagger(400, [
      style({ transform: 'translateY(100px)' }),
      animate('1s ease-in-out', style({ transform: 'translateY(0px)', opacity: 1 })),
    ]), { optional: true }),
  ])
])