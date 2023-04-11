let wsForm ={
    showNav(){
        let plantilla = `
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Calcular Presupuesto</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto">
                        <a class="nav-link active" href="#">Home</a>
                        <a class="nav-link active" href="#"> Ingresos</a>
                        <a class="nav-link active" href="#"> Egresos</a>
                    </div>
                </div>
            </div>`;
        return plantilla;
    },

    showInicio(){
        let plantilla = `<div class="row d-flex justify-content-center">
                            <div class="col-12 d-flex text-center flex-column mt-3  pt-5 mb-4" style="color: white;">
                                <h1>Presupuesto Disponible</h1>
                                <span>-----------------</span>
                            </div>
                            <div class="col-3 align-items-center">
                                <div class="d-grid gap-3">
                                    <div class="p-3 bg-success rounded-3 d-flex justify-content-between">
                                        <p class="fw-bolder text-white">INGRESOS</p>
                                        <h6 id="mostIng"><span class="badge bg-secondary">New</span></h6>
                                    </div>
                                    <div class="p-3 bg-danger rounded-3 d-flex justify-content-between">
                                        <p class="fw-bolder text-white">EGRESOS</p>
                                        <h6 id="mostEgr"><span class="badge bg-secondary">New</span></h6>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        return plantilla;
    },

    showForm(){
        let plantilla = `
            <div class="row flex-nowrap">
                <div class="col-2">
                    <select  name="Operación" class="form-select">
                        <option selected value="none">Operación</option>
                        <option value="+">+</option>
                        <option value="-">-</option>
                    </select>
                </div>
                <div class="col-6">
                    <div class="input-group">
                        <input name="Tipo" type="text" class="form-control" placeholder="Descripción">
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group mb-3">
                        <span class="input-group-text">$</span>
                        <input name="Valor" type="number" class="form-control" placeholder="Valor">
                    </div>
                </div>
                <div class="col-1">
                    <div>
                        <button class="btn btn-success" type="submit"><i class="bi bi-check-circle"></i></button>
                    </div>
                </div>
            </div>`;
        return plantilla;
    },

    showTable(){
        let plantilla = `
            <div class="row d-flex justify-content-center">
                <div class="col-6 text-center">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col" style="color: green ;">Ingresos</th>
                            </tr>
                        </thead>
                        <tbody id="tablaIng">
                        </tbody>
                    </table>
                </div>
                <div class="col-6 text-center">
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col" style="color: red;">Egresos</th>
                            </tr>
                        </thead>
                        <tbody id="tablaEgr">
                        </tbody>
                    </table>
                </div>
            </div>`;
        return plantilla;
    }
}

self.addEventListener("message",(e)=>{
    postMessage(wsForm[e.data.module](e.data.data))
})
