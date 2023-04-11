let wsForm ={

    showInicio(p1){
        let plantilla = `<div class="row d-flex justify-content-center">
                            <div class="col-12 d-flex text-center flex-column mt-3  pt-5 mb-4" style="color: white;">
                                <h1>Presupuesto Disponible</h1>
                                <span>-----------------</span>
                            </div>
                            <div class="col-2 align-items-center">
                                <div class="d-grid gap-3">
                                    <div class="p-3 bg-success rounded-3">
                                        <h6 id="mostIng"><span class="badge bg-secondary">New</span></h6>
                                    </div>
                                    <div class="p-3 bg-danger rounded-3">
                                        <h6 id="mostEgr"><span class="badge bg-secondary">New</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        return plantilla
    }
/*     showForm(){
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
    } */
}

self.addEventListener("message",(e)=>{
    postMessage(wsForm[e.data.module](e.data.data))
})