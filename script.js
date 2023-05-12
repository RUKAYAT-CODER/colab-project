const form = document.getElementById("form");
const submitForm = document.getElementById("submit");
const totalallowance = document.getElementById("totalallowance").value;
const salaryInput = document.getElementById("basicsalary").value;
const netpayInput = document.getElementById("netpay").value;
const grosspayInput = document.getElementById("grosspay").value;
const calculateBtn = document.getElementById("calculate");
const tbody = document.getElementById("tbody");
let row = null;


submitForm.addEventListener("click", (e) => {
  e.preventDefault();
  const dataEntered = reteriveData();
  //calculatePay();
  if (dataEntered == false) {
    msg.innerHTML = `<h3 style = "color:red;">Please enter data!</h3>`;
  } else {
    // console.log(dataEntered);

    const readData = readLocalStorageData(dataEntered);
    // console.log(readData);
    if (row == null) {
      insertDataTable(readData);
      msg.innerHTML = `<h3 style = "color:darkOrange;">Data Inserted!</h3>`;
    } else {
      update();
      msg.innerHTML = `<h3 style = "color:green;">Data Updated!</h3>`;
    }
  }

  // console.log(dataEntered);
  document.getElementById("form").reset();
});

// const reteriveDatas = ((employee) => {
//     const form = employee.map((employee) => {
//         return employee;

//     })
// })
//    const jsonResponse =

//Retrieve data from table
function reteriveData() {
  const employeeid = document.getElementById("employeeid").value;
  const fullname = document.getElementById("fullname").value;
  const department = document.getElementById("department").value;
  const address = document.getElementById("address").value;
  const totalallowance = document.getElementById("totalallowance").value;
  const basicsalary = document.getElementById("basicsalary").value;
  const grosspay = document.getElementById("grosspay").value;
  const tax = document.getElementById("tax").value;
    const netpay = document.getElementById("netpay").value;
    
    if (!employeeid || !fullname || !department || !address || !basicsalary || !totalallowance || !grosspay || !tax || !netpay) {
        return false
    } else {
       const user = {
    employeeid: employeeid,
    fullname: fullname,
    department: department,
    address: address,
    totalallowance: totalallowance,
    basicsalary: basicsalary,
    grosspay: grosspay,
    tax: tax,
    netpay: netpay,
        }; 
        return user
    }
}
//Store data into Local storage
function readLocalStorageData(dataEntered) {
    let users = localStorage.getItem('users')
    if (users) {
        users= JSON.parse(users)
        users = [...users, dataEntered]
        localStorage.setItem('users', JSON.stringify(users))
    } else {
        users = [dataEntered]
        localStorage.setItem('users', JSON.stringify(users))
     }

//   console.log(dataLocalArr);
console.log(users)
//   return dataLocalArr;
    return users
}
function createTableData() {
    return document.createElement('td')
}
function insertDataTable(readData) {
    console.log(readData)
    generateTable(readData)

}
//Edit function
function edit(e) {
    console.log(e.target.parentElement);
  row = e.target.parentElement;
  document.getElementById("employeeid").value = row.cells[0].innerHTML;
  document.getElementById("fullname").value = row.cells[1].innerHTML;
  document.getElementById("department").value = row.cells[2].innerHTML;
  document.getElementById("address").value = row.cells[3].innerHTML;
  document.getElementById("totalallowance").value = row.cells[4].innerHTML;
  document.getElementById("basicsalary").value = row.cells[5].innerHTML;
  document.getElementById("grosspay").value = row.cells[6].innerHTML;
  document.getElementById("tax").value = row.cells[7].innerHTML;
  document.getElementById("netpay").value = row.cells[8].innerHTML;
}
//update function
function update() {
  row.cells[0].innerHTML = document.getElementById("employeeid").value;
  row.cells[1].innerHTML = document.getElementById("fullname").value;
  row.cells[2].innerHTML = document.getElementById("department").value;
  row.cells[3].innerHTML = document.getElementById("address").value;
  row.cells[4].innerHTML = document.getElementById("totalallowance").value;
  row.cells[5].innerHTML = document.getElementById("basicsalary").value;
  row.cells[6].innerHTML = document.getElementById("grosspay").value;
  row.cells[7].innerHTML = document.getElementById("tax").value;
  row.cells[8].innerHTML = document.getElementById("netpay").value;
  row = null;
}
//delete function
function remove(e) {
  const deleteConfirm = confirm("Are you sure you want to delete this record?");
  if (deleteConfirm == true) {
      const row = e.target.parentElement
      const index = row.id
      let users = localStorage.getItem('users')
      users = JSON.parse(users)
      users.splice(Number(index), 1)
      localStorage.setItem('users', JSON.stringify(users))
      generateTable(users)
  }
}
//create employee

function employee() {}
//calculate pay
calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const salary = Number(document.getElementById("basicsalary").value);
  const taxRate = 0.2; // assuming a flat tax rate of 20%
  const houseAll = 0.1 * salary;
  const medicalAll = 0.1 * salary;
  const transpAll = 0.1 * salary;
  const overtime = 0.01 * salary;
  const Bonus = 0.1 * salary;
  const Bonuses = Bonus + overtime;
  const totalAllowance = Number(houseAll + medicalAll + transpAll + Bonuses); //Assuming all allowances is 10% of salary

  const netpay = Number(salary * (1 - taxRate));
  const tax = Number(salary * taxRate);
  const grosspay = Number(salary + netpay + totalAllowance);

  document.getElementById("netpay").value = netpay.toFixed(2);
  document.getElementById("totalallowance").value = totalAllowance.toFixed(2);
  document.getElementById("tax").value = tax.toFixed(2);
  document.getElementById("grosspay").value = grosspay.toFixed(2);

  console.log(grosspay);
});

function generateTable(readData) {
    tbody.innerHTML = ''
    for (let i = 0; i < readData.length; i++){
        const row = document.createElement('tr')
        row.setAttribute('id', i)
        let employeeid = createTableData()
            employeeid.innerHTML = readData[i].employeeid
        row.appendChild(employeeid)
        let fullname = createTableData()
            fullname.innerHTML = readData[i].fullname
        row.appendChild(fullname)
        let department = createTableData('tr')
            department.innerHTML = readData[i].department
        row.appendChild(department)
         let address = createTableData('tr')
            address.innerHTML = readData[i].address
        row.appendChild(address)
        let totalallowance = createTableData('tr')
            totalallowance.innerHTML = readData[i].totalallowance
        row.appendChild(totalallowance)
        let basicsalary = createTableData('tr')
            basicsalary.innerHTML = readData[i].basicsalary
        row.appendChild(basicsalary)
        let grosspay = createTableData('tr')
            grosspay.innerHTML = readData[i].grosspay
        row.appendChild(grosspay)
        let tax = createTableData('tr')
            tax.innerHTML = readData[i].tax
        row.appendChild(tax)
        let netpay = createTableData('tr')
            netpay.innerHTML = readData[i].netpay
        row.appendChild(netpay)

        let action = createTableData('tr')
        let buttonEdit = document.createElement('button');
        //  let td = document.createElement('td')
        buttonEdit.innerHTML = 'Edit'
        buttonEdit.addEventListener('click', edit);
            row.append(action)
        row.appendChild(buttonEdit)
        buttonEdit.style.padding = "10px"
        buttonEdit.style.borderRadius = "8px"
        buttonEdit.style.border = "1px solid rgb(0, 45, 128)"
        buttonEdit.style.color ="rgb(0, 45, 128)"
    
        let buttonDelete = document.createElement('button')
        buttonDelete.innerHTML = 'Delete'
        buttonDelete.addEventListener('click', remove)
        row.appendChild(action)
        row.append(buttonDelete)
        buttonDelete.style.padding = "10px"
        buttonDelete.style.borderRadius = "8px"
        buttonDelete.style.border = "1px solid rgb(0, 45, 128)"
        buttonDelete.style.color ="rgb(0, 45, 128)"
        tbody.appendChild(row)
        
        
    }
}