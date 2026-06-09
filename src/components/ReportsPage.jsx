import {
  Card,
  Skeleton,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import CallReceivedRoundedIcon from "@mui/icons-material/CallReceivedRounded";

import { Header } from "./Header";
import { Piechart } from "./PieChart";
import { Barchart } from "./BarChart";

import { useDataContext } from "../contexts/DataContext";
import { useEffect, useState } from "react";

export const ReportsPage = () => {
  const { balance, income, outcome, loading, data } = useDataContext();

  const [dateRange, setDateRange] = useState("الكل");

  const [currData, setCurrData] = useState(data);
  const [currIncome, setCurrIncome] = useState(income);
  const [currOutcome, setCurrOutcome] = useState(outcome);

  useEffect(() => {
    !loading && setCurrIncome(income);
    !loading && setCurrOutcome(outcome);
    !loading && setCurrData(data);
  }, [loading, income, outcome, data]);

  const handleChangeDateRange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <div style={{ direction: "rtl", padding: "20px", marginBottom: "70px" }}>
      <Header />
      <Stack
        direction="row"
        spacing={2}
        style={{ margin: "20px 0", justifyContent: "space-between" }}
      >
        <FormControl style={{ margin: "0" }} fullWidth>
          <InputLabel id="demo-simple-select-label">التاريخ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={dateRange}
            label="التاريخ"
            onChange={handleChangeDateRange}
          >
            <MenuItem value="الكل">الكل</MenuItem>
            <MenuItem value="هذا الاسبوع">هذا الاسبوع</MenuItem>
            <MenuItem value="هذا الشهر">هذا الشهر</MenuItem>
            <MenuItem value="هذا العام">هذا العام</MenuItem>
          </Select>
        </FormControl>
      </Stack>
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
          ></Stack>
        </Stack>
      </Card>
      <Stack spacing={2}>
        <Stack
          direction={"row"}
          style={{
            background: "lightgray",
            padding: "10px",
            borderRadius: "10px",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"}>
            <CallReceivedRoundedIcon style={{ color: "green" }} />
            <Typography style={{ marginRight: "10px" }}>الدخل</Typography>
          </Stack>
          <Typography style={{ marginRight: "10px" }}>
            {income.toLocaleString() + " $"}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          style={{
            background: "lightgray",
            padding: "10px",
            borderRadius: "10px",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"}>
            <CallMadeRoundedIcon style={{ color: "red" }} />
            <Typography style={{ marginRight: "10px" }}>المنصرف</Typography>
          </Stack>
          <Typography style={{ marginRight: "10px" }}>
            {Math.abs(outcome).toLocaleString() + " $"}
          </Typography>
        </Stack>
      </Stack>
      <Stack style={{ justifyContent: "center", marginTop: "20px" }}>
        <Piechart income={currIncome} outcome={currOutcome} />
      </Stack>
      <Stack style={{ justifyContent: "center", marginTop: "20px" }}>
        <Barchart data={currData} />
      </Stack>
    </div>
  );
};
