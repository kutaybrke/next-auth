
## 🚀 Auth0 Nextjs+NextAuth tabanlı kimlik doğrulama

- **Auth0 Entegrasyonu**
  - Güvenli kimlik doğrulama
  - JWT token yönetimi
  - Rol bazlı yetkilendirme (Admin/User)

- **NextAuth.js**
  - Session yönetimi
  - JWT 

- **Güvenlik**
  - Middleware ile sayfa koruması
  - Rol bazlı erişim kontrolü
  - M2M (Machine to Machine) uygulama desteği

- **Modern UI/UX**
  - Responsive tasarım
  - Tailwind CSS
  - Animasyonlar ve geçişler

## 🛠️ Teknolojiler

- Next.js 15
- React 19
- TypeScript
- Auth0
- NextAuth.js
- Tailwind CSS
- SOLID Prensipleri

## 📦 Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```
2. `.env` dosyasını oluşturun:
```env
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret
AUTH0_ISSUER=your_auth0_domain
AUTH0_M2M_CLIENT_ID=your_m2m_client_id
AUTH0_M2M_CLIENT_SECRET=your_m2m_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 🔐 Auth0 Kurulumu

1. Auth0 Dashboard'da yeni bir uygulama oluşturun
2. M2M uygulaması oluşturun ve gerekli izinleri verin:
   - `read:users`
   - `read:user_idp_tokens`
   - `read:roles`
3. Admin rolü oluşturun ve kullanıcılara atayın

## 🏗️ Proje Yapısı

```
├── app/
│   ├── (auth)/           # Kimlik doğrulama sayfaları
│   ├── admin/           # Admin paneli
│   ├── api/             # API rotaları
│   ├── lib/             # Yardımcı fonksiyonlar ve servisler
│   └── user/       # Kullanıcı login olduğunda rol user ise bilgileri gözüken sayfa
├── components/          # Yeniden kullanılabilir bileşenler
├── providers/          # Context providers


## 🔄 İş Akışı

1. Kullanıcı giriş yapar
2. Auth0 kimlik doğrulaması yapılır
3. JWT token oluşturulur
4. NextAuth.js session yönetimi
5. Middleware ile sayfa koruması
6. Rol bazlı erişim kontrolü
