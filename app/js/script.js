/*

Stratton Oakmont - a stock simulation
Created by James Lukin, Zac Bolt - 2021

*/

var storageIdentifier = 'stratton'
var simData = {}
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'AUD',
})

//checking if the player has played the simulation before
//if not, gives the player dedicated starting values
if(localStorage.getItem(storageIdentifier) == null) {
    simData = {
        money : 50000,
        moneyInvested : 0,
        portfolioVal : 0,
        trades : [],
        listedCompanies : []
    }
    //pushing the companies into the listedCompanies array
    //these companies then have their own properties
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

//calls for the setting up of the simulation
setUp()

//setting up the company and value lists onto the DOM, using a for statement for efficiency
function setUp() {
    var id = 0
    for(i = 0; i < simData.listedCompanies.length; i++) {
        id = id+1
        $('#comp'+id).html(simData.listedCompanies[i].name);
        $('#val'+id).html(formatter.format(simData.listedCompanies[i].values));
        start();
    }

}


function start() {
    var stockPrice = simData.listedCompanies[i].values

    for(i = 0; i > simData.listedCompanies.length; i++){
        var rand = Math.floor(Math.random() * 10) + 1
        console.log(rand)
    }



}


function reset() {
    localStorage.removeItem(storageIdentifier, JSON.stringify(simData))
}