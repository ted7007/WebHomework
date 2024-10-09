
function changePage(){
    let data = d3.selectAll('.menu a')
                    .nodes()
                    .map(n => n.textContent)
    
    d3.selectAll('.content div')
    .filter(function() {
        return data.indexOf(d3.select(this).select('b').node().textContent) === -1;
    })
    .remove();
}