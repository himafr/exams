var degree= 0
arr.forEach((element,index)=>{
var carry= arr[0]
arr.shift()
arr.splice(rand(),0,carry)   
})
arr.forEach((element,index) => {
    if(element.a3){

        document.getElementById("root").innerHTML +=`
        <div class="card border-info mb-3 " >
                <div class="card-header">${element.q}</div>
                <div class="card-body">
                    <div class="row">
                        <label for="a${index}" class="col-12 col-md">
                            <input id="a${index}" name="${index}" type="radio" class="card-text "/> ${element.a1}
                        </label>
                        <label for="b${index}" class="col-12 col-md">
                            <input id="b${index}" name="${index}" type="radio" class="card-text "/> ${element.a2}
                        </label>
                        <label for="c${index}" class="col-12 col-md">
                            <input id="c${index}" name="${index}" type="radio" class="card-text "/> ${element.a3}
                        </label>
                        <label for="d${index}" class="col-12 col-md">
                            <input id="d${index}" name="${index}" type="radio" class="card-text "/> ${element.a4}
                        </label>
                    </div>
                </div>
        </div> `
    }else{
        document.getElementById("root").innerHTML +=`
    <div class="card border-info mb-3 " >
            <div class="card-header">${element.q}</div>
            <div class="card-body">
                <div class="row">
                    <label for="a${index}" class="col-12 col-md">
                        <input id="a${index}" name="${index}" type="radio" class="card-text "/> ${element.a1}
                    </label>
                    <label for="b${index}" class="col-12 col-md">
                        <input id="b${index}" name="${index}" type="radio" class="card-text "/> ${element.a2}
                    </label>
                </div>
            </div>
    </div> `
    }
    
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

    
    function val(){
        document.getElementById("val").value = degree
    }
    function rand(){
           return Math.floor(Math.random()*arr.length)
               
    }