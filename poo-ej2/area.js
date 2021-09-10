export default class Area {
    bs;
    bi;
    h;
    constructor (){}
    calcularAreaTrap () {
        const respuesta = ((parseInt(this.bi)+parseInt(this.bs))/2)*this.h
        return respuesta;
    }
}
