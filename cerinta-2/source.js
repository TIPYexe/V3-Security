let template = document.createElement('div');

function function_filter(){
    const lista = ["A1, B1, C1", "A1, B1, C2", "A1, B1, C3", "A1, B2, C4", "A1, B2, C5", "A1, B3, C6", "A2, B4, C7", "A2, B5, C8", "A2, B5, C9", "A3, B6, C10"]
    template.innerHTML = ''
    document.body.appendChild(template)

    var selectedA = document.getElementById('A').value;
    var selectedB = document.getElementById("B").value;
    var selectedC = document.getElementById("C").value;

    for(let i=0; i<lista.length; i++){

        if(lista[i].includes(selectedA) && lista[i].includes(selectedB) && lista[i].includes(selectedC)){
            template.innerHTML += lista[i]
            template.innerHTML += '<br>'
            document.body.appendChild(template)
        }
    }
}

window.onload = function_filter