import React, { useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const sampleData = [
  {
    site: "Site A",
    name: "John Doe",
    role: "Worker",
    scanInTime: "08:00 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "02:30 hrs",
    date: "2025-05-06",
    project: "Project Alpha",
  },
  {
    site: "Site B",
    name: "Jane Smith",
    role: "Supervisor",
    scanInTime: "07:45 AM",
    inductionStatus: "⚠ Pending",
    timeOnSite: "03:15 hrs",
    date: "2025-05-06",
    project: "Project Beta",
  },
  {
    site: "Site C",
    name: "Carlos Vega",
    role: "Engineer",
    scanInTime: "09:15 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "04:00 hrs",
    date: "2025-05-06",
    project: "Project Alpha",
  },
  {
    site: "Site D",
    name: "Aisha Khan",
    role: "Worker",
    scanInTime: "08:30 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "03:45 hrs",
    date: "2025-05-06",
    project: "Project Gamma",
  },
  {
    site: "Site E",
    name: "Tom Hanks",
    role: "Supervisor",
    scanInTime: "07:30 AM",
    inductionStatus: "✔ Valid",
    timeOnSite: "05:00 hrs",
    date: "2025-05-06",
    project: "Project Beta",
  },
  {
    site: "Site F",
    name: "Priya Patel",
    role: "Engineer",
    scanInTime: "09:00 AM",
    inductionStatus: "⚠ Pending",
    timeOnSite: "02:15 hrs",
    date: "2025-05-06",
    project: "Project Gamma",
  },
];

const DailyEntryAnalytics = () => {
const [selectedDate, setSelectedDate] = useState(new Date("2025-05-06"));
  const [filteredData, setFilteredData] = useState(
    sampleData.filter(
      (item) =>
        new Date(item.date).toDateString() === selectedDate.toDateString()
    )
  );

  const filterDataByDate = (date) => {
    setSelectedDate(date);
    setFilteredData(
      sampleData.filter(
        (item) => new Date(item.date).toDateString() === date.toDateString()
      )
    );
  };

  const getDailyCountData = () => {
    const dailyCounts = filteredData.reduce((acc, item) => {
      acc[item.date] = (acc[item.date] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(dailyCounts),
      datasets: [
        {
          label: "Total People Entered",
          data: Object.values(dailyCounts),
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const getRoleBreakdownData = () => {
    const roleCounts = filteredData.reduce((acc, item) => {
      acc[item.role] = (acc[item.role] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(roleCounts),
      datasets: [
        {
          label: "Role Breakdown",
          data: Object.values(roleCounts),
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#ffcd56",
            "#4bc0c0",
            "#ff9f40",
          ],
          hoverOffset: 4,
        },
      ],
    };
  };

  const getProjectBreakdownData = () => {
    const projectCounts = filteredData.reduce((acc, item) => {
      acc[item.project] = (acc[item.project] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(projectCounts),
      datasets: [
        {
          label: "Project Breakdown",
          data: Object.values(projectCounts),
          backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
          hoverOffset: 4,
        },
      ],
    };
  };

  const calculateMetrics = () => {
    const totalPeople = filteredData.length;
    const firstEntry = filteredData[0]?.scanInTime;
    const lastEntry = filteredData[filteredData.length - 1]?.scanInTime;
    const totalTimeSpent = filteredData.reduce((acc, item) => {
      const [hrs, mins] = item.timeOnSite.split(" ")[0].split(":");
      return acc + (parseInt(hrs) * 60 + parseInt(mins));
    }, 0);
    const avgTimeSpent = totalPeople ? totalTimeSpent / totalPeople : 0;

    return {
      totalPeople,
      firstEntry,
      lastEntry,
      avgTimeSpent: (avgTimeSpent / 60).toFixed(2),
    };
  };

  const metrics = calculateMetrics();

  return (
    <div>
      <h4>Daily Entry Analytics</h4>
      <DatePicker
        selected={selectedDate}
        onChange={filterDataByDate}
        dateFormat="yyyy-MM-dd"
      />

      <div className="metrics">
        <p>
          <strong>Total People Entered:</strong> {metrics.totalPeople}
        </p>
        <p>
          <strong>First Entry:</strong> {metrics.firstEntry || "-"}
        </p>
        <p>
          <strong>Last Entry:</strong> {metrics.lastEntry || "-"}
        </p>
        <p>
          <strong>Average Time Spent (hrs):</strong> {metrics.avgTimeSpent}
        </p>
      </div>

      <div className="charts-container">
        {/* Row 1: Bar chart */}
        <div className="chart-row">
          <div className="chart-box full-width">
            <Bar
              data={getDailyCountData()}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Daily Entry Count" },
                },
              }}
            />
          </div>
        </div>

        {/* Row 2: Pie and Doughnut */}
        {filteredData.length === 0 ? (
  <p>No data available for selected date.</p>
) : ( <>
        <div className="chart-row">
          <div className="chart-box">
            <Pie
              data={getRoleBreakdownData()}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Role Breakdown" },
                },
              }}
            />
          </div>
          <div className="chart-box">
            <Doughnut
              data={getProjectBreakdownData()}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Project Breakdown" },
                },
              }}
            />
          </div>

        </div>
        </>
        )}
      </div>

      {/* Inline CSS */}
      <style jsx="true">{`
        .metrics {
          margin: 20px 0;
        }

        .charts-container {
          margin-top: 20px;
        }

        .chart-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .chart-box {
          flex: 1 1 300px;
          max-width: 400px;
        }

        .full-width {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default DailyEntryAnalytics;
