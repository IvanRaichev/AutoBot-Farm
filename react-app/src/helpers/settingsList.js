import timer from "./../img/setting/timer.svg"
import exp from "./../img/setting/exp-boost.svg"
import result from "./../img/setting/result-booster.svg"


const settings =[
   {
      title: 'End of Bot Operation Timer',
      id:'check-time',
      content:'Home',
      for:'check-time',
      img: timer,
      alt:"timer"
   },
   {
      title: 'Activate EXP Booster',
      id:'check-exp',
      content:'Home',
      for:'check-exp',
      img: exp,
      alt:"exp"
   },
   {
      title: 'Activate Result Booster',
      id:'check-result',
      content:'Home',
      for:'check-result',
      img: result,
      alt:"result"
   },
   {
      title: 'Activate EXP Booster on Vagabond',
      id:'check-exp-npc',
      content:'Npc',
      for:'check-exp-npc',
      img: exp,
      alt:"exp"
   },
   {
      title: 'Activate Result Booster on Vagabond',
      id:'check-result-npc',
      content:'Npc',
      for:'check-result-npc',
      img: exp,
      alt:"exp"
   },
   {
      title: 'Activate Restart Duel Orb',
      id:'check-restart-npc',
      content:'Npc',
      for:'check-restart-npc',
      img: result,
      alt:"result"
   },
   {
      title: 'Activate EXP Booster',
      id:'check-exp-pvp',
      content:'PvP',
      for:'check-exp-pvp',
      img: exp,
      alt:"exp"
   },
   {
      title: 'Activate Result Booster',
      id:'check-result-pvp',
      content:'PvP',
      for:'check-result-pvp',
      img: result,
      alt:"result"
   },
   {
      title: 'Enable Choose',
      id:'check-person',
      for:'check-person'
   }
]

export {settings}