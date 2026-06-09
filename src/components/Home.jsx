import { Button, Card, Stack, Typography } from "@mui/material";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";
import Skeleton from "@mui/material/Skeleton";

import { useNavigate } from "react-router-dom";

import { useDataContext } from "../contexts/DataContext";

import { Header } from "./Header";
// import { useEffect, useState } from "react";
import { TransactionJSX } from "./TransactionJSX";

export const Home = () => {
  const { data, balance, loading } = useDataContext();
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  // const balance = useMemo(() => {
  //   return data.reduce((acc, transaction) => {
  //     if (transaction.transactionType === "دخل") {
  //       return acc + Number(transaction.amount);
  //     } else if (transaction.transactionType === "منصرف") {
  //       return acc - Number(transaction.amount);
  //     }
  //     return acc;
  //   }, 0);
  // }, [data]);

  const navigate = useNavigate();

  const transactionJsx = data
    .slice(0, 3)
    .map((transaction) => (
      <TransactionJSX transaction={transaction} key={transaction.id} />
    ));

  return (
    <div style={{ direction: "rtl", padding: "20px" }}>
      <Header />
      <Card
        style={{
          padding: "10px",
          borderRadius: "20px",
          background: "lightgray",
          margin: "20px 0",
        }}
      >
        <Typography variant="h4">الرصيد</Typography>
        <Stack
          style={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              margin: "10px 0 20px",
              color: balance >= 10000 ? "black" : "red",
            }}
          >
            {!loading ? (
              balance.toLocaleString() + " $"
            ) : (
              <Skeleton variant="text" width="200px" />
            )}
          </Typography>
          <Stack
            direction={"row"}
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <Stack
              direction={"row"}
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <CallReceivedRoundedIcon style={{ color: "green" }} />
              <Typography style={{ marginRight: "10px" }}>الدخل</Typography>
            </Stack>
            <Stack
              direction={"row"}
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <CallMadeRoundedIcon style={{ color: "red" }} />
              <Typography style={{ marginRight: "10px" }}>المنصرف</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Stack style={{ paddingBottom: "70px" }}>
        <Stack
          direction={"row"}
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Typography variant="h5">العمليات الأخيرة</Typography>
          <Button
            variant="text"
            style={{ color: "blue", fontSize: "20px" }}
            onClick={() => navigate("/transactions")}
          >
            عرض الكل
          </Button>
        </Stack>
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
