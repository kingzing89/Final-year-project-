import data from "./data.js"
const {products}=data()
const val="Acidity"
products.filter(item=>item.Drugtype===val)
products.map((product)=>{
    console.log(product)
})
