var degree= 0
arr.forEach((element,index)=>{
var carry= arr[0]
arr.shift()
arr.splice(rand(0),0,carry)   
})
rarr.forEach((element,index)=>{
var carry= rarr[0]
rarr.shift()
rarr.splice(rand(1),0,carry)   
})
arr.forEach(element => {
    document.getElementById("root").innerHTML +=`<div class="alert alert-primary">
    <div class="row">
    <div class="col-12 alert alert-secondary">${element.q}</div>
    <label class="alert alert-warning col-12 col-md" for="${element.an}">${element.a1}</label>
    <label class="alert alert-warning col-12 col-md" for="${element.an}">${element.a2}</label>
    <label class="alert alert-warning col-12 col-md" for="${element.an}">${element.a3}</label>
    <label class="alert alert-warning col-12 col-md" for="${element.an}">${element.a4}</label>                
    </div>
    </div> `
});
rarr.forEach(element => {
    document.getElementById("root").innerHTML +=`<div class="alert alert-primary">
    <div class="row">
    <div class="col-12 alert alert-secondary">${element.q}</div>
    <label class="alert alert-warning col-12 col-md" for="${element.an}">${element.a1}</label>
    <label class="alert alert-warning col-12 col-md" for="${element.an}">${element.a2}</label>
    </div>
    </div> `
});
var all=document.querySelectorAll(".alert-warning")
all.forEach((element,index)=>{
    element.addEventListener("click",()=>{
        if(element.getAttribute("for")==element.innerHTML){
            element.setAttribute("class","alert alert-success col-12 col-md")
            degree=degree+1
            val()
        }
        else{
            element.setAttribute("class","alert alert-danger col-12 col-md" )
            if(degree==0){}else{
                degree=degree-1
                val()
            }
        }
    },{"once":true})
})
const carr =["a","b","c","z","x","y","f"]
    
    function val(){
        document.getElementById("val").value = degree
    }
    function rand(num){
        if (num==1){
           return Math.floor(Math.random()*rarr.length)
        }if (num ==0) {
           return Math.floor(Math.random()*arr.length)
        }else{
            return Math.floor(Math.random()*carr.length)
        }         
    }