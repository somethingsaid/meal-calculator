// Fixed Meal Details
var meal = []; // Will hold a list of objects (diner)
var taxRate = 0.13 // Ontario tax rate is 13%
var tipOptions = {"low": 0.10, "med": 0.15, "high": 0.20} // Preset dinner tip options - can choose to override
var totalTip = 0;
var mealTotal = 0;

// Diner object
var Diner = function(name, meal, cost) {
  this.name = name;
  this.meal = meal;
  this.cost = cost;
  this.tax = (cost * taxRate).toFixed(2);
  this.dinerTotal = (Number(cost) + Number(this.tax)).toFixed(2);
};

// Functions
var addDiner = function(diner) {
  meal.push(diner);
};

// Create list of meals
var billyMeal = new Diner('Billy', 'Chicken Burrito', 10.93);
addDiner(billyMeal);
var jasperMeal = new Diner('Jasper', 'Ramen', 11.99);
addDiner(jasperMeal);

// Calculate and Display totals:
console.log("Total Damage\n=========================================");
for (var i = 0; i < meal.length; i++) {
  console.log("Meal " + (i+1) + "... " + meal[i].name + "\n\t" + meal[i].meal + "\n\tCost $" + meal[i].cost + "\n\tTax $" + meal[i].tax + "\n\tDiner Total $" + meal[i].dinerTotal);
  mealTotal += Number(meal[i].cost) + Number(meal[i].tax);
};
totalTip = (mealTotal * tipOptions.med).toFixed(2);
console.log("Sub Total...\t\t\t$" + mealTotal.toFixed(2));
console.log("Tip Total @ 15%...\t\t$" + totalTip);
console.log("=========================================\nFINAL TOTAL... $" + (Number(mealTotal) + Number(totalTip)).toFixed(2));
