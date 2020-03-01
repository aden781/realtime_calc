const calcList = document.querySelector("#calc-list");
const form = document.querySelector("#add-calc-form");

// Computation helper function
function calc(n1, n2, oper) {
  if (oper === "+") {
    return n1 + n2;
  } else if (oper === "-") {
    return n1 - n2;
  } else if (oper === "/") {
    return n1 / n2;
  } else {
    return n1 * n2;
  }
}

// fetch data from input and render list
function renderCalc(doc) {
  let li = document.createElement("li");
  let n1 = document.createElement("span");
  let oper = document.createElement("span");
  let n2 = document.createElement("span");
  let equals = document.createElement("span");
  let calc = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  n1.textContent = doc.data().n1;
  oper.textContent = doc.data().oper;
  n2.textContent = doc.data().n2;
  equals.textContent = doc.data().equals;
  calc.textContent = doc.data().calc;

  li.appendChild(n1);
  li.appendChild(oper);
  li.appendChild(n2);
  li.appendChild(equals);
  li.appendChild(calc);

  calcList.appendChild(li);
}

//real time data
//sort by time added in descending order
//only list 10 most recent entries
db.collection("calcs")
  .orderBy("time", "desc")
  .limit(10)
  .onSnapshot(snapshot => {
    calcList.innerHTML = ""; // clear list
    snapshot.docs.forEach(renderCalc);
  });

//saving data
form.addEventListener("submit", event => {
  event.preventDefault();
  db.collection("calcs").add({
    n1: form.n1.valueAsNumber,
    oper: form.oper.value,
    n2: form.n2.valueAsNumber,
    equals: "=",
    calc: calc(form.n1.valueAsNumber, form.n2.valueAsNumber, form.oper.value),
    time: Date.now()
  });
  //clear input
  form.n1.value = "";
  form.n2.value = "";
});
