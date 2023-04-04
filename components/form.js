export default{
    showForm(){
        let formulario = document.querySelector("#formulario");
        let infoForm ={
            ingresos:[],
            egresos:[],
        };

        formulario.addEventListener("submit",(e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target));
            if(data.Operación == "+"){
                infoForm["ingresos"].unshift({
                    operacion:`${data.Operación}`,
                    tipo: `${data.Tipo}`,
                    valor: `${data.Valor}`
                });
            }else if(data.Operación == "-"){
                infoForm["egresos"].unshift({
                    operacion:`${data.Operación}`,
                    tipo: `${data.Tipo}`,
                    valor: `${data.Valor}`
                });
            }else{
                alert("Escoge una opción valida")
            }
            table();
            console.log(infoForm);
            formulario.reset();
        });

        const ws = new Worker("../storage/wsForm.js", {type:"module"})
        let id = [];
        let count = 0;
        let table = ()=>{
            document.querySelector('#tablaIng').innerHTML = "";
            let contIng = 0;
            infoForm.ingresos.forEach((val,id)=>{
                document.querySelector('#tablaIng').insertAdjacentHTML("beforeend",
                `<tr>
                    <td>${val.tipo}</td>
                    <td>${val.valor}</td>
                </tr>`);
                contIng = contIng + Number(val.valor);
                document.querySelector('#mostIng').textContent =`${contIng}`
    
            });
            document.querySelector('#tablaEgr').innerHTML = "";
            let contEgr = 0;
            infoForm.egresos.forEach((val,id)=>{
                document.querySelector('#tablaEgr').insertAdjacentHTML("beforeend",
                `<tr>
                    <td>${val.tipo}</td> 
                    <td>${val.valor}</td>
                </tr>`);
                contEgr = contEgr + Number(val.valor);
                document.querySelector('#mostEgr').textContent = `${contEgr}`
    });
        }

}

}