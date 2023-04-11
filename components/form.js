import form from "../storage/config.js"
export default{
    showForm(){
        let formulario = document.querySelector("#formulario");
        let infoForm ={
            ingresos:[],
            egresos:[],
        }; 
        
        let contIng = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }); 
        let contEgr = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
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
                document.querySelector('#tablaIng').innerHTML = "";
                infoForm.ingresos.forEach((val,id)=>{
                document.querySelector('#tablaIng').insertAdjacentHTML("beforeend",
                    `<tr>
                        <td>${val.tipo}</td>
                        <td>${val.valor}</td>
                    </tr>`); })

                contIng = infoForm["ingresos"].reduce(function(cont,value){
                    return Number(cont) + Number(value.valor)
                },0);
                document.querySelector('#mostIng').textContent =`${contIng}`
            }else if(data.Operación == "-"){
                infoForm["egresos"].unshift({
                    operacion:`${data.Operación}`,
                    tipo: `${data.Tipo}`,
                    valor: `${data.Valor}`
                });
                document.querySelector('#tablaEgr').innerHTML = "";
                infoForm.egresos
                .forEach((val,id)=>{
                document.querySelector('#tablaEgr').insertAdjacentHTML("beforeend",
                    `<tr>
                        <td>${val.tipo}</td>
                        <td>${val.valor}</td>
                    </tr>`); })
                contEgr = infoForm["egresos"].reduce(function(cont,value){
                        return Number(cont) + Number(value.valor)
                },0);
                document.querySelector('#mostEgr').textContent =`${contEgr}`
            }else{
                alert("Escoge una opción valida")
            }
/*             table(); */
            console.log(infoForm);
            formulario.reset();
        });


        const ws = new Worker("storage/wsForm.js", {type:"module"});
        let id = [];
        let count = 0;
        id.push("#inicio");
        ws.postMessage({module:"showInicio"});
        id.push("#formulario");
        ws.postMessage({module: "showForm"});
        id.push("#tabla");
        ws.postMessage({module: "showTable"})
        id.push("#nav");
        ws.postMessage({module:"showNav"})
        ws.addEventListener("message", (e) =>{

            let doc = new DOMParser().parseFromString(e.data, "text/html");
            let dom = document.querySelector(id[count]);
            dom.innerHTML = null
            dom.append(...doc.body.children);
            (id.length-1 == count) ? ws.terminate() :count++
            
        });
        return infoForm;
    }

}
