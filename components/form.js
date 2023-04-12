import config from "../storage/config.js"
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
        let porcentaje;

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
                document.querySelector('#mostIng').textContent =`${contIng}`;

            }else if(data.Operación == "-"){
                infoForm["egresos"].unshift({
                    operacion:`${data.Operación}`,
                    tipo: `${data.Tipo}`,
                    valor: `${data.Valor}`
                });
                document.querySelector('#tablaEgr').innerHTML = "";
                contEgr = infoForm["egresos"].reduce(function(cont,value){
                    return Number(cont) + Number(value.valor)
                },0);
                document.querySelector('#mostEgr').textContent =`${contEgr}`;

                porcentaje = function porcent(n1, n2){
                return (Number(n1)/ Number(n2)*100).toFixed(3)};
                var porResultado = porcentaje(infoForm["egresos"][0]["valor"], contEgr);

                infoForm.egresos.forEach((val,id)=>{
                document.querySelector('#tablaEgr').insertAdjacentHTML("beforeend",
                    `<tr>
                        <td>${val.tipo}</td>
                        <td>${val.valor}
                            <span id="mostpor" class="badge bg-secondary">${porResultado}%</span>
                        </td>
                    </tr>`); })

            }else{
                alert("Escoge una opción valida")
            }

            Total = function dispo(n1, n2) {
                return (Number(n1) - Number(n2));
            }
            var resultado = Total(contIng, contEgr)
            document.querySelector('#disponible').textContent =`${resultado}`
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
