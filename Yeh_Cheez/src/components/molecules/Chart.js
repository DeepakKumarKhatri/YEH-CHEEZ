import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";




const Chart = () => {
    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(47, 47, 47, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ]
    };
    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: true // optional
    };
    return(
        <LineChart
            data={data}
            width={screenWidth - 20}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
        />
    );
}

export default Chart;
