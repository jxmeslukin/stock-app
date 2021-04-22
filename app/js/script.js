/*

Stratton Oakmont - a stock simulation
Created by James Lukin, Zac Bolt - 2021

*/

var storageIdentifier = 'stratton'
var simData = {}

if(localStorage.getItem(storageIdentifier) == null) {
    simData = {
        money : 50000,
        moneyInvested : 0,
        portfolioVal : 0,
        trades : [],
        listedCompanies : []
    }

    simData.listedCompanies.push({name : "Google", values : [8765]});
    simData.listedCompanies.push({name : "Amazon", values : [5358]})
    simData.listedCompanies.push({name : "Tesla", values : [6389]})
    simData.listedCompanies.push({name : "Microsoft", values : [9231]})
    simData.listedCompanies.push({name : "Facebook", values : [2426]})
    simData.listedCompanies.push({name : "Netflix", values : [4653]})
    simData.listedCompanies.push({name : "Disney", values : [6678]})
    simData.listedCompanies.push({name : "Adobe", values : [8621]})
    simData.listedCompanies.push({name : "Nike", values : [4521]})
    simData.listedCompanies.push({name : "Intel", values : [1286]})

    localStorage.setItem(storageIdentifier, JSON.stringify(simData))
}else {
    simData = JSON.parse(localStorage.getItem(storageIdentifier))
}

setUp()

function setUp() {
    var id = 0
    for(i = 0; i < simData.listedCompanies.length; i++) {
        id = id+1
        $('#comp'+id).html(simData.listedCompanies[i].name);
    }
}

function reset() {
    localStorage.removeItem(storageIdentifier, JSON.stringify(simData))
}