# İşTakip Pro

İşTakip Pro, bağımsız çalışanlar ve küçük ekipler için proje, müşteri ve bütçe takibini tek bir arayüzde sunan web uygulamasıdır. Projeleri durumlarına göre yönetebilir, tamamlanma ve gelir özetlerini görüntüleyebilir; açık veya koyu temada çalışabilirsiniz. Proje kayıtları tarayıcıda saklandığı için uygulama sunucuya bağlı olmadan çalışır.

## Özellikler

- Proje ve müşteri ekleme, düzenleme, silme ve durum güncelleme.
- Genel Bakış ekranında sayfa başına en fazla 4 proje; Projeler ekranında sayfa başına 8 proje.
- Projeleri ada ve müşteriye göre arama, durumlarına göre filtreleme.
- Tamamlanan proje oranına bağlı ilerleme çubuğu ve mesaj.
- Kazanılan/beklenen gelir özeti ve proje bazında bütçeler.
- Açık/koyu tema seçimi; seçilen tema tarayıcıda hatırlanır.
- Okundu durumlu bildirimler.
- `IntersectionObserver` ile görünür alana girerken oynayan kutu animasyonları. İşletim sisteminde azaltılmış hareket seçiliyse animasyonlar kapalıdır.
- Mobil ekranda açılır sol menü.

## Kullanılan teknolojiler

| Teknoloji | Kullanım |
| --- | --- |
| [React 19](https://react.dev/) | Arayüz ve bileşenler |
| [Vite 8](https://vite.dev/) | Geliştirme sunucusu ve üretim derlemesi |
| JavaScript (ES Modules) | Uygulama mantığı ve veri işlemleri |
| CSS | Yerleşim, tema, animasyonlar ve responsive tasarım |
| [HTML Web Storage](https://developer.mozilla.org/docs/Web/API/Window/localStorage) | Proje kayıtlarını tarayıcıda saklama |
| ESLint | Kod kalitesi denetimi |

## Klasör ve dosya yapısı

```text
WebProje/
├── public/
│   ├── favicon.svg                 # Tarayıcı sekmesi ikonu
│   └── icons.svg                   # SVG ikon koleksiyonu
├── src/
│   ├── assets/                     # Görsel ve statik varlıklar
│   ├── components/
│   │   ├── AppHeader.jsx           # Üst çubuk, tarih ve bildirim paneli
│   │   ├── DeleteProjectModal.jsx  # Proje silme onayı
│   │   ├── FinanceView.jsx         # Gelir özeti ve proje bütçe listesi
│   │   ├── Icon.jsx                # Uygulama içi SVG ikonları
│   │   ├── NotificationPanel.jsx   # Bildirim listesi ve okundu kontrolleri
│   │   ├── PageHeading.jsx         # Sayfa başlığı ve eylem alanı
│   │   ├── ProjectFormModal.jsx    # Proje ekleme/düzenleme formu
│   │   ├── ProjectsTable.jsx       # Arama, filtre, sayfalama ve proje işlemleri
│   │   ├── ScrollReveal.jsx        # IntersectionObserver görünürlük bileşeni
│   │   ├── Sidebar.jsx             # Sol menü, tema ve ilerleme alanı
│   │   ├── SiteFooter.jsx          # Alt bilgi ve sayfa kısayolları
│   │   └── StatCards.jsx           # Proje ve gelir kartları
│   ├── data/
│   │   ├── initialProjects.js      # 7 başlangıç örnek projesi
│   │   └── navigation.js           # Ana menü başlıkları ve ikonları
│   ├── utils/
│   │   ├── formatters.js           # Para, tarih ve saat biçimleme
│   │   └── projectStorage.js       # Proje verisini LocalStorage'dan okuma/yazma
│   ├── App.jsx                     # Uygulama durumu, sayfa akışı ve proje işlemleri
│   ├── App.css                     # Uygulama bileşenleri, temalar ve responsive stiller
│   ├── index.css                   # Genel CSS sıfırlaması ve temel stiller
│   └── main.jsx                    # React uygulama giriş noktası
├── index.html                      # HTML başlangıç belgesi
├── package.json                    # Bağımlılıklar ve npm komutları
├── package-lock.json               # Kilitlenmiş bağımlılık sürümleri
└── vite.config.js                  # Vite yapılandırması
```

## Kurulum

Gereksinimler: Node.js ve npm.

```bash
git clone https://github.com/kusVeysel/WebProje.git
cd WebProje
npm install
npm run dev
```

Geliştirme sunucusu başladığında terminalde gösterilen yerel adresi tarayıcıda açın (varsayılan: `http://localhost:5173`).

## Yapay zeka kullanımı

Genel proje sayfasının kemik yapısının oluşmasında kullanılmıştır. Yaptığı değişikler teker teker incelenmiş **basit işlerde**(buton rengi değiştirme vs.) **kesinlikle** kullanılmamıştır.
Yapay zekadan dokümantasyon aşamasında bu README'nin taslağını oluşturmak ve proje açıklamasını düzenlemek için destek alınmıştır. İçerik, uygulamanın mevcut özellikleri ve kaynak koduyla karşılaştırılarak gözden geçirilmiştir. 

- Gemini
- Copilot
    kullanılmıştır

## Npm komutları

```bash
npm run dev      # Yerel geliştirme sunucusu
npm run build    # Üretim derlemesini dist/ klasörüne oluşturur
npm run preview  # Üretim derlemesini yerelde önizler
npm run lint     # ESLint kod denetimini çalıştırır
```

## Veri saklama

Proje kayıtları `istakip-projects` anahtarıyla tarayıcının `localStorage` alanında tutulur. Veriler sunucuya gönderilmez ve başka bir tarayıcıya/cihaza otomatik aktarılmaz. Tarayıcı verilerini temizlemek kayıtları kaldırır. Bildirim hareketleri uygulama oturumu boyunca bellekte tutulur.
