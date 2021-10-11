class Slider extends HTMLElement {
    constructor() {
        super()
        const template = document.getElementById('contact-card-template')

        //shadow dom
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._slider = this.shadowRoot.querySelector('#range-slider')
        this._render(this)
        this.valueBubble()
        this.findLog()

    }

    _render({ min, max, step, value }) {
        this.shadowRoot.getElementById('range-slider').setAttribute('min', `${Number(min)}`)
        this.shadowRoot.getElementById('range-slider').setAttribute('max', `${Number(max)}`)
        this.shadowRoot.getElementById('range-slider').setAttribute('step', `${Number(step)}`)
        this.shadowRoot.getElementById('range-slider').setAttribute('value', `${Number(value)}`)

        this.shadowRoot.getElementById('range-slider').setAttribute('aria-valuemin', `${Number(min)}`)
        this.shadowRoot.getElementById('range-slider').setAttribute('aria-valuemax', `${Number(max)}`)
        this.shadowRoot.getElementById('range-slider').setAttribute('aria-valuenow', `${Number(value)}`)
    }

    static get observedAttributes() {
        return ['min', 'max', 'step', 'value']
    }

    valueBubble() {
        const range = this.shadowRoot.querySelector("#range-slider");
        const bubble = this.shadowRoot.querySelector(".bubble");

        range.addEventListener("input", () => {
            setBubble(range, bubble);
        });
        setBubble(range, bubble);


        function setBubble(range, bubble) {
            const val = range.value;
            const min = range.min ? range.min : 0;
            const max = range.max ? range.max : 100;
            const newVal = Number(((val - min) * 100) / (max - min));
            bubble.innerHTML = val;

            bubble.style.left = `calc(${newVal}% + (${(8 - newVal * 0.15)}px)/4)`;
        }
    }

    attributeChangedCallback(value, oldValue, newValue) {
        this[value] = newValue
    }

    findLog() {
        const slider = (this.shadowRoot.querySelectorAll("#range-slider"))[0]
        let logEl = this.shadowRoot.querySelector('.log-el')
        slider.addEventListener("input", function (e) {
            logEl.textContent = `Log10: ${Math.log10(e.target.value).toFixed(2)}`;
        });
    }


}
window.customElements.define('slider-component', Slider)