import { PieChart } from "@mui/x-charts/PieChart";

export const Piechart = ({ income, outcome }) => {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: income, label: "الدخل" },
            { id: 1, value: outcome, label: "المنصرف" },
          ],
        },
      ]}
      width={200}
      height={200}
    />
  );
};
