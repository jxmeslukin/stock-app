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
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Amazon",
            values: [5358],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Tesla",
            values: [6389],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Microsoft",
            values: [9231],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Facebook",
            values: [2426],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Netflix",
            values: [4653],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Disney",
            values: [6678],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Adobe",
            values: [8621],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Nike",
            values: [4521],
            amountOfStock: [0],
            buyIn: [0]
        }),
        simData.listedCompanies.push({
            name: "Intel",
            values: [1286],
            amountOfStock: [0],
            buyIn: [0]
        }),

        localStorage.setItem(storageIdentifier, JSON.stringify(simData))
} else {
    simData = JSON.parse(localStorage.getItem(storageIdentifier))
}

//calls for the setting up of the simulation
setUp()

//setting up the company and value lists onto the DOM, using a for statement for efficiency and automation
function setUp() {
    var id = 0
    for (i = 0; i < simData.listedCompanies.length; i++) {
        id = id + 1
        $('#comp' + id).html(simData.listedCompanies[i].name);
        $('#val' + id).html(formatter.format(simData.listedCompanies[i].values));

    }
    $('#mon').html(formatter.format(simData.money));
    $('#monInv').html(formatter.format(simData.moneyInvested));

    start();
}


//starts the simulation
function start() {
    var id = 0
    //loops through the amount of listed companies, and changes their 'stock' value based on a random number
    for (i = 0; i < simData.listedCompanies.length; i++) {
        id = id + 1
        var stockPrice = simData.listedCompanies[i].values
        var rand = Math.round(Math.random() * 10) / 10
        if (rand < 0.5) {
            //increases the stock price by $0 (not inclusive) to $1000
            stockPrice = Number(stockPrice) + Number((Math.round(((Math.random() * 1000) + 1) * 10) / 10))
            simData.listedCompanies[i].values = Number(stockPrice)
            $('#val' + id).css("color", "green")
            $('#val' + id).html(formatter.format(stockPrice));
            posNegCheck();
            // port val - current changed value
            // invest val - static money put in or taken out 
        } else {
            //decreases the stock price by $0 (not inclusive) to $1000
            stockPrice = Number(stockPrice) - Number((Math.round(((Math.random() * 1000) + 1) * 10) / 10))
            simData.listedCompanies[i].values = Number(stockPrice)
            $('#val' + id).css("color", "red")
            $('#val' + id).html(formatter.format(stockPrice));
            posNegCheck();
        }
    }
    setTimeout(start, 2000)
}

//resets the localstorage object - restarting the simulation after refresh
function reset() {
    localStorage.removeItem(storageIdentifier, JSON.stringify(simData))
    location.reload();
}

//buys the stock at the current market price
function buy(stock) {


    // defining if the user has enough money to buy the stock
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


        simData.listedCompanies[stock].buyIn = Number(simData.listedCompanies[stock].buyIn) + simData.listedCompanies[stock].values;

        simData.portfolioVal = Number(simData.portfolioVal) + Number(simData.listedCompanies[stock].values);

        simData.listedCompanies[stock].amountOfStock = Number(simData.listedCompanies[stock].amountOfStock) + 1

        console.log(simData.listedCompanies[stock].amountOfStock)

        simData.moneyInvested = Number(simData.moneyInvested) + Number(simData.listedCompanies[stock].values);

        localStorage.setItem(storageIdentifier, JSON.stringify(simData))

        $('#mon').html(formatter.format(simData.money));
        $('#monInv').html(formatter.format(simData.moneyInvested));


    } else {
        alert("Not enough money to buy this stock!")
        return
    }
}

//sells the stock at the current market price
function sell(stock) {

    //if the user owns more than 0 stock, they are enabled to sell it
    if (simData.listedCompanies[stock].amountOfStock > 0) {
        simData.money = Number(simData.money) + Number(simData.listedCompanies[stock].values)
        simData.listedCompanies[stock].amountOfStock = Number(simData.listedCompanies[stock].amountOfStock) - 1
        simData.moneyInvested = Number(simData.moneyInvested) - Number(simData.listedCompanies[stock].values) //work out to change original buy in val
        simData.portfolioVal = Number(simData.portfolioVal) - Number(simData.listedCompanies[stock].values);
        localStorage.setItem(storageIdentifier, JSON.stringify(simData))
        $('#mon').html(formatter.format(simData.money));
        $('#monInv').html(formatter.format(simData.moneyInvested));
    } else {
        alert("You have not bought this stock!")
    }

}

//binary search for a listed company
let binarySearch = function(arr, x, start, end) {

    // the base condition
    if (start > end) return false;

    // finding the middle index to distinguish item in array
    let mid = Math.floor((start + end) / 2);

    // compare mid with given key x (the company)
    if (arr[mid] === x) return true;

    // if company at mid is greater than x,
    // search in the left half of mid
    if (arr[mid] > x)
        return binarySearch(arr, x, start, mid - 1);
    else

        // if element at mid is smaller than x,
        // search in the right half of mid
        return binarySearch(arr, x, mid + 1, end);
}

//function to then execute search order once the user starts typing
function search(x) {
    var arr = []
    for (i = 0; i < simData.listedCompanies.length; i++) {
        arr.push(simData.listedCompanies[i].name);
    }
    arr.sort();
    var start = 0
    var end = arr.length - 1
    if (binarySearch(arr, x, start, end)) {
        for (i = 0; i < arr.length; i++) {
            if (x == simData.listedCompanies[i].name) {
                $('#stock' + i).show();
            } else {
                $('#stock' + i).hide();
            }
        }

    } else if (x == "") {
        for (i = 0; i < simData.listedCompanies.length; i++) {
            $('#stock' + i).show();
            console.log(i);
        }
    }
}

//sorting an array via insertion
function insertionSort(inputArr) {
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        // choosing the first element in the unsorted subarray
        let current = inputArr[i];
        // the last element of the sorted subarray
        let j = i - 1;
        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j + 1] = inputArr[j];
            j--;
        }
        inputArr[j + 1] = current;
    }
    return inputArr;
}

function posNegCheck() {
    if((Number(simData.money)) > 50000){
        $('#posNeg').html("Profit");
        $('#posNeg').css("color", "green");
    }
    else {
        $('#posNeg').html("Loss");
        $('#posNeg').css("color", "red");
    }
    
}
