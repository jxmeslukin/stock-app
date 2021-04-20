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

    simData.listedCompanies.push({name : Google, value : [8765]})
    simData.listedCompanies.push({name : Amazon, value : [5358]})
    simData.listedCompanies.push({name : Tesla, value : [6389]})
    simData.listedCompanies.push({name : Microsoft, value : [9231]})
    simData.listedCompanies.push({name : Facebook, value : [2426]})
    simData.listedCompanies.push({name : Netflix, value : [4653]})
    simData.listedCompanies.push({name : Disney, value : [6678]})
    simData.listedCompanies.push({name : Adobe, value : [8621]})
    simData.listedCompanies.push({name : Nike, value : [4521]})
    simData.listedCompanies.push({name : Intel, value : [1286]})
    simData.listedCompanies.push({name : Paypal, value : [5269]})

    localStorage.setItem(storageIdentifier, JSON.stringify(simData))
}else {
    simData = JSON.parse(localStorage.getItem(storageIdentifier))
}
