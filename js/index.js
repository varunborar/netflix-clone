let faqAcc = document.getElementById('faq-fill');

function expandPanel(event) {

    var item = event.currentTarget.lastChild.firstChild;
    if (item.src.endsWith("add.webp")) {
        item.src = "images/icons/close.webp";
    } else {
        item.src = "images/icons/add.webp"
    }

    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.padding = "0rem 1.25rem";
        panel.style.maxHeight = null;
    } else {
        panel.style.padding = "0.75rem 1.25rem";
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

function createFaqAcc(data) {
    for (item of data) {
        let accItem = document.createElement('div');
        accItem.classList.add('acc-item');

        let accTitle = document.createElement('h1');
        accTitle.classList.add('title');
        accTitle.innerText = item['header'];
        let accIcon = document.createElement('div');
        accIcon.classList.add('icon');
        let accIconImg = document.createElement('img');
        accIconImg.src = "images/icons/add.webp";

        accIcon.appendChild(accIconImg);
        accItem.appendChild(accTitle);
        accItem.appendChild(accIcon);

        let accPanel = document.createElement('div');
        accPanel.classList.add('acc-panel');
        accPanel.innerText = item['body'];

        accItem.addEventListener('click', expandPanel);
        faqAcc.appendChild(accItem);
        faqAcc.appendChild(accPanel);
    }
}

fetch("./data/faqs.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        createFaqAcc(data);
    });