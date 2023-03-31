export default{
    showForm(){
        let formulario = document.querySelector("#formulario");
        let infoForm =[];
        
        formulario.addEventListener("submit",(e)=>{
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.target))
            infoForm.unshift({
                operacion:`${data.Operación}`,
                tipo: `${data.Tipo}`,
                valor: `${data.Valor}`
            })
            console.log(data);
            formulario.reset();
        });
    }
}