class ItemSlot extends HTMLElement {
    constructor() {
        super();
        const itemSlot = document.createElement("div");
        itemSlot.className = "item-slot";
        let itemImg = null;
        if (this.hasAttribute("large")) { itemSlot.style.padding = "8px" };
        if (this.getAttribute("item")) {
            itemImg = document.createElement("img");
            itemImg.src = this.getAttribute("item");
            itemImg.width = 32;
            itemImg.height = 32;
            itemSlot.appendChild(itemImg);
        };
        if (this.getAttribute("tooltip")) { itemSlot.title = this.getAttribute("tooltip") };
        this.appendChild(itemSlot);
    };
};

customElements.define("item-slot", ItemSlot);