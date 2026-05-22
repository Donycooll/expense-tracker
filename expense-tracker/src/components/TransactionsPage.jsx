import { Typography } from "@mui/material";

import { Header } from "./Header";

import { useDataContext } from "../contexts/DataContext";
import { TransactionJSX } from "./TransactionJSX";

export const TransactionsPage = () => {
  const { data } = useDataContext();

  const transactionJsx = data
    .map((transaction) => (
      <TransactionJSX transaction={transaction} key={transaction.id} />
    ))
    .sort((a, b) => {
      return (
        new Date(b.props.transaction.dateTime) -
        new Date(a.props.transaction.dateTime)
      );
    });

  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      <Header />
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        جميع المعاملات
      </Typography>
      {transactionJsx}
    </div>
  );
};
