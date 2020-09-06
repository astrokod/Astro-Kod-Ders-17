// Dairekeri barındıran dizi
let circles = [];

// Setup fonksiyonu
function setup(){
    //500x500'lük bir canvas oluştur
    createCanvas(500, 500);
}

// Darw fonksiyonu
function draw(){
    // Arka tarafı siyah yap
    background(0);
    // Daireler listesine bir daire ekle
    circles.push(add_circle());

    // Tüm daireleri seçecek bir döngü oluştur
    for(let i=0; i<circles.length; i++){
        // Daireyi göster
        circles[i].show();
        // Daire diğer daireye çarptı mı, kontrol et.
        circles[i].check_others(circles);
    }
}

// Yeni daire ekleme kuralı
function add_circle(){
    // Yeni daire bulundu mu bilgisini tutan değişken
    let found = false;
    // Daire bulunana dek devam et
    while(!found){
        // Rastgele yeni koordinat oluştur
        let x = random(5, width-5);
        let y = random(5, height-5);

        // Bu daire eklenebilir mi, bilgisini tutan değişken
        let do_add = true;

        // Tüm daireleri seçecek bir döngü oluştur
        for(let i=0; i<circles.length; i++){
            // Şimdiki daireyi taşıyan değişken
            let circle = circles[i];
            // Şimdiki daire ile rastgele yeni koodrinat arasındaki uzaklık
            let d = dist(x, y, circle.pos.x, circle.pos.y);
            // Eğer uzaklık yarıçaptan küçük ise
            if(d < circle.r){
                // Bu daire eklenemez
                do_add = false;
                // diğer dairelere bakma. Çapışma var
                break;
            }
        }
        // Eğer bu daire eklenebiliyorsa
        if(do_add){
            // While döngüsünü durdur
            found = true;
            // x, y koordinatında bir Circle objesi oluşturup
            // return et
            return new Circle(createVector(x, y));
        }
    }
}

// Circle Sınıtı
class Circle{
    // constractor metodu
    constructor(pos){
        // alınan pozisyonu sakla
        this.pos = pos;
        // Yarıçapı sıfı olarak oluştur
        this.r = 0;
        // Kenara çarpmış mı, bilgisini taşıyan değişken
        this.hit_border = false;
        // Başka daireye çapmış mı, bilgisini taşıyan değişken
        this.hit_other = false;
    }
    // Daireyei büyüten metod
    grow(){
        // Eğer kenara ve başka bir daireye çarpmadıysa, yarıçapı arttır
        if(!this.hit_border && !this.hit_other){
            this.r += 1;
        }

    }
    // Kenara çarpmayı kontrol eden metod
    check_border(){
        // Yarışapın 2 fazlasını bir değişkene ata (Dairenin çizgi kalınlığı 2 olduğundan)
        let r = this.r + 2
        // Kenara çarpmış mı, bilgisini taşıyan değişkene
        // herhangi bir köşeye çarptı mı değerini ata
        this.hit_border = this.pos.x <= r || this.pos.x >= width - r || this.pos.y <= r || this.pos.y >= height - r;
    }

    // Diğerleriyle çarpışmayı kontrol eden metod
    check_others(others){
        // Tüm daireleri seçecek bir döngü oluştur. Kendim dahil
        for(let i=0; i<others.length; i++){
            // Şimdiki daireyi, other diye bir değişkene ata
            let other = others[i];
            // other ve this arasındaki uzaklığı hesapla
            let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
            // Eğer other ve this arasındaki uzaklık 0 değilse.
            // Aksi taktirde, other ve this aynı dairedir.
            if(d != 0){
                // Eğer uzaklık yarıçapları toplamından küçük veya eşit ise
                if(d <= this.r + other.r){
                    // Başka daireye çapmış mı, bilgisini taşıyan değişkene true değeri ata
                    this.hit_other = true;
                    // Diğer dairelere bakma. Çarpışma var
                    break;
                }
            }

        }

    }
    // Daireyi ekrana gösteren metod
    show(){
        // Ayarları yap:
        // Dairenin içini boş bırak
        noFill();
        // Çevre rengi beyaz olsun
        stroke(255);
        // ÇEvre kalınlığı 2 olsun
        strokeWeight(2);
        // Bu pozisyonda, yarıçağın iki katı çapında bir daire çiz
        circle(this.pos.x, this.pos.y, this.r * 2);
        // Daireyi büyüt
        this.grow();
        // Kenara çarpışmayı kontrol et
        this.check_border();
    }

}