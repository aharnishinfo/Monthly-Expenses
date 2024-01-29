let monthlyExpenses = [];

function addDailyExpense() {
    const date = document.getElementById('date').value;
    const breakfast = parseFloat(document.getElementById('breakfast').value) || 0;
    const lunch = parseFloat(document.getElementById('lunch').value) || 0;
    const dinner = parseFloat(document.getElementById('dinner').value) || 0;
    const bus = parseFloat(document.getElementById('bus').value) || 0;
    const rickshaw = parseFloat(document.getElementById('rickshaw').value) || 0;
    const bike = parseFloat(document.getElementById('bike').value) || 0;
    const own = parseFloat(document.getElementById('own').value) || 0;

    const dailyTotalINR = breakfast + lunch + dinner + bus + rickshaw + bike + own;

    const dailyExpense = {
        date,
        breakfast,
        lunch,
        dinner,
        bus,
        rickshaw,
        bike,
        own,
        total: dailyTotalINR
    };

    monthlyExpenses.push(dailyExpense);

    updateDailyExpenses();

    calculateIndividualTotals();
    calculateMonthlyTotal();
}

function updateDailyExpenses() {
    const dailyExpensesContainer = document.getElementById('dailyExpenses');
    dailyExpensesContainer.innerHTML = '';

    monthlyExpenses.forEach((expense, index) => {
        const div = document.createElement('div');
        div.classList.add('daily-expense');

        // Format date as "dd-mm-yyyy"
        const formattedDate = formatDate(expense.date);

        div.innerHTML = `
                    <strong>${formattedDate}</strong> - Total: ₹${expense.total.toFixed(2)}<br>
                    Breakfast: ₹${expense.breakfast.toFixed(2)}<br>
                    Lunch: ₹${expense.lunch.toFixed(2)}<br>
                    Dinner: ₹${expense.dinner.toFixed(2)}<br>
                    Bus: ₹${expense.bus.toFixed(2)}<br>
                    Auto Rickshaw: ₹${expense.rickshaw.toFixed(2)}<br>
                    Bike: ₹${expense.bike.toFixed(2)}<br>
                    Own: ₹${expense.own.toFixed(2)}<br>
                    <button class="remove-btn" onclick="removeDailyExpense(${index})">Remove</button>
                `;
        dailyExpensesContainer.appendChild(div);
    });
}

function removeDailyExpense(index) {
    monthlyExpenses.splice(index, 1);
    updateDailyExpenses();
    calculateIndividualTotals();
    calculateMonthlyTotal();
}

function calculateIndividualTotals() {
    const totals = {
        breakfast: 0,
        lunch: 0,
        dinner: 0,
        bus: 0,
        rickshaw: 0,
        bike: 0,
        own: 0
    };

    monthlyExpenses.forEach(expense => {
        totals.breakfast += expense.breakfast;
        totals.lunch += expense.lunch;
        totals.dinner += expense.dinner;
        totals.bus += expense.bus;
        totals.rickshaw += expense.rickshaw;
        totals.bike += expense.bike;
        totals.own += expense.own;
    });

    document.getElementById('individualTotals').innerHTML = `
                <p class="individual-total">Total Breakfast: ₹${totals.breakfast.toFixed(2)}</p>
                <p class="individual-total">Total Lunch: ₹${totals.lunch.toFixed(2)}</p>
                <p class="individual-total">Total Dinner: ₹${totals.dinner.toFixed(2)}</p>
                <p class="individual-total">Total Bus: ₹${totals.bus.toFixed(2)}</p>
                <p class="individual-total">Total Auto Rickshaw: ₹${totals.rickshaw.toFixed(2)}</p>
                <p class="individual-total">Total Bike: ₹${totals.bike.toFixed(2)}</p>
                <p class="individual-total">Total Own: ₹${totals.own.toFixed(2)}</p>
            `;
}

function calculateMonthlyTotal() {
    const monthlyTotalINR = monthlyExpenses.reduce((acc, expense) => acc + expense.total, 0);
    document.getElementById('monthlyTotal').textContent = `Monthly Total: ₹${monthlyTotalINR.toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}-${formattedMonth}-${year}`;
}