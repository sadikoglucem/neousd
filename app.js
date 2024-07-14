// usd

const lib = require("blackjack-strategy");

var options = {
  hitSoft17:false,             // Does dealer hit soft 17
  surrender:"none",           // Surrender offered - none, late, or early
  double:"9or10or11",               // Double rules - none, 10or11, 9or10or11, any
  doubleRange:[0,21],         // Range of values you can double, 
                              // if set supercedes double (v1.1 or higher)
  doubleAfterSplit:true,      // Can double after split
  resplitAces:false,          // Can you resplit aces
  offerInsurance:false,        // Is insurance offered
  numberOfDecks:6,            // Number of decks in play
  maxSplitHands:2,     // The TrueCount (count / number of decks left)
  strategyComplexity:"simple" // easy (v1.2 or higher), simple, advanced,
                              // exactComposition, bjc-supereasy (v1.4 or higher),
                              // bjc-simple (v1.4 or higher), or bjc-great
                              // (v1.4 or higer) - see below for details
};

var evotoken = 'eyJraWQiOiIxNjcwOTQwNTA0MTM4IiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJjdXIiOiJES0siLCJndHAiOiJibGFja2phY2tjbGFzc2ljIiwicGduIjoiYmxhY2tqYWNrY2xhc3NpY19mMF9nMF9oMF9pMF9qMF9ub3RfbW9iaWxlX3N3IiwianVyIjoiQ1ciLCJoaWVyYXJjaHkiOiJbYmFieWxvbnJidDAwMDAwMV0iLCJtaWQiO';
var evotoken1 = 'iJibGFja2phY2tjbGFzc2ljX2YwX2cwX2gwX2kwX2owIiwicGlkIjoic2N6amZhc2U3eWNyeTc1aiIsImV4cCI6MTcyMTI0MjA2NSwidGlkIjoiYmxhY2tqYWNrMGgwaTBqMCIsImNpZCI6ImJhYnlsb25yYnQwMDAwMDEiLCJzaWQiOiJzY3pqZmFzZTd5Y3J5NzVqc2N6amZhdDZiMnZuazN0YjkxZmNhZTcyIn0.THHn6McXvOZXGJXw-gOiX';
var evotoken2 = 'L1n30FW21wR9HZd4w1ClLVOUlImdCZMEc5CCh9_CNlp1nnvJBHywu9uTwfez-gEew';
var ses = 'sczjfase7ycry75jsczjfat6b2vnk3tb91fcae72';
var curr = 'DKK';
var amo = 100;
var splitt = 0;
var provider = "babylonrbt";
deal();
function deal() {
    fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=deal&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&wantsfreerounds=true&bet_code%5B0%5D=BJ_PlaySeat2&bet=0%3A0%2C1%3A"+amo+"00%2C2%3A0&perfectPairBet=&anyPairBet=&twentyOnePlusThreeBet=&pennsylvania213Bet=&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency="+curr+"&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=dee0011d-6381-42d1-8031-dbdcdf6a8940", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://babylonrbt000001-static2.casinomodule.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(res => res.text()).then(res => {
        res = res.replace('\n','');
        if(!res.includes('evo-error-code=2001')) {
            if(res.match(/dealerhand.handcomplete=(.*?)&/)) {
        if(res.match(/dealerhand.handcomplete=(.*?)&/)[1] === "false") {
        var nextact = res.match(/nextactiontoken=(.*?)&/)[1];
        dobest(nextact, res);
        } else if(res.match(/dealerhand.handcomplete=(.*?)&/)[1] === "true") {
            deal();
        };
    } else {

        console.log('Something happened. Retrying!');
        deal();
    }
    } else {
        console.log('Önceden el kalmıs!! :(');
        fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=init&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&wantsfreerounds=true&freeroundmode=false&wantsreels=true&no-cache=1716567906861&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=CAD&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Chromium\";v=\"105\", \")Not;A=Brand\";v=\"8\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "Referer": "https://babylonrbt000001-static2.casinomodule.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}).then(res => res.text()).then(res => {
    var nextact = res.match(/nextactiontoken=(.*?)&/)[1];
    dobest(nextact, res);
});
    }
    });
};
var i = 0;
function dobest(nextaction, res) {
//   // console.log('Split: ' + splitt);
  if(res.match(/box.i1.playerhand.i0.availableactions=(.*?)&/)[1] === "INSURANCE%2CNO_INSURANCE" || res.match(/box.i1.playerhand.i0.availableactions=(.*?)&/)[1] === "NO_INSURANCE%2CINSURANCE") {

    noins(nextaction, 'dab');

} else if(res.match(/box.i1.playerhand.i0.availableactions=(.*?)&/)[1] === "EVENMONEY%2CNO_EVENMONEY" || res.match(/box.i1.playerhand.i0.availableactions=(.*?)&/)[1] === "NO_EVENMONEY%2CEVENMONEY") {
    noins(nextaction, 'even');
    
    
} else if(res.match(/box.i1.playerhand.i0.availableactions=(.*?)&/)[1] === "SPLIT%2CNO_SPLIT" || res.match(/box.i1.playerhand.i0.availableactions=(.*?)&/)[1] === "NO_SPLIT%2CSPLIT") { 
// // console.log(res);
  var playercards = res.match(/box.i1.playerhand.i0.hand=(.*?)&/)[1].split('%2C');
  playercards.forEach((card,i) => {
    if(card[0].includes('T') || card[0].includes('Q') || card[0].includes('K') || card[0].includes('J')) {
      playercards[i] = 10;
    } else if(card[0].includes('A')) {
      playercards[i] = 1;
    } else {
      playercards[i] = Number(card[0]);
    }
  });
  var dealercard = (res.match(/dealerhand.hand=(.*?)&/)[1][0]);
  if(dealercard.includes('T') || dealercard.includes('Q') || dealercard.includes('K') || dealercard.includes('J')) {
    dealercard = 10;
  } else if(dealercard.includes('A')) {
    dealercard = 1;
  } else {
    dealercard = Number(dealercard);
  }
      if(dealercard === 1) {
          noins(nextaction);
      };
      // console.log(playercards);
      // console.log('Dealer: ' + dealercard);
      var move = lib.GetRecommendedPlayerAction(playercards, dealercard, 1, true, options);
      // console.log('Move: ' + move);
      if(move !== 'split') {
        nosplitr(nextaction);
      } else if(move === 'split') {
          splitr(nextaction);

      }
} else {
  if(splitt === 1) {
    if(i === 0) {
      var playercards = res.match(/box.i1.playerhand.i0.hand=(.*?)&/)[1].split('%2C');
playercards.forEach((card,i) => {
  if(card[0].includes('T') || card[0].includes('Q') || card[0].includes('K') || card[0].includes('J')) {
    playercards[i] = 10;
  } else if(card[0].includes('A')) {
    playercards[i] = 1;
  } else {
    playercards[i] = Number(card[0]);
  }
});
// console.log(playercards);
var dealercard = (res.match(/dealerhand.hand=(.*?)&/)[1][0]);
if(dealercard.includes('T') || dealercard.includes('Q') || dealercard.includes('K') || dealercard.includes('J')) {
  dealercard = 10;
} else if(dealercard.includes('A')) {
  dealercard = 1;
} else {
  dealercard = Number(dealercard);
}
// console.log('Dealer: ' + dealercard);
    if(dealercard === 1) {
        noins(nextaction);
    };
    var total = 0;
    playercards.forEach(cardd => {
      total+= cardd;
    });
    if(total >= 21) {
      deal();
    } else {
    var move = lib.GetRecommendedPlayerAction(playercards, dealercard, 1, true, options);
    if(move === 'stand') {
      stand(nextaction);
    } else if(move === 'hit') {
      hit(nextaction);
    } else if(move === 'double') {
      double(nextaction);
    } else if(move === 'split') {
      var total = 0;
      playercards.forEach(card => {
        total+=card;
      });
      if(total >= 12) {
        stand(nextaction);
      } else {
        hit(nextaction);
      }
    }
  };
  } else if(i === 1) {
    var playercards = res.match(/box.i1.playerhand.i1.hand=(.*?)&/)[1].split('%2C');
    playercards.forEach((card,i) => {
      if(card[0].includes('T') || card[0].includes('Q') || card[0].includes('K') || card[0].includes('J')) {
        playercards[i] = 10;
      } else if(card[0].includes('A')) {
        playercards[i] = 1;
      } else {
        playercards[i] = Number(card[0]);
      }
    });
    // console.log(playercards);
    var dealercard = (res.match(/dealerhand.hand=(.*?)&/)[1][0]);
    if(dealercard.includes('T') || dealercard.includes('Q') || dealercard.includes('K') || dealercard.includes('J')) {
      dealercard = 10;
    } else if(dealercard.includes('A')) {
      dealercard = 1;
    } else {
      dealercard = Number(dealercard);
    }
    // console.log('Dealer: ' + dealercard);
        if(dealercard === 1) {
            noins(nextaction);
        };
        var total = 0;
        playercards.forEach(cardd => {
          total+= cardd;
        });
        if(total >= 21) {
          deal();
        } else {
        var move = lib.GetRecommendedPlayerAction(playercards, dealercard, 1, true, options);
            // console.log('Move: ' + move);
        if(move === 'stand') {
          stand(nextaction);
        } else if(move === 'hit') {
          hit(nextaction);
        } else if(move === 'double') {
          double(nextaction);
        } else if(move === 'split') {
      var total = 0;
      playercards.forEach(card => {
        total+=card;
      });
      if(total >= 12) {
        stand(nextaction);
      } else {
        hit(nextaction);
      }
    }
  };
  }
} else {

  var playercards = res.match(/box.i1.playerhand.i0.hand=(.*?)&/)[1].split('%2C');
  playercards.forEach((card,i) => {
    if(card[0].includes('T') || card[0].includes('Q') || card[0].includes('K') || card[0].includes('J')) {
      playercards[i] = 10;
    } else if(card[0].includes('A')) {
      playercards[i] = 1;
    } else {
      playercards[i] = Number(card[0]);
    }
  });
  // console.log(playercards);
  var dealercard = (res.match(/dealerhand.hand=(.*?)&/)[1][0]);
  if(dealercard.includes('T') || dealercard.includes('Q') || dealercard.includes('K') || dealercard.includes('J')) {
    dealercard = 10;
  } else if(dealercard.includes('A')) {
    dealercard = 1;
  } else {
    dealercard = Number(dealercard);
  }
  // console.log('Dealer: ' + dealercard);
      if(dealercard === 1) {
          noins(nextaction);
      };
      var move = lib.GetRecommendedPlayerAction(playercards, dealercard, 1, true, options);
      // console.log('Move: ' + move);
      if(move === 'stand') {
        stand(nextaction);
      } else if(move === 'hit') {
        hit(nextaction);
      }else if(move === 'double') {
        double(nextaction);
      } else if(move === 'split') {
      var total = 0;
      playercards.forEach(card => {
        total+=card;
      });
      if(total >= 12) {
        stand(nextaction);
      } else {
        hit(nextaction);
      }
    }

}
};
};
    
function noins(nextaction, even) {
  if(even === 'dab') {
fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=no_insurance&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=USD&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=7cedae35-d3b9-4cd6-8883-ed5b6450053d", {
"headers": {
  "accept": "*/*",
  "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "cross-site"
},
"referrer": "https://babylonrbt000001-static2.casinomodule.com/",
"referrerPolicy": "strict-origin-when-cross-origin",
"body": null,
"method": "GET",
"mode": "cors",
"credentials": "omit"
}).then(r => r.text()).then(r => {
      r = r.replace('\n','');
var nextact = r.match(/nextactiontoken=(.*?)&/)[1];
  if(!r.includes('errorcode')) {
      if(r.match(/nextactiontoken=(.*?)&/)[1] === "null") {
          ins = 0;
deal();

      } else {
          dobest(nextact ,r);
      };
  } else {
noins(nextaction);
  };
});
  } else if(even === 'even') {
fetch("https://babylonrbt.evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=no_evenmoney&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=USD&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=fdd97bfd-47c4-461d-8a88-dbf7144ec6c6", {
"headers": {
  "accept": "*/*",
  "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
  "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "cross-site"
},
"referrer": "https://babylonrbt000001-static2.casinomodule.com/",
"referrerPolicy": "strict-origin-when-cross-origin",
"body": null,
"method": "GET",
"mode": "cors",
"credentials": "omit"
}).then(r => r.text()).then(r => {
      r = r.replace('\n','');
var nextact = r.match(/nextactiontoken=(.*?)&/)[1];
  if(!r.includes('errorcode')) {
      if(r.match(/nextactiontoken=(.*?)&/)[1] === "null") {
          ins = 0;
deal();

      } else {
          dobest(nextact ,r);
      };
  } else {
noins(nextaction);
  };
});


  };
};


function hit(nextaction) {
fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=hit&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=TRY&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=a5b8b367-290c-46d8-8d28-0e86489cb89d&bettingmode=cash", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://babylonrbt000001-static2.casinomodule.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(pes => pes.text()).then(res => {
    res = res.replace('\n','');
    if(splitt === 1) {
    // console.log(res);
    }
          var nextact = res.match(/nextactiontoken=(.*?)&/)[1];
          if(nextact !== "null") {
            if(i === 0) {
          var playercards = res.match(/box.i1.playerhand.i0.hand=(.*?)&/)[1].split('%2C');
playercards.forEach((card,i) => {
  if(card[0].includes('T') || card[0].includes('Q') || card[0].includes('K') || card[0].includes('J')) {
    playercards[i] = 10;
  } else if(card[0].includes('A')) {
    playercards[i] = 1;
  } else {
    playercards[i] = Number(card[0]);
  }
});
// console.log(playercards);
var dealercard = (res.match(/dealerhand.hand=(.*?)&/)[1][0]);
if(dealercard.includes('T') || dealercard.includes('Q') || dealercard.includes('K') || dealercard.includes('J')) {
  dealercard = 10;
} else if(dealercard.includes('A')) {
  dealercard = 11;
} else {
  dealercard = Number(dealercard);
}
// console.log('Dealer: ' + dealercard);
          } else if(i === 1) {
            var playercards = res.match(/box.i1.playerhand.i1.hand=(.*?)&/)[1].split('%2C');
            playercards.forEach((card,i) => {
              if(card[0].includes('T') || card[0].includes('Q') || card[0].includes('K') || card[0].includes('J')) {
                playercards[i] = 10;
              } else if(card[0].includes('A')) {
                playercards[i] = 1;
              } else {
                playercards[i] = Number(card[0]);
              }
            });
            // console.log(playercards);
            var dealercard = (res.match(/dealerhand.hand=(.*?)&/)[1][0]);
            if(dealercard.includes('T') || dealercard.includes('Q') || dealercard.includes('K') || dealercard.includes('J')) {
              dealercard = 10;
            } else if(dealercard.includes('A')) {
              dealercard = 11;
            } else {
              dealercard = Number(dealercard);
            }
            // console.log('Dealer: ' + dealercard);
          }
    var total = 0;
    playercards.forEach(cardd => {
      total+= cardd;
    });
  // console.log('Total: ' + total);
    if(total >= 21) {
      if(splitt === 0) {
        // console.log('Busted.');
        setTimeout(function() {
        deal();
        }, 100);
      } else if(splitt === 1) {
        if(i === 0) {
          // console.log('ilk el.');
          i++;
          dobest(nextact, res);
        } else if(i === 1) {
        // console.log('ikinci el.');
        setTimeout(function() {
          deal();
          }, 100);

        }
      }
    } else {
      // console.log('Hm napsak ki?');
      dobest(nextact, res);

    };
    } else {
      splitt = 0;
      i = 0;
      deal();
    }

});

};

function stand(nextaction) {
fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=stand&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=TRY&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=9d9ebc35-4a8c-448f-89a8-e3e65beb2b5d&bettingmode=cash", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://babylonrbt000001-static2.casinomodule.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(pes => pes.text()).then(pes => {
  pes = pes.replace('\n','');
  // // console.log(pes);
  if(splitt === 0) {
    // // console.log('Result: ' + pes.match(/box.i1.playerhand.i0.iswinning=(.*?)&/)[1]);
    setTimeout(() => {
    deal();  
    }, 100);
    
  } else if(splitt === 1) {
    if(i === 1) {
      i = 0;
      splitt = 0;
      // // console.log('Result: ' + pes.match(/box.i1.playerhand.i0.iswinning=(.*?)&/)[1]);
      setTimeout(() => {
        deal();  
        }, 100);
    } else if(i === 0) {
      i++;
      var nextact = pes.match(/nextactiontoken=(.*?)&/)[1];
      dobest(nextact, pes);
    }
  }

});
};


function nosplitr(nextaction) {
fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=no_split&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=TRY&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=cd6a10c2-66eb-42c7-88af-62f66f9160a0", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://babylonrbt000001-static2.casinomodule.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(pes => pes.text()).then(pes => {
    pes = pes.replace('\n','');
var nextact = pes.match(/nextactiontoken=(.*?)&/)[1];
    // console.log('Split False');
    dobest(nextact, pes);

});
};

function splitr(nextaction) {
  fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=split&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&bet_code%5B0%5D=BJ_SplitSeat2&ne_evo_token1="+evotoken1+"&ne_balance_id=combined&ne_currency=USD&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=b4b1ea68-7927-4215-9a85-2a56c752376f", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://babylonrbt000001-static2.casinomodule.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
}).then(pest => pest.text()).then(pest => {
  pest = pest.replace('\n','');
  if(!pest.includes('errorcode')) {
  // console.log(pest);
  var nextact = pest.match(/nextactiontoken=(.*?)&/)[1];
  if(nextact !== "null") {
  splitt = 1;

      dobest(nextact, pest);
  } else {
    // console.log('Result: ' + pest.match(/box.i1.playerhand.i0.iswinning=(.*?)&/)[1]);
    deal();
  }
  } else {
    splitr(nextaction);
  }
  });
}

function double(nextaction) {
  fetch("https://"+provider+".evo-games.com/public/rng/dragon/servlet/CasinoGameServlet;jsession="+ses+"?action=double&sessid="+ses+"&gameId=blackjackclassic_f0_g0_h0_i0_j0_not_mobile_sw&actionToken="+nextaction+"&wantsfreerounds=true&bet_code%5B0%5D=BJ_DoubleDownSeat2&ne_evo_token1="+evotoken1+"&ne_casinoId=babylonrbt000001&ne_balance_id=combined&ne_currency=USD&ne_evo_token2="+evotoken2+"&ne_evo_token="+evotoken+"&ne_mode=real&ne_device=desktop&no-cache=d9c59bc1-ddf1-49f1-b878-61fa54b212a1", {
    "headers": {
      "accept": "*/*",
      "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Google Chrome\";v=\"107\", \"Chromium\";v=\"107\", \"Not=A?Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://babylonrbt000001-static2.casinomodule.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  }).then(pes => pes.text()).then(pes => {
    pes = pes.replace('\n','');
    if(splitt === 0) {
      // // console.log('Result: ' + pes.match(/box.i1.playerhand.i0.iswinning=(.*?)&/)[1]);
      deal();
    } else if(splitt === 1) {
      if(i === 1) {
        i = 0;
        splitt = 0;
        // // console.log('Result: ' + pes.match(/box.i1.playerhand.i0.iswinning=(.*?)&/)[1]);
        deal();
      } else if(i === 0) {
        i++;
        var nextact = pes.match(/nextactiontoken=(.*?)&/)[1];
        dobest(nextact, pes);
      }
    }
  
  });
}
// en son insurance ta sıkıntı yaşıyorduk.
