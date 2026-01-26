console.log("JS is connected.")
let totalAmountDue = 0;
let totalAmountSpan = document.getElementById("totalAmountDue");
totalAmountSpan.textContent = `${totalAmountDue.toFixed(2)}`;
//This helper function determine's the cost of a share of the meal.//
function getCostOfShare(mealCost, numPatrons, tipPercentage) {
    let oneShare = (mealCost * (1 + tipPercentage/100)) / numPatrons;
    return oneShare;
}

let mealCost;
let numPatrons = 1;
let additionalTipPercentage;
let myDefaultTableContent =
    `<caption>Costs for Each Number of Shares</caption>
    <tr>
        <th>
            Someone responsible for this number of shares...
        </th>
        <th>
            ...should put this amount toward the cost of the meal.
        </th>
    </tr>`

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

    let shareTable = document.getElementById('shareTable');
    shareTable.innerHTML = myDefaultTableContent;
    let shareCost = getCostOfShare(mealCost, numPatrons, tipPercentage);
    console.log(`The cost of one share is ${shareCost}.`)
    for (let numShares = 1; numShares <= numPatrons; numShares++) {
        let newRow = document.createElement("tr");
        let sharesCell = document.createElement("td");
        sharesCell.textContent = numShares;
        newRow.appendChild(sharesCell);
        let amountDueCell = document.createElement("td");

        amountDueCell.textContent = '$'+(shareCost * numShares).toFixed(2);
        newRow.appendChild(amountDueCell);
        shareTable.appendChild(newRow);
    };
})

