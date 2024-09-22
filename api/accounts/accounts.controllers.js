const { response } = require("express");
let accounts = require("../../accounts");
const AccountsSchema = require("../../models/AccountsSchema");

exports.accountCreate = async (req, res) => {
  try {
    const id = accounts[accounts.length - 1].id + 1;
    const accountInfo = { ...req.body, funds: 0, id };
    const newAccount = await AccountsSchema.create(accountInfo);
    return res.status(201).json({ data: newAccount });
  } catch (error) {
    return response.status(500).json({ error: error });
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id == +accountId);
  if (foundAccount) {
    accounts = accounts.filter((account) => account.id !== +accountId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

exports.accountUpdate = (req, res) => {
  const { accountId } = req.params;
  const foundAccount = accounts.find((account) => account.id === +accountId);
  if (foundAccount) {
    foundAccount.funds = req.body.funds;
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Account not found" });
  }
};

exports.accountsGet = (req, res) => {
  res.json(accounts);
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
