const elem = document.getElementById('command_window')

function generateHTML(data){
    var html = ``
    let date = data.date
    let time = data.time

    html = `
    <div class="datetime">
    <div class="time">
        <p>${time}</p>
    </div>
    <div class="date">
        <p>${date}</p>
    </div>
    `

    return html
}

function update(){
    let date = new Date()
    let time = date.toLocaleTimeString()
    let dateString = date.toLocaleDateString()

    elem.innerHTML = generateHTML({date: dateString, time: time})
}

window.setInterval(update, 1);
