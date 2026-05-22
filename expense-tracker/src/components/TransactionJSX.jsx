import { Card, Stack, Typography } from "@mui/material";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";

export const TransactionJSX = ({ transaction }) => {
  return (
    <Card
      key={transaction.id}
      style={{
        marginBottom: "10px",
        padding: "10px",
        background: "lightgray",
        borderRadius: "15px",
      }}
    >
      <Stack
        direction={"row"}
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {transaction.transactionType === "دخل" ? (
          <CallReceivedRoundedIcon
            style={{
              color: "green",
              background: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
        ) : (
          <CallMadeRoundedIcon
            style={{
              color: "red",
              background: "white",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
        )}
        <Stack>
          <Typography variant="body1">{transaction.title}</Typography>
          <Typography variant="body2" style={{ color: "gray" }}>
            {new Date(transaction.dateTime).toLocaleDateString()}
          </Typography>
        </Stack>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          {transaction.transactionType === "دخل" ? "+ " : "- "}$
          {transaction.amount}
        </Typography>
      </Stack>
    </Card>
  );
};
