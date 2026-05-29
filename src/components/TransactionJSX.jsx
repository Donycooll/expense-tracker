import { Button, Card, Stack, Typography } from "@mui/material";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import { useState } from "react";
import { EditDialog } from "./EditDialog";

export const TransactionJSX = ({ transaction }) => {
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <>
      <Button
        key={transaction.id}
        style={{
          marginBottom: "10px",
          padding: "10px",
          background: "lightgray",
          borderRadius: "15px",
        }}
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        <Card
          style={{
            width: "100%",
            background: "lightgray",
            boxShadow: "none",
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
              {Number(transaction.amount).toLocaleString()}
            </Typography>
          </Stack>
        </Card>
      </Button>
      <EditDialog
        transaction={transaction}
        open={openEdit}
        setOpen={setOpenEdit}
      />
    </>
  );
};
