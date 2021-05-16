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

$('#search').keyup(function() {
     var searchInput = this.value;
     console.log(searchInput);
     search(searchInput);
});

//checking if the player has played the simulation before
//if not, gives the player dedicated starting values
if (localStorage.getItem(storageIdentifier) == null) {
    simData = {
        money: 50000,
        moneyInvested: 0,
        portfolioVal: 0,
        trades: [],
        listedCompanies: [],
    }
    //pushing the companies into the listedCompanies array
    //these companies then have their own properties
    simData.listedCompanies.push({
            name: "Google",
            values: [8765],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Amazon",
            values: [5358],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Tesla",
            values: [6389],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Microsoft",
            values: [9231],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Facebook",
            values: [2426],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Netflix",
            values: [4653],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Disney",
            values: [6678],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Adobe",
            values: [8621],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Nike",
            values: [4521],
            amountOfStock: [0]
        }),
        simData.listedCompanies.push({
            name: "Intel",
            values: [1286],
            amountOfStock: [0]
        }),

        localStorage.setItem(storageIdentifier, JSON.stringify(simData))
} else {
    simData = JSON.parse(localStorage.getItem(storageIdentifier))
}

//calls for the setting up of the simulation
setUp()

//setting up the company and value lists onto the DOM, using a for statement for efficiency
function setUp() {
    var id = 0
    for (i = 0; i < simData.listedCompanies.length; i++) {
        id = id + 1
        $('#comp' + id).html(simData.listedCompanies[i].name);
        $('#val' + id).html(formatter.format(simData.listedCompanies[i].values));

    }
    $('#mon').html(formatter.format(simData.money));
    $('#monInv').html(formatter.format(simData.moneyInvested));
    $('#portVal').html(formatter.format(simData.portfolioVal));

    start();
}

function start() {
    var id = 0
    for (i = 0; i < simData.listedCompanies.length; i++) {
        id = id + 1
        var stockPrice = simData.listedCompanies[i].values
        var rand = Math.round(Math.random() * 10) / 10
        if (rand < 0.5) {
            stockPrice = Number(stockPrice) + Number((Math.round(((Math.random() * 1000) + 1) * 10) / 10))
            simData.listedCompanies[i].values = Number(stockPrice)
            $('#val' + id).css("color", "green")
            $('#val' + id).html(formatter.format(stockPrice));
            simData.portfolioVal = Number(simData.portfolioVal) + (Number(simData.listedCompanies[i].amountOfStock) * Number(simData.listedCompanies[i].values))
            $('#portVal').html(formatter.format(simData.portfolioVal));
        } else {
            stockPrice = Number(stockPrice) - Number((Math.round(((Math.random() * 1000) + 1) * 10) / 10))
            simData.listedCompanies[i].values = Number(stockPrice)
            $('#val' + id).css("color", "red")
            $('#val' + id).html(formatter.format(stockPrice));
            simData.portfolioVal = (Number(simData.listedCompanies[i].amountOfStock) * Number(simData.listedCompanies[i].values)) + Number(simData.portfolioVal)
            $('#portVal').html(formatter.format(simData.portfolioVal));
        }
    }
    setTimeout(start, 7000)
}

//resets the localstorage object
function reset() {
    localStorage.removeItem(storageIdentifier, JSON.stringify(simData))
}

var tradeTick = 0
//buys the stock at the current market price
function buy(stock) {

    /*
    console.log(simData.listedCompanies[stock].name)
    console.log(simData.listedCompanies[stock].values)
    simData.money = Number(simData.money) - Number(simData.listedCompanies[stock].values)
    simData.listedCompanies[stock].push({
        amountOfStock : []
    })
    simData.listedCompanies[stock].amountOfStock = simData.listedCompanies[stock].amountOfStock + 1
    simData.trades.push({ 
        identifier : stock,
        name : simData.listedCompanies[stock].name,
        buyVal : simData.listedCompanies[stock].values,
        sellVal : [],
    })

    
    var stockAdd = 0;
    simData.money = Number(simData.money) - Number(simData.listedCompanies[stock].values)
    stockAdd = Number(simData.listedCompanies[stock].amountOfStock)
    stockAdd = stockAdd + 1
    simData.listedCompanies[stock].amountOfStock = stockAdd
    console.log(simData.listedCompanies[stock].amountOfStock)
*/


    if (simData.money > simData.listedCompanies[stock].values) {
        simData.money = Number(simData.money) - Number(simData.listedCompanies[stock].values)

        simData.moneyInvested = simData.moneyInvested + Number(simData.listedCompanies[stock].values)

        simData.trades.push({
            name: simData.listedCompanies[stock].name,
            buyVal: simData.listedCompanies[stock].values,
            sellVal: [],
        })

        if (simData.listedCompanies[stock].amountOfStock == null) {
            simData.listedCompanies[stock].amountOfStock = 0
        }

        simData.portfolioVal = (Number(simData.listedCompanies[stock].amountOfStock) * Number(simData.listedCompanies[stock].values)) + Number(simData.portfolioVal)

        simData.listedCompanies[stock].amountOfStock = Number(simData.listedCompanies[stock].amountOfStock) + 1

        console.log(simData.listedCompanies[stock].amountOfStock)

        simData.moneyInvested = Number(simData.moneyInvested) + Number(simData.listedCompanies[stock].values)

        localStorage.setItem(storageIdentifier, JSON.stringify(simData))

        $('#mon').html(formatter.format(simData.money));
        $('#monInv').html(formatter.format(simData.moneyInvested));
        $('#portVal').html(formatter.format(simData.portfolioVal));

        
    }else{
        alert("Not enough money to buy this stock!")
        return
    }
}

//sells the stock at the current market price
function sell(stock) {
    /*
    if((simData.trades[stock].name == simData.listedCompanies[stock].name) && simData.trades[stock].amountOfStock > 0) {
    simData.money = Number(simData.money) + Number(simData.listedCompanies[stock].values)
    simData.trades[stock].amountOfStock = Number(simData.trades[stock].amountOfStock) - 1
    simData.trades[stock].sellVal = [simData.listedCompanies[stock].values]
    console.log(simData.money)
    }else{
        console.log("have not bought")
    }
    */

    if(simData.listedCompanies[stock].amountOfStock > 0) {
        simData.money = Number(simData.money) + Number(simData.listedCompanies[stock].values)
        simData.listedCompanies[stock].amountOfStock = Number(simData.listedCompanies[stock].amountOfStock) - 1
        simData.moneyInvested = Number(simData.moneyInvested) - Number(simData.listedCompanies[stock].values)
        simData.portfolioVal = Number(simData.portfolioVal) -  
        localStorage.setItem(storageIdentifier, JSON.stringify(simData))
        $('#mon').html(formatter.format(simData.money));
        $('#monInv').html(formatter.format(simData.moneyInvested));
        $('#portVal').html(formatter.format(simData.portfolioVal));
    }else{
        alert("You have not bought this stock!")
    }

}


let binarySearch = function (arr, x, start, end) {
       
    // base Condition
    if (start > end) return false;
   
    // find the middle index
    let mid=Math.floor((start + end)/2);
   
    // compare mid with given key x
    if (arr[mid]===x) return true;
          
    // if element at mid is greater than x,
    // search in the left half of mid
    if(arr[mid] > x) 
        return binarySearch(arr, x, start, mid-1);
    else
  
        // if element at mid is smaller than x,
        // search in the right half of mid
        return binarySearch(arr, x, mid+1, end);
}

function search(x) {
    var arr = []
    for(i=0;i<simData.listedCompanies.length;i++){
        arr.push(simData.listedCompanies[i].name) 
    }
    arr.sort();
    var start = 0
    var end = arr.length - 1
    if(binarySearch(arr,x,start,end)){
        console.log("found");
        for(i=0;i<arr.length;i++){
            if(x == simData.listedCompanies[i].name){
                $('#stock' + i).show();
            }else{
                $('#stock' + i).hide();
            }
        }
            
    }else if(x == ""){
        console.log("blank")
        for(i=0;i<simData.listedCompanies.length;i++){
            $('#stock' + i).show();
            console.log(i);
        }
    }
}




