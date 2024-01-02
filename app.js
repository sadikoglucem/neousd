var sid = 'gff56f135dda7cb38d1afd39729df5ac42d0f1e7';
deal();
function deal() {
fetch("https://iomeu-casino-client.api.relaxg.com/game/play", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://cf-iomeu-cdn.relaxg.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"g\":\"blackjackneo\",\"sid\":\""+sid+"\",\"restoreState\":\"{}\",\"restoreVersion\":2,\"ga\":\"deal\",\"ba\":\"[0,200,0]\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(r => r.json()).then(r => {

//console.log(r);
if(r.errorMessage && r.errorMessage === 'Command ignores game state of an unfinished game') {
dobest("hit");
} else if(r.errorMessage && r.errorMessage === 'Partner cashier error') {
setTimeout(function() {
deal();
}, 1000);
} else if(r.errorMessage && r.errorMessage === 'Session missing or expired') {
getSID();
} else {
    if(r.ended !== true) {
        if(r.houseHand !== '11/1') {
var kopya = r.hints;
    kopya.forEach(k => {
if(k[1] === 'BEST') {
dobest(k[0]);
    
}
    });
    } else {
noinsurance();

        };
} else {
console.log(r.playerHands[0][0].result);
        deal();

    };
};
});
};

function dobest(bo) {
    fetch("https://iomeu-casino-client.api.relaxg.com/game/play", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://cf-iomeu-cdn.relaxg.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"g\":\"blackjackneo\",\"sid\":\""+sid+"\",\"restoreState\":\"{}\",\"restoreVersion\":3,\"ga\":\""+bo+"\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(p => p.json()).then(p => {
if(p.errorMessage && p.errorMessage === 'Partner cashier error') {
setTimeout(function() {
deal();
}, 1000);
} else if(p.errorMessage && p.errorMessage === 'Session missing or expired') {
getSID();
} else {
        if(p.ended === true) {
console.log(p.playerHands[0][0].result);
            deal();
        } else {
var kopya = p.hints;
    kopya.forEach(k => {
if(k[1] === 'BEST') {
dobest(k[0]);
    
};
    });
        };
};
});
};

function noinsurance() {
    fetch("https://iomeu-casino-client.api.relaxg.com/game/play", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Microsoft Edge\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://cf-iomeu-cdn.relaxg.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"g\":\"blackjackneo\",\"sid\":\""+sid+"\",\"restoreState\":\"{\\\"insurance\\\":[false]}\",\"restoreVersion\":41,\"ga\":\"insurance\",\"insurances\":\"[false]\"}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
}).then(p => p.json()).then(t => {
if(t.errorMessage && t.errorMessage === 'Partner cashier error') {
setTimeout(function() {
noinsurance();
}, 1000);
} else if(t.errorMessage && t.errorMessage === 'Session missing or expired') {
getSID();
} else {
        if(t.ended === true) {
console.log(t.playerHands[0][0].result);
            deal();
        } else {
var kopya = t.hints;
    kopya.forEach(k => {
if(k[1] === 'BEST') {
dobest(k[0]);
    
};
    });
        };
};
    });
};
function getSID() {
fetch("https://iomeu-casino-client.api.relaxg.com/capi/2.0/casino/token/gettoken", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://cf-iomeu-cdn.relaxg.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"gameref\":\"blackjackneo\",\"ticket\":\"0DF7FFDF98AA1E3E1EB7A06A00F9A522C3B29438\",\"partnerid\":\"892\",\"mode\":\"dev\",\"channel\":\"web\",\"clientid\":\"\",\"clientversion\":\"2023-08-24 1.8.0\"}",
  "method": "POST"
}).then(r => r.json()).then(r => {
fetch("https://iomeu-casino-client.api.relaxg.com/game/rmlogin", {
  "headers": {
    "accept": "*/*",
    "accept-language": "tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7",
    "content-type": "application/json",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "Referer": "https://cf-iomeu-cdn.relaxg.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"token\":\""+r.response.token+"\",\"userid\":\""+r.response.userid+"\",\"mode\":\"dev\",\"partnerid\":\"892\",\"channel\":\"web\",\"clientid\":\"\",\"g\":\"blackjackneo\",\"immediatePayouts\":false,\"clientversion\":\"2023-08-24 1.8.0\"}",
  "method": "POST"
}).then(s => s.json()).then(s => {
sid = s.sid;
console.log('Successfully updated the SID');
deal();
//Keep in mind that ticket in the 'gettoken' fetch is the one that chooses currencies. This is for only USD.
});
});
};
