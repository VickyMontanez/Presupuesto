export default{
    ingresos: (localStorage.getItem("ingresos")) ? JSON.parse(localStorage.getItem("ingresos")) : [],
    egresos: (localStorage.getItem("egresos")) ? JSON.parse(localStorage.getItem("egresos")) : [],
}