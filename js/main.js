let bill = document.querySelector(".tip-calc .input .bill .bill-amount");
let tip_percent = document.querySelectorAll(".tip-calc .input .select-tip .options .btn");
let tip_custom = document.querySelector(".tip-calc .input .select-tip .options .btn.custom");
let people_num = document.querySelector(".tip-calc .input .people .people-num");
let reset_btn = document.querySelector(".tip-calc .output .reset");
let tip_result = document.querySelector(".tip-calc .output .tip-amount .right");
let total_bill = document.querySelector(".tip-calc .output .total .right");
let tip_option_value, bill_box_value, people_num_value;
let error_txt = document.querySelector(".tip-calc .input .people p span");


// get the bill value
bill.addEventListener("keyup", () => {
  bill_box_value = bill.value;
  reset_btn.classList.add("active");
  calculateAndUpdateResult();
});

// get the tip value
tip_percent.forEach((opt) => {
  opt.addEventListener("click", () => {
    reset_btn.classList.add("active");

    // remove active class from all options
    tip_percent.forEach((e) => {
      e.classList.remove("active");
    });

    // check if the custom option is selected
    if(opt.classList.contains("custom")) {
      opt.classList.add("active");
      tip_custom.addEventListener("keyup", () => {
        tip_option_value = tip_custom.value / 100;
        calculateAndUpdateResult();
      });
    } else {
      // add active class to the selected option
      opt.classList.add("active");
      // get the value of the selected option
      tip_option_value = opt.dataset.percent;
      // reset the value of custom option
      tip_custom.value = "";
    }
    calculateAndUpdateResult();
  });
});

// get the number of people
people_num.addEventListener("keyup", () => {
  reset_btn.classList.add("active");
  if(people_num.value == 0) {
    error_txt.classList.add("error");
    people_num.classList.add("error");
  } else {
    error_txt.classList.remove("error");
    people_num_value = people_num.value;
    people_num.classList.remove("error");
  }
  calculateAndUpdateResult();
});

// reset values
reset_btn.addEventListener("click", () => {
  if(reset_btn.classList.contains("active")) {
    tip_result.textContent = `$0.00`;
    total_bill.textContent = `$0.00`;
    bill.value = "";
    tip_percent.forEach((e) => {
      e.classList.remove("active");
    });
    tip_custom.value = "";
    people_num.value = "";
    bill_box_value, tip_option_value, people_num_value = 0;
    error_txt.classList.remove("error");
    people_num.classList.remove("error");
    reset_btn.classList.remove("active");
  }
});

// update tip amount and total
let calculateAndUpdateResult = () => {
  if(bill_box_value && tip_option_value && people_num_value > 0) {
    tip_result.textContent = `$${(bill_box_value * tip_option_value / people_num_value).toFixed(2)}`;
    total_bill.textContent = `$${((+bill_box_value + (bill_box_value * tip_option_value)) / people_num_value).toFixed(2)}`;
  }
}