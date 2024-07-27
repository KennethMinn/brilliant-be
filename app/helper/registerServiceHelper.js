class RegisterServices {
        constructor() {
            this.methods = []
            if (RegisterServices.instance instanceof RegisterServices) {
                return RegisterServices.instance;
            }
            RegisterServices.instance = this
    }
    getMethods(name){
        return this.methods.map(obj=> Object.fromEntries(Object.entries(obj).filter(([firstKey,value])=>{
            if(firstKey === name) return obj[firstKey]
        })))
    }
    setMethods(obj){
        this.methods.push(obj)
    }
}

module.exports = new RegisterServices()
