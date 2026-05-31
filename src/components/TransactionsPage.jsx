import { Typography, Stack, Skeleton } from "@mui/material";

import { Header } from "./Header";

import { useDataContext } from "../contexts/DataContext";
import { TransactionJSX } from "./TransactionJSX";
import { useEffect, useState } from "react";

export const TransactionsPage = () => {
  const { data } = useDataContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const transactionJsx = data.map((transaction) => (
    <TransactionJSX transaction={transaction} key={transaction.id} />
  ));

  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      <Header />
      <Typography variant="h4" style={{ margin: "20px 0" }}>
        جميع المعاملات
      </Typography>
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
