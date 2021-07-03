
const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PER_HOUR = 20;
function getWorkingHours(empCheck) {
    switch (empCheck) {
        case IS_PART_TIME:
            return PART_TIME_HOURS;
            break;
        case IS_FULL_TIME:
            return FULL_TIME_HOURS;
            break;
        default:
            return 0;
    }
}

//UC4
const NUM_OF_WORKING_DAYS = 20;
let empHrs = 0;
for (let day = 0; day < NUM_OF_WORKING_DAYS; day++) {
    empCheck = Math.floor(Math.random() * 10) % 3;
    empHrs += getWorkingHours(empCheck);
}
let empWage = empHrs * WAGE_PER_HOUR;
console.log("Total Working Hours : " + empHrs + " Total Employee Wage : " + empWage);

//UC5
const MAX_HRS_IN_MONTH = 160;
let totalEmpHrs = 0;
let totalWorkingDays = 0;
let empDailyWageArr = new Array();
let empDailyHrsMap = new Map();
let empDailyWageMap = new Map();
while (totalEmpHrs <= MAX_HRS_IN_MONTH &&
    totalWorkingDays < NUM_OF_WORKING_DAYS) {
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let workingHrs = getWorkingHours(empCheck);
    totalEmpHrs += workingHrs;
    empDailyWageArr.push(calcDailyWage(workingHrs));
    empDailyHrsMap.set(totalWorkingDays, workingHrs);
    empDailyWageMap.set(totalWorkingDays, calcDailyWage(workingHrs));
}
let totalEmpWage = totalEmpHrs * WAGE_PER_HOUR;
console.log("UC5-Total Days : " + totalWorkingDays + " Total Hrs: " + totalEmpHrs + " Emp Wage : " + totalEmpWage);
console.log(empDailyWageArr);
console.log(empDailyHrsMap);
console.log(empDailyWageMap);
//UC6
function calcDailyWage(empHrs) {
    return empHrs * WAGE_PER_HOUR;
}
//UC 7A - Calc total Wage using Array forEach traversal or reduce method
let totEmpWage = 0;
function sum(dailyWage) {
    totEmpWage += dailyWage;
}
empDailyWageArr.forEach(sum);
console.log('UC7A - Total Days : ' + totalWorkingDays + 'Total Hrs : ' + totalEmpHrs + 'Emp Wage : ' + totalEmpWage);

function totalWages(totalWage, dailyWage) {
    return totalWage + dailyWage;
}
console.log('UC7A - Emp Wage with reduce : ' + empDailyWageArr.reduce(totalWages, 0));
//UC 7B - Show Day and the Daily wage
let dailyCntr = 0;
function mapDayWithWage(dailyWage){
    dailyCntr++;
    return dailyCntr + ' = ' + dailyWage;
}
let mapWithWageArr = empDailyWageArr.map(mapDayWithWage);
console.log('UC - 7B Daily Wage Map');
console.log(mapWithWageArr);
//UC 7C - Show Days when Full time Wage of 160 is earned
function fulltimeWage(dailyWage){
    return dailyWage.includes('160');
}
let fullDayWageArr = mapWithWageArr.filter(fulltimeWage);
console.log('UC 7C - Daily Wage Filter When Full Time Wage Earned');
console.log(fullDayWageArr);
//UC 7D - Find the first Occurrence where Full time Wage was Earned
function findFulltimeWage(dailyWage){
    return dailyWage.includes('160');
}
console.log('UC 7D - First time Full time Wage was Earned on Day : ' + mapWithWageArr.find(findFulltimeWage));
//UC 7E - Check whether Every Element of Full Time Wage is truely holding Full Time Wage
function isAllFulltimeWage(dailyWage){
    return dailyWage.includes('160');
}
console.log('UC 7E - Check All Elements have Full Time Wage : ' + fullDayWageArr.every(isAllFulltimeWage));
//UC 7F - Check if there is any Part Time Wage
function isAnyPartTimeWage(dailyWage){
    return dailyWage.includes('80');
}
console.log('UC 7F - Check if any Part Time Wage : ' + mapWithWageArr.some(isAnyPartTimeWage));
//UC 7G - Find the Number of days the Employee Worked
function totalDaysWorked(numOfDays, dailyWage){
    if(dailyWage>0) return numOfDays+1;
    return numOfDays;
}
console.log('UC 7G - Number of Days Employee Worked : ' + empDailyWageArr.reduce(totalDaysWorked, 0));
//UC9 - Arrow Functions
const findTotal = (totalVal, dailyVal) => {
    return totalVal + dailyVal;
}
let count = 0;
let totalHours = Array.from(empDailyHrsMap.values()).reduce(findTotal, 0);
let totalSalary = empDailyWageArr.filter(dailyWage => dailyWage > 0).reduce(findTotal, 0);
console.log('UC 9A - Emp Wage with Arrow : ' + 'Total Hours : ' + totalHours + ' Total Wage : ' + totalSalary);
//UC 9B - Display full Working days, part working days and non working days
let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();
empDailyHrsMap.forEach((value,key)=>{
    if(value==8){
        fullWorkingDays.push(key);
    }
    else if(value == 4){
        partWorkingDays.push(key);
    }
    else{
        nonWorkingDays.push(key);
    }
});
console.log('Full Working Days : ' + fullWorkingDays);
console.log('Part Working Days : ' + partWorkingDays);
console.log('Non Working Days ' + nonWorkingDays);

//UC10 - Store the Day Hours Worked Wage Earned in an Object
totalEmpHrs = 0;
totalWorkingDays = 0;
let empDailyHrsAndWageArr = new Array();
while (totalEmpHrs <= MAX_HRS_IN_MONTH &&
    totalWorkingDays < NUM_OF_WORKING_DAYS) {
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let workingHrs = getWorkingHours(empCheck);
    totalEmpHrs += workingHrs;
    empDailyHrsAndWageArr.push(
        {
            dayNum: totalWorkingDays,
            dailyHours: workingHrs,
            dailyWage: calcDailyWage(workingHrs),
            toString() {
                return '\nDay' + this.dayNum + ' => Working Hours is ' + this.dailyHours + ' And Wage Earned = ' + this.dailyWage
            },
        });
}
console.log('UC 10 - Showing Daily Hours Worked And Wage Earned : ' + empDailyHrsAndWageArr);
