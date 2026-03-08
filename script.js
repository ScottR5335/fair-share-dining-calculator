console.log("JS is connected.")
let totalAmountDue = 0;
let totalAmountSpan = document.getElementById("totalAmountDue");
totalAmountSpan.textContent = `${totalAmountDue.toFixed(2)}`;

let shareTable = document.getElementById('shareTable');
shareTable.style.display = 'none';

//This helper function determine's the cost of a share of the meal.//
/*
function getCostOfShare(mealCost, numPatrons, tipPercentage) {
    let oneShare = (mealCost * (1 + tipPercentage/100)) / numPatrons;
    return oneShare;
}
*/

function getCostOfSharePreTip(mealCost, numPatrons) {
    let preTipShare = (mealCost/numPatrons);
    return preTipShare;
}

function getCostOfTipPerShare(mealCost, numPatrons, tipPercentage) {
    let tipPerShare = (mealCost * (tipPercentage/100))/numPatrons;
    return tipPerShare;
}

function getTotalCostPerShare(mealCost, numPatrons, tipPercentage) {
    let totalCostPerShare =
        getCostOfSharePreTip(mealCost, numPatrons) +
        getCostOfTipPerShare(mealCost, numPatrons, tipPercentage);
    return totalCostPerShare;
}




let mealCost;
let numPatrons = 1;
let TipPercentage;
let myDefaultTableContent =
    `<caption>Amounts to Pay Based on Number of Shares</caption>
    <tr>
        <th rowspan=2>
            In order to pay <br>for <i>x</i> shares<br>of the meal, ...
        </th>
        <th colspan=3>
            ... put these amounts toward the<br>total cost of the meal.
        </th>
    </tr>
    <tr>
        <th>Pre-tip</th>
        <th>Tip</th>
        <th>Total</th>
    </tr>`

document.addEventListener("DOMContentLoaded", () => {
  new QRCode(document.getElementById("qrcode"), {
    text: window.location.href,
    width: 128,
    height: 128
  });
});



document.addEventListener('change', function() {
    mealCost = Number(document.getElementById("cost").value);
    numPatrons = Number(document.getElementById("numInParty").value);
    if (!(numPatrons)) {
        numPatrons = 1;
    }
    console.log(`The value of numPatrons is ${numPatrons}`);
    tipPercentage = Number(document.getElementById("tipPercentage").value);
    totalAmountDue = mealCost * (1 + tipPercentage/100);
    
    totalAmountSpan.textContent = `${totalAmountDue.toFixed(2)}`;

    console.log(`The cost of this meal is ${mealCost}.`);
    console.log(`The number of patrons is ${numPatrons}.`);
    console.log(`The additional tip percentage is ${tipPercentage}.`);

    /*let shareTable = document.getElementById('shareTable');*/

    if (totalAmountDue == 0) {
        shareTable.style.display = 'none';
    }
    else {
        shareTable.style.display = 'table';
    }

    shareTable.innerHTML = myDefaultTableContent;


    /*let shareCost = getCostOfShare(mealCost, numPatrons, tipPercentage);*/

    let preTipShareCost = getCostOfSharePreTip(mealCost, numPatrons);
    let tipPerShareCost = getCostOfTipPerShare(mealCost, numPatrons, tipPercentage);
    let totalShareCost = getTotalCostPerShare(mealCost, numPatrons, tipPercentage);

    console.log(`The cost of one share is ${totalShareCost}.`)
    for (let numShares = 1; numShares <= numPatrons; numShares++) {
        let newRow = document.createElement("tr");

        let sharesCell = document.createElement("td");
        if (numShares == 1) {
            sharesCell.textContent = numShares + ' share';
        }
        else {
            sharesCell.textContent = numShares + ' shares';
        }
        newRow.appendChild(sharesCell);

        let preTipAmtDueCell = document.createElement("td");
        preTipAmtDueCell.textContent = '$' + (preTipShareCost * numShares).toFixed(2);
        newRow.appendChild(preTipAmtDueCell);

        let tipDueCell = document.createElement("td");
        tipDueCell.textContent = '$' + (tipPerShareCost * numShares).toFixed(2);
        newRow.appendChild(tipDueCell);

        let totalDueCell = document.createElement("td");
        totalDueCell.textContent = '$' + (totalShareCost * numShares).toFixed(2);
        newRow.appendChild(totalDueCell);

        /*let amountDueCell = document.createElement("td");
        amountDueCell.textContent = '$'+(shareCost * numShares).toFixed(2);
        newRow.appendChild(amountDueCell);*/

        shareTable.appendChild(newRow);
    };
})

