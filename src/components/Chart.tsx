// DataTableChart.tsx
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

interface DataRow {
    id: number;
    title: string;
    brand: string;
    price: number;
    rating: number;
}

interface Props {
    data: DataRow[];
}

const Chart: React.FC<Props> = ({ data }) => {
    const [priceData, setPriceData] = useState<number[]>([]);

    const [stockData, setStockData] = useState<number[]>([]);


    useEffect(() => {
        const priceData = data.map((row) => row.price);
        const stockData = data.map((row) => row.rating);

        setPriceData(priceData);
        setStockData(stockData)
    }, [data]);

    return (
        <div >
            <div className="flex">
                <Plot
                    data={[{ type: "bar", x: data.map((row) => row.title), y: priceData }]}
                    layout={{
                        width: 300, height: 300, title: "Price and Title",
                        // xaxis: { title: "Title" },
                        // yaxis: { title: "Price" }
                    }}
                />

                <Plot
                    data={[{ type: "bar", x: data.map((row) => row.title), y: stockData }]}
                    layout={{
                        width: 300, height: 300, title: "Stcok and Title",
                        // xaxis: { title: "Title" },
                        // yaxis: { title: "Stock" }
                    }}
                />

            </div>


            <div className="flex">
                <Plot
                    data={[{ type: "bar", x: data.map((row) => row.brand), y: priceData }]}
                    layout={{
                        width: 300, height: 300, title: "Price and Brand",
                        // xaxis: { title: "Title" },
                        // yaxis: { title: "Price" }
                    }}
                />

                <Plot
                    data={[{ type: "bar", x: data.map((row) => row.brand), y: stockData }]}
                    layout={{
                        width: 300, height: 300, title: "Stcok and Brand",
                        // xaxis: { title: "Title" },
                        // yaxis: { title: "Stock" }
                    }}
                />
            </div>

        </div>
    );
};

export default Chart;
