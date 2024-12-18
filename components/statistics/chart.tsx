// import NoDataAsset from "@/assets/svgs/no-data.svg";
import { useExpenseContext } from "@/context";
import { useUser } from "@clerk/clerk-expo";
import { format } from "date-fns";
import { LineChartIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Text } from "../ui/text";

type ChartProps = {
  timelineQuery: {
    value: string;
    label: string;
    startTimeOfQuery: Date;
    endTimeOfQuery: Date;
  };
};
export default function Chart({ timelineQuery }: ChartProps) {
  const { user: userData } = useUser();
  const dataSample = [
    { value: 15, label: "L" },
    { value: 30, label: "M" },
    { value: 26, label: "X" },
    { value: 40, label: "J" },
    { value: 30, label: "V" },
    { value: 26, label: "S" },
    { value: 40, label: "D" },
  ];

  const { expenses, getExpensesByUser } = useExpenseContext();
  React.useEffect(() => {
    if (userData) {
      getExpensesByUser(userData.id);
    }
  }, [userData, getExpensesByUser]);
  let labels;
  switch (timelineQuery.value) {
    case "hoy":
      labels = ["05:00", "08:00", "11:00", "13:00", "17:00", "20:00", "24:00"];
      break;
    case "diario":
      labels = ["L", "M", "X", "J", "V", "S", "D"];
      break;
    case "semanal":
      labels = ["S1", "S2", "S3", "S4"];
      break;
    case "mensual":
      labels = ["Ene", "Mar", "Abr", "Jul", "Ago", "Sep", "Dic"];
      break;

    default:
      labels = expenses.map((expense) => {
        const date = new Date(expense.date);
        return format(date, "MMMM"); // e.g., May
      });
      break;
  }

  const data = expenses.map((expense) => {
    const monto = isFinite(expense.amount) ? expense.amount : 0;
    return monto;
  });
  if (data.length === 0) {
    return (
      <View className="flex flex-col items-center justify-center gap-5  ">
        <LineChartIcon size={100} color="gray" strokeWidth={1} />
        <View>
          <Text className="text-center text-xl text-muted-foreground">
            No hay gastos registrados
          </Text>
          <Text className="text-center text-sm text-muted-foreground">
            Añade un gasto haciendo tap en el botón "+"
          </Text>
        </View>
      </View>
    );
  }

  return (
    <LineChart
      areaChart
      curved
      data={dataSample}
      spacing={55}
      initialSpacing={5}
      yAxisColor="gray"
      xAxisColor="white"
      yAxisThickness={0.2}
      color1="teal"
      dataPointsColor1="teal"
      hideRules
      startFillColor1="teal"
      startOpacity={0.8}
      endOpacity={0.5}
      width={450}
      height={250}
    />
  );
}
