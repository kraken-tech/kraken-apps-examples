import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { useConfig } from "../Providers/Config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type OptionsType = {
  translations: {
    title: string;
  };
};

export const getOptions = (options: OptionsType) => ({
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: options.translations.title,
    },
    legend: {
      labels: {
        usePointStyle: true,
      },
    },
  },
  scales: {
    y: {
      afterDataLimits: (scale: any) => {
        scale.max = 0;
      },
      type: "linear" as const,
      display: true,
      position: "left" as const,
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val: any) {
          // Hide every 2nd tick label
          return `${val}kW`;
        },
      },
    },
    y1: {
      afterDataLimits: (scale: any) => {
        scale.max = 100;
        scale.min = 0;
      },
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function (val: any) {
          // Hide every 2nd tick label
          return `${val}%`;
        },
      },
    },
  },
});

const labels = [
  "12:00",
  "15:00",
  "21:00",
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "21:00",
  "00:00",
  "03:00",
];

export const MetricsTab = () => {
  const [data, setData] = useState({ power: [], stateOfCharge: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const { APIProxyURL } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const route = `https://sandwichsudo.github.io/data/device.json`;
        let fetchParams = {
          route,
          options: {},
        };
        if (APIProxyURL) {
          fetchParams = {
            route: `${APIProxyURL}/data/device.json`,
            options: {
              // note we don't set credentials: "include" here so we don't send the cookie
              headers: {
                "X-Kraken-App-Proxy-Destination": "sandwichsudo.github.io",
              },
            },
          };
        }
        const response = await fetch(fetchParams.route, fetchParams.options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const powerData = (data && data?.power) || [];
  const stateOfChargeData = (data && data?.stateOfCharge) || [];
  const fakeData = {
    labels,
    datasets: [
      {
        label: t("device-info.tabs.metrics.chart.legend.power"),
        data: Object.values(powerData).map((value) => value),
        borderColor: "rgb(124 50 228)",
        backgroundColor: "rgb(124 50 228)",
        yAxisID: "y",
      },
      {
        label: t("device-info.tabs.metrics.chart.legend.soc"),
        data: Object.values(stateOfChargeData).map((value) => value),
        borderColor: "rgb(255 172 112)",
        backgroundColor: "rgb(255 172 112)",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div>
      <Line
        options={getOptions({
          translations: {
            title: t("device-info.tabs.metrics.chart.title"),
          },
        })}
        data={fakeData}
      />
    </div>
  );
};
