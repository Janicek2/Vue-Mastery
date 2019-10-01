Vue.config.devtools = true;
Vue.component ('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
    <div class="towar">
        <div class="imageTowar">
        <img :src="image" alt="" width="400px" height="300px">
        </div>
        <div class="info">
            <h1>{{ titleRozmiar() }}</h1>
            <p v-if="magazyn">Jest w magazynie</p>
            <p v-else>Brak w magazynie</p>
            <p v-if="wyprzedaz">Wyprzedaz</p>
            <p v-else>Poczekaj na wyprzedaz</p>
            <p>Przesylka {{ koszt }}</p>
            <ul>
            <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <ul>
            <li 
                v-for="(rozmiar, index) in rozmiary"
                :key="rozmiary.rozmiarId"
                :style=" {backgroundColor: rozmiar.kolor} "
                >
                <p
                @mouseover="updateZdjecie(index)"
                >Jest to rozmiar {{ rozmiar.rozmiar }} czyli {{ rozmiar.rozmiarSkrot }}.</p>
                </li>
            </ul>
        </div>
        <button type="button" :disabled="!magazyn" :class="{disabledButton: !magazyn}"  v-on:click="dodajZamowienie">Dodaj do zamowienia</button>
        <button type="button" class="btn btn-primary" v-on:click="anulujZamowienie">Anuluj do zamowienia</button>
    </div>
    `,
    data() {
        return {
            produkt: 'Skarpetki',
            marka: 'Nike',
            wybranyWariant: 0,
            details: ["80% bawełny", "40% wełny", "10% poliester"],
            rozmiary: [
                {
                    rozmiarId: 1,
                    rozmiar: "Maly",
                    rozmiarSkrot: "S",
                    zdjecie: './1.jpg',
                    kolor: "red",
                    ilosc: 1,
                    wyprzedaz: true,
                },
                {
                    rozmiarId: 2,
                    rozmiar: "Sredni",
                    rozmiarSkrot: "M",
                    zdjecie: './2.jpg',
                    kolor: "green",
                    ilosc: 15,
                    wyprzedaz: true,
                },
                {
                    rozmiarId: 3,
                    rozmiar: "Duzy",
                    rozmiarSkrot: "L",
                    zdjecie: './3.jpg',
                    kolor: "blue",
                    ilosc: 0,
                    wyprzedaz: false,
                }
            ],
            ilosc: 0
        }
    },
    methods: {
        dodajZamowienie() {
            this.$emit('add', this.rozmiary[this.wybranyWariant].rozmiarId);
        },
        anulujZamowienie() {
            this.$emit('less', this.rozmiary[this.wybranyWariant].rozmiarId);
        },
        updateZdjecie(index) {
            this.wybranyWariant = index;
        },
        titleRozmiar() { 
            return " To są " + this.produkt + " firmy " + this.marka;
        },
    },
    computed: {
        image() {
            return this.rozmiary[this.wybranyWariant].zdjecie;
        },
        magazyn() {
            return this.rozmiary[this.wybranyWariant].ilosc;
        },
        wyprzedaz() {
            return this.rozmiary[this.wybranyWariant].wyprzedaz;
        },
        koszt() {
            if (this.premium) {
                return "darmocha";
            }
            return "10 zila"
        }
    }
    
})

var app = new Vue ({
    el: '#app',
    data: {
        premium: true,
        ilosc: [],
    },
    methods: {
        dodaj(rozmiarId) {
            this.ilosc.push(rozmiarId);
        },
        odejmij(rozmiarId) {
            this.ilosc.pop(rozmiarId);
        }
    }
});