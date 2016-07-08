'use strict';

// --------------------------------------------
// Diner
// --------------------------------------------

var Diner = function Diner(name) {
  this.dishes = [];
  this.name = name || 'Default Bob';
};

Diner.prototype.addDish = function addDish(name, cost) {
  this.dishes.push({
    name: name || '',
    cost: cost || 0
  });
};

Diner.prototype.getTotalDishCost = function getTotalDishCost() {
  return this.dishes.reduce(function _sum(sum, dish) {
    return sum += dish.cost;
  }, 0);
};

Diner.prototype.print = function print() {
  console.log('Diner: ' + this.name + ' w. total dish cost $' + this.getTotalDishCost().toFixed(2));
};

// --------------------------------------------
// Meal
// --------------------------------------------

var Meal = function Meal() {
  this.diners = [];
  this.taxRate = 0; // default no tax
  this.tipRate = 0.15; // default to 15% tip
};

Meal.prototype.addDiner = function addDiner(diner) {
  if (diner) {
    this.diners.push(diner);
  }
};

Meal.prototype.setTaxRate = function setTaxRate(taxRate) {
  this.taxRate = (taxRate/100) || 0;
};

Meal.prototype.setTipRate = function setTaxRate(tipRate) {
  this.tipRate = tipRate || 0;
};

Meal.prototype.getTotalMealCost = function getTotalMealCost() {
  var baseCost = this.diners.reduce(function _sum(sum, diner) {
    return sum += diner.getTotalDishCost();
  }, 0);

  return baseCost * (1 + this.taxRate + this.tipRate);
};

Meal.prototype.printCostBreakdown = function printCostBreakdown() {
  var baseCost = this.diners.reduce(function _sum(sum, diner) {
    return sum += diner.getTotalDishCost();
  }, 0);

  var tip = baseCost * this.tipRate;
  var tipShare = tip / this.diners.length;
  var tax = baseCost * this.taxRate;

  console.log('Total tip: ' + tip + ' (' + this.tipRate.toFixed(2) + '%)');
  console.log('Total tax: ' + tax + ' (' + this.taxRate.toFixed(2) + '%)');
  console.log('----------------------------------------');
  console.log('BREAKDOWN\n');

  this.diners.forEach(function _printDiner(diner) {
    var dinerCost = (diner.getTotalDishCost() * (1 + this.taxRate)) + tipShare;
    console.log(diner.name + ': $' + dinerCost.toFixed(2));
  }.bind(this));

  var total = baseCost * (1 + this.taxRate + this.tipRate);

  console.log('----------------------------------------');
  console.log('Total: $' + total.toFixed(2));
}

// --------------------------------------------
// Sample
// --------------------------------------------

var abe = new Diner('Abe');
var ben = new Diner('Ben');
var cam = new Diner('Cam');

abe.addDish('pad thai', 10);
abe.addDish('carrot juice', 3);
abe.addDish('eggplant ice cream', 5);

ben.addDish('celery salad', 13);
ben.addDish('squid ink slurpee', 4);

cam.addDish('help i\'m sitting next to Ben', 1);
cam.addDish('breath mint', 1);
cam.addDish('drop tables burger', 15);

var teamDinner = new Meal();

teamDinner.addDiner(abe);
teamDinner.addDiner(ben);
teamDinner.addDiner(cam);

teamDinner.setTaxRate(9.25);

console.log('----------------------------------------');
abe.print()
ben.print()
cam.print()

console.log('----------------------------------------');
teamDinner.printCostBreakdown();

// --------------------------------------------
// Exports
// --------------------------------------------

module.exports = {
  Diner: Diner,
  Meal: Meal
};
