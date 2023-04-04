/* import form, { infoForm } from "./form.js";
export default{
    showTable(){
        document.querySelector('#tablaIng').innerHTML = "";
        let contIng = 0;
        infoForm.ingresos.forEach((val,id)=>{
            document.querySelector('#tablaIng').insertAdjacentHTML("beforeend",
            `<tr>
                <td>${val.Tipo}</td>
                <td>${val.Valor}</td>
            </tr>`)
            contIng = contIng + parseInt(val.Valor);
            document.querySelector('#mostIng').textContent =`${contIng}`

        })
    }
} */