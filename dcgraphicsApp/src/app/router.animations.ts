import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';



export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
   
    query(':enter .image', style({ position: 'fixed', width:'100%',  })
      , { optional: true }),      
    query(':enter, :leave ', style({ position: 'fixed', width:'100%',  })
       , { optional: true }),
    query('.block', style({ opacity: 0 })
      , { optional: true }),
    // query('.htext', style({ opacity: 0 })
    //    , { optional: true }),       
    query(':enter .block' , stagger(400, [
      style({ transform: 'translateY(100px)' }),
      animate('1s ease-in-out', style({ transform: 'translateY(0px)', opacity: 1 })),
    ]), { optional: true }),
    // query(':enter .htext' , stagger(400, [
    //   style({ transform: 'translateY(100px)' }),
    //   animate('1s ease-in-out', style({ transform: 'translateY(0px)', opacity: 1, })),        
    // ]), { optional: true }), 
    
  ])    
])

