function message(msg) {
    let els = document.getElementsByClassName("msg");
    for (let i=0; i<els.length; i++) {
        els[i].remove();
    }
    let el = document.createElement("div");
    el.className = "msg";
    el.innerText = msg;
    el.onclick = () => el.remove();
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1500);
}