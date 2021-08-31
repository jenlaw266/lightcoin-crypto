class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get getBalance() {
    // Calculate the balance using the transaction objects.
    this.balance = 0;
    this.transactions.forEach((transaction) => {
      this.balance += transaction.value; //???
    });
    return this.balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) {
      console.log("not allowed");
      return false;
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.amount <= this.account.getBalance) {
      return true;
    }
    return false;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("billybob");

console.log("Starting Account Balance: ", myAccount.getBalance);

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.getBalance);

console.log("Depositing should succeed...");
const t2 = new Deposit(9.99, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.getBalance);

console.log("Withdrawal for 9.99 should be allowed...");
const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.getBalance);
console.log("Lookings like I'm broke again");

console.log("Account Transaction History: ", myAccount.transactions);
