import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement, BarElement } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement
);

const options = {
  responsive: true,
};

export const AdminDashboard = () => {

  const stats = useSelector(state => state.auth.stats);
  const categories = useSelector(state => state.courses.categories);

  const [coursesData, setCoursesData] = useState({
    labels: ["Cursos activos", "Cursos pendientes", "Cursos cancelados", "Cursos eliminados"],
    datasets: [
      {
        label: "Cursos",
        backgroundColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
        borderColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
        hoverBackgroundColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
        hoverBorderColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
        data: stats && stats.statsCourses
      }
    ]
  });

  useEffect(() => {
    if (stats)
      setCoursesData({
        labels: ["Cursos activos", "Cursos pendientes", "Cursos rechazados", "Cursos eliminados"],
        datasets: [
          {
            label: "Cursos",
            backgroundColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
            borderColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
            hoverBackgroundColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
            hoverBorderColor: ["#00bcd4", "#ff9800", "#f44336", "#9e9e9e"],
            data: stats && stats.statsCourses
          }
        ]
      })
  }, [stats]);

  const [teachersData, setTeachersData] = useState({
    labels: ["Profesores activos", "Profesores pendientes", "Profesores rechazados", "Profesores eliminados"],
    datasets: [
      {
        label: "Profesores",
        backgroundColor: ["#00bcd4", "#ff9800", "#f44336"],
        borderColor: ["#00bcd4", "#ff9800", "#f44336"],
        hoverBackgroundColor: ["#00bcd4", "#ff9800", "#f44336"],
        hoverBorderColor: ["#00bcd4", "#ff9800", "#f44336"],
        data: stats && stats.statsTeachers
      }
    ]
  });

  useEffect(() => {
    if (stats)
      setTeachersData({
        labels: ["Profesores activos", "Profesores pendientes", "Profesores cancelados", "Profesores eliminados"],
        datasets: [
          {
            label: "Profesores",
            backgroundColor: ["#00bcd4", "#ff9800", "#f44336", "#9c27b0"],
            borderColor: ["#00bcd4", "#ff9800", "#f44336", "#9c27b0"],
            hoverBackgroundColor: ["#00bcd4", "#ff9800", "#f44336", "#9c27b0"],
            hoverBorderColor: ["#00bcd4", "#ff9800", "#f44336", "#9c27b0"],
            data: stats && stats.statsTeachers
          }
        ]
      })
  }, [stats]);

  const [categoriesData, setCategoriesData] = useState({
    labels: categories && categories.map(category => category.name),
    datasets: [
      {
        label: "Categorias",
        backgroundColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
        borderColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
        hoverBackgroundColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
        hoverBorderColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
        data: stats && stats.coursesCategory
      }
    ]
  });

  useEffect(() => {
    if (stats && categories)
      setCategoriesData({
        labels: categories && categories.map(category => category.name),
        datasets: [
          {
            label: "Categorias",
            backgroundColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
            borderColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
            hoverBackgroundColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
            hoverBorderColor: ["#2196f3", "#ffeb3b", "#ff9800", "#f44336"],
            data: stats && stats.coursesCategory
          }
        ]
      })
  }, [stats, categories]);
  
  return (
    <div className="admin-view">
      <h1 style={{
        textAlign: "center",
        margin: "20px 0",
        fontSize: "2.5rem"
      }}>DASHBOARD</h1>
      <Bar data={categoriesData} options={options} />
      <div className="d-flex" style={{
        flexWrap: "wrap"
      }}>
        <div className="chart-container" style={{
          margin: "2rem auto"
        }}>
          <Pie data={coursesData} options={options} />
        </div>
        <div className="chart-container" style={{
          margin: "2rem auto"
        }}>
          <Pie data={teachersData} options={options} />
        </div>
      </div>
    </div>
  )
}
