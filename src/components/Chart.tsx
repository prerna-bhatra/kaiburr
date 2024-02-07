// DataTableChart.tsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

interface DataRow {
    id: number;
    title: string;
    brand:string;
    price: number;
    rating: number;
}

interface Props {
  data: DataRow[];
}

const Chart: React.FC<Props> = ({ data }) => {
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const newData = data.map((row) => row.price);
    setChartData(newData);
  }, [data]);

  return (
    <div>
      <Plot
        data={[{ type: "bar", x: data.map((row) => row.id), y: chartData }]}
        layout={{ width: 800, height: 400, title: "Bar Chart" }}
      />
    </div>
  );
};

export default Chart;
