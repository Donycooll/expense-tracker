import {
  Typography,
  Stack,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Header } from "./Header";

import { useDataContext } from "../contexts/DataContext";
import { TransactionJSX } from "./TransactionJSX";
import { useMemo, useState } from "react";

export const TransactionsPage = () => {
  const { data, loading } = useDataContext();
  const [transactionType, setTransactionType] = useState(
    localStorage.getItem("transactionsFilter") || "الكل",
  );

  let filteredData = useMemo(() => {
    return data.filter((transaction) => {
      if (transactionType === "الدخل") {
        return transaction.transactionType === "دخل";
      } else if (transactionType === "المنصرف") {
        return transaction.transactionType === "منصرف";
      }
      return true;
    });
  }, [transactionType, data]);

  const transactionJsx = filteredData.map((transaction) => (
    <TransactionJSX transaction={transaction} key={transaction.id} />
  ));

  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      <Header />
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        جميع المعاملات
      </Typography>
      <FormControl style={{ marginBottom: "20px" }} fullWidth>
        <InputLabel id="demo-simple-select-label">نوع العملية</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={transactionType}
          label="نوع العملية"
          onChange={(event) => {
            setTransactionType(event.target.value);
            localStorage.setItem("transactionsFilter", event.target.value);
          }}
        >
          <MenuItem value="الكل">الكل</MenuItem>
          <MenuItem value="الدخل">الدخل</MenuItem>
          <MenuItem value="المنصرف">المنصرف</MenuItem>
        </Select>
      </FormControl>
      <Stack style={{ paddingBottom: "70px" }}>
        {!loading ? (
          data.length > 0 ? (
            transactionJsx
          ) : (
            <Typography
              variant="h6"
              style={{ color: "gray", marginTop: "20px", textAlign: "center" }}
            >
              لا توجد معاملات بعد, قم بإضافة أول معاملة لك!
            </Typography>
          )
        ) : (
          <>
            <Stack
              direction={"row"}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "94%",
                borderRadius: "15px",
                padding: "10px",
                background: "lightgray",
                marginBottom: "10px",
              }}
            >
              <Skeleton
                variant="rounded"
                width="44px"
                height="44px"
                style={{
                  color: "gray",
                  borderRadius: "10px",
                }}
              />
              <Skeleton variant="rounded" width="90px" height="44px" />
              <Skeleton variant="text" width="62px" height="24px" />
            </Stack>
            <Stack
              direction={"row"}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "94%",
                borderRadius: "15px",
                padding: "10px",
                background: "lightgray",
                marginBottom: "10px",
              }}
            >
              <Skeleton
                variant="rounded"
                width="44px"
                height="44px"
                style={{
                  color: "gray",
                  borderRadius: "10px",
                }}
              />
              <Skeleton variant="rounded" width="90px" height="44px" />
              <Skeleton variant="text" width="92px" height="24px" />
            </Stack>
            <Stack
              direction={"row"}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                width: "94%",
                borderRadius: "15px",
                padding: "10px",
                background: "lightgray",
                marginBottom: "10px",
              }}
            >
              <Skeleton
                variant="rounded"
                width="44px"
                height="44px"
                style={{
                  color: "gray",
                  borderRadius: "10px",
                }}
              />
              <Skeleton variant="rounded" width="90px" height="44px" />
              <Skeleton variant="text" width="72px" height="24px" />
            </Stack>
          </>
        )}
      </Stack>
    </div>
  );
};
