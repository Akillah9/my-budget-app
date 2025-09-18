// functions //

function financial(number) {

	return number.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "CZK";
}


// pokud tohle dam hned nad funkci, tak mi pak bude JS napovidat u teto funkce, co tam mam pouzit
// /**
//  * 
//  * @param {*} a 
//  * @param {*} b 
//  * @returns 
//  */


// function difference(income, spendings) {
//     let diff = (income - spendings) / 7;  // stále číslo
//     let formatted = diff.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "CZK";
//     return formatted;
// }

function averageDifference(incomeValues, spendingsValues) {
    let totalMonths = 0;
    let totalDiff = 0;
    let count = 0;

    for (let i = 0; i < incomeValues.length; i++) {
        // Pokud klient vyplnil aspoň jeden z příjmů nebo výdajů, počítáme měsíc
        // if (incomeValues[i] || spendingsValues[i]) {
        //     totalMonths++;
        //     totalDiff += (incomeValues[i] || 0) - (spendingsValues[i] || 0);
        
        // if (!isNaN(incomeValues[i]) || !isNaN(spendingsValues[i])) {
        //     totalDiff += (incomeValues[i] || 0) - (spendingsValues[i] || 0);
        //     count++;

        if (incomeValues[i] !== 0 || spendingsValues[i] !== 0) {
            totalDiff += (incomeValues[i] || 0) - (spendingsValues[i] || 0);
            count++;
        }
    }

    // let avg = totalMonths > 0 ? totalDiff / totalMonths : 0;

    let avg = count > 0 ? totalDiff / count : 0;
    return avg.toLocaleString('cs-CZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "CZK";
}

function calculate(incomeValues, spendingsValues) {
    let totalIncome = incomeValues.reduce((a,b) => a+b, 0);
    let totalSpendings = spendingsValues.reduce((a,b) => a+b, 0);
    let result = difference(totalIncome, totalSpendings);
    return result;
}

// MAIN PROJECT //

// let income = 10000.159;
// let spendings = 5000.283;

// console.log("Income: " + financial(income));
// console.log("Spendings: " + financial(spendings));
// console.log("Difference amount: " + difference(income, spendings));

// document.body.innerHTML = "Income" + " " + financial(income);
// document.body.innerHTML = "Spendings" + " " + financial(spendings);

// let income = document.getElementById("income").value;
// let spendings = document.getElementById("spendings").value;


// const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [{
//         label: 'Spendings per month',
//         data: [spendings1, spendings2, spendings3, spendings4, spendings5, spendings6, spendings7],
//         fill: false,
//         borderColor: 'rgb(197, 25, 34)',
//         tension: 0.1
//     }]
// };



document.addEventListener("DOMContentLoaded", function() {

    const incomeContainer = document.getElementById("income-column");
    const spendingsContainer = document.getElementById("spendings-column");
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug'];

    months.forEach((month, index) => {
        const divIncome = document.createElement("div");
        divIncome.className = "field";
        divIncome.innerHTML = `
                <input class="input" type="number" id="income${index+1}" placeholder="Income in ${month}" />
                <span class="icon is-small is-left">
                    <i class="fas fa-coin"></i>
                </span>
            
        `;
        incomeContainer.appendChild(divIncome);
    });

    months.forEach((month, index) => {
        const divSpendings = document.createElement("div");
        divSpendings.className = "field";
        divSpendings.innerHTML = `
            <input class="input" type="number" id="spendings${index+1}" placeholder="Spendings in ${month}" />
            <span class="icon is-small is-left">
                <i class="fas fa-coin"></i>
            </span>
            
        `;
        spendingsContainer.appendChild(divSpendings);
    });
    
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
                responsive: true,
                maintainAspectRatio: false,
                datasets: [
                {
                    label: 'Income',
                    // data: [0, 0, 0, 0, 0, 0, 0], // počáteční data
                    data: Array(5).fill(0),
                    borderColor: 'rgb(34, 197, 25)',
                    backgroundColor: 'rgba(34, 197, 25, 0.5)',
                    borderWidth: 1,                    
                    tension: 0.4,
                },
             
                {
                    label: 'Spendings',
                    // data: [0, 0, 0, 0, 0, 0, 0], // počáteční data
                    data: Array(5).fill(0),
                    borderColor: 'rgb(197, 25, 34)',
                    backgroundColor: 'rgba(197, 25, 34, 0.5)',
                    borderWidth: 1,
                    tension: 0.4,
                }
            ]
        },

        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });


    document.getElementById("calculate").addEventListener("click", function() {
        console.log("Button clicked");

        // let income = Number(document.getElementById("income").value);
        // let spendings = Number(document.getElementById("spendings").value);

        let incomeValues = [];
        let spendingsValues = [];
        for (let i = 1; i <= 5; i++) {
            incomeValues.push(Number(document.getElementById(`income${i}`).value));
            spendingsValues.push(Number(document.getElementById(`spendings${i}`).value));
        }

        // let budget = calculate(incomeValues, spendingsValues);
        // let totalIncome = incomeValues.reduce((a, b) => a + b, 0);
        // let totalSpendings = spendingsValues.reduce((a, b) => a + b, 0);
        // let avgBudget = difference(totalIncome, totalSpendings);
        // document.getElementById("result").textContent = budget;

        let result = averageDifference(incomeValues, spendingsValues);
        document.getElementById("result").textContent = result;

        // console.log("Income: ", income, "Spendings: ", spendings);
        // let result = difference(income, spendings);
        
        //z toho jsem nakonec udělala funkcí calculate:
        // let totalIncome = incomeValues.reduce((a,b) => a+b, 0);
        // let totalSpendings = spendingsValues.reduce((a,b) => a+b, 0);
        // let result = difference(totalIncome, totalSpendings);
        // document.getElementById("result").textContent = result;
                
        // console.log("Difference: ", result);

        // document.getElementById("result").textContent = result;

        // let monthlySpendings = [];
        // for (let i = 0; i < 7; i++) {
        //     monthlySpendings.push(spendings / 7);
        // }

        myChart.data.datasets[0].data = incomeValues;
        myChart.data.datasets[1].data = spendingsValues;
        myChart.update();

    });
});



