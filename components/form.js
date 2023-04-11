import form from "../storage/config.js"
export default{
    showForm(){
        let formulario = document.querySelector("#formulario");
        let infoForm ={
            ingresos:[],
            egresos:[],
        };
        let contIng = 0;
        let contEgr = 0;
        let Total;

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

        let table = ()=>{
            document.querySelector('#tablaIng').innerHTML = "";
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
            infoForm.egresos.forEach((val,id)=>{
                document.querySelector('#tablaEgr').insertAdjacentHTML("beforeend",
                `<tr>
                    <td>${val.tipo}</td> 
                    <td>${val.valor}</td>
                </tr>`);
                contEgr = contEgr + Number(val.valor);
                document.querySelector('#mostEgr').textContent = `${contEgr}`
            });

            Total = contIng - contEgr;
        }

        const ws = new Worker("storage/wsForm.js", {type:"module"});
        let id = [];
        let count = 0;
        id.push("#inicio")
        ws.postMessage({module:"showInicio", data: Total});
        ws.addEventListener("message", (e) =>{

            let doc = new DOMParser().parseFromString(e.data, "text/html");
            let dom = document.querySelector(id[count]);
            dom.innerHTML = null
            dom.append(...doc.body.children);
            (id.length-1 == count) ? ws.terminate() :count++
            
        })
        return infoForm
    }

}